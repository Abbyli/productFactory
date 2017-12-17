package com.neusoft.unieap.core.di;

import java.util.List;

public class HqlPlan {
	private String hql;
	private List<String> paramkeys;

	public String getHql() {
		return hql;
	}

	public void setHql(String hql) {
		this.hql = hql;
	}

	public List<String> getParamkeys() {
		return paramkeys;
	}

	public void setParamkeys(List<String> paramkeys) {
		this.paramkeys = paramkeys;
	}

}
