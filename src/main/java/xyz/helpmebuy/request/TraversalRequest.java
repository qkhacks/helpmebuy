package xyz.helpmebuy.request;

import java.io.Serializable;
import java.util.List;

public class TraversalRequest implements Serializable {

    private String nodeId;

    private List<Integer> optionChoices;

    public TraversalRequest() {
    }

    public TraversalRequest(String nodeId, List<Integer> optionChoices) {
        this.nodeId = nodeId;
        this.optionChoices = optionChoices;
    }

    public String getNodeId() {
        return nodeId;
    }

    public void setNodeId(String nodeId) {
        this.nodeId = nodeId;
    }

    public List<Integer> getOptionChoices() {
        return optionChoices;
    }

    public void setOptionChoices(List<Integer> optionChoices) {
        this.optionChoices = optionChoices;
    }
}
