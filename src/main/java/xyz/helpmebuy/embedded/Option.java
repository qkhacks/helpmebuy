package xyz.helpmebuy.embedded;

import java.io.Serializable;

public class Option implements Serializable {

    private String text;

    public Option() {

    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
