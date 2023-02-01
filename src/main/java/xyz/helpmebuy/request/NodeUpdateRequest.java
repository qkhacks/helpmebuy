package xyz.helpmebuy.request;

import xyz.helpmebuy.embedded.Option;

import java.io.Serializable;
import java.util.List;

public class NodeUpdateRequest implements Serializable {

    private String prompt;

    private List<Option> options;

    private Boolean multipleOptionsChoiceAllowed;

    private List<String> products;

    public NodeUpdateRequest() {

    }

    public NodeUpdateRequest(String prompt, List<Option> options, Boolean multipleOptionsChoiceAllowed, List<String> products) {
        this.prompt = prompt;
        this.options = options;
        this.multipleOptionsChoiceAllowed = multipleOptionsChoiceAllowed;
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
}
