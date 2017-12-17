--产品销售控制表
create table T_PRODUCT_SALE_CHNL
(
  PRODUCT_SALE_ID             NUMBER(16) not null,
  PRODUCT_ID                  NUMBER(16),
  PRODUCT_CODE                VARCHAR2(20),
  PRODUCT_VER                 NUMBER(16),
  SALE_CHNL                   VARCHAR2(2),
  SALE_MNGCOM                 VARCHAR2(16),
  BANK_CODE                   VARCHAR2(16),
  SALE_STATE                  VARCHAR2(2),
  STARTDATE                   DATE,
  ENDDATE                     DATE,
  INSERT_OPER                 VARCHAR2(40),
  INSERT_TIME                 DATE,
  UPDATE_OPER                 VARCHAR2(40),
  UPDATE_TIME                 DATE,
  INSERT_CONSIGNOR            VARCHAR2(40),
  UPDATE_CONSIGNOR            VARCHAR2(40)
)
tablespace USERS
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
comment on table T_PRODUCT_SALE_CHNL
  is '产品销售控制表';
comment on column T_PRODUCT_SALE_CHNL.PRODUCT_SALE_ID
  is '产品销售控制ID';
comment on column T_PRODUCT_SALE_CHNL.PRODUCT_ID
  is '产品ID';
comment on column T_PRODUCT_SALE_CHNL.PRODUCT_CODE
  is '产品代码';
comment on column T_PRODUCT_SALE_CHNL.PRODUCT_VER
  is '产品版本';
comment on column T_PRODUCT_SALE_CHNL.SALE_CHNL
  is '销售渠道 01-个人营销;03-银行代理;04-中介渠道;05-电话销售;06-网络销售;07-财富渠道';
comment on column T_PRODUCT_SALE_CHNL.SALE_MNGCOM
  is '销售机构';
comment on column T_PRODUCT_SALE_CHNL.BANK_CODE
  is '银行代码';
comment on column T_PRODUCT_SALE_CHNL.SALE_STATE
  is '销售状态 1-起售；0-停售';
comment on column T_PRODUCT_SALE_CHNL.STARTDATE
  is '起售日期';
comment on column T_PRODUCT_SALE_CHNL.ENDDATE
  is '停售日期';
comment on column T_PRODUCT_SALE_CHNL.INSERT_OPER
  is '插入操作员';
comment on column T_PRODUCT_SALE_CHNL.INSERT_TIME
  is '插入时间';
comment on column T_PRODUCT_SALE_CHNL.UPDATE_OPER
  is '更新操作员';
comment on column T_PRODUCT_SALE_CHNL.UPDATE_TIME
  is '更新时间';
comment on column T_PRODUCT_SALE_CHNL.INSERT_CONSIGNOR
  is '插入委托人';
comment on column T_PRODUCT_SALE_CHNL.UPDATE_CONSIGNOR
  is '更新委托人';
  
alter table T_PRODUCT_SALE_CHNL
  add primary key (PRODUCT_SALE_ID)
  using index 
  tablespace USERS
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
create sequence SEQ_PRODUCT_SALE_CHNL
minvalue 1
maxvalue 99999999999999
start with 1
increment by 1
cache 20;
