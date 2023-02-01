package xyz.helpmebuy.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import xyz.helpmebuy.embedded.Link;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

public class ProductCreationRequest implements Serializable {

    @NotBlank
    private String type;

    @NotBlank
    private String name;

    private String description;

    private String imageUrl;

    private Map<String, Object> attributes;

    @NotEmpty
    private List<Link> links;

    public ProductCreationRequest() {

    }

    public ProductCreationRequest(String type, String name, String description, String imageUrl, Map<String, Object> attributes, List<Link> links) {
        this.type = type;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.attributes = attributes;
        this.links = links;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Map<String, Object> getAttributes() {
        return attributes;
    }

    public void setAttributes(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    public List<Link> getLinks() {
        return links;
    }

    public void setLinks(List<Link> links) {
        this.links = links;
    }
}
