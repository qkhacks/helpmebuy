package xyz.helpmebuy.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import xyz.helpmebuy.model.Tree;
import xyz.helpmebuy.request.TraversalRequest;
import xyz.helpmebuy.response.TraversalResponse;
import xyz.helpmebuy.service.TreeService;

import java.util.List;

@RestController
@RequestMapping(value = "/api/v1")
public class TreeController {

    private final TreeService treeService;

    @Autowired
    public TreeController(TreeService treeService) {
        this.treeService = treeService;
    }

    @GetMapping(value = "/trees")
    public List<Tree> list() {
        return treeService.list();
    }

    @GetMapping(value = "/trees/{key}")
    public Tree get(@PathVariable String key) {
        return treeService.get(key);
    }

    @PostMapping(value = "/trees/{key}/traverse")
    public TraversalResponse traverse(@PathVariable String key, @Valid @RequestBody TraversalRequest traversalRequest) {
        return treeService.traverse(key, traversalRequest.getNodeId(), traversalRequest.getOptionChoices());
    }
}
