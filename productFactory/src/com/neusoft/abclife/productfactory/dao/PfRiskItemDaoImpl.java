/**
 * 
 */
package com.neusoft.abclife.productfactory.dao;

import java.util.List;

import org.springframework.stereotype.Component;

import com.neusoft.abclife.productfactory.entity.TInsurtypeBasicInf;
import com.neusoft.abclife.productfactory.entity.TInsurtypePsItemDef;
import com.neusoft.abclife.productfactory.entity.TPsItemDef;
import com.neusoft.fdframework.core.base.BaseDao;
import com.neusoft.fdframework.core.base.QueryResult;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author neusoft
 * 
 */
@Component("factoryabclife_pfRiskItemDao_dao")
@ModelFile(value = "pfRiskItemDao.dao")
public class PfRiskItemDaoImpl extends BaseDao {

	protected String getTemplateName() {
		return "dataSource";
	}

	/**
	 * 
	 */
	public PfRiskItemDaoImpl() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * 保全项定义查询
	 * @return
	 */
	public List<TPsItemDef> queryItem() {
		String sql = "select * from T_PS_ITEM_DEF where ps_type in ('I','B') order by ps_item_code";
		List<TPsItemDef> qr = this.queryForList(TPsItemDef.class, sql,
				new Object[] {});
		return qr;
	}

	/**
	 * 险种保全查询
	 * @param basic
	 * @return
	 */
	public List<TInsurtypePsItemDef> queryRiskItem(TInsurtypeBasicInf basic) {
		String sql = "select * from T_INSURTYPE_PS_ITEM_DEF where insurtype_id=?";
		List<TInsurtypePsItemDef> qr = this.queryForList(
				TInsurtypePsItemDef.class, sql, new Object[] { basic
						.getInsurtypeId() });
		return qr;
	}

	// 删除险种保全
	public void deleItem(TInsurtypeBasicInf basic) {
		String sql = "delete from T_INSURTYPE_PS_ITEM_DEF where insurtype_id=?";
		this.executeSQL(sql, new Object[] { basic.getInsurtypeId() });
	}

	/**
	 * 险种保全保存
	 * @param riskIrem
	 * @return
	 */
	public String saveItem(TInsurtypePsItemDef riskItem) {

		// 添加险种保全
		Long seq = Long.parseLong(this.getSeq("SEQ_INSURTYPE_PS_ITEM_DEF"));
		riskItem.setInsurtypePsItemId(seq);
		this.saveNew(riskItem);

		return "";
	}
}
