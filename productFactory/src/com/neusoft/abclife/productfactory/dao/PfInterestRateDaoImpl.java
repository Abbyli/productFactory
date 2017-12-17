/**
 * 
 */
package com.neusoft.abclife.productfactory.dao;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.List;

import org.apache.poi.xssf.usermodel.XSSFRow;
import org.springframework.stereotype.Component;

import com.neusoft.abclife.productfactory.entity.TAssessNetPrem;
import com.neusoft.abclife.productfactory.entity.TCurrPriceIntrate;
import com.neusoft.abclife.productfactory.entity.TDividParam;
import com.neusoft.abclife.productfactory.entity.TInsurtypeBasicInf;
import com.neusoft.abclife.productfactory.entity.TLoanAutoPayIntrate;
import com.neusoft.abclife.productfactory.entity.TReserveFundFactor;
import com.neusoft.abclife.productfactory.entity.TSurvvBeneAccumIntbeIntra;
import com.neusoft.abclife.productfactory.entity.TUnivrslSettlIntrate;
import com.neusoft.abclife.util.StringUtil;
import com.neusoft.fdframework.core.base.BaseDao;
import com.neusoft.fdframework.core.base.QueryResult;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author Neusoft
 *
 */
@Component("factoryabclife_pfInterestRateDao_dao")
@ModelFile(value = "pfInterestRateDao.dao")
public class PfInterestRateDaoImpl extends BaseDao {

	protected String getTemplateName() {
		return "dataSource";
	}

	/**
	 * 
	 */
	public PfInterestRateDaoImpl() {
		// TODO Auto-generated constructor stub
	}
	
	public List<TInsurtypeBasicInf> getTUnivrslShare() {
		String sql = "select INSURTYPE_CODE ,INSURTYPE_NAME from T_INSURTYPE_BASIC_INF  group by (INSURTYPE_CODE,INSURTYPE_NAME)";
		return this.queryForList(TInsurtypeBasicInf.class, sql);
	}
	public QueryResult queryTUnivrslSettlIntrate(TUnivrslSettlIntrate tUnivrslSettlIntrate,
			int pageNumber, int pageSize) {
		String sql = "select * from T_UNIVRSL_SETTL_INTRATE b where 1=1 ";
		if (!StringUtil.isEmpty(tUnivrslSettlIntrate.getInsurtypeCode())) {
			sql += "and b.INSURTYPE_CODE like '%"
					+ tUnivrslSettlIntrate.getInsurtypeCode() + "%' ";
		}
		sql += "order by b.INSURTYPE_CODE asc";
		return this.queryForPageList(TUnivrslSettlIntrate.class,
				pageNumber, pageSize, sql, new Object[] {});	
	}
	public int addTUnivrslShare(TUnivrslSettlIntrate tUnivrslSettlIntrate) {
		tUnivrslSettlIntrate.setUnivrslId(Long.parseLong(this.getSeq("SEQ_UNIVRSL_SETTL_INTRATE")));
		return this.saveNew(tUnivrslSettlIntrate);	
	}
	public int upTUnivrslShare(TUnivrslSettlIntrate tUnivrslSettlIntrate) {
		return this.saveUpdate(tUnivrslSettlIntrate);
	}
	public int delTUnivrslSettlIntrate(TUnivrslSettlIntrate tUnivrslSettlIntrate) {
		return this.saveRemove(tUnivrslSettlIntrate);
	}

	public QueryResult queryTSurvvBeneAccumIntbeIntra(
			TSurvvBeneAccumIntbeIntra tSurvvBeneAccumIntbeIntra,
			int pageNumber, int pageSize) {
		String sql = "select * from T_SURVV_BENE_ACCUM_INTBE_INTRA b where 1=1 ";
		if (!StringUtil.isEmpty(tSurvvBeneAccumIntbeIntra.getInsurtypeCode())) {
			sql += "and b.INSURTYPE_CODE like '%"
					+ tSurvvBeneAccumIntbeIntra.getInsurtypeCode() + "%' ";
		}
		sql += "order by b.INSURTYPE_CODE asc";
		return this.queryForPageList(TSurvvBeneAccumIntbeIntra.class,
				pageNumber, pageSize, sql, new Object[] {});
	}
	public int addTSurvvShare(
			TSurvvBeneAccumIntbeIntra tSurvvBeneAccumIntbeIntra) {
		tSurvvBeneAccumIntbeIntra.setSurvvId(Long.parseLong(this.getSeq("SEQ_SURVV_BENE_ACCUM_INTBE")));
		return this.saveNew(tSurvvBeneAccumIntbeIntra);
	}
	public int upTSurvvShare(TSurvvBeneAccumIntbeIntra tSurvvBeneAccumIntbeIntra) {
		return this.saveUpdate(tSurvvBeneAccumIntbeIntra);
	}
	public int delTSurvvBeneAccumIntbeIntra(
			TSurvvBeneAccumIntbeIntra tSurvvBeneAccumIntbeIntra) {
		return this.saveRemove(tSurvvBeneAccumIntbeIntra);
	}

