/**
 * 
 */
package com.neusoft.abclife.productfactory.blo;

import org.springframework.stereotype.Service;

import com.neusoft.abclife.productfactory.dto.PfWebServiceECM;
import com.neusoft.abclife.productfactory.dto.PfWebServiceESB;
import com.neusoft.fdframework.esb.protocol.WebServiceSender;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author Neusoft
 *
 */
@Service("factoryabclife_pfWebService_bo")
@ModelFile(value = "pfWebService.bo")
public class PfWebServiceImpl {

	/**
	 * 
	 */
	public PfWebServiceImpl() {
	} 
	
	/**
	 * 请求esb报文头
	 * @param pfWebServiceESB
	 * @return
	 */
	private String requestEsbHead(PfWebServiceESB pfWebServiceESB){
		
		String head = 
				  "<head>\n" 
				+ "<sysHeader>\n"
				+ "<esbSystemId>"
				+ pfWebServiceESB.getEsbSystemId()
				+ "</esbSystemId>\n" // --请求者系统编号
				+ "<esbServiceId>"
				+ pfWebServiceESB.getEsbServiceId()
				+ "</esbServiceId>\n" // --服务编号
				+ "<esbOpName>"
				+ pfWebServiceESB.getEsbOpName()
				+ "</esbOpName>\n" // --服务操作名称
				+ "<esbVersion>"
				+ pfWebServiceESB.getEsbVersion()
				+ "</esbVersion>\n" // --服务版本号
				+ "<esbMsgTime>"
				+ pfWebServiceESB.getEsbMsgTime()
				+ "</esbMsgTime>\n" // --报文发送时间
				+ "<esbVerifiCode>00000000</esbVerifiCode>\n" // --请求者验证码*
				+ "<esbRefGUID>"
				+ pfWebServiceESB.getEsbRefGUID()
				+ "</esbRefGUID>\n" // --esb流水号
				+ "<transRefGUID>"
				+ pfWebServiceESB.getTransRefGUID()
				+ "</transRefGUID>\n" // --业务流水号
				+ "<transNo>"
				+ pfWebServiceESB.getTransNo()
				+ "</transNo>\n" // --服务消费方交易流水号
				+ "<businessCode>001</businessCode>\n" // --业务主键
				+ "<businessType>001</businessType>\n" // --业务类别
				+ "</sysHeader>\n"
				+ "<domHeader>001</domHeader>\n" // --领域报文头
				+ "<bizHeader>001</bizHeader>\n" // --业务报文头
				+ "</head>\n"; 
		return head;
	}
	
	/**
	 * ecm上载接口
	 * @param pfWebServiceESB
	 * @param pfWebServiceECM
	 * @return
	 * @throws Exception 
	 */
	public String requestEcmUpload(PfWebServiceESB pfWebServiceESB,PfWebServiceECM pfWebServiceECM) {
		
		String message = "<message>\n" 
				+ this.requestEsbHead( pfWebServiceESB)
				+ "<body>\n"
				+ "<doc>\n"
				+ "<docCode>"
				+ pfWebServiceECM.getDocCode()
				+ "</docCode>\n"// 单证号码
				+ "<bussType>"
				+ pfWebServiceECM.getBussType()
				+ "</bussType>\n"// 业务类型
				+ "<subType>"
				+ pfWebServiceECM.getSubType()
				+ "</subType>\n"// 单证类型
				+ "<numPages>1</numPages>\n"// 总页数
				+ "<manageCom>"
				+ pfWebServiceECM.getManageCom()
				+ "</manageCom>\n"// 扫描机构
				+ "<scanNo>00000000</scanNo>\n"// 箱号
				+ "<scanOperator>"
				+ pfWebServiceECM.getScanOperator()
				+ "</scanOperator>\n"// 扫描人员
				+ "<scanDate>"
				+ pfWebServiceECM.getScanDate()
				+ "</scanDate>\n"// 扫描时间
				+ "<uploadType>"
				+ pfWebServiceECM.getUploadType()
				+ "</uploadType>\n"// 文件上载类型
				+ "<page>\n"
				+ "<pageNo>1</pageNo>\n"// 页码
				+ "<pageName>"
				+ pfWebServiceECM.getPageName()
				+ "</pageName>\n"// 转码后文件名
				+ "<sourceFileName>"
				+ pfWebServiceECM.getSourceFileName()
				+ "</sourceFileName>\n"//真实文件名
				+ "<pagePath>"
				+ pfWebServiceECM.getPagePath()
				+ "</pagePath>\n"// 文件存放地址
				+ "</page>\n" 
				+ "</doc>\n" 
				+ "</body>\n" 
				+ "</message>";
		return WebServiceSender.invoke("WSADDR_UPLOADFILE", message, 30, 30, 6, false,false);
	}

	/**
	 * ecm下载接口
	 * @param pfWebServiceESB
	 * @param pfWebServiceECM
	 * @return
	 * @throws Exception 
	 */
	public String requestEcmDownLoad(PfWebServiceESB pfWebServiceESB,PfWebServiceECM pfWebServiceECM) {
		String message = "<message>\n" 
		+ this.requestEsbHead(pfWebServiceESB)
		+ "<body>\n"
		+ "<doc>\n"
		+ "<docId/>\n"
		+ "<docCode>"
		+ pfWebServiceECM.getDocCode()
		+ "</docCode>\n"
		+ "<bussType>"
		+ pfWebServiceECM.getBussType()
		+ "</bussType>\n"// 业务类型
		+ "<subType>"
		+ pfWebServiceECM.getSubType()
		+ "</subType>\n"
		+ "<systems>\n"
		+ "<system>" 
		+ pfWebServiceECM.getSystem()
		+ "</system>\n"
		+ "</systems>\n"
		+ "<page>"
		+ "<pageId/>"
		+ "</page>"
		+ "<relation/>"
		+ "<queryType/>"
		+ "</doc>\n" 
		+ "</body>\n" 
		+ "</message>";
		String result = WebServiceSender.invoke("WSADDR_UPLOADFILE", message, 30, 30, 6, false,false);
		return result;
	}
	
	public String requestEcmDelLoad(PfWebServiceESB pfWebServiceESB,PfWebServiceECM pfWebServiceECM) {
		String message = "<message>\n" 
				+ this.requestEsbHead( pfWebServiceESB)
				+ "<body>\n"
				+ "<doc>\n"
				+ "<oper>DELETE||docCode</oper>\n"
				+ "<docId/>\n"
				+ "<docCode>"
				+ pfWebServiceECM.getDocCode()
				+ "</docCode>\n"
				+ "<bussType>"
				+ pfWebServiceECM.getBussType()
				+ "</bussType>\n"
				+ "<subType>"
				+ pfWebServiceECM.getSubType()
				+ "</subType>\n"
				+ "<page>"
				+ "<pageId/>"
				+ "</page>\n"
				+ "</doc>\n" 
				+ "</body>\n" 
				+ "</message>";
		return WebServiceSender.invoke("WSADDR_UPLOADFILE", message, 30, 30, 6, false,false);
	}	

}
