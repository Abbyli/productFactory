/**
 * 
 */
package com.neusoft.abclife.productfactory.blo;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URL;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.annotation.Resource;
import javax.servlet.ServletContext;

import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.context.ServletContextAware;

import com.neusoft.abclife.productfactory.dao.PfTermManagementDaoImpl;
import com.neusoft.abclife.productfactory.dto.PfWebServiceECM;
import com.neusoft.abclife.productfactory.dto.PfWebServiceESB;
import com.neusoft.abclife.productfactory.entity.TInsurtypeBasicInf;
import com.neusoft.abclife.productfactory.entity.TRuleManageDef;
import com.neusoft.abclife.util.FtpUpfile;
import com.neusoft.abclife.util.PfWebServiceParameter;
import com.neusoft.fdframework.core.base.QueryResult;
import com.neusoft.unieap.core.annotation.ModelFile;
import com.neusoft.unieap.core.common.form.Form;
import com.neusoft.unieap.core.fileupload.FileAttachment;

/**
 * @author Neusoft
 *
 */
@Service("factoryabclife_PfTermManagementBo_bo")
@ModelFile(value = "PfTermManagementBo.bo")
public class PfTermManagementBoImpl implements ServletContextAware {

	@Resource(name="factoryabclife_PfTermManagementDao_dao")
	private PfTermManagementDaoImpl pfTermManagement;
	
	@Resource(name="factoryabclife_pfWebService_bo")
	private PfWebServiceImpl pfWebServiceImpl;
	
	private String webRoot;
	
	private static final Logger logger = LoggerFactory.getLogger(PfTermManagementBoImpl.class);
	private final String configFile = "/WEB-INF/classes/com/neusoft/abclife/productfactory/configParameter/esbParameter.properties";
	
	/**
	 * 
	 */
	public PfTermManagementBoImpl() {
	}

	/**
	 * 险种查询
	 * @param tInsurtypeBasicInf
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 */
	public QueryResult queryTInsurtypeBasicInf(TInsurtypeBasicInf tInsurtypeBasicInf, int pageNumber, int pageSize){
		return this.pfTermManagement.queryApprove(tInsurtypeBasicInf,pageNumber,pageSize);
	}
	
	/**
	 * 条款详情
	 * @param tInsurtypeBasicInf
	 * @return
	 */
	public QueryResult getTRuleManageDef(TInsurtypeBasicInf tInsurtypeBasicInf,int pageNumber, int pageSize ){
		return this.pfTermManagement.getTRuleManageDef(tInsurtypeBasicInf, pageNumber, pageSize);
	}
	
	/**
	 * 条款储存
	 * @param tInsurtypeBasicInf 
	 * @param tInsurtypeBasicInf
	 * @return
	 */
	private int saveTRuleManageDef(String fileName, TInsurtypeBasicInf tInsurtypeBasicInf){
		return this.pfTermManagement.saveTRuleManageDef(fileName,tInsurtypeBasicInf);
	}
	
