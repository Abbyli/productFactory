package com.neusoft.unieap.core.di.format;

import org.apache.commons.lang3.time.DateFormatUtils;

public class DateFormat implements IFormat {

	public String format(Object obj, String pattern) {
		if (obj instanceof java.util.Date) {
			return DateFormatUtils.format(((java.util.Date) obj).getTime(),
					pattern);
		} else if (obj instanceof java.sql.Date) {
			DateFormatUtils.format((java.sql.Date) obj, pattern);
		} else if (obj instanceof java.util.Calendar) {
			DateFormatUtils.format((java.util.Calendar) obj, pattern);
		}
		return obj.toString();
	}

}
