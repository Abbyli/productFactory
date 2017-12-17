package com.neusoft.fdframework.jdbc;

import com.alibaba.fastjson.JSON;
import com.neusoft.fdframework.core.ServiceException;
import com.neusoft.fdframework.core.businessflow.runtime.BusinessContext;
import com.neusoft.fdframework.core.businessflow.runtime.BusinessData;
import com.neusoft.fdframework.jdbc.DBType;
import com.neusoft.fdframework.jdbc.DaoEvent;
import com.neusoft.fdframework.jdbc.DaoListener;
import com.neusoft.fdframework.jdbc.DaoOperations;
import com.neusoft.fdframework.jdbc.Dialect;
import com.neusoft.fdframework.jdbc.LobCreatingCallback;
import com.neusoft.fdframework.jdbc.Parameter;
import com.neusoft.fdframework.jdbc.PojoMetaData;
import com.neusoft.fdframework.jdbc.PojoMetaDataCache;
import com.neusoft.fdframework.jdbc.PojoRowMapper;

import java.io.Serializable;
import java.lang.reflect.Field;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Map;
import javax.annotation.Resource;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.PropertyAccessorFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.task.TaskExecutor;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.CallableStatementCreator;
import org.springframework.jdbc.core.ColumnMapRowMapper;
import org.springframework.jdbc.core.JdbcOperations;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.SingleColumnRowMapper;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.support.AbstractLobCreatingPreparedStatementCallback;
import org.springframework.jdbc.support.lob.LobCreator;
import org.springframework.jdbc.support.lob.LobHandler;
import org.springframework.jdbc.support.rowset.SqlRowSet;

