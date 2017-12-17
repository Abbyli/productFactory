package com.neusoft.fdframework.arithmetic.engine.job.expressions;

import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashMap;
import java.util.Map;

public class CalThreadData {
    private Map<String, Object> map = new HashMap<String, Object>();
    private Deque<Object> stack = new ArrayDeque<Object>();
    /**
     * 
     * @return
     */
    public Map<String, Object> getMap() {
        return map;
    }
   /**
    * 
    * @param map
    */
    public void setMap(Map<String, Object> map) {
        this.map = map;
    }
    /**
     * 
     * @return
     */
    public Deque<Object> getStack() {
        return stack;
    }
    /**
     * 
     * @param stack
     */
    public void setStack(Deque<Object> stack) {
        this.stack = stack;
    }
    
    
}
