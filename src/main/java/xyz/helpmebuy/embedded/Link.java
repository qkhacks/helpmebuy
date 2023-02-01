package xyz.helpmebuy.embedded;

import java.io.Serializable;

public class Link implements Serializable {

    private String icon;

    private String text;

    private String link;

    public Link() {

    }

    public Link(String icon, String text, String link) {
        this.icon = icon;
        this.text = text;
        this.link = link;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }
}
