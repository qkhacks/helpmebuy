package xyz.helpmebuy.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import xyz.helpmebuy.auth.AuthenticatedAdminController;
import xyz.helpmebuy.model.Tree;
import xyz.helpmebuy.request.TreeCreationRequest;
import xyz.helpmebuy.request.TreeUpdateRequest;
import xyz.helpmebuy.service.TreeService;

import java.util.logging.Level;

@RestController
@RequestMapping(value = "/api/v1")
public class TreeAdminController extends AuthenticatedAdminController {

    private final TreeService treeService;

    @Autowired
    public TreeAdminController(TreeService treeService) {
        this.treeService = treeService;
    }

    @PostMapping(value = "/trees")
    public Tree create(@Valid @RequestBody TreeCreationRequest treeCreationRequest) {
        return treeService.create(treeCreationRequest.getKey(),
                treeCreationRequest.getDisplayName(),
                treeCreationRequest.getRootNode());
    }

    @PutMapping(value = "/trees/{key}")
    public Tree update(@PathVariable String key, @Valid @RequestBody TreeUpdateRequest treeUpdateRequest) {
        return treeService.update(key, treeUpdateRequest.getDisplayName(), treeUpdateRequest.getRootNode());
    }

    @DeleteMapping(value = "/trees/{key}")
    public Tree delete(@PathVariable String key) {
        return treeService.delete(key);
    }

    @PostMapping(value = "/trees/{key}/activate")
    public Tree activate(@PathVariable String key) {
        return treeService.setActive(key);
    }

    @PostMapping(value = "/trees/{key}/deactivate")
    public Tree deactivate(@PathVariable String key) {
        return treeService.setInactive(key);
    }
}