	/**
	 * 文件上传
	 * @param formId
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "static-access" })
	public String saveUploadInfo(Form formId4Upload,TInsurtypeBasicInf tInsurtypeBasicInf) {		
		String message="";
		List<FileAttachment> fileList = formId4Upload.getFiles();// 获取所有上传的临时文件列表
		if (fileList.size() > 0 && fileList.get(0) != null) {
			PfWebServiceParameter parameter = new PfWebServiceParameter();
			Properties dbProperties = new Properties();
			InputStream stream = null;
			try {
				stream = new FileInputStream(new File(webRoot+configFile));
				try {
					dbProperties.load(stream);
				} catch (IOException e) {
					logger.debug("文件上传路径不存在！",e);
				}
				String pathleft = dbProperties.getProperty("pathleft");
				FileAttachment fileAttachment = (FileAttachment) fileList.get(0);
				File tempPate = new File(webRoot+"scratch"+pathleft);
				File tempFile = new File(webRoot+"scratch"+pathleft+fileAttachment.getFileName());
				if(!tempPate.exists() && !tempPate.isDirectory()){
					tempPate.mkdirs();
				}
				if (!tempFile.exists()) {
					tempFile.createNewFile();
				}
				InputStream is = fileAttachment.getInputStream();//获取输入流
				FileOutputStream os = new FileOutputStream(tempFile);//放到输出流里
				int ch = 0;
				while ((ch = is.read()) != -1) {
					os.write(ch);
				}
				os.close();
				is.close();
				String fileName = fileAttachment.getFileName();
				String filePath = tempFile.getPath();
				String newName = tInsurtypeBasicInf.getInsurtypeCode()+tInsurtypeBasicInf.getVerNo().toString()+fileName.substring(fileName.lastIndexOf("."));
				if(this.upload(tInsurtypeBasicInf.getInsurtypeCode(),filePath,newName)){
					//UmWebServiceUtil umWebServiceUtil = new UmWebServiceUtil();
					//com.neusoft.unieap.techcomp.idm.org.entity.User user = umWebServiceUtil.getCurrentUserInfo();
					String scanOperator ="86";
					String manageCom = "86" ;
					//List<Unit> unitsByUserId = umWebServiceUtil.getServiceBO().getUnitsByUserId(user.getId());
					//if(unitsByUserId.size()>0){
					//	manageCom = unitsByUserId.get(0).getCode();
					//}else{
						manageCom = "86";
					//}
					
					PfWebServiceESB pfWebServiceESB = new PfWebServiceESB();
					pfWebServiceESB.setEsbSystemId(dbProperties.getProperty("esbSystemId"));
					pfWebServiceESB.setEsbServiceId(dbProperties.getProperty("esbServiceId"));
					pfWebServiceESB.setEsbOpName(dbProperties.getProperty("esbOpName"));
					pfWebServiceESB.setEsbVersion(dbProperties.getProperty("esbVersion"));
					pfWebServiceESB.setEsbMsgTime(parameter.getNowTime());
					pfWebServiceESB.setEsbRefGUID(parameter.getUId());
					pfWebServiceESB.setTransRefGUID(parameter.getUId());
					pfWebServiceESB.setTransNo(dbProperties.getProperty("uploadTransNo"));
					
					PfWebServiceECM pfWebServiceECM = new PfWebServiceECM();
					pfWebServiceECM.setDocCode(tInsurtypeBasicInf.getInsurtypeId().toString());
					pfWebServiceECM.setBussType(dbProperties.getProperty("bussType"));
					pfWebServiceECM.setSubType(dbProperties.getProperty("subType"));
					pfWebServiceECM.setManageCom(manageCom);
					pfWebServiceECM.setScanOperator(scanOperator);
					pfWebServiceECM.setScanDate(parameter.getNowTime());
					pfWebServiceECM.setUploadType(dbProperties.getProperty("uploadType"));
					pfWebServiceECM.setPageName(newName);
					pfWebServiceECM.setSourceFileName(fileName);
					pfWebServiceECM.setPagePath(pathleft+dbProperties.getProperty("system")+pathleft+tInsurtypeBasicInf.getInsurtypeCode()+pathleft);
					
					String result = this.pfWebServiceImpl.requestEcmUpload(pfWebServiceESB,pfWebServiceECM);
					logger.debug(result);
					Map<String, String> map = this.analysisReqMessage(dbProperties.getProperty("returncode"), result, "Upload");
					if(map.size()==1){
						this.saveTRuleManageDef(fileName,tInsurtypeBasicInf);
					}else{
						message="错误信息："+map.get("returncode")+"--"+map.get("message");
					}
				}else{
					message="文件上传失败";
				}
			} catch (Exception e) {
				logger.debug("文件上传出现异常！",e);
			} finally{
				try {
					stream.close();
				} catch (IOException e) {
					logger.debug("读写流关闭失败！",e);
				}
			}
		}
		return message;
	}
	
	/**
	 * 文件上传_ftp
	 * @return
	 * @throws IOException 
	 */
	private boolean upload(String insurtypeCode, String filePath, String newName) throws IOException {
		boolean flag = false;
		InputStream stream = new FileInputStream(new File(webRoot+configFile));
		Properties dbProperties = new Properties();
		dbProperties.load(stream);
		FtpUpfile ftp = new FtpUpfile(dbProperties.getProperty("ftp_ecm_ipaddress"), Integer.parseInt(dbProperties.getProperty("ftp_ecm_ipport")), 
				dbProperties.getProperty("ftp_ecm_username"), dbProperties.getProperty("ftp_ecm_password"));
		try {
			ftp.login(dbProperties.getProperty("pathleft"));
			String remoteFile = dbProperties.getProperty("pathleft")+dbProperties.getProperty("system")+dbProperties.getProperty("pathleft")+insurtypeCode+dbProperties.getProperty("pathleft")+newName;
			flag = ftp.upFile(filePath,remoteFile);
		} catch (Exception e) {
			logger.info("FTP服务器登录失败！",e);
		}finally {
			ftp.logout();
		} 
		return flag;
	}	
	
