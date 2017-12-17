package com.neusoft.abclife.util;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;
//import org.springframework.beans.BeansException;
//import org.springframework.context.ApplicationContext;
//import org.springframework.context.ApplicationContextAware;

import com.neusoft.unieap.techcomp.ria.ds.DataCenter;
import com.neusoft.unieap.techcomp.ria.io.DataCenterIOManager;
import com.opensymphony.xwork2.ActionSupport;

public class FileDownLoadAction extends ActionSupport
implements ServletRequestAware, ServletResponseAware
//, ApplicationContextAware
{
    private static final long serialVersionUID = 0xb7f912f3d9458e93L;
    private HttpServletRequest request;
    private HttpServletResponse response;
//    private ApplicationContext applicationContext;
	
    public void setServletRequest(HttpServletRequest request)
    {
        this.request = request;
    }

    public void setServletResponse(HttpServletResponse response)
    {
        this.response = response;
    }

    public HttpServletRequest getRequest()
    {
        return request;
    }

    public HttpServletResponse getResponse()
    {
        return response;
    }

//    public void setApplicationContext(ApplicationContext appContext)
//        throws BeansException
//    {
//        applicationContext = appContext;
//    }
    

    public String downLoad() throws Exception
    {
    	DataCenter dataCenter = DataCenterIOManager.createReader(request.getParameter("data")).parse();
        String path = dataCenter.getParameter("path").toString();
        String fileName = dataCenter.getParameter("fileName").toString();
//    	String path = "E:\\TDDOWNLOAD\\V45Workshop\\workspace\\framework\\webroot\\allDDL\\ZIP\\20150615_161853.zip";
//    	String fileName = "20150615_161853.zip";
        try {
            File file = new File(path);
            InputStream fis = new BufferedInputStream(new FileInputStream(path));
            byte[] buffer = new byte[fis.available()];
            fis.read(buffer);
            fis.close();
            response.reset();
            response.addHeader("Content-Disposition", "attachment;filename=" +java.net.URLEncoder.encode(fileName, "UTF-8"));
            response.addHeader("Content-Length", "" + file.length());
            OutputStream toClient = new BufferedOutputStream(response.getOutputStream());
            response.setContentType("application/octet-stream");
            toClient.write(buffer);
            toClient.flush();
            toClient.close();
        } catch (IOException ex) {
            ex.printStackTrace();
        }
        return "none";
    }

}
