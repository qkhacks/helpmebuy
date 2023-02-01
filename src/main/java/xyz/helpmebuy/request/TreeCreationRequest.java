package xyz.helpmebuy.request;

import jakarta.validation.constraints.NotBlank;

import java.io.Serializable;

public class TreeCreationRequest implements Serializable {

    @NotBlank
    private String key;

    @NotBlank
    private String displayName;

    private String rootNode;

    public TreeCreationRequest() {

    }

    public TreeCreationRequest(String key, String displayName, String rootNode) {
        this.key = key;
        this.displayName = displayName;
        this.rootNode = rootNode;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getRootNode() {
        return rootNode;
    }

    public void setRootNode(String rootNode) {
        this.rootNode = rootNode;
    }
}
