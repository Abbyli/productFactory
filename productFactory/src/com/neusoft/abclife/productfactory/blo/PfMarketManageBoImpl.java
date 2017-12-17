/**
 * 
 */
package com.neusoft.abclife.productfactory.blo;

import java.text.ParseException;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.neusoft.abclife.productfactory.dao.PfMarketManageDaoImpl;
import com.neusoft.abclife.productfactory.entity.TInsurtypeBasicInf;
import com.neusoft.abclife.productfactory.entity.TProductSaleChnl;
import com.neusoft.fdframework.core.base.QueryResult;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author Neusoft
 *
 */
@Service("factoryabclife_pfMarketManageBo_bo")
@ModelFile(value = "pfMarketManageBo.bo")
public class PfMarketManageBoImpl {

	/**
	 * 
	 */
	public PfMarketManageBoImpl() {
	}
	
	@Resource(name = "factoryabclife_pfMarketManageDao_dao")
	private PfMarketManageDaoImpl pfMarketManageDaoImpl;
	
	
	/**
	 * 产品查询
	 * @param tProductSaleChnl
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 */
	public QueryResult queryTProductSaleChnl(TProductSaleChnl tProductSaleChnl,
			int pageNumber, int pageSize) {
		return this.pfMarketManageDaoImpl.queryTProductSaleChnl(tProductSaleChnl, pageNumber, pageSize);
	}
	
	/**
	 * 险种查询
	 * @param tInsurtypeBasicInf
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 */
	public List<TInsurtypeBasicInf> queryTInsurtypeBasicInf(){
		return this.pfMarketManageDaoImpl.queryApprove();
	}
	
	/**
	 * 产品销售控制新增
	 * @return
	 * @throws ParseException 
	 */
	public String addTProductSaleChnl(TProductSaleChnl tProductSaleChnl,String opt) throws ParseException{
		String message = "";
		if(this.pfMarketManageDaoImpl.checkTProductSaleChnl(tProductSaleChnl)>0){
			message = "请确认该产品旧版本已停售 在进行添加！";
		}else{
			if(this.pfMarketManageDaoImpl.addTProductSaleChnl(tProductSaleChnl)<=0){
				message = "新增 产品 失败！";
			}	
		} 
		return message;
	}
	
	/**
	 * 产品销售控制修改
	 * @return
	 * @throws ParseException 
	 */
	public String upTProductSaleChnl(TProductSaleChnl tProductSaleChnl) throws ParseException{
		String message = "";
		if(tProductSaleChnl.getSaleState().equals("0")){
			if(this.pfMarketManageDaoImpl.checkTProductSaleChnl(tProductSaleChnl)>0){
				message = "该产品旧版本未停售 ！";
			}else{
				tProductSaleChnl.setSaleState("1");
				if(this.pfMarketManageDaoImpl.upUpTUnivrslShare(tProductSaleChnl)<=0){
					message = "修改 产品 失败！";
				}
			}
		}else{
			tProductSaleChnl.setSaleState("0");
			if(this.pfMarketManageDaoImpl.upUpTUnivrslShare(tProductSaleChnl)<=0){
				message = "修改 产品 失败！";
			}
		}
		return message;
	}
}
