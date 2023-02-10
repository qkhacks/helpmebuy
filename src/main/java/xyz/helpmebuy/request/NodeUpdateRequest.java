package xyz.helpmebuy.request;

import xyz.helpmebuy.embedded.Option;

import java.io.Serializable;
import java.util.List;

public class NodeUpdateRequest implements Serializable {

    private String prompt;

    private List<Option> options;

    private Boolean multipleOptionChoicesAllowed;

    private List<String> products;

    public NodeUpdateRequest() {

    }

    public NodeUpdateRequest(String prompt, List<Option> options, Boolean multipleOptionChoicesAllowed, List<String> products) {
        this.prompt = prompt;
        this.options = options;
        this.multipleOptionChoicesAllowed = multipleOptionChoicesAllowed;
        this.products = products;
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
}
