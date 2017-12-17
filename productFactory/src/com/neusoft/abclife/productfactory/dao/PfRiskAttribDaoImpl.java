/**
 * 
 */
package com.neusoft.abclife.productfactory.dao;

import java.util.List;

import org.springframework.stereotype.Component;

import com.neusoft.abclife.productfactory.entity.TInsurtypeBasicInf;
import com.neusoft.abclife.productfactory.entity.TInsurtypePsAttribDef;
import com.neusoft.fdframework.core.base.BaseDao;
import com.neusoft.fdframework.core.base.QueryResult;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author neusoft
 * 
 */
@Component("factoryabclife_pfRiskAttribDao_dao")
@ModelFile(value = "pfRiskAttribDao.dao")
public class PfRiskAttribDaoImpl extends BaseDao {

	protected String getTemplateName() {
		return "dataSource";
	}

	/**
	 * 
	 */
	public PfRiskAttribDaoImpl() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * 保全属性查询
	 * @param basic
	 * @return
	 */
	public List<TInsurtypePsAttribDef> queryAttrib(TInsurtypeBasicInf basic) {
		String sql = "select * from T_INSURTYPE_PS_ATTRIB_DEF where insurtype_id=?";
		List<TInsurtypePsAttribDef> qr = this.queryForList(
				TInsurtypePsAttribDef.class, sql, new Object[] { basic
						.getInsurtypeId() });
		return qr;
	}

	/**
	 * 保全属性保存
	 * @param basic
	 * @return
	 */
	public void saveAttrib(TInsurtypeBasicInf basic,
			TInsurtypePsAttribDef attrib) {
		String sql = "delete from T_INSURTYPE_PS_ATTRIB_DEF where insurtype_id=?";
		this.executeSQL(sql, new Object[] { basic.getInsurtypeId() });

		Long seq = Long.parseLong(this.getSeq("SEQ_INSURTYPE_PS_ATTRIB_DEF"));
		attrib.setInsurtypePsAttribId(seq);
		attrib.setInsurtypeId(basic.getInsurtypeId());
		this.saveNew(attrib);
	}
}
