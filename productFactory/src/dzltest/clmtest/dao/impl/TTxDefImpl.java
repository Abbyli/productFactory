/**
 * 
 */
package dzltest.clmtest.dao.impl;

import java.util.ArrayList;

import org.springframework.stereotype.Component;

import com.neusoft.fdframework.core.base.BaseDao;
import com.neusoft.fdframework.core.base.QueryResult;
import com.neusoft.unieap.core.annotation.ModelFile;
import dzltest.clmtest.entity.TTxDef;

/**
 * @author dongzl
 *
 */
@Component("clmtest_TTxDef_dao")
@ModelFile(value = "TTxDef.dao")
public class TTxDefImpl extends BaseDao {

	protected String getTemplateName() {
		return "dataSource";
	}

	/**
	 * 
	 */
	public TTxDefImpl() {
		// TODO Auto-generated constructor stub
	}
	
	//获取列表
	public QueryResult getTTxDefList(TTxDef tTxDef,int pageNumber,int pageSize){
		
		ArrayList<String> params =new ArrayList<String>();
		StringBuilder sql = new StringBuilder();
		sql.append("select * from t_tx_def" );
		return this.queryForPageList(TTxDef.class, pageNumber, pageSize,sql.toString(),params.toArray());
	}
}