	public QueryResult queryTLoanPayIntrate(
			TLoanAutoPayIntrate tLoanAutoPayIntrate, int pageNumber,
			int pageSize) {
		String sql = "select * from T_LOAN_AUTO_PAY_INTRATE b where 1=1 ";
		if (tLoanAutoPayIntrate.getAnnounceDate() != null) {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd");
			String format = sdf.format(tLoanAutoPayIntrate.getAnnounceDate());
			sql += "and b.ANNOUNCE_DATE = to_date('"
					+ format + "','yyyy/MM/dd')";
		}
		sql += " order by b.LOAN_ID asc";
		return this.queryForPageList(TLoanAutoPayIntrate.class,
				pageNumber, pageSize, sql, new Object[] {});
	}
	public int addTLoanShare(TLoanAutoPayIntrate tLoanAutoPayIntrate) {
		tLoanAutoPayIntrate.setLoanId(Long.parseLong(this.getSeq("SEQ_LOAN_AUTO_PAY_INTRATE")));
		return this.saveNew(tLoanAutoPayIntrate);
	}
	public int upTLoanShare(TLoanAutoPayIntrate tLoanAutoPayIntrate) {
		return this.saveUpdate(tLoanAutoPayIntrate);
	}
	public int delTLoanPayIntrate(TLoanAutoPayIntrate tLoanAutoPayIntrate) {
		return this.saveRemove(tLoanAutoPayIntrate);
	}

	public QueryResult queryTDividParam(TDividParam tDividParam,
			int pageNumber, int pageSize) {
		String sql = "select * from T_DIVID_PARAM b where 1=1 ";		
		if (tDividParam.getAccountingYear()!= null) {
			sql += "and b.ACCOUNTING_YEAR like '%"
					+ tDividParam.getAccountingYear()+"%'";
		}
		sql += " order by b.DIVID_ID asc";
		return this.queryForPageList(TDividParam.class,
				pageNumber, pageSize, sql, new Object[] {});
	}

	public int addTDividShare(TDividParam tDividParam) {
		tDividParam.setDividId(Long.parseLong(this.getSeq("SEQ_DIVID_PARAM")));
		return this.saveNew(tDividParam);
	}
	public int upTDividShare(TDividParam tDividParam) {
		return this.saveUpdate(tDividParam);
	}

	public int delTDividShare(TDividParam tDividParam) {
		return this.saveRemove(tDividParam);
	}

	public QueryResult queryTCurrPriceIntrate(
			TCurrPriceIntrate tCurrPriceIntrate, int pageNumber, int pageSize) {
		String sql = "select * from T_CURR_PRICE_INTRATE b where 1=1 ";
		if (!StringUtil.isEmpty(tCurrPriceIntrate.getInsurtypeCode())) {
			sql += "and b.INSURTYPE_CODE like '%"
					+ tCurrPriceIntrate.getInsurtypeCode() + "%' ";
		}
		sql += " order by b.CURR_ID asc";
		return this.queryForPageList(TCurrPriceIntrate.class,
				pageNumber, pageSize, sql, new Object[] {});
	}
	public int addTCurrShare(TCurrPriceIntrate tCurrPriceIntrate) {
		tCurrPriceIntrate.setCurrId(Long.parseLong(this.getSeq("SEQ_CURR_PRICE_INTRATE")));
		return this.saveNew(tCurrPriceIntrate);
	}
	public int upTCurrShare(TCurrPriceIntrate tCurrPriceIntrate) {
		return this.saveUpdate(tCurrPriceIntrate);
	}
	public int delTCurrPriceIntrate(TCurrPriceIntrate tCurrPriceIntrate) {
		return this.saveRemove(tCurrPriceIntrate);
	}
	public void addTReserveFundFactor(String str) {
		TReserveFundFactor tReserveFundFactor = new TReserveFundFactor();
		if(str.contains(",")){
			String[] split = str.split(",");
			tReserveFundFactor.setReserveId(Long.parseLong(this.getSeq("SEQ_RESERVE_FUND_FACTOR")));
			tReserveFundFactor.setInsurtypeCode(split[0]);
			tReserveFundFactor.setSinglePayOrRegulPay(split[1]);
			tReserveFundFactor.setPaymntPeriod(Long.valueOf(split[2]));
			tReserveFundFactor.setInsurperiod(Long.valueOf(split[3]));
			tReserveFundFactor.setInsurdGender(split[4]);
			tReserveFundFactor.setApplyAge(Integer.valueOf(split[5]));
			tReserveFundFactor.setAnnuityStartDrawAge(Integer.valueOf(split[6]));
			tReserveFundFactor.setPolYear(Long.valueOf(split[7]));
			tReserveFundFactor.setReserveFundFactor(new BigDecimal(split[8]));
			tReserveFundFactor.setBasicSum(new BigDecimal(split[9]));
			this.saveNew(tReserveFundFactor);
		}
	}

