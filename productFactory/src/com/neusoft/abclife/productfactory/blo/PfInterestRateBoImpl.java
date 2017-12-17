/**
 * 
 */
package com.neusoft.abclife.productfactory.blo;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.ServletContext;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.context.ServletContextAware;

import com.neusoft.abclife.productfactory.dao.PfInterestRateDaoImpl;
import com.neusoft.abclife.productfactory.entity.TAssessNetPrem;
import com.neusoft.abclife.productfactory.entity.TCurrPriceIntrate;
import com.neusoft.abclife.productfactory.entity.TDividParam;
import com.neusoft.abclife.productfactory.entity.TInsurtypeBasicInf;
import com.neusoft.abclife.productfactory.entity.TLoanAutoPayIntrate;
import com.neusoft.abclife.productfactory.entity.TReserveFundFactor;
import com.neusoft.abclife.productfactory.entity.TSurvvBeneAccumIntbeIntra;
import com.neusoft.abclife.productfactory.entity.TUnivrslSettlIntrate;
import com.neusoft.fdframework.core.base.QueryResult;
import com.neusoft.unieap.core.annotation.ModelFile;
import com.neusoft.unieap.core.common.form.Form;
import com.neusoft.unieap.core.fileupload.FileAttachment;

/**
 * @author Neusoft
 *
 */
@Service("factoryabclife_pfInterestRateBo_bo")
@ModelFile(value = "pfInterestRateBo.bo")
public class PfInterestRateBoImpl implements ServletContextAware {

	/**
	 * 
	 */
	public PfInterestRateBoImpl() {
	}

	private static final Logger logger = LoggerFactory.getLogger(PfInterestRateBoImpl.class);
	
	@Resource(name="factoryabclife_pfInterestRateDao_dao")
	private PfInterestRateDaoImpl pfInterestRateDaoImpl;
	
	private String webRoot;
	
	/**
	 * 利率险种查询
	 * @return
	 */
	public List<TInsurtypeBasicInf> getTUnivrslShare(){
		return this.pfInterestRateDaoImpl.getTUnivrslShare();
	}
	
	/**
	 * 万能结算利率
	 * @param tInsurtypeBasicInf
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 */
	public QueryResult queryTUnivrslSettlIntrate(TUnivrslSettlIntrate tUnivrslSettlIntrate, int pageNumber, int pageSize){
		return this.pfInterestRateDaoImpl.queryTUnivrslSettlIntrate(tUnivrslSettlIntrate,pageNumber,pageSize);
	}
	/**
	 * 万能结算利率新增或修改
	 * @return
	 */
	public String addUpTUnivrslShare(TUnivrslSettlIntrate tUnivrslSettlIntrate,String opt){
		String message = "";
		if("add".equals(opt)){
			if(this.pfInterestRateDaoImpl.addTUnivrslShare(tUnivrslSettlIntrate)<=0){
				message = "新增 万能结算利率 失败！";
			}
		}else{
			if(this.pfInterestRateDaoImpl.upTUnivrslShare(tUnivrslSettlIntrate)<=0){
				message = "修改 万能结算利率 失败！";
			}
		}
		return message;
	}
	/**
	 * 万能结算利率删除
	 * @return
	 */
	public String delTUnivrslSettlIntrate(TUnivrslSettlIntrate tUnivrslSettlIntrate){
		String message = "";
		if(this.pfInterestRateDaoImpl.delTUnivrslSettlIntrate(tUnivrslSettlIntrate)<=0){
			message = "删除 万能结算利率 失败！";
		}
		return message;
	}
	
	
	/**
	 * 生存金累计生息利率
	 * @param tSurvvBeneAccumIntbeIntra
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 */
	public QueryResult queryTSurvvBeneAccumIntbeIntra(TSurvvBeneAccumIntbeIntra tSurvvBeneAccumIntbeIntra, int pageNumber, int pageSize){
		return this.pfInterestRateDaoImpl.queryTSurvvBeneAccumIntbeIntra(tSurvvBeneAccumIntbeIntra,pageNumber,pageSize);
	}
	/**
	 * 生存金累计生息利率新增或修改
	 * @return
	 */
	public String addUpTSurvvShare(TSurvvBeneAccumIntbeIntra tSurvvBeneAccumIntbeIntra,String opt){
		String message = "";
		if("add".equals(opt)){
			if(this.pfInterestRateDaoImpl.addTSurvvShare(tSurvvBeneAccumIntbeIntra)<=0){
				message = "新增 生存金累计生息利率 失败！";
			}
		}else{
			if(this.pfInterestRateDaoImpl.upTSurvvShare(tSurvvBeneAccumIntbeIntra)<=0){
				message = "修改 生存金累计生息利率 失败！";
			}
		}
		return message;
	}
	/**
	 * 生存金累计生息利率删除
	 * @return
	 */
	public String delTSurvvBeneAccumIntbeIntra(TSurvvBeneAccumIntbeIntra tSurvvBeneAccumIntbeIntra){
		String message = "";
		if(this.pfInterestRateDaoImpl.delTSurvvBeneAccumIntbeIntra(tSurvvBeneAccumIntbeIntra)<=0){
			message = "删除 生存金累计生息利率 失败！";
		}
		return message;
	}
	
