--T_RESERVE_FUND_FACTOR （准备金因子）
create table T_RESERVE_FUND_FACTOR
(
  RESERVE_ID                      NUMBER(16) not null,
  INSURTYPE_CODE                   VARCHAR2(20),      
  SINGLE_PAY_OR_REGUL_PAY          VARCHAR2(1),   
  PAYMNT_PERIOD                    NUMBER(10),
  INSURPERIOD                      NUMBER(10),
  INSURD_GENDER                   VARCHAR2(2),    
  APPLY_AGE                       NUMBER(3),
  ANNUITY_START_DRAW_AGE          NUMBER(3),
  POL_YEAR                        NUMBER(10),
  RESERVE_FUND_FACTOR             NUMBER(20,2),
  RESERVE_FUND_TYPE               VARCHAR2(2),
  BASIC_SUM                       NUMBER(20,6),
  INSERT_OPER VARCHAR2(40),
  INSERT_TIME DATE,
  UPDATE_OPER VARCHAR2(40),
  UPDATE_TIME DATE,
  INSERT_CONSIGNOR VARCHAR2(40),
  UPDATE_CONSIGNOR  VARCHAR2(40)  
)
tablespace USERS
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64
    next 1
    minextents 1
    maxextents unlimited
  );
comment on table T_RESERVE_FUND_FACTOR
  is '准备金因子';
comment on column T_RESERVE_FUND_FACTOR.RESERVE_ID
  is '准备金因子id';
comment on column T_RESERVE_FUND_FACTOR.INSURTYPE_CODE
  is '险种编码';
comment on column T_RESERVE_FUND_FACTOR.SINGLE_PAY_OR_REGUL_PAY
  is '趸/期交';
comment on column T_RESERVE_FUND_FACTOR.PAYMNT_PERIOD
  is '交费期间';
comment on column T_RESERVE_FUND_FACTOR.INSURPERIOD
  is '保险期间';
comment on column T_RESERVE_FUND_FACTOR.INSURD_GENDER
  is '被保险人性别';
comment on column T_RESERVE_FUND_FACTOR.APPLY_AGE
  is '投保年龄';
comment on column T_RESERVE_FUND_FACTOR.ANNUITY_START_DRAW_AGE
  is '年金开始领取年龄';
comment on column T_RESERVE_FUND_FACTOR.POL_YEAR
  is '保单年度';
comment on column T_RESERVE_FUND_FACTOR.RESERVE_FUND_FACTOR
  is '准备金因子';
comment on column T_RESERVE_FUND_FACTOR.RESERVE_FUND_TYPE
  is '准备金类型';
comment on column T_RESERVE_FUND_FACTOR.BASIC_SUM
  is '基本保额';
comment on column T_RESERVE_FUND_FACTOR.INSERT_OPER
  is '插入操作员';
comment on column T_RESERVE_FUND_FACTOR.INSERT_TIME
  is '插入时间';
comment on column T_RESERVE_FUND_FACTOR.UPDATE_OPER
  is '更新操作员';
comment on column T_RESERVE_FUND_FACTOR.UPDATE_TIME
  is '更新时间';
comment on column T_RESERVE_FUND_FACTOR.INSERT_CONSIGNOR
  is '插入委托人';
comment on column T_RESERVE_FUND_FACTOR.UPDATE_CONSIGNOR
  is '更新委托人';
  
alter table T_RESERVE_FUND_FACTOR
  add constraint PK_RESERVE_FUND_FACTOR primary key (RESERVE_ID)
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
--创建序列
create sequence SEQ_RESERVE_FUND_FACTOR
minvalue 1
maxvalue 9999999999999999999999999999
start with 1
increment by 1
nocache;
