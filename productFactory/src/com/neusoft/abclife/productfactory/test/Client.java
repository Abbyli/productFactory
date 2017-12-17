package com.neusoft.abclife.productfactory.test;

import java.io.IOException;
import java.net.URI;
import java.util.HashMap;
import java.util.Map;

import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

import com.alibaba.fastjson.JSON;

public class Client {

	// SOAP
	// public static void main(String[] args) {
	// CXFWebServiceControlerService controlerService = new
	// CXFWebServiceControlerService();
	// CXFWebServiceControler cxfWebServiceControler =
	// controlerService.getCXFWebServiceControlerPort();
	// String result = cxfWebServiceControler.run("calt.getInsurCode",
	// "{\"code\": \"2041\"}");
	// System.out.println(result);
	// }

	// RESTful
	public static void main(String[] args) {
		String businessId = "calTest.getInsurCode";
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("code", "2041");
		getResult(businessId, params);

	}
	/*
	 * 
	 */
	static final String URL = "http://localhost:8080/framework/ws/common/service/";
	public static String getResult(String businessId, Map<String, Object> params) {
		String url = "";
		String result = "";
		URI uri = null;
		// businessId 不为空
		if (!businessId.isEmpty()) {
			url = URL + businessId;
		} else {
			try {
				throw new Exception("businessId 不能为空");
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		// params不为空
		try {
			if (!params.isEmpty()) {
				String params2str = JSON.toJSONString(params);
				uri = new URIBuilder(url).setParameter("param", params2str)
						.build();
			} else {
				String params2str = JSON
						.toJSONString(new HashMap<String, Object>());
				uri = new URIBuilder(url).setParameter("param", params2str)
						.build();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		// ====================
		// 创建默认的httpClient实例
		CloseableHttpClient httpClient = getHttpClient();
		try {
			// 用get方法发送http请求
			HttpGet get = new HttpGet(uri);
			// System.out.println("执行get请求:...."+get.getURI());
			CloseableHttpResponse httpResponse = null;
			// 发送get请求
			httpResponse = httpClient.execute(get);
			try {
				// response实体
				HttpEntity entity = httpResponse.getEntity();
				if (null != entity) {
					System.out.println("响应状态码:" + httpResponse.getStatusLine());
					System.out
							.println("-------------------------------------------------");
					System.out.println("响应内容:" + EntityUtils.toString(entity));
					System.out
							.println("-------------------------------------------------");
				}
			} finally {
				httpResponse.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				closeHttpClient(httpClient);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return result;
	}

	/*
	 * 
	 */
	private static CloseableHttpClient getHttpClient() {
		return HttpClients.createDefault();
	}

	private static void closeHttpClient(CloseableHttpClient client)
			throws IOException {
		if (client != null) {
			client.close();
		}
	}
}
