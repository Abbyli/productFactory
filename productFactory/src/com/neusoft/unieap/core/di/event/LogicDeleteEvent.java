package com.neusoft.unieap.core.di.event;

import com.neusoft.unieap.core.event.UniEAPEvent;

public class LogicDeleteEvent extends UniEAPEvent {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private Object entity;

	public LogicDeleteEvent(Object entity) {
		this.entity = entity;
	}

	public Object getEntity() {
		return entity;
	}
}
