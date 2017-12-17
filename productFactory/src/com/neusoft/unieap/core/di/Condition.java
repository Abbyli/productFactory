package com.neusoft.unieap.core.di;

import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;
import org.apache.velocity.VelocityContext;
import com.neusoft.unieap.core.di.format.FormatContext;
import com.neusoft.unieap.core.di.format.IFormat;
import com.neusoft.unieap.core.util.VelocityUtil;

public class Condition extends Order {

	/**
	 * 排序的操作符
	 */
	private String operation;

	/**
	 * 命名参数的名称
	 */
	private String paramkey;

	/**
	 * 条件值
	 */
	private String value;

	/**
	 * 条件脚本
	 */
	private String script;

	public String getScript() {
		return script;
	}

	public void setScript(String script) {
		this.script = script;
	}

	public String getOperation() {
		return operation;
	}

	public void setOperation(String operation) {
		this.operation = operation;
	}

	public String getParamkey() {
		return paramkey;
	}

	public void setParamkey(String paramkey) {
		this.paramkey = paramkey;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	/**
	 * 通过别名获得查询条件
	 * 
	 * @return
	 */
	public String getCondition(Map<String, Object> params) {
		StringBuilder sb = new StringBuilder(20);
		if (script != null && script.length() > 0) {
			VelocityContext context = getConditionContext();
			Iterator it = params.entrySet().iterator();
			while (it.hasNext()) {
				Entry entry = (Entry) it.next();
				Object key = entry.getKey();
				Object value = entry.getValue();
				context.put((String) key, value);
			}
			sb.append(VelocityUtil.evaluateString(VelocityUtil.getEngine(),
					context, script));
		} else {
			sb.append(getAlias()).append(".").append(getProperty()).append(" ").append(
					operation);
			boolean collection = false;
			if (operation.equalsIgnoreCase("in")
					|| operation.equalsIgnoreCase("not in")) {
				collection = true;
				sb.append("(");
			}
			if (value != null && value.length() > 0) {
				sb.append(value);
			} else {
				sb.append(":").append(paramkey);
			}
			if (collection) {
				sb.append(")");
			}
		}
		return sb.toString();
	}

	private VelocityContext getConditionContext() {
		VelocityContext context = VelocityUtil.getContext();
		// 放入格式化内置对象
		Map<String, IFormat> formatMap = FormatContext.getFormatContext()
				.getFormatMap();
		if (formatMap.size() > 0) {
			Iterator<Entry<String, IFormat>> it = formatMap.entrySet()
					.iterator();
			while (it.hasNext()) {
				Entry<String, IFormat> entry = it.next();
				context.put(entry.getKey(), entry.getValue());
			}
		}
		return context;
	}
}
