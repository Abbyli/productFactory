insert into t_Formula_Param_Ref (ID, FORMULA_ID, NAME, PROPERTY, PARAM_TYPE, RETURN_TYPE, RETURN_TYPE_CLASS, REF_VALUE)
values (214, 72, '交费频率', 'payIntv', '2', 'number', '', 'Bom.payIntv');

insert into t_Formula_Param_Ref (ID, FORMULA_ID, NAME, PROPERTY, PARAM_TYPE, RETURN_TYPE, RETURN_TYPE_CLASS, REF_VALUE)
values (213, 72, '计算单位', 'unit', '2', 'number', '', 'Bom.unit');

insert into t_Formula_Param_Ref (ID, FORMULA_ID, NAME, PROPERTY, PARAM_TYPE, RETURN_TYPE, RETURN_TYPE_CLASS, REF_VALUE)
values (212, 72, '版本号', 'riskVer', '2', 'number', '', 'Bom.riskVer');

insert into t_Formula_Param_Ref (ID, FORMULA_ID, NAME, PROPERTY, PARAM_TYPE, RETURN_TYPE, RETURN_TYPE_CLASS, REF_VALUE)
values (211, 72, '定价责任代码', 'pricingLiabCode', '2', 'number', '', 'Bom.pricingLiabCode');

insert into t_Formula_Param_Ref (ID, FORMULA_ID, NAME, PROPERTY, PARAM_TYPE, RETURN_TYPE, RETURN_TYPE_CLASS, REF_VALUE)
values (210, 72, '份数', 'mult', '2', 'number', '', 'Bom.mult');

insert into t_formula_def (ID, NAME, EXPRESSION, MEMO, RETURN_TYPE, RETURN_TYPE_CLASS, BUSI_TYPE, ALGO_TYPE)
values (72, '保费算法A2', 'mult*10000/1000*getPremRate(''${pricingLiabCode}'',''${riskVer}'',''${unit}'')*getPayIntv(''${payIntv}'')', '份数*10000/1000*费率*交费因子', 'number', '', '01', 'A2');

