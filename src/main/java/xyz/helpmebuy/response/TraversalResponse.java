package xyz.helpmebuy.response;

import xyz.helpmebuy.model.Node;
import xyz.helpmebuy.model.Product;

import java.io.Serializable;
import java.util.List;

public class TraversalResponse implements Serializable {

    private Node node;

    private List<Product> products;

    public TraversalResponse() {

    }

    public TraversalResponse(Node node, List<Product> products) {
        this.node = node;
        this.products = products;
    }

    public Node getNode() {
        return node;
    }

    public void setNode(Node node) {
        this.node = node;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }
}
