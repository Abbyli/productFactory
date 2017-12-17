package test;

import java.util.HashMap;
import java.util.Map;
import util.HttpsUtil;

/**
 *webservice restful测试类
 */
public class WS_RestfulTest {

	public static void main(String[] args) {
		Map<String, String> params = new HashMap<String, String>();
		params.put("param", "{\"code\":\"C033\"}");
		String url = "http://localhost:8081/framework/ws/common/service/pfcombo.queryComboInfByCode";
		String string = HttpsUtil.get(url, params );
		System.out.println(string);
	}
	
}
