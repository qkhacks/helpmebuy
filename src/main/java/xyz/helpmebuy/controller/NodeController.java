package xyz.helpmebuy.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import xyz.helpmebuy.auth.AuthenticatedAdminController;
import xyz.helpmebuy.model.Node;
import xyz.helpmebuy.request.NodeCreationRequest;
import xyz.helpmebuy.request.NodeUpdateRequest;
import xyz.helpmebuy.service.NodeService;

@RestController
@RequestMapping(value = "/api/v1")
public class NodeController extends AuthenticatedAdminController {

    private final NodeService nodeService;

    @Autowired
    public NodeController(NodeService nodeService) {
        this.nodeService = nodeService;
    }

    @PostMapping(value = "/nodes")
    public Node create(@Valid @RequestBody NodeCreationRequest nodeCreationRequest)  {
        return nodeService.create(nodeCreationRequest.getParent(),
                nodeCreationRequest.getLeaf(),
                nodeCreationRequest.getPrompt(),
                nodeCreationRequest.getOptions(),
                nodeCreationRequest.getLeaf(),
                nodeCreationRequest.getProducts(),
                nodeCreationRequest.getParentOptionChoices());
    }

    @GetMapping(value = "/nodes/{nodeId}")
    public Node get(@PathVariable String nodeId) {
        return nodeService.get(nodeId);
    }

    @PutMapping(value = "/nodes/{nodeId}")
    public Node update(@PathVariable String nodeId, @Valid @RequestBody NodeUpdateRequest nodeUpdateRequest) {
        return nodeService.update(nodeId,
                nodeUpdateRequest.getPrompt(),
                nodeUpdateRequest.getOptions(),
                nodeUpdateRequest.getMultipleOptionsChoiceAllowed(),
                nodeUpdateRequest.getProducts());
    }

    @DeleteMapping(value = "/nodes/{nodeId}")
    public Node delete(@PathVariable String nodeId) {
        return nodeService.delete(nodeId);
    }
}
