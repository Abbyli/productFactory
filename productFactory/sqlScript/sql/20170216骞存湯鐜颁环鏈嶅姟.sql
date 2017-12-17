insert into t_obj_formula (ID, OBJ_ID, FORMULA_ID, DESCRIPTION, HAS_RELATION, RELATION_CONTENT, OBJ_SEQ, TYPE)
values (4, null, 71, '', '0', '', '004', 'CASHVA');

insert into t_obj_entrance (ID, RISK_CODE, RISK_VER, PRICING_LIAB_CODE, PROTEC_LIAB_CODE, BUSI_TYPE, ALGO_TYPE, SUB_TYPE1, SUB_TYPE2, OBJ_SEQ, SUB_GETDUTY_CODE)
values (4, '0000', 3, '000000', '000000', '', 'CASHVA', '', '', '004', '');

insert into t_formula_param_ref (ID, FORMULA_ID, NAME, PROPERTY, PARAM_TYPE, RETURN_TYPE, RETURN_TYPE_CLASS, REF_VALUE)
values (206, 71, '�������δ���', 'pricingLiabCode', '2', 'number', '', 'Bom.pricingLiabCode');

insert into t_formula_param_ref (ID, FORMULA_ID, NAME, PROPERTY, PARAM_TYPE, RETURN_TYPE, RETURN_TYPE_CLASS, REF_VALUE)
values (207, 71, '�汾��', 'riskVer', '2', 'number', '', 'Bom.riskVer');

insert into t_formula_param_ref (ID, FORMULA_ID, NAME, PROPERTY, PARAM_TYPE, RETURN_TYPE, RETURN_TYPE_CLASS, REF_VALUE)
values (208, 71, '���㵥λ', 'unit', '2', 'number', '', 'Bom.unit');

insert into t_formula_param_ref (ID, FORMULA_ID, NAME, PROPERTY, PARAM_TYPE, RETURN_TYPE, RETURN_TYPE_CLASS, REF_VALUE)
values (209, 71, '�������', 'insYear', '2', 'number', '', 'Bom.insYear');

insert into t_formula_def (ID, NAME, EXPRESSION, MEMO, RETURN_TYPE, RETURN_TYPE_CLASS, BUSI_TYPE, ALGO_TYPE)
values (71, '��ĩ�ּ�', 'getValueEnd(''${pricingLiabCode}'',''${riskVer}'',''${unit}'',''${insYear}'')', '������ĩ�ּ�', 'number', '', '03', 'CASHVA');

