/**
 * 
 */
package dzltest.clmtest.bo.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.neusoft.fdframework.core.base.QueryResult;
import com.neusoft.unieap.core.annotation.ModelFile;

import dzltest.clmtest.dao.impl.TTxDefImpl;
import dzltest.clmtest.entity.TTxDef;

/**
 * @author dongzl
 *
 */
@Service("clmtest_TTxDef_bo")
@ModelFile(value = "TTxDef.bo")
public class TTxDefBOImpl {

	//注入DAO实现类
	@Resource(name="")
	private TTxDefImpl ttxDef;
	/**
	 * 
	 */
	public TTxDefBOImpl() {
		// TODO Auto-generated constructor stub
	}
	
	public QueryResult getTTxDefList(TTxDef tTxDef,int pageNumber,int pageSize) throws Exception{
		
		return this.ttxDef.getTTxDefList(tTxDef,pageNumber,pageSize);
	}

}
