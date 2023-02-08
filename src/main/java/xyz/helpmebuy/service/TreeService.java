package xyz.helpmebuy.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import xyz.helpmebuy.exception.ClientException;
import xyz.helpmebuy.exception.NotFoundException;
import xyz.helpmebuy.model.Node;
import xyz.helpmebuy.model.Tree;
import xyz.helpmebuy.repository.TreeRepository;
import xyz.helpmebuy.response.TraversalResponse;

import java.util.Date;
import java.util.List;

@Service
public class TreeService {

    private final TreeRepository treeRepository;

    private final NodeService nodeService;

    private final ProductService productService;

    @Autowired
    public TreeService(TreeRepository treeRepository, NodeService nodeService, ProductService productService) {
        this.treeRepository = treeRepository;
        this.nodeService = nodeService;
        this.productService = productService;
    }

    public Tree create(String key, String displayName, String rootNode) {
        if (keyExists(key)) {
            throw new ClientException("Tree " + key + " already exists");
        }

        if (null != rootNode) {
            if (!nodeService.exists(rootNode)) {
                throw new NotFoundException("Root node not found");
            }
        }

        Tree tree = new Tree(key, displayName, rootNode, false);
        return treeRepository.save(tree);
    }

    public Tree get(String key) {
        Tree tree = treeRepository.findByKey(key);

        if (null == tree) {
            throw new NotFoundException("Tree" + key + " not found");
        }

        return tree;
    }

    public Tree update(String key, String displayName, String rootNode) {
        Tree tree = get(key);

        if (null != displayName && !displayName.isBlank()) {
            tree.setDisplayName(displayName);
        }

        if (null != rootNode && !rootNode.isBlank()) {
            if (!nodeService.exists(rootNode)) {
                throw new NotFoundException("Root node not found");
            }

            tree.setRootNode(rootNode);
        }

        tree.setModifiedOn(new Date());
        return treeRepository.save(tree);
    }

    public Tree delete(String key) {
        Tree tree = get(key);
        treeRepository.delete(tree);
        return tree;
    }

    public Tree setActive(String key) {
        Tree tree = get(key);
        tree.setActive(true);
        tree.setModifiedOn(new Date());
        return treeRepository.save(tree);
    }

    public Tree setInactive(String key) {
        Tree tree = get(key);
        tree.setActive(false);
        tree.setModifiedOn(new Date());
        return treeRepository.save(tree);
    }

    public List<Tree> list() {
        return treeRepository.findByActiveIsTrue();
    }

    public List<Tree> listAll() {
        return treeRepository.findAll();
    }

    public TraversalResponse traverse(String key, String nodeId, List<Integer> optionChoices) {
        Node nextNode;

        if (null == nodeId) {
            Tree tree = get(key);

            if (tree.getRootNode() == null) {
                throw new NotFoundException("We reached a dead end");
            }

            nextNode = nodeService.get(tree.getRootNode());
        } else {
            nextNode = nodeService.getNextNode(nodeId, optionChoices);
        }

        TraversalResponse response = new TraversalResponse();
        response.setNode(nextNode);

        if (nextNode.getLeaf()) {
            response.setProducts(productService.get(nextNode.getProducts()));
        }

        return response;
    }

    private Boolean keyExists(String key) {
        return treeRepository.existsByKey(key);
    }
}
