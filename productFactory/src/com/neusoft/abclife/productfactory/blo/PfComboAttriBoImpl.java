/**
 * 
 */
package com.neusoft.abclife.productfactory.blo;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.neusoft.abclife.productfactory.dao.PfComboAttriDaoImpl;
import com.neusoft.abclife.productfactory.entity.TComboAttrib;
import com.neusoft.abclife.productfactory.entity.TComboInf;
import com.neusoft.abclife.productfactory.entity.TComboInsurtype;
import com.neusoft.abclife.productfactory.entity.TInsurtypeBasicInf;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author Administrator
 *
 */
@Service("factoryabclife_pfComboAttriBo_bo")
@ModelFile(value = "pfComboAttriBo.bo")
public class PfComboAttriBoImpl {

	/**
	 * 
	 */
	public PfComboAttriBoImpl() {
		// TODO Auto-generated constructor stub
	}
	@Resource(name="factoryabclife_pfComboAttriDao_dao")
	private PfComboAttriDaoImpl pfComboAttrib;
	//保存组合属性
	public void saveComboAttrib(TComboAttrib comboAttrib){
		if(comboAttrib.getComboAttribId()==null || "".equals(comboAttrib.getComboAttribId())){
			pfComboAttrib.addComboAttri(comboAttrib);
		}else{
			pfComboAttrib.updComboAttri(comboAttrib);
		}
		
	}
	//查询组合属性
	public TComboAttrib queryComboAttrib(TComboInf comboInf){
		return pfComboAttrib.queryComboAttrib(comboInf);
	}
	
	//返回进万能账户map
	public Map<String,String> getMapForFlag(TComboInf comboInf){
		Map<String,String> map = new HashMap<String,String>();
		List<TComboInsurtype> insurList = pfComboAttrib.getTComboInsurtype(comboInf);
		List<TInsurtypeBasicInf> infList = new ArrayList<TInsurtypeBasicInf>();
		for(int i = 0;i<insurList.size();i++){
			infList.add(pfComboAttrib.getInsurInf(insurList.get(i).getInsurtypeId()));
		}
		
		for(int i=0;i<infList.size();i++){
			//03=万能
			if("03".equals(infList.get(i).getDesignType())){
				for(int j = 0;j < infList.size() ; j++){
					//02=分红
					if("02".equals(infList.get(j).getDesignType())){
						map.put("bonus", "红利进万能账户");
					}
					
					if("1".equals(infList.get(j).getIsAnnuityType())){
						map.put("live", "生存金进账户");
					}
				}
			}
		}
		map.put("_t", "1");
		return map;
	}

}