	/**
	 * 文件下载
	 * @param formId
	 * @return
	 * @throws DocumentException 
	 */
	public File downLoad(String formId4Download,TRuleManageDef tRuleManageDef) throws Exception {
		String message = null;
		File file = null ;
		PfWebServiceParameter parameter = new PfWebServiceParameter();
		InputStream stream = new FileInputStream(new File(webRoot+configFile));
		Properties dbProperties = new Properties();
		dbProperties.load(stream);
		String pathleft = dbProperties.getProperty("pathleft");
		
		PfWebServiceESB pfWebServiceESB = new PfWebServiceESB();
		pfWebServiceESB.setEsbSystemId(dbProperties.getProperty("esbSystemId"));
		pfWebServiceESB.setEsbServiceId(dbProperties.getProperty("esbServiceId"));
		pfWebServiceESB.setEsbOpName(dbProperties.getProperty("esbOpName"));
		pfWebServiceESB.setEsbVersion(dbProperties.getProperty("esbVersion"));
		pfWebServiceESB.setEsbMsgTime(parameter.getNowTime());
		pfWebServiceESB.setEsbRefGUID(parameter.getUId());
		pfWebServiceESB.setTransRefGUID(parameter.getUId());
		pfWebServiceESB.setTransNo(dbProperties.getProperty("downLoadTransNo"));
		
		PfWebServiceECM pfWebServiceECM = new PfWebServiceECM();
		pfWebServiceECM.setDocCode(tRuleManageDef.getDownloadPath());
		pfWebServiceECM.setBussType(dbProperties.getProperty("bussType"));
		pfWebServiceECM.setSubType(dbProperties.getProperty("subType"));
		pfWebServiceECM.setSystem(dbProperties.getProperty("system"));

		String result = this.pfWebServiceImpl.requestEcmDownLoad(pfWebServiceESB,pfWebServiceECM);
		logger.debug(result);
		Map<String, String> map = this.analysisReqMessage(dbProperties.getProperty("returncode"), result, "downLoad");
		
		if(map.containsKey("pageUrl")){
		    InputStream is = new URL(map.get("pageUrl")).openStream();
			file = new File(webRoot+"scratch"+pathleft+tRuleManageDef.getRuleName());
			OutputStream os = new FileOutputStream(file);//放到输出流里
			int ch = 0;
			while ((ch = is.read()) != -1) {
				os.write(ch);
			}
			os.close();
			is.close();
		}else{
			message="错误信息："+map.get("returncode")+"--"+map.get("message");
		}
		logger.info(message);
		return file;
	}
	
	/**
	 * 条案删除
	 * @param dimensionDef
	 * @return
	 * @throws Exception 
	 */
	public String delTRuleManageDef(TRuleManageDef tRuleManageDef) throws Exception{
		String message="";
		PfWebServiceParameter parameter = new PfWebServiceParameter();
		InputStream stream = new FileInputStream(new File(webRoot+configFile));
		Properties dbProperties = new Properties();
		dbProperties.load(stream);
		
		PfWebServiceESB pfWebServiceESB = new PfWebServiceESB();
		pfWebServiceESB.setEsbSystemId(dbProperties.getProperty("esbSystemId"));
		pfWebServiceESB.setEsbServiceId(dbProperties.getProperty("esbServiceId"));
		pfWebServiceESB.setEsbOpName(dbProperties.getProperty("esbOpName"));
		pfWebServiceESB.setEsbVersion(dbProperties.getProperty("esbVersion"));
		pfWebServiceESB.setEsbMsgTime(parameter.getNowTime());
		pfWebServiceESB.setEsbRefGUID(parameter.getUId());
		pfWebServiceESB.setTransRefGUID(parameter.getUId());
		pfWebServiceESB.setTransNo(dbProperties.getProperty("delTransNo"));
		
		PfWebServiceECM pfWebServiceECM = new PfWebServiceECM();
		pfWebServiceECM.setDocCode(tRuleManageDef.getDownloadPath());
		pfWebServiceECM.setBussType(dbProperties.getProperty("bussType"));
		pfWebServiceECM.setSubType(dbProperties.getProperty("subType"));
		
		String result = this.pfWebServiceImpl.requestEcmDelLoad(pfWebServiceESB,pfWebServiceECM);
		logger.debug(result);
		Map<String, String> map = this.analysisReqMessage(dbProperties.getProperty("returncode"), result, "del");
		if(map.size()==1){
			File f= new File(webRoot+"scratch"+tRuleManageDef.getRuleName());
			if(f.exists()){
				if(f.delete()){
					logger.info("临时文件已删除！");
				}
			}
			this.pfTermManagement.delTRuleManageDef(tRuleManageDef);
		}else{
			message="错误信息："+map.get("returncode")+"--"+map.get("message");
		}
		return message;
	}

	/**
	 * 解析报文返回结果
	 * @param parameter 
	 * @return
	 * @throws Exception 
	 */
	public Map<String,String> analysisReqMessage(String returncode, String result ,String state) throws Exception {
		
		Map<String,String> map = new HashMap<String,String>();
		Element body = DocumentHelper.parseText(result).getRootElement().element("body");
		map.put("returnCode",body.element("transResult").elementText("returnCode"));
		if(map.get("returnCode").equals(returncode)){
			if(state.equals("downLoad")){
				map.put("pageUrl",body.element("doc").element("page").elementText("pageUrl"));
			}
		}else{
			map.put("message",body.element("transResult").elementText("message"));
		}		
		return map;
	}
	
	@Override
	public void setServletContext(ServletContext sc) {
		this.webRoot = sc.getRealPath("/");
	}
}
