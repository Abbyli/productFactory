package com.neusoft.fdframework.arithmetic.engine.exceptions;

import com.neusoft.fdframework.core.exception.CoreException;

/**
 * 
 * <p>Title: 金融软件开发平台</p>.
 * <p>Description:算法引擎异常类</p>
 * <p>Copyright: Copyright (c) 2014</p>
 * @author 张阳
 * 2015年1月5日
 */
public class EngineException extends CoreException {
	
	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = -397023437875442338L;

	/**
	 * @param errorCode
	 * @param errorInfoParameters
	 * @param cause
	 */
	public EngineException(String errorCode, String[] errorInfoParameters,
			Throwable cause) {
		super(errorCode, errorInfoParameters, cause);
	}
	public EngineException(String errorCode,
			Throwable cause) {
		super(errorCode, null, cause);
	}

}