	/**
	 * 贷款 自垫利率
	 * @param tLoanAutoPayIntrate
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 */
	public QueryResult queryTLoanPayIntrate(TLoanAutoPayIntrate tLoanAutoPayIntrate, int pageNumber, int pageSize){
		return this.pfInterestRateDaoImpl.queryTLoanPayIntrate(tLoanAutoPayIntrate,pageNumber,pageSize);
	}
	/**
	 * 贷款 自垫 利率新增或修改
	 * @return
	 */
	public String addUpTLoanShare(TLoanAutoPayIntrate tLoanAutoPayIntrate,String opt){
		String message = "";
		if("add".equals(opt)){
			if(this.pfInterestRateDaoImpl.addTLoanShare(tLoanAutoPayIntrate)<=0){
				message = "新增 贷款 自垫利率 失败！";
			}
		}else{
			if(this.pfInterestRateDaoImpl.upTLoanShare(tLoanAutoPayIntrate)<=0){
				message = "修改 贷款 自垫利率 失败！";
			}
		}
		return message;
	}
	/**
	 * 贷款 自垫 利率删除
	 * @return
	 */
	public String delTLoanPayIntrate(TLoanAutoPayIntrate tLoanAutoPayIntrate){
		String message = "";
		if(this.pfInterestRateDaoImpl.delTLoanPayIntrate(tLoanAutoPayIntrate)<=0){
			message = "删除 贷款 自垫利率 失败！";
		}
		return message;
	}
	
	/**
	 * 红利参数
	 * @param TDividParam
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 */
	public QueryResult queryTDividParam(TDividParam tDividParam, int pageNumber, int pageSize){
		return this.pfInterestRateDaoImpl.queryTDividParam(tDividParam,pageNumber,pageSize);
	}
	/**
	 * 红利参数新增或修改
	 * @return
	 */
	public String addUpTDividShare(TDividParam tDividParam,String opt){
		String message = "";
		if("add".equals(opt)){
			if(this.pfInterestRateDaoImpl.addTDividShare(tDividParam)<=0){
				message = "新增 红利参数 失败！";
			}
		}else{
			if(this.pfInterestRateDaoImpl.upTDividShare(tDividParam)<=0){
				message = "修改 红利参数 失败！";
			}
		}
		return message;
	}
	/**
	 * 红利参数删除
	 * @return
	 */
	public String delTDividShare(TDividParam tDividParam){
		String message = "";
		if(this.pfInterestRateDaoImpl.delTDividShare(tDividParam)<=0){
			message = "删除 红利参数 失败！";
		}
		return message;
	}
	
	/**
	 * 现价利率
	 * @param tLoanAutoPayIntrate
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 */
	public QueryResult queryTCurrPriceIntrate(TCurrPriceIntrate tCurrPriceIntrate, int pageNumber, int pageSize){
		return this.pfInterestRateDaoImpl.queryTCurrPriceIntrate(tCurrPriceIntrate,pageNumber,pageSize);
	}
	/**
	 * 现价利率新增或修改
	 * @return
	 */
	public String addUpTCurrShare(TCurrPriceIntrate tCurrPriceIntrate,String opt){
		String message = "";
		if("add".equals(opt)){
			if(this.pfInterestRateDaoImpl.addTCurrShare(tCurrPriceIntrate)<=0){
				message = "新增 现价利率 失败！";
			}
		}else{
			if(this.pfInterestRateDaoImpl.upTCurrShare(tCurrPriceIntrate)<=0){
				message = "修改 现价利率 失败！";
			}
		}
		return message;
	}
	/**
	 * 现价利率 删除
	 * @return
	 */
	public String delTCurrPriceIntrate(TCurrPriceIntrate tCurrPriceIntrate){
		String message = "";
		if(this.pfInterestRateDaoImpl.delTCurrPriceIntrate(tCurrPriceIntrate)<=0){
			message = "删除 现价利率 失败！";
		}
		return message;
	}
	