public class CustomerDataSourceDaoTemplates
  implements DaoOperations
{
  private static final ThreadLocal<Boolean> daoListenerSwitchHolder = new ThreadLocal();

  private static final List<DaoListener> listenerList = new ArrayList();
  private String dbTypeName;
  private NamedParameterJdbcTemplate npJdbcTemplate;
  private Dialect dialect;
  private TaskExecutor executor;
  private LobHandler lobHandler;

  public static void addListener(DaoListener listener)
  {
    listenerList.add(listener);
  }

  @Value("${jdbc.dialect}")
  public void setDbTypeName(String dbTypeName)
  {
    this.dbTypeName = dbTypeName;
  }

  public DBType getDBType() {
    return (DBType)Enum.valueOf(DBType.class, this.dbTypeName);
  }

  private boolean canPublishEvent() {
    Boolean listenerSwitchOn = (Boolean)daoListenerSwitchHolder.get();
    if (listenerSwitchOn == null) {
      daoListenerSwitchHolder.set(Boolean.TRUE);
      listenerSwitchOn = Boolean.TRUE;
    }
    return (listenerSwitchOn.booleanValue()) && (!listenerList.isEmpty());
  }

  public void setNpJdbcTemplate(NamedParameterJdbcTemplate npJdbcTemplate)
  {
    this.npJdbcTemplate = npJdbcTemplate;
  }

  @Resource(name="fdframework.dao.dialect")
  public void setDialect(Dialect dialect)
  {
    this.dialect = dialect;
  }

  @Resource(name="fdframework.dao.taskExecutor")
  public void setExecutor(TaskExecutor executor)
  {
    this.executor = executor;
  }

  @Resource(name="fdframework.dao.lobHandler")
  public void setLobHandler(LobHandler lobHandler)
  {
    this.lobHandler = lobHandler;
  }

  public int executeUpdate(String sql, Object[] args) {
    DaoEvent evt = null;
    if (canPublishEvent()) {
      evt = new DaoEvent(sql, args, this);
    }
    int r = this.npJdbcTemplate.getJdbcOperations().update(sql, args);
    if (evt != null) {
      publishEvent(evt);
    }
    return r;
  }

  public SqlRowSet executeQuery(String sql, Object[] args) {
    DaoEvent evt = null;
    if (canPublishEvent()) {
      evt = new DaoEvent(sql, args, this);
    }
    SqlRowSet r = this.npJdbcTemplate.getJdbcOperations().queryForRowSet(sql, args);
    if (evt != null) {
      publishEvent(evt);
    }
    return r;
  }

  public int[] executeBatchUpdate(String sql, List<Object[]> args) {
    DaoEvent evt = null;
    if (canPublishEvent()) {
      evt = new DaoEvent(sql, args, this);
    }
    int[] rowsAffected = this.npJdbcTemplate.getJdbcOperations().batchUpdate(sql, args);
    if (evt != null) {
      publishEvent(evt);
    }
    int i = 0; for (int j = rowsAffected.length; i < j; i++) {
      if (rowsAffected[i] == -3) {
        throw new ServiceException("00900", new String[] { String.valueOf(i + 1), sql, JSON.toJSONString(args) });
      }
    }
    return rowsAffected;
  }

  public String getSequenceNextVal(String name) {
    String sql = this.dialect.getSequenceNextValSQL(name);
    SqlRowSet rs = executeQuery(sql, new Object[0]);
    if ((rs != null) && (rs.next())) {
      return rs.getString(1);
    }
    throw new ServiceException("00901", new String[] { name });
  }

  public int save(Object entity) {
    if (entity == null) {
      throw new ServiceException("00909", new String[] { "insert" });
    }
    String sql = PojoMetaDataCache.getMetaData(entity.getClass()).getInsertSql(entity);
    DaoEvent evt = null;
    if (canPublishEvent()) {
      evt = new DaoEvent(sql, entity, this);
    }
    int r = this.npJdbcTemplate.update(sql, new BeanPropertySqlParameterSource(entity));
    if (evt != null) {
      publishEvent(evt);
    }
    return r;
  }

  public int update(Object entity) {
    if (entity == null) {
      throw new ServiceException("00909", new String[] { "update" });
    }
    String sql = PojoMetaDataCache.getMetaData(entity.getClass()).getUpdateSql();
    DaoEvent evt = null;
    if (canPublishEvent()) {
      evt = new DaoEvent(sql, entity, this);
    }
    int r = this.npJdbcTemplate.update(sql, new BeanPropertySqlParameterSource(entity));
    if (evt != null) {
      publishEvent(evt);
    }
    return r;
  }

  public int delete(Object entity) {
    if (entity == null) {
      throw new ServiceException("00909", new String[] { "delete" });
    }
    PojoMetaData metadata = PojoMetaDataCache.getMetaData(entity.getClass());
    String sql = metadata.getDeleteSql();
    String primaryFieldName = metadata.getPrimaryField().getName();
    BeanWrapper bw = PropertyAccessorFactory.forBeanPropertyAccess(entity);
    Map namedParameters = Collections.singletonMap(primaryFieldName, bw.getPropertyValue(primaryFieldName));

    DaoEvent evt = null;
    if (canPublishEvent()) {
      evt = new DaoEvent(sql, namedParameters, this);
    }
    int r = this.npJdbcTemplate.update(sql, namedParameters);
    if (evt != null) {
      publishEvent(evt);
    }
    return r;
  }

  public <T> int delete(Class<T> pojoClass, Serializable id) {
    PojoMetaData metadata = PojoMetaDataCache.getMetaData(pojoClass);
    String sql = metadata.getDeleteSql();
    Map namedParameters = Collections.singletonMap(metadata.getPrimaryField().getName(), id);
    DaoEvent evt = null;
    if (canPublishEvent()) {
      evt = new DaoEvent(sql, namedParameters, this);
    }
    int r = this.npJdbcTemplate.update(sql, namedParameters);
    if (evt != null) {
      publishEvent(evt);
    }
    return r;
  }

  public <T> T get(Class<T> pojoClass, Serializable id) {
    PojoMetaData metadata = PojoMetaDataCache.getMetaData(pojoClass);
    String sql = metadata.getSelectSql();
    Map namedParameters = Collections.singletonMap(metadata.getPrimaryField().getName(), id);
    DaoEvent evt = null;
    if (canPublishEvent())
      evt = new DaoEvent(sql, namedParameters, this);
    try
    {
      Object localObject1 = this.npJdbcTemplate.queryForObject(sql, namedParameters, new PojoRowMapper(pojoClass));
      return (T) localObject1;
    }
    catch (EmptyResultDataAccessException e)
    {
      Object localObject2 = null;
      return (T) localObject2;
    }
    finally
    {
      if (evt != null)
        publishEvent(evt); 
    }
    
  }

  public <T> List<T> queryForList(Class<T> requiredType, String sql, Object[] args)
  {
    RowMapper mapper = null;
    if ((String.class.equals(requiredType)) || (Number.class.isAssignableFrom(requiredType)) || (Date.class.isAssignableFrom(requiredType)))
    {
      mapper = new SingleColumnRowMapper(requiredType);
    } else if (Map.class.equals(requiredType))
      mapper = new ColumnMapRowMapper();
    else {
      mapper = new PojoRowMapper(requiredType);
    }
    DaoEvent evt = null;
    if (canPublishEvent()) {
      evt = new DaoEvent(sql, args, this);
    }
    List list = this.npJdbcTemplate.getJdbcOperations().query(sql, args, mapper);
    if (evt != null) {
      publishEvent(evt);
    }
    return list;
  }

  public <T> List<T> queryForPagination(Class<T> requiredType, int pageNo, int pageSize, String sql, Object[] args) {
    String paginationSql = this.dialect.getPaginationSQL(sql, pageNo, pageSize);
    return queryForList(requiredType, paginationSql, args);
  }

  public int getTotalCount(String sql, Object[] args) {
    DaoEvent evt = null;
    if (canPublishEvent()) {
      evt = new DaoEvent(sql, args, this);
    }
    int i = ((Integer)this.npJdbcTemplate.getJdbcOperations().queryForObject(this.dialect.getTotalCountSQL(sql), Integer.class, args)).intValue();

    if (evt != null) {
      publishEvent(evt);
    }
    return i;
  }

  public <T> T queryForObject(Class<T> requiredType, String sql, Object[] args) {
    List list = queryForPagination(requiredType, 1, 1, sql, args);
    if (list.isEmpty()) {
      return null;
    }
    return (T) list.get(0);
  }

  public Map<String, Object> callProcedure(String procedureName, final Parameter[] params) {
    StringBuilder buffer = new StringBuilder(32);
    List paramList = new ArrayList(params.length);
    List inParamList = new ArrayList();
    int i = 0; for (int j = params.length; i < j; i++) {
      buffer.append("?, ");
      paramList.add(params[i].getParam());
      if (params[i].isInParam()) {
        inParamList.add(params[i].getValue());
      }
    }
    final String sql = new StringBuilder().append("{ call ").append(procedureName).append("(").append(buffer.substring(0, buffer.length() - 2)).append(") }").toString();
    DaoEvent evt = null;
    if (canPublishEvent()) {
      evt = new DaoEvent(sql, inParamList, this);
    }
    Map r = this.npJdbcTemplate.getJdbcOperations().call(new CallableStatementCreator() {
			public CallableStatement createCallableStatement(Connection conn) throws SQLException {
					CallableStatement cstmt = conn.prepareCall(sql);
					int i = 0; for (int j = params.length; i < j; i++) {
						if (params[i].isInParam()) {
							cstmt.setObject(i + 1, params[i].getValue(), params[i].getParam().getSqlType());
						}
						if (params[i].isOutParam()) {
							cstmt.registerOutParameter(i + 1, params[i].getParam().getSqlType());
						}
					}
					return cstmt;
			}
    }, inParamList);
    if (evt != null) {
      publishEvent(evt);
    }
    return r;
  }

  public int executeLobUpdate(String sql, final LobCreatingCallback action) {
    DaoEvent evt = null;
    if (canPublishEvent()) {
      evt = new DaoEvent(sql, "[BINARY CONTENT]", this);
    }
    int r = ((Integer)this.npJdbcTemplate.getJdbcOperations().execute(sql, 
    		new AbstractLobCreatingPreparedStatementCallback(this.lobHandler){
    				protected void setValues(PreparedStatement ps, LobCreator lobCreator) throws SQLException, DataAccessException
    				{
    					action.setValues(ps, lobCreator);
    				}
    		})).intValue();

    if (evt != null) {
      publishEvent(evt);
    }
    return r;
  }

  private void publishEvent(final DaoEvent evt)
  {
    evt.setUseTime(System.currentTimeMillis() - evt.getStartTime());
    BusinessData data = BusinessContext.getBusinessDataByInstanceId();

    evt.setBusinessData(data);
    this.executor.execute(new Runnable()
    {
      public void run()
      {
        CustomerDataSourceDaoTemplates.daoListenerSwitchHolder.set(Boolean.FALSE);
        try {
          for (DaoListener listener : CustomerDataSourceDaoTemplates.listenerList)
            listener.sqlPerformed(evt);
        }
        finally
        {
          CustomerDataSourceDaoTemplates.daoListenerSwitchHolder.set(null);
        }
      }
    });
  }
}