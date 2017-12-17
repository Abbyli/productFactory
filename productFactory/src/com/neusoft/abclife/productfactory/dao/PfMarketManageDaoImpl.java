/**
 * 
 */
package com.neusoft.abclife.productfactory.dao;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.neusoft.abclife.productfactory.dto.ProMatchDto;
import com.neusoft.abclife.productfactory.entity.TInsurtypeBasicInf;
import com.neusoft.abclife.productfactory.entity.TProductSaleChnl;
import com.neusoft.abclife.util.StringUtil;
import com.neusoft.fdframework.core.base.BaseDao;
import com.neusoft.fdframework.core.base.QueryResult;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author Neusoft
 *
 */
@Component("factoryabclife_pfMarketManageDao_dao")
@ModelFile(value = "pfMarketManageDao.dao")
public class PfMarketManageDaoImpl extends BaseDao {

	protected String getTemplateName() {
		return "dataSource";
	}

	/**
	 * 
	 */
	public PfMarketManageDaoImpl() {
		// TODO Auto-generated constructor stub
	}

	public QueryResult queryTProductSaleChnl(TProductSaleChnl tProductSaleChnl,
			int pageNumber, int pageSize) {
		String sql = "select * from T_PRODUCT_SALE_CHNL where 1=1 ";
		if(!StringUtil.isEmpty(tProductSaleChnl.getProductCode())){
			sql += " and PRODUCT_CODE like '%"+tProductSaleChnl.getProductCode()+"%' ";
		}
		if(!StringUtil.isEmpty(tProductSaleChnl.getSaleChnl())){
			sql += " and SALE_CHNL = "+tProductSaleChnl.getSaleChnl();
		}
		if(!StringUtil.isEmpty(tProductSaleChnl.getSaleMngcom())){
			sql += " and SALE_MNGCOM like '%"+tProductSaleChnl.getSaleMngcom()+"%' ";
		}
		if(!StringUtil.isEmpty(tProductSaleChnl.getSaleState())){
			sql += " and SALE_STATE = "+tProductSaleChnl.getSaleState();
		}
		return this.queryForPageList(TProductSaleChnl.class, pageNumber, pageSize, sql);
	}

	public int addTProductSaleChnl(TProductSaleChnl tProductSaleChnl) throws ParseException {
		tProductSaleChnl.setProductSaleId(Long.parseLong(this.getSeq("SEQ_PRODUCT_SALE_CHNL")));
		tProductSaleChnl.setSaleState("1");
		if(tProductSaleChnl.getEnddate()==null){
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd");
			tProductSaleChnl.setEnddate(sdf.parse("3000/1/1"));
		}
		
		return this.saveNew(tProductSaleChnl);
	}

	public int upUpTUnivrslShare(TProductSaleChnl tProductSaleChnl) {
		return this.saveUpdate(tProductSaleChnl);	
	}

	public List<TInsurtypeBasicInf> queryApprove() {
		// 查询险种状态
		String sql = "select * from T_INSURTYPE_BASIC_INF b "
				+ "where b.insurtype_status= 1 and b.insurtype_id in "
				+ "(select t.assess_obj_id from T_PRODUCT_DEF_APPROVE t "
				+ "where t.assess_type='01' and t.flow_node_code='02') ";
		sql += "order by b.INSURTYPE_CODE, b.VER_NO asc";
		return this.queryForList(TInsurtypeBasicInf.class, sql);
	}

	public int checkTProductSaleChnl(TProductSaleChnl tProductSaleChnl) {
		String sql = "select count(*) from T_PRODUCT_SALE_CHNL where 1=1 ";
		if(!StringUtil.isEmpty(tProductSaleChnl.getProductCode())){
			sql += " and PRODUCT_CODE = "+tProductSaleChnl.getProductCode();
		}
		if(!StringUtil.isEmpty(tProductSaleChnl.getSaleChnl())){
			sql += " and SALE_CHNL = "+tProductSaleChnl.getSaleChnl();
		}
		if(!StringUtil.isEmpty(tProductSaleChnl.getSaleMngcom())){
			sql += " and SALE_MNGCOM = "+tProductSaleChnl.getSaleMngcom();
		}
		sql += " and SALE_STATE = 1";
		return this.queryForInt(sql);
	}
	
}
