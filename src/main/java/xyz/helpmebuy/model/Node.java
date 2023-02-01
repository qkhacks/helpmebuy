package xyz.helpmebuy.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import xyz.helpmebuy.embedded.Option;
import xyz.helpmebuy.embedded.Route;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Document(collection = "nodes")
public class Node implements Serializable {

    @Id
    private String id;

    private List<String> children;

    private String parent;

    private Boolean isLeaf;

    private String prompt;

    private List<Option> options;

    private Boolean multipleOptionChoicesAllowed;

    private List<String> products;

    private List<Route> routes;

    private Date createdOn;

    private Date modifiedOn;

    public Node() {

    }

    public Node(List<String> children, String parent, Boolean isLeaf, String prompt, List<Option> options, Boolean multipleOptionChoicesAllowed, List<String> products, List<Route> routes) {
        this.children = children;
        this.parent = parent;
        this.isLeaf = isLeaf;
        this.prompt = prompt;
        this.options = options;
        this.multipleOptionChoicesAllowed = multipleOptionChoicesAllowed;
        this.products = products;
        this.routes = routes;
        this.createdOn = new Date();
        this.modifiedOn = new Date();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<String> getChildren() {
        return children;
    }

    public void setChildren(List<String> children) {
        this.children = children;
    }

    public String getParent() {
        return parent;
    }

    public void setParent(String parent) {
        this.parent = parent;
    }

    public Boolean getLeaf() {
        return isLeaf;
    }

    public void setLeaf(Boolean leaf) {
        isLeaf = leaf;
    }

    public String getPrompt() {
        return prompt;
    }

    public void setPrompt(String prompt) {
        this.prompt = prompt;
    }

    public List<Option> getOptions() {
        return options;
    }

    public void setOptions(List<Option> options) {
        this.options = options;
    }

    public Boolean getMultipleOptionChoicesAllowed() {
        return multipleOptionChoicesAllowed;
    }

    public void setMultipleOptionChoicesAllowed(Boolean multipleOptionChoicesAllowed) {
        this.multipleOptionChoicesAllowed = multipleOptionChoicesAllowed;
    }

    public List<String> getProducts() {
        return products;
    }

    public void setProducts(List<String> products) {
        this.products = products;
    }

    public List<Route> getRoutes() {
        return routes;
    }

    public void setRoutes(List<Route> routes) {
        this.routes = routes;
    }

    public Date getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(Date createdOn) {
        this.createdOn = createdOn;
    }

    public Date getModifiedOn() {
        return modifiedOn;
    }

    public void setModifiedOn(Date modifiedOn) {
        this.modifiedOn = modifiedOn;
    }
}
