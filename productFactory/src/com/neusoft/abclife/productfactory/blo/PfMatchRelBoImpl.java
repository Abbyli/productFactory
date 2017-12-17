/**
 * 
 */
package com.neusoft.abclife.productfactory.blo;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.neusoft.abclife.productfactory.dao.PfMatchRelDaoImpl;
import com.neusoft.abclife.productfactory.dto.ProMatchDto;
import com.neusoft.abclife.productfactory.entity.TProductInsurtypeMatchRel;
import com.neusoft.fdframework.core.base.QueryResult;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author neusoft
 * 
 */
@Service("factoryabclife_pfMatchRelBo_bo")
@ModelFile(value = "pfMatchRelBo.bo")
public class PfMatchRelBoImpl {
	@Resource(name = "factoryabclife_pfMatchRelDao_dao")
	private PfMatchRelDaoImpl matchRel;

	/**
	 * 
	 */
	public PfMatchRelBoImpl() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * 有效险种查询
	 * @param tInsurtypeBasicInf
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 */
	public QueryResult queryMatchRel(ProMatchDto dto,
			int pageNumber, int pageSize) {
		return this.matchRel.queryProMatch(dto, pageNumber, pageSize);
	}

	/**
	 * 主附险查询
	 * @param tInsurtypeBasicInf
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 */
	public QueryResult queryAddition(ProMatchDto tInsurtypeBasicInf,String matchRel,
			int pageNumber, int pageSize) {
		return this.matchRel.queryAddition(tInsurtypeBasicInf,matchRel,pageNumber,
				pageSize);
	}
	

	/**
	 * 搭配表查一条
	 * @param basic
	 * @param addition
	 * @return
	 */
	public List<TProductInsurtypeMatchRel> queryMatchRow(String basic, String addition){
		return this.matchRel.queryMatchRow(basic,addition);
	}
	
	/**
	 * 险种名称查询
	 * @param riskcode
	 * @return
	 */
	public QueryResult queryRiskName(String riskcode){
		return this.matchRel.queryRiskName(riskcode);
	}
	
	/**
	 * 搭配信息保存
	 * @param pfMatchRel
	 * @param basic
	 * @param opt
	 * @return
	 */
	public String savaAddition(TProductInsurtypeMatchRel pfMatchRel, String basic, String opt){
		String message="";
		String param = this.matchRel.checkValue(pfMatchRel, basic);
		if("add".equals(opt)){
			if("".equals(param)){
				this.matchRel.addAddition(pfMatchRel,basic);
			}else{
				message=param;
			}
		}
		
		if("update".equals(opt)){
			if("".equals(param)){
				this.matchRel.updateAddition(pfMatchRel,basic);
			}else{
				message=param;
			}
		}
		
		return message;
	}
	
	/**
	 * 搭配信息删除
	 * @param basic
	 * @param addition
	 * @return
	 */
	public String delAddition(String basic, String addition){
		this.matchRel.delAddition(basic,addition);
		return "";
	}
}
