--T_RESERVE_FUND_FACTOR ��׼�������ӣ�
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
  is '׼��������';
comment on column T_RESERVE_FUND_FACTOR.RESERVE_ID
  is '׼��������id';
comment on column T_RESERVE_FUND_FACTOR.INSURTYPE_CODE
  is '���ֱ���';
comment on column T_RESERVE_FUND_FACTOR.SINGLE_PAY_OR_REGUL_PAY
  is '��/�ڽ�';
comment on column T_RESERVE_FUND_FACTOR.PAYMNT_PERIOD
  is '�����ڼ�';
comment on column T_RESERVE_FUND_FACTOR.INSURPERIOD
  is '�����ڼ�';
comment on column T_RESERVE_FUND_FACTOR.INSURD_GENDER
  is '���������Ա�';
comment on column T_RESERVE_FUND_FACTOR.APPLY_AGE
  is 'Ͷ������';
comment on column T_RESERVE_FUND_FACTOR.ANNUITY_START_DRAW_AGE
  is '���ʼ��ȡ����';
comment on column T_RESERVE_FUND_FACTOR.POL_YEAR
  is '�������';
comment on column T_RESERVE_FUND_FACTOR.RESERVE_FUND_FACTOR
  is '׼��������';
comment on column T_RESERVE_FUND_FACTOR.RESERVE_FUND_TYPE
  is '׼��������';
comment on column T_RESERVE_FUND_FACTOR.BASIC_SUM
  is '��������';
comment on column T_RESERVE_FUND_FACTOR.INSERT_OPER
  is '�������Ա';
comment on column T_RESERVE_FUND_FACTOR.INSERT_TIME
  is '����ʱ��';
comment on column T_RESERVE_FUND_FACTOR.UPDATE_OPER
  is '���²���Ա';
comment on column T_RESERVE_FUND_FACTOR.UPDATE_TIME
  is '����ʱ��';
comment on column T_RESERVE_FUND_FACTOR.INSERT_CONSIGNOR
  is '����ί����';
comment on column T_RESERVE_FUND_FACTOR.UPDATE_CONSIGNOR
  is '����ί����';
  
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
--��������
create sequence SEQ_RESERVE_FUND_FACTOR
minvalue 1
maxvalue 9999999999999999999999999999
start with 1
increment by 1
nocache;
