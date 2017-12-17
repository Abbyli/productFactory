/**
 * 
 */
package com.neusoft.abclife.productfactory.dao;

import java.util.List;

import org.springframework.stereotype.Component;

import com.neusoft.abclife.productfactory.dto.PfSKElementsDTO;
import com.neusoft.abclife.productfactory.entity.TPropShowDef;
import com.neusoft.abclife.productfactory.entity.TSkelementDef;
import com.neusoft.fdframework.core.base.BaseDao;
import com.neusoft.fdframework.core.base.QueryResult;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author think
 *
 */
@Component("factoryabclife_pfSKElementDAO_dao")
@ModelFile(value = "pfSKElementDAO.dao")
public class PfSKElementDAOImpl extends BaseDao {

	protected String getTemplateName() {
		return "dataSource";
	}

	public PfSKElementDAOImpl() {}
	
	public QueryResult getPfSkelements(int pageNumber, int pageSize) {
		String sql = "select s.ID,s.NAME,s.PROPERTY,s.BUSI_TYPE as busiType,s.IS_CAL_REF as isCalRef,r.EDITOR_TYPE as editorType "+
		"from T_SKELEMENT_DEF s left join T_PROP_SHOW_DEF r on  r.SKELEMENT_ID = s.ID where  r.obj_id is null";
		return this.queryForPageList(PfSKElementsDTO.class, pageNumber, pageSize, sql, new Object[]{});
	}

	public List<TSkelementDef> getPfSkelementsNoPage() {
		String sql = "select * from T_SKELEMENT_DEF s ";
		return this.queryForList(TSkelementDef.class, sql, new Object[]{});
	}

	public List<TSkelementDef> checkPfSkelement(TSkelementDef tSkelementDef) {
		String sql = "select * from T_SKELEMENT_DEF s where s.NAME = ? "; 	
		return this.queryForList(TSkelementDef.class, sql, new Object[]{tSkelementDef.getName()});
	}

	public void addPfSkelement(TSkelementDef tSkelementDef, TPropShowDef show) {
		Long seq = Long.parseLong(this.getSeq("SEQ_SKELEMENT_DEF"));
		tSkelementDef.setId(seq);
		this.saveNew(tSkelementDef);
		//this.getSkelementId(tSkelementDef);
		show.setId(Long.parseLong(this.getSeq("SEQ_prop_show_def")));
		show.setSkelementId(seq);
		this.saveNew(show);		
	}

	public List<TPropShowDef> getTPropShowDef(TSkelementDef tSkelementDef) {
		String sql = "select * from T_PROP_SHOW_DEF s where s.OBJ_ID is null and s.SKELEMENT_ID = ? "; 	
		return this.queryForList(TPropShowDef.class, sql, new Object[]{tSkelementDef.getId()});
	}
	
	
	public void updPfSkelement(TSkelementDef tSkelementDef, TPropShowDef show) {
		this.saveUpdate(tSkelementDef);
		List<TPropShowDef> tPropShowDef = this.getTPropShowDef(tSkelementDef);
		if(tPropShowDef.size()>0){
			this.saveUpdate(show);
		}else{
			show.setId(Long.parseLong(this.getSeq("SEQ_prop_show_def")));
			show.setSkelementId(tSkelementDef.getId());
			this.saveNew(show);	
		}
		
		
		
	}

	public void delPfSkelement(PfSKElementsDTO pfSKElementsDTO) {
		TSkelementDef tSkelementDef = new TSkelementDef();
		tSkelementDef.setId(pfSKElementsDTO.getId());
		this.saveRemove(tSkelementDef);
		
	}
	public List<TSkelementDef> getTSkelementDef(String type){
		String sql = "select * from t_skelement_def where busi_type=? ";
		List<TSkelementDef> list = this.queryForList(TSkelementDef.class, sql, new Object[]{type});
		return list;
	}
}
