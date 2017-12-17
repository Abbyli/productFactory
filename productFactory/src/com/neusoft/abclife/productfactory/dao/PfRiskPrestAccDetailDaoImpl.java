/**
 * 
 */
package com.neusoft.abclife.productfactory.dao;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import com.neusoft.abclife.productfactory.entity.TClaimGivepayDef;
import com.neusoft.abclife.productfactory.entity.TClaimPayItemDetail;
import com.neusoft.abclife.productfactory.entity.TInsurtypeAccDef;
import com.neusoft.abclife.productfactory.entity.TInsurtypeBasicInf;
import com.neusoft.abclife.productfactory.entity.TItemDetailDef;
import com.neusoft.abclife.util.StringUtil;
import com.neusoft.fdframework.core.base.BaseDao;
import com.neusoft.fdframework.core.base.QueryResult;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author shi.chl
 * 
 */
@Component("factoryabclife_pfRiskPrestAccDetailDao_dao")
@ModelFile(value = "pfRiskPrestAccDetailDao.dao")
public class PfRiskPrestAccDetailDaoImpl extends BaseDao {

	protected String getTemplateName() {
		return "dataSource";
	}

	/**
	 * 
	 */
	public PfRiskPrestAccDetailDaoImpl() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * 添加账户明细
	 * 
	 * @param tClaimPayItemDetail
	 */
	public void addAccDetail(TClaimPayItemDetail tClaimPayItemDetail) {
		Long seq = Long.parseLong(this.getSeq("SEQ_CLAIM_PAY_ITEM_DETAIL"));
		tClaimPayItemDetail.setInsertTime(new Date());
		tClaimPayItemDetail.setPayItemDetailId(seq);
		this.saveNew(tClaimPayItemDetail);
	}

	/**
	 * 修改账户明细
	 * 
	 * @param tClaimPayItemDetail
	 */
	public void updateAccDetail(TClaimPayItemDetail tClaimPayItemDetail) {
		tClaimPayItemDetail.setUpdateTime(new Date());
		this.saveUpdate(tClaimPayItemDetail);
	}

	/**
	 * 翻页查询账户明细
	 * 
	 * @param tClaimGivepayDef
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 */
	public QueryResult getAccDetail(TClaimGivepayDef tClaimGivepayDef,TClaimPayItemDetail tClaimPayItemDetail,
			int pageNumber, int pageSize) {
		String sql = "select * from T_CLAIM_PAY_ITEM_DETAIL  where claim_givepay_id=? ";
		if(!StringUtil.isEmpty(tClaimPayItemDetail.getClaimPayItemCode())){
			sql+="and claim_pay_item_code like '%"+tClaimPayItemDetail.getClaimPayItemCode()+"%' ";
		}
		if(!StringUtil.isEmpty(tClaimPayItemDetail.getClaimPayItemName())){
			sql+="and claim_pay_item_name like '%"+tClaimPayItemDetail.getClaimPayItemName()+"%' ";
		}
		sql+= " order by claim_pay_item_code asc ";
		QueryResult qr = this.queryForPageList(TClaimPayItemDetail.class,
				pageNumber, pageSize, sql, new Object[] { tClaimGivepayDef
						.getClaimGivepayId() });
		return qr;
	}

	public void delAccDetail(TClaimPayItemDetail tClaimPayItemDetail) {
		this.saveRemove(tClaimPayItemDetail);
	}

	/**
	 * 获取默认值数据
	 * 
	 * @param tClaimGivepayDef
	 * @return
	 */
	public List<TClaimPayItemDetail> createDatas(
			TClaimGivepayDef tClaimGivepayDef) {
		String claimType = tClaimGivepayDef.getAccidOccurReason()
				+ tClaimGivepayDef.getClaimClaimPayType();
		Long claimGivepayId = tClaimGivepayDef.getClaimGivepayId();
		// 创建账户明细信息
		List<TClaimPayItemDetail> tClaimPayItemDetails = new ArrayList<TClaimPayItemDetail>();
		// 获取默认值数据
		String sql = "select * from t_item_detail_def where item_detail_type=? ";
		List<Object> params = new ArrayList<Object>();
		if("03".equals(tClaimGivepayDef.getClaimClaimPayType())){
			params.add("02");
		}else if("02".equals(tClaimGivepayDef.getClaimClaimPayType())){
			params.add("03");
		}else{
			params.add("01");
		}
		List<TItemDetailDef> tItemDetailDefs = this.queryForList(
				TItemDetailDef.class, sql,params.toArray());
		// 通過迭代給賬戶明細賦值
		for (int i = 0; i < tItemDetailDefs.size(); i++) {
			TClaimPayItemDetail t = new TClaimPayItemDetail();
			t.setClaimPayItemCode(tItemDetailDefs.get(i).getClaimPayItemCode());
			t.setClaimPayItemName(tItemDetailDefs.get(i).getClaimPayItemName());
			t.setClaimPayCalcWay(tItemDetailDefs.get(i).getClaimPayCalcWay());
			t.setClaimType(claimType);
			t.setClaimGivepayId(claimGivepayId);
			tClaimPayItemDetails.add(t);
		}
		return tClaimPayItemDetails;
	}

	/**
	 * 检查修改账户明细重复
	 * 
	 * @param insurtypeAccDef
	 * @return
	 */
	public boolean checkCode(TClaimPayItemDetail tClaimPayItemDetail) {
		// 根据参数来查询账户信息
		StringBuilder sql = new StringBuilder(
				"select * from T_CLAIM_PAY_ITEM_DETAIL t where claim_givepay_id=? ");
		List<Object> params = new ArrayList<Object>();
		params.add(tClaimPayItemDetail.getClaimGivepayId());
		if (!StringUtils.isEmpty(tClaimPayItemDetail.getClaimPayItemCode())) {
			sql.append(" and claim_pay_item_code=? ");
			params.add(tClaimPayItemDetail.getClaimPayItemCode());
		}
		List<TClaimPayItemDetail> list = this.queryForList(
				TClaimPayItemDetail.class, sql.toString(), params.toArray());

		boolean flag = false;
		// 如果大于1账户重复
		if (list.size() > 1) {
			flag = false;
		}
		// 如果等于1可能重复可能是本身
		if (list.size() == 1) {
			if (list.get(0).getPayItemDetailId().toString().equals(
					tClaimPayItemDetail.getPayItemDetailId().toString())) {
				flag = true;
			} else {
				flag = false;
			}
		}
		// 如果小于1肯定不重复
		if (list.size() < 1) {
			flag = true;
		}

		return flag;

	}

	/**
	 * 检查添加账户明细重复
	 * 
	 * @param insurtypeAccDef
	 * @return
	 */
	public boolean checkCode_add(TClaimPayItemDetail tClaimPayItemDetail) {
		// 根据参数来查询账户信息
		StringBuilder sql = new StringBuilder(
				"select * from T_CLAIM_PAY_ITEM_DETAIL t where claim_givepay_id=?");
		List<Object> params = new ArrayList<Object>();
		params.add(tClaimPayItemDetail.getClaimGivepayId());
		if (!StringUtils.isEmpty(tClaimPayItemDetail.getClaimPayItemCode())) {
			sql.append(" and claim_pay_item_code=? ");
			params.add(tClaimPayItemDetail.getClaimPayItemCode());
		}
		List<TClaimPayItemDetail> list = this.queryForList(
				TClaimPayItemDetail.class, sql.toString(), params.toArray());

		if (list.size() < 1) {
			return true;
		} else {
			return false;
		}

	}

}
