package xyz.helpmebuy.request;

import xyz.helpmebuy.embedded.Option;

import java.io.Serializable;
import java.util.List;

public class NodeCreationRequest implements Serializable {

    private String parent;

    private Boolean isLeaf;

    private String prompt;

    private List<Option> options;

    private Boolean multipleOptionsChoiceAllowed;

    private List<String> products;

    private List<Integer> parentOptionChoices;

    public NodeCreationRequest() {

    }

    public NodeCreationRequest(String parent, Boolean isLeaf, String prompt, List<Option> options, Boolean multipleOptionsChoiceAllowed, List<String> products, List<Integer> parentOptionChoices) {
        this.parent = parent;
        this.isLeaf = isLeaf;
        this.prompt = prompt;
        this.options = options;
        this.multipleOptionsChoiceAllowed = multipleOptionsChoiceAllowed;
        this.products = products;
        this.parentOptionChoices = parentOptionChoices;
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

    public Boolean getMultipleOptionsChoiceAllowed() {
        return multipleOptionsChoiceAllowed;
    }

    public void setMultipleOptionsChoiceAllowed(Boolean multipleOptionsChoiceAllowed) {
        this.multipleOptionsChoiceAllowed = multipleOptionsChoiceAllowed;
    }

    public List<String> getProducts() {
        return products;
    }

    public void setProducts(List<String> products) {
        this.products = products;
    }

    public List<Integer> getParentOptionChoices() {
        return parentOptionChoices;
    }

    public void setParentOptionChoices(List<Integer> parentOptionChoices) {
        this.parentOptionChoices = parentOptionChoices;
    }
}
