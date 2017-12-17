insert into t_obj_entrance (ID, RISK_CODE, RISK_VER, PRICING_LIAB_CODE, PROTEC_LIAB_CODE, BUSI_TYPE, ALGO_TYPE, SUB_TYPE1, SUB_TYPE2, OBJ_SEQ)
values (1, '0000', 0, '000000', '000000', '', 'CANCEL', '', '', '001');

insert into t_obj_entrance (ID, RISK_CODE, RISK_VER, PRICING_LIAB_CODE, PROTEC_LIAB_CODE, BUSI_TYPE, ALGO_TYPE, SUB_TYPE1, SUB_TYPE2, OBJ_SEQ)
values (2, '0000', 1, '000000', '000000', '', 'EXPORT', '', '', '002');

insert into t_obj_entrance (ID, RISK_CODE, RISK_VER, PRICING_LIAB_CODE, PROTEC_LIAB_CODE, BUSI_TYPE, ALGO_TYPE, SUB_TYPE1, SUB_TYPE2, OBJ_SEQ)
values (3, '0000', 2, '000000', '000000', '', 'EXPORT', '', '', '003');

insert into t_obj_formula (ID, OBJ_ID, FORMULA_ID, DESCRIPTION, HAS_RELATION, RELATION_CONTENT, OBJ_SEQ, TYPE)
values (1, null, 65, '', '0', '', '001', 'CANCEL');

insert into t_obj_formula (ID, OBJ_ID, FORMULA_ID, DESCRIPTION, HAS_RELATION, RELATION_CONTENT, OBJ_SEQ, TYPE)
values (2, null, 68, '', '0', '', '002', 'EXPORT');

insert into t_obj_formula (ID, OBJ_ID, FORMULA_ID, DESCRIPTION, HAS_RELATION, RELATION_CONTENT, OBJ_SEQ, TYPE)
values (3, null, 69, '', '0', '', '003', 'EXPORT');

