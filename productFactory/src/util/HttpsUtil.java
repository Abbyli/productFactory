package util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.security.GeneralSecurityException;
import java.security.cert.X509Certificate;
import java.util.Iterator;
import java.util.Map;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;
import javax.net.ssl.X509TrustManager;

public class HttpsUtil {

    // Create an anonymous class to trust all certificates.
    // This is bad style, you should create a separate class.
    private X509TrustManager xtm = new X509TrustManager() {
        public void checkClientTrusted(X509Certificate[] chain, String authType) {
        	
        }
        public void checkServerTrusted(X509Certificate[] chain, String authType) {
//            System.out.println("cert: " + chain[0].toString() + ", authType: " + authType);
        }

        public X509Certificate[] getAcceptedIssuers() {
            return null;
        }
    }; 

    // Create an class to trust all hosts
    private HostnameVerifier hnv = new HostnameVerifier() {
        public boolean verify(String hostname, SSLSession session) {
//            System.out.println("hostname: " + hostname);
            return true;
        }
    }; 

    // In this function we configure our system with a less stringent
    // hostname verifier and X509 trust manager.  This code is
    // executed once, and calls the static methods of HttpsURLConnection
    public HttpsUtil() {
        // Initialize the TLS SSLContext with
        // our TrustManager
        SSLContext sslContext = null;

        try {
            sslContext = SSLContext.getInstance("TLS");
            X509TrustManager[] xtmArray = new X509TrustManager[] { xtm };
            sslContext.init(null, xtmArray, new java.security.SecureRandom());
        } catch(GeneralSecurityException gse) {
            // Print out some error message and deal with this exception
        	gse.printStackTrace();
        }

        // Set the default SocketFactory and HostnameVerifier
        // for javax.net.ssl.HttpsURLConnection
        if(sslContext != null) {
            HttpsURLConnection.setDefaultSSLSocketFactory(sslContext.getSocketFactory());
        }

        HttpsURLConnection.setDefaultHostnameVerifier(hnv);
    }

    // This function is called periodically, the important thing
    // to note here is that there is no special code that needs to
    // be added to deal with a "HTTPS" URL.  All of the trust
    // management, verification, is handled by the HttpsURLConnection.
    public void execute(String url) {
        try {
            URLConnection urlCon = (new URL(url)).openConnection();
            BufferedReader in = new BufferedReader(new InputStreamReader(urlCon.getInputStream()));
            String line;

            while((line = in.readLine()) != null) {
                System.out.println(line);
            }

        //  Whatever we want to do with these quotes
        } catch(MalformedURLException mue) {
            mue.printStackTrace();
        } catch(IOException ioe) {
            ioe.printStackTrace();
        } catch(Exception e) {
            e.printStackTrace();
        }
    }
    
    
    
    
    public static String get(String url, Map<String, String> params){
    	StringBuffer sb = new StringBuffer("");
    	try {
    		if(params!=null && params.size()>0){
    			url = url+"?";
    			Iterator<String> it = params.keySet().iterator();
    			while(it.hasNext()){
    				String key = it.next();
    				String value = params.get(key);
    				url = url + key + "=" + value + "&";
    			}
    		}
            URLConnection urlCon = (new URL(url)).openConnection();
            BufferedReader in = new BufferedReader(new InputStreamReader(urlCon.getInputStream()));
            String line;

            while((line = in.readLine()) != null) {
                sb.append(line);
            }

        } catch(MalformedURLException mue) {
            mue.printStackTrace();
        } catch(IOException ioe) {
            ioe.printStackTrace();
        } catch(Exception e) {
            e.printStackTrace();
        }
    	return sb.toString();
    }
    public static String post(String url, Map<String, String> params){
    	StringBuffer sb = new StringBuffer("");
    	try {
    		URLConnection urlCon = (new URL(url)).openConnection();
    		// 发送POST请求必须设置如下两行
    		urlCon.setDoOutput(true);
    		urlCon.setDoInput(true);
			PrintWriter out = new PrintWriter(urlCon.getOutputStream());
			String param = "";
			if(params!=null && params.size()>0){
				Iterator<String> it = params.keySet().iterator();
				while(it.hasNext()){
    				String key = it.next();
    				String value = params.get(key);
    				param = param + key + "=" + value + "&";
    			}
			}
			System.out.println(param);
			if(!"".equals(param)){
				// 发送请求参数  
				out.print(param);  
				// flush输出流的缓冲  
				out.flush();
			}
			BufferedReader in = new BufferedReader(new InputStreamReader(urlCon.getInputStream()));
            String line;

            while((line = in.readLine()) != null) {
                System.out.println(line);
                sb.append(line);
            }
		} catch (IOException e) {
			e.printStackTrace();
		}
    	return sb.toString();
    }
//    public static void main(String[] args) {
//    	
//    	Map<String, String> params = new HashMap<String, String>();
//    	params.put("client_secret", "7154ce16283d43f88af4556d423e2de6");
//    	
////    	String url = "https://www.juxinli.com/api/access_report_token";
////    	params.put("org_name", "oudingkeji");
////    	params.put("hours", "24");
//    	
////    	String url = "https://www.juxinli.com/api/access_report_data";
////    	params.put("access_token", "7d8e1a1ba746421d8543bb1b1ef17071");
////    	params.put("name", "张继超");
////    	params.put("phone", "13146860663");
////    	params.put("idcard", "220202198001233035");
//    	
//    	String url = "http://fpassettest.facebank.cn//publicAPI/getToken";
//    	params.put("channel_num", "oudingChannel");
//    	params.put("channel_product", "ODP001");
//    	params.put("sendSecurity", "FC31CEF5F3F155CEC9635932C8B4AFDE");
//        HttpsUtil httpsTest = new HttpsUtil();
////        httpsTest.execute(url);
////        httpsTest.post(url, params);
//        
//        httpsTest.get(url, params);
//    }
} 