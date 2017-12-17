package com.neusoft.unieap.core.di.format;

import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Properties;
import java.util.Map.Entry;

public class FormatContext {
	private static FormatContext context = new FormatContext();

	private FormatContext() {
		Properties properties = new Properties();
		try {
			properties.load(this.getClass().getResourceAsStream(
					"formats.properties"));
			Iterator<Entry<Object, Object>> it = properties.entrySet()
					.iterator();
			while (it.hasNext()) {
				Entry<Object, Object> entry = it.next();
				Object key = entry.getKey();
				Object value = entry.getValue();
				formatMap
						.put(
								key.toString(),
								(IFormat) Class.forName(value.toString())
										.newInstance());
			}
		} catch (IOException e) {
			e.printStackTrace();
		} catch (InstantiationException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
	}

	private Map<String, IFormat> formatMap = new HashMap<String, IFormat>();

	public Map<String, IFormat> getFormatMap() {
		return formatMap;
	}

	public static FormatContext getFormatContext() {
		return context;
	}
}
