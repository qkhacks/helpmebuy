package xyz.helpmebuy.util;

import java.util.List;

public class OptionChoices {

    public static Boolean match(List<Integer> c1, List<Integer> c2) {
        if (c1.size() != c2.size()) {
            return false;
        }

        int i = 0;
        for (Integer c1e : c1) {
            if (!c1e.equals(c2.get(i))) {
                return false;
            }

            i++;
        }

        return true;
    }
}