	public QueryResult queryTReserveFundFactor(
			TReserveFundFactor tReserveFundFactor, int pageNumber, int pageSize) {
		String sql = "select * from T_RESERVE_FUND_FACTOR b where 1=1 ";
		if (!StringUtil.isEmpty(tReserveFundFactor.getInsurtypeCode())) {
			sql += "and b.INSURTYPE_CODE like '%"
					+ tReserveFundFactor.getInsurtypeCode() + "%' ";
		}
		sql += " order by b.RESERVE_ID asc";
		return this.queryForPageList(TReserveFundFactor.class,
				pageNumber, pageSize, sql, new Object[] {});
	}

	public int delTReserveFundFactor(
			TReserveFundFactor tReserveFundFactor) {
		String sql = "DELETE from T_RESERVE_FUND_FACTOR b where b.INSURTYPE_CODE = ?";
		return this.executeSQL(sql, new Object[]{tReserveFundFactor.getInsurtypeCode()});
	}

	public QueryResult queryTAssessNetPrem(TAssessNetPrem tAssessNetPrem,
			int pageNumber, int pageSize) {
		String sql = "select * from T_ASSESS_NET_PREM b where 1=1 ";
		if (!StringUtil.isEmpty(tAssessNetPrem.getInsurtypeCode())) {
			sql += "and b.INSURTYPE_CODE like '%"
					+ tAssessNetPrem.getInsurtypeCode() + "%' ";
		}
		sql += " order by b.ASSESS_ID asc";
		return this.queryForPageList(TAssessNetPrem.class,
				pageNumber, pageSize, sql, new Object[] {});
	}

	public int delTAssessNetPrem(TAssessNetPrem tAssessNetPrem) {
		String sql = "DELETE from T_ASSESS_NET_PREM b where b.INSURTYPE_CODE =?";
		return this.executeSQL(sql, new Object[]{tAssessNetPrem.getInsurtypeCode()});
	}

	public void addTAssessNetPrem(String string) {
		TAssessNetPrem tAssessNetPrem = new TAssessNetPrem();
		if(string.contains(",")){
			String[] split = string.split(",");
			tAssessNetPrem.setAssessId(Long.parseLong(this.getSeq("SEQ_ASSESS_NET_PREM")));
			tAssessNetPrem.setInsurtypeCode(split[0]);
			tAssessNetPrem.setSinglePayOrRegulPay(split[1]);
			tAssessNetPrem.setPaymntPeriod(Long.valueOf(split[2]));
			tAssessNetPrem.setInsurperiod(Long.valueOf(split[3]));
			tAssessNetPrem.setInsurdGender(split[4]);
			tAssessNetPrem.setApplyAge(Integer.valueOf(split[5]));
			tAssessNetPrem.setAnnuityStartDrawAge(Integer.valueOf(split[6]));
			tAssessNetPrem.setFirstperiodRenew(split[7]);
			tAssessNetPrem.setAssessNetPrem(new BigDecimal(split[8]));
			tAssessNetPrem.setBasicSum(new BigDecimal(split[9]));
			this.saveNew(tAssessNetPrem);
		}
	}

	
}
