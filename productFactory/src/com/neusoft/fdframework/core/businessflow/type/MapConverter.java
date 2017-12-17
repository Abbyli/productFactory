package com.neusoft.fdframework.core.businessflow.type;

import java.util.Map;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
/**
 * <p>Title: 金融软件开发平台</p>.
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2014</p>
 * @author 史忠钦
 * 2014-6-5
 */
@SuppressWarnings("rawtypes")
public class MapConverter implements Converter<Map> {
    /**
     * 参考父类或接口的注解.
     * @see com.neusoft.fdframework.core.businessflow.type.Converter#parseObject(java.lang.String, java.lang.Object)
     * @param type 类型
     * @param obj 待转换值
     * @return  转换结果值
     */
	@Override
	public Map parseObject(String type, Object obj) {
		if(obj instanceof Map){
			return (Map) obj;
		}else{
			return JSONObject.toJavaObject((JSON)obj, Map.class);
		}
	}
}
