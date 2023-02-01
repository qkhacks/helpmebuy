package xyz.helpmebuy.embedded;

import java.io.Serializable;
import java.util.List;

public class Route implements Serializable {

    private List<Integer> optionChoices;

    private String child;

    public Route() {

    }

    public Route(List<Integer> optionChoices, String child) {
        this.optionChoices = optionChoices;
        this.child = child;
    }

    public List<Integer> getOptionChoices() {
        return optionChoices;
    }

    public void setOptionChoices(List<Integer> optionChoices) {
        this.optionChoices = optionChoices;
    }

    public String getChild() {
        return child;
    }

    public void setChild(String child) {
        this.child = child;
    }
}
