package xyz.helpmebuy.embedded;

import java.io.Serializable;

public class Option implements Serializable {

    private String id;

    private String text;

    public Option() {

    }

    public Option(String id, String text) {
        this.id = id;
        this.text = text;
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
}
