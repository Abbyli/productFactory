/**
 * 
 */
package com.neusoft.abclife.productfactory.blo;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.neusoft.abclife.productfactory.dao.PfRiskItemDaoImpl;
import com.neusoft.abclife.productfactory.entity.TInsurtypeBasicInf;
import com.neusoft.abclife.productfactory.entity.TInsurtypePsItemDef;
import com.neusoft.abclife.productfactory.entity.TPsItemDef;
import com.neusoft.abclife.util.StringUtil;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author neusoft
 * 
 */
@Service("factoryabclife_pfRiskItemBo_bo")
@ModelFile(value = "pfRiskItemBo.bo")
public class PfRiskItemBoImpl {
	@Resource(name = "factoryabclife_pfRiskItemDao_dao")
	private PfRiskItemDaoImpl pfRiskItem;

	/**
	 * 
	 */
	public PfRiskItemBoImpl() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * 保全项定义查询
	 * @return
	 */
	public List<TPsItemDef> queryItem() {
		return this.pfRiskItem.queryItem();
	}

	/**
	 * 险种保全查询
	 * @param basic
	 * @return
	 */
	public List<TInsurtypePsItemDef> queryRiskItem(TInsurtypeBasicInf basic) {
		return this.pfRiskItem.queryRiskItem(basic);
	}

	/**
	 * 险种保全保存
	 * @param riskIrem
	 * @param basic
	 * @return
	 */
	public String saveItem(String riskIrem, TInsurtypeBasicInf basic) {
		String message = "";
		this.pfRiskItem.deleItem(basic);
		if(StringUtil.isNotEmpty(riskIrem)){
			String[] item = riskIrem.split(",");
			for (int i = 0; i < item.length; i++) {
				TInsurtypePsItemDef riskItem = new TInsurtypePsItemDef();
				riskItem.setInsurtypeId(basic.getInsurtypeId());
				riskItem.setPsItemId(Long.parseLong(item[i]));
				this.pfRiskItem.saveItem(riskItem);
			}
		}
	
		return message;
	}
}
