/**
 * 
 */
package com.neusoft.abclife.productfactory.blo;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.neusoft.abclife.productfactory.dao.PfRiskParamDaoImpl;
import com.neusoft.abclife.productfactory.entity.TInsurtypeBasicInf;
import com.neusoft.abclife.productfactory.entity.TInsurtypeCustElemCtrl;
import com.neusoft.abclife.productfactory.entity.TProductParamDef;
import com.neusoft.fdframework.core.base.BaseDao;
import com.neusoft.fdframework.core.base.QueryResult;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author neusoft
 * 
 */
@Service("factoryabclife_PfRiskParamBo_bo")
@ModelFile(value = "PfRiskParamBo.bo")
public class PfRiskParamBoImpl extends BaseDao {
	@Resource(name = "factoryabclife_PfRiskParamDao_dao")
	private PfRiskParamDaoImpl insurtypeAccDef;

	/**
	 * 
	 */
	public PfRiskParamBoImpl() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * 参数定义查询
	 * @param basic
	 * @param paramType
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 */
	public List<TProductParamDef> getPfInsurtypeParam(TInsurtypeBasicInf basic, String paramType) {

		return this.insurtypeAccDef.getPfInsurtypeParam(basic, paramType);

	}

	/**
	 * 人员定义查询
	 * @param basic
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 */
	public QueryResult queryPersonnel(TInsurtypeBasicInf basic, int pageNumber,
			int pageSize) {

		return this.insurtypeAccDef.queryPersonnel(basic, pageNumber,
				pageSize);

	}

	/**
	 * 人员定义删除
	 * @param personnel
	 * @return
	 */
	public String deletePersonnel(TInsurtypeCustElemCtrl personnel) {
		this.insurtypeAccDef.deletePersonnel(personnel);
		return "";
	}
	
	/**
	 * 保存人员定义信息
	 * @param personnel
	 * @param opt
	 * @return
	 */
	public String savePersonnel(TInsurtypeCustElemCtrl personnel,String opt){
		int value = this.insurtypeAccDef.checkPersonnel(personnel);

			if("add".equals(opt)){
				if(value>0){
					return "人员重复定义";
				}
				this.insurtypeAccDef.addPersonnel(personnel);
			}
			if("update".equals(opt)){
				if(value>0){
					return "人员重复定义";
				}
				this.insurtypeAccDef.updatePersonnel(personnel);
			}
			if("original".equals(opt)){
				this.insurtypeAccDef.updatePersonnel(personnel);
			}
		return "";
	}

	/**
	 * 参数定义保存
	 * @param paramDef
	 * @param opt
	 * @return
	 */
	public String addPfRiskParamDef(TProductParamDef paramDef, String opt) {
		String message="";
		if("add".equals(opt)){
			if(this.insurtypeAccDef.checkValue(paramDef)){
				this.insurtypeAccDef.addPfRiskParamDef(paramDef);
			}else{
				message="输入值重复";
			};
		}
		if("update".equals(opt)){
			if(this.insurtypeAccDef.checkValue(paramDef)){
				this.insurtypeAccDef.updatePfRiskParamDef(paramDef);
			}else{
				message="输入值重复";
			};
		}

		return message;
	}

	/**
	 * 参数定义删除
	 * @param paramDel
	 * @return
	 */
	public String delpfRiskParam(TProductParamDef paramDel) {
		this.insurtypeAccDef.delpfRiskParam(paramDel);
		return "";
	}

	/**
	 * 删除交费频率
	 * @param paramType
	 * @param insurtypeId
	 * @return
	 */
	public String delparamType(String paramType, String insurtypeId) {
		this.insurtypeAccDef.delparamType(paramType,insurtypeId);
		return "";
	}

	/**
	 * 交费频率添加
	 * @param param
	 * @param paramDef
	 * @return
	 */
	public String addparam(String param, TProductParamDef paramDef) {
		this.insurtypeAccDef.addparam(param, paramDef);
		return "";
	}

}
