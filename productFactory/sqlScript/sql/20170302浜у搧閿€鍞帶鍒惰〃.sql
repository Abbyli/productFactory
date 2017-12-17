--��Ʒ���ۿ��Ʊ�
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
  is '��Ʒ���ۿ��Ʊ�';
comment on column T_PRODUCT_SALE_CHNL.PRODUCT_SALE_ID
  is '��Ʒ���ۿ���ID';
comment on column T_PRODUCT_SALE_CHNL.PRODUCT_ID
  is '��ƷID';
comment on column T_PRODUCT_SALE_CHNL.PRODUCT_CODE
  is '��Ʒ����';
comment on column T_PRODUCT_SALE_CHNL.PRODUCT_VER
  is '��Ʒ�汾';
comment on column T_PRODUCT_SALE_CHNL.SALE_CHNL
  is '�������� 01-����Ӫ��;03-���д���;04-�н�����;05-�绰����;06-��������;07-�Ƹ�����';
comment on column T_PRODUCT_SALE_CHNL.SALE_MNGCOM
  is '���ۻ���';
comment on column T_PRODUCT_SALE_CHNL.BANK_CODE
  is '���д���';
comment on column T_PRODUCT_SALE_CHNL.SALE_STATE
  is '����״̬ 1-���ۣ�0-ͣ��';
comment on column T_PRODUCT_SALE_CHNL.STARTDATE
  is '��������';
comment on column T_PRODUCT_SALE_CHNL.ENDDATE
  is 'ͣ������';
comment on column T_PRODUCT_SALE_CHNL.INSERT_OPER
  is '�������Ա';
comment on column T_PRODUCT_SALE_CHNL.INSERT_TIME
  is '����ʱ��';
comment on column T_PRODUCT_SALE_CHNL.UPDATE_OPER
  is '���²���Ա';
comment on column T_PRODUCT_SALE_CHNL.UPDATE_TIME
  is '����ʱ��';
comment on column T_PRODUCT_SALE_CHNL.INSERT_CONSIGNOR
  is '����ί����';
comment on column T_PRODUCT_SALE_CHNL.UPDATE_CONSIGNOR
  is '����ί����';
  
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
