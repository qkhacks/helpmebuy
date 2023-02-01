package xyz.helpmebuy.request;

import java.io.Serializable;

public class TreeUpdateRequest implements Serializable {

    private String displayName;

    private String rootNode;

    public TreeUpdateRequest() {

    }

    public TreeUpdateRequest(String displayName, String rootNode) {
        this.displayName = displayName;
        this.rootNode = rootNode;
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
