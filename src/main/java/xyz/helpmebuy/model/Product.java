package xyz.helpmebuy.model;

import org.springframework.data.mongodb.core.mapping.Document;
import xyz.helpmebuy.embedded.Link;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Document(collection = "products")
public class Product implements Serializable {

    private String id;

    private String text;

    private String name;

    private String description;

    private String imageUrl;

    private Map<String, Object> attributes;

    private List<Link> links;

    private Date createdOn;

    private Date modifiedOn;

    public Product() {

    }

    public Product(String text, String name, String description, String imageUrl, Map<String, Object> attributes, List<Link> links) {
        this.text = text;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.attributes = attributes;
        this.links = links;
        this.createdOn = new Date();
        this.modifiedOn = new Date();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
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
