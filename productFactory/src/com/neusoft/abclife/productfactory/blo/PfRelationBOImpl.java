/**
 * 
 */
package com.neusoft.abclife.productfactory.blo;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.neusoft.abclife.productfactory.dao.PfRelationDaoImpl;
import com.neusoft.abclife.productfactory.entity.TFormulaParamRef;
import com.neusoft.abclife.productfactory.entity.TObjEntrance;
import com.neusoft.abclife.productfactory.entity.TObjFormula;
import com.neusoft.abclife.productfactory.entity.TObjParam;
import com.neusoft.abclife.productfactory.entity.TObjRelation;
import com.neusoft.abclife.productfactory.entity.TRelationDef;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author shi.chl
 *
 */
@Service("factoryabclife_pfRelationBO_bo")
@ModelFile(value = "pfRelationBO.bo")
public class PfRelationBOImpl {

	/**
	 * 
	 */
	@Resource(name="factoryabclife_pfRelationDao_dao")
	private PfRelationDaoImpl pfRelationDaoImpl;
	
	public PfRelationBOImpl() {
		// TODO Auto-generated constructor stub
	}
	
	/**
	 * 查询通用相关性数据
	 * @return
	 */
	public List<TRelationDef> getTRelationDef(){
		
		return this.pfRelationDaoImpl.getTRelationDef();
	}
	
	
	
	/**
	 * 保存给付算法定义的一系列表
	 * @param tObjRelation
	 * @param tobjFormula
	 */
	public String saveTObjRelation(List<TObjRelation> tObjRelation, TObjFormula tobjFormula,
			List<TObjParam> tObjParam, TObjEntrance tObjEntrance){
		
		String message = "";
		String uuid = this.pfRelationDaoImpl.getUUId();//同一对象标识
		
		if((!this.pfRelationDaoImpl.isExist(tobjFormula)) || tobjFormula.getId()==null){

			//删除同一对象标识下所有对象相关性
			this.pfRelationDaoImpl.delAllTObjRelation(tobjFormula);
			//删除同一对象标识下所有对象参数
			this.pfRelationDaoImpl.delAllTObjParams(tobjFormula);
			//删除同一对象标识下入口对象表  add by qyt 20160716
			this.pfRelationDaoImpl.delTObjEntrance(tobjFormula);
			//保存对象相关性
			for(TObjRelation t : tObjRelation){
				t.setObjSeq(uuid);
				this.pfRelationDaoImpl.addTObjRelation(t);
			}
			//保存对象公式
			tobjFormula.setObjSeq(uuid);
			if(tobjFormula.getId() == null || "".equals(tobjFormula.getId())){
				this.pfRelationDaoImpl.addTObjFormula(tobjFormula);
			}else{
				this.pfRelationDaoImpl.delTObjFormula(tobjFormula);
				this.pfRelationDaoImpl.addTObjFormula(tobjFormula);
			}
			//保存对象参数
			for(TObjParam t:tObjParam){
				t.setObjSeq(uuid);
				this.pfRelationDaoImpl.addTObjParam(t);
			}	
			//保存到对象入口表 add by qyt 20160716
			if(!"D3".equals(tObjEntrance.getAlgoType())){
				tObjEntrance.setObjSeq(uuid);
				this.pfRelationDaoImpl.addTObjEntrance(tObjEntrance);	
			}
		}else{
			message="已有人操作此条数据";
		}
		
		
		return message;
	}
	/**
	 * 查询公式参数数据
	 * @param id
	 * @return
	 */
	public List<TFormulaParamRef> queryTFormulaParamRef(Long id){
		return this.pfRelationDaoImpl.queryTFormulaParamRef(id);
	}
	/**
	 * 删除对象参数,公式,相关性,入口对象信息
	 * @param objSeq
	 */
	public void delParamFormulaRelation(String objSeq){
		this.pfRelationDaoImpl.delParamFormulaRelation(objSeq);
	}
	/**
	 * 查询对象参数
	 * @param tObjFormula
	 * @return
	 */
	public List<TFormulaParamRef> getTObjParam(TObjFormula tObjFormula){
		return this.pfRelationDaoImpl.getTObjParam(tObjFormula);
	}
	
	/**
	 * 查询对象相关性
	 * @param tObjFormula
	 * @return
	 */
	public List<TObjRelation> getTObjRelation(TObjFormula tObjFormula){
		return this.pfRelationDaoImpl.getTObjRelation(tObjFormula.getObjSeq());
	}
	
	/**
	 * 删除对象相关性
	 * @param tObjRelation
	 */
	public void delTObjRelation(TObjRelation tObjRelation){
		this.pfRelationDaoImpl.delTObjRelation(tObjRelation);
	}
}
