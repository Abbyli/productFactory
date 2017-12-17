package test;

import com.neusoft.fdframework.webservice.cxf.RunWebService;

/**
 * webservice  SOAP测试类
 */
public class WS_SoapTest {
	public static void main(String[] args) throws Exception {
		String path= "<message><body>"+
				"<type>1</type>"+
				"<proID>237</proID>"+
				"<proCode>产品代码</proCode>"+
				"<saleDate>销售日期</saleDate>"+
			 "</body><head></head></message>";
		Object[] obj = null;
		try {
			obj = RunWebService.runService("http://localhost:8081/framework/ws/serviceproxy?wsdl", "run",
					"webservice.getProInfo", "{\"message\":\""+path+"\"}");
			System.out.println("return=="+obj);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
