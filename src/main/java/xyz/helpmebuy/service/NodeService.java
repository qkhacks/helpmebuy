package xyz.helpmebuy.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import xyz.helpmebuy.embedded.Option;
import xyz.helpmebuy.embedded.Route;
import xyz.helpmebuy.exception.ClientException;
import xyz.helpmebuy.exception.NotFoundException;
import xyz.helpmebuy.model.Node;
import xyz.helpmebuy.model.Product;
import xyz.helpmebuy.repository.NodeRepository;
import xyz.helpmebuy.util.OptionChoices;

import java.util.*;

@Service
public class NodeService {

    private final NodeRepository nodeRepository;

    private final ProductService productService;

    @Autowired
    public NodeService(NodeRepository nodeRepository, ProductService productService) {
        this.nodeRepository = nodeRepository;
        this.productService = productService;
    }

    public Node create(String parent, Boolean isLeaf, String prompt, List<Option> options, Boolean multipleOptionChoicesAllowed, List<String> products, List<Integer> parentOptionChoices) {
        if (isLeaf) {
            if (null != products && !products.isEmpty()) {
                if (!productService.allExist(new HashSet<>(products))) {
                    throw new NotFoundException("Products not found");
                }
            }
        } else {
            if (null == prompt || prompt.isBlank()) {
                throw new ClientException("Node options info not set");
            }
        }

        Node parentNode = null;

        if (null != parent) {
            parentNode = get(parent);

            if (parentNode.getLeaf()) {
                throw new ClientException("Parent node is a leaf");
            }

            if (null == parentOptionChoices || parentOptionChoices.isEmpty()) {
                throw new ClientException("Parent option choices not set");
            }

            for (Route route : parentNode.getRoutes()) {
                if (OptionChoices.match(route.getOptionChoices(), parentOptionChoices)) {
                    throw new ClientException("Child node for option choice already exists");
                }
            }
        }

        Node node = new Node(Collections.emptyList(), parent, isLeaf, prompt, options, multipleOptionChoicesAllowed, products, Collections.emptyList());
        node = nodeRepository.save(node);

        if (null != parentNode) {
            if (null == parentNode.getChildren()) {
                parentNode.setChildren(new ArrayList<>());
            }

            parentNode.getChildren().add(node.getId());

            if (null == parentNode.getRoutes()) {
                parentNode.setRoutes(new ArrayList<>());
            }

            parentNode.getRoutes().add(new Route(parentOptionChoices, node.getId()));
            nodeRepository.save(parentNode);
        }

        return node;
    }

    public Node get(String nodeId) {
        return nodeRepository.findById(nodeId).orElseThrow();
    }

    public List<Node> get(List<String> nodeIds) {
        return nodeRepository.findByIdIn(nodeIds);
    }

    public Node getNextNode(String nodeId, List<Integer> optionChoices) {
        Node currentNode = get(nodeId);

        String childId = null;

        for (Route route : currentNode.getRoutes()) {
            if (OptionChoices.match(route.getOptionChoices(), optionChoices)) {
                childId = route.getChild();
            }
        }

        if (null == childId) {
            throw new NotFoundException("Next node not found");
        }

        return get(childId);
    }

    public Node update(String nodeId, String prompt, List<Option> options, Boolean multipleOptionChoicesAllowed, List<String> products) {
        Node node = get(nodeId);

        if (node.getLeaf()) {
            node.setProducts(products);
        } else {
            if (null != prompt && !prompt.isBlank()) {
                node.setPrompt(prompt);
            }

            node.setOptions(options);

            if (null != multipleOptionChoicesAllowed) {
                node.setMultipleOptionChoicesAllowed(multipleOptionChoicesAllowed);
            }
        }

        node.setModifiedOn(new Date());
        return nodeRepository.save(node);
    }

    public Node delete(String nodeId) {
        Node node = get(nodeId);
        nodeRepository.delete(node);

        for (String child : node.getChildren()) {
            delete(child);
        }

        return node;
    }

    public List<Node> listChildren(String nodeId) {
        Node node = get(nodeId);

        List<String> childrenIds = node.getChildren();

        if (null == childrenIds || childrenIds.isEmpty()) {
            return Collections.emptyList();
        }

        return get(childrenIds);
    }

    public List<Product> listProducts(String nodeId) {
        Node node = get(nodeId);

        if (!node.getLeaf()) {
            throw new ClientException("Node is not a leaf");
        }

        return productService.get(node.getProducts());
    }

    public Boolean exists(String nodeId) {
        return nodeRepository.existsById(nodeId);
    }
}
