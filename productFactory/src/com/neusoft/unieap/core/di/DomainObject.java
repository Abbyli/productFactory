package com.neusoft.unieap.core.di;

import com.neusoft.unieap.core.di.event.LogicDeleteEvent;
import com.neusoft.unieap.core.di.event.PhysicalDeleteEvent;
import com.neusoft.unieap.core.event.UniEAPEventPublisher;
import com.neusoft.unieap.core.util.BeanUtil;

public class DomainObject {

	public static final int Exist = 0;
	public static final int Logical_Deleted = 1;
	public static final int Physical_Deleted = 2;
	public static final String Delete_Status_Property = "status";

	public void setDomainObjectStatus(Integer status) {
		if (status != null) {
			if (status == Logical_Deleted) {
				((UniEAPEventPublisher) BeanUtil.getBean("eventPublisher"))
						.publish(new LogicDeleteEvent(this));
			} else if (status == Physical_Deleted) {
				((UniEAPEventPublisher) BeanUtil.getBean("eventPublisher"))
						.publish(new PhysicalDeleteEvent(this));
			}
		}
	}

}