	/**
	 * 准备金因子/评估净保费——导入数据
	 * @return
	 * @throws IOException 
	 */
	@SuppressWarnings("unchecked")
	public String saveUploadInfo(Form formId4Upload, String obj) throws IOException{
		String message="";
		List<FileAttachment> fileList = formId4Upload.getFiles();// 获取所有上传的临时文件列表
		if (fileList.size() > 0 && fileList.get(0) != null) {
			FileAttachment fileAttachment = (FileAttachment) fileList.get(0);
			try {
				message = this.readXlsx(fileAttachment,obj);
			} catch (RuntimeException e) {
				logger.info("导入准备金因子/评估净保费失败！",e);
				message="上传数据错误！";
			}
		}
		return message;
	}
	/**
	 * 导入数据_储存
	 * @param obj 
	 * @return
	 * @throws IOException 
	 * @throws IOException 
	 */
	private String readXlsx(FileAttachment fileAttachment, String obj) throws IOException{
		String message="";
		InputStream is = fileAttachment.getInputStream();
		InputStreamReader inputStreamReader = new InputStreamReader(is);
		BufferedReader reader = new BufferedReader(inputStreamReader);
		String temp = null;
		List<String> list = new ArrayList<String>();
		while ((temp = reader.readLine()) != null) {
			list.add(temp);
		}
		reader.close();	
		
		for(int i=1;i<list.size();i++){
			if(obj.equals("reserve")){
				this.pfInterestRateDaoImpl.addTReserveFundFactor(list.get(i));
			}else{
				this.pfInterestRateDaoImpl.addTAssessNetPrem(list.get(i));
			}
		}
		return message;
	}
	/**
	 * 准备金因子_查询
	 * @param TReserveFundFactor
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 */
	public QueryResult queryTReserveFundFactor(TReserveFundFactor tReserveFundFactor, int pageNumber, int pageSize){
		return this.pfInterestRateDaoImpl.queryTReserveFundFactor(tReserveFundFactor,pageNumber,pageSize);
	}
	
	/**
	 * 准备金因子_删除
	 * @param TReserveFundFactor
	 * @return
	 */
	public int delTReserveFundFactor(TReserveFundFactor tReserveFundFactor){
		return this.pfInterestRateDaoImpl.delTReserveFundFactor(tReserveFundFactor);
	}
	
	/**
	 * 评估净保费因子_查询
	 * @param TAssessNetPrem
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 */
	public QueryResult queryTAssessNetPrem(TAssessNetPrem tAssessNetPrem, int pageNumber, int pageSize){
		return this.pfInterestRateDaoImpl.queryTAssessNetPrem(tAssessNetPrem,pageNumber,pageSize);
	}
	
	/**
	 * 评估净保费因子_删除
	 * @param TAssessNetPrem
	 * @return
	 */
	public int delTAssessNetPrem(TAssessNetPrem tAssessNetPrem){
		return this.pfInterestRateDaoImpl.delTAssessNetPrem(tAssessNetPrem);
	}
	
	/**
	 * 模板导出
	 * */
	public File exportModel(String formId4Download){	
		//创建模板 下载
		String fileDir = webRoot+"objRateModel"+File.separator+formId4Download;
		File dir = new File(fileDir);
		if(!dir.exists()){
			dir.mkdirs();			
		}
		String fileName ;
		StringBuilder buf = new StringBuilder();
		if(formId4Download.equals("reserve")){
			fileName = "法定准备金因子上线数据.csv";
			buf.append("PROCODE,RECVMODE,PRMTERM,INSTERM,SEX,ISSAGE,PAYDAY,INSYEAR,RES,AMT");
		}else{
			fileName = "评估净保费因子.csv";
			buf.append("PROCODE,RECVMODE,PRMTERM,INSTERM,SEX,ISSAGE,PAYDAY,SIGN,TRNP,AMT");
		}
		File file = new File(fileDir+File.separator+fileName);
		if(!file.exists()){
			try {
				file.createNewFile();
			} catch (IOException e) {
				logger.info("创建文件失败！",e);
			}			
		}
        FileOutputStream fos = null;
		try {
			fos = new FileOutputStream(file);
			PrintWriter pw = new PrintWriter(fos);
	        pw.write(buf.toString().toCharArray());
	        pw.flush();
	        pw.close();
	        fos.close();
		} catch (FileNotFoundException e) {
			logger.info("读写文件失败！",e);
		} catch (IOException e) {
			logger.info("关闭流失败！",e);
		}
		return file;
	}
	
	@Override
	public void setServletContext(ServletContext sc) {
		this.webRoot = sc.getRealPath("/");		
	}
}
