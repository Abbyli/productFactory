package com.neusoft.abclife.util;

import java.util.List;

public interface excelUpload {
	
	void saveTableDatasBatch(String sql, List<Object[]> insertList);
}
