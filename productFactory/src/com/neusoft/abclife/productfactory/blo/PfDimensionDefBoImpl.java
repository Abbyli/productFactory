/**
 * 
 */
package com.neusoft.abclife.productfactory.blo;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.neusoft.abclife.productfactory.dao.PfDimensionDefDaoImpl;
import com.neusoft.abclife.productfactory.entity.TDimensionDef;
import com.neusoft.fdframework.core.base.QueryResult;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author neusoft
 *
 */
@Service("factoryabclife_pfDimensionDefBo_bo")
@ModelFile(value = "pfDimensionDefBo.bo")
public class PfDimensionDefBoImpl {
	@Resource(name="factoryabclife_pfDimensionDefDao_dao")
	private PfDimensionDefDaoImpl DimensionDef;
	/**
	 * 
	 */
	public PfDimensionDefBoImpl() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * 维度定义查询翻页
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 */
	public QueryResult queryDimensionDef(TDimensionDef dimensionDef,int pageNumber,int pageSize){
		return this.DimensionDef.queryDimensionDef(dimensionDef,pageNumber,pageSize);
	}
	
	/**
	 * 维度查询非分页
	 * @param dimensionDef
	 * @return
	 */
	public List<TDimensionDef> queryDimensionDefNoPage(TDimensionDef dimensionDef){
		return this.DimensionDef.getDimensionDefNoPage(dimensionDef);
	}
	/**
	 * 维度定义保存
	 * @param dimensionDef
	 * @param opt
	 * @return
	 */
	public String saveDimensionDef(TDimensionDef dimensionDef, String opt){
		String message="";
		if("add".equals(opt)){
			int maxOrderNum = DimensionDef.dimensionMaxNum();
			dimensionDef.setOrderNum(maxOrderNum+1);
			this.DimensionDef.addDimensionDef(dimensionDef);
		}
		if("update".equals(opt)){
			this.DimensionDef.updateDimensionDef(dimensionDef);
		}
		return message;
	}

	/**
	 * 维度定义删除
	 * @param dimensionDef
	 * @return
	 */
	public String delDimensionDef(TDimensionDef dimensionDef){
		this.DimensionDef.delDimensionDef(dimensionDef);
		return "";
	}
	
	/**
	 * 交换两个排序号
	 */
	public void changeOrderNum(TDimensionDef dimensionDef1,TDimensionDef dimensionDef2){
		int oderNum = dimensionDef1.getOrderNum();
		dimensionDef1.setOrderNum(dimensionDef2.getOrderNum());
		dimensionDef2.setOrderNum(oderNum);
		this.DimensionDef.updateDimensionDef(dimensionDef1);
		this.DimensionDef.updateDimensionDef(dimensionDef2);
	}

}
