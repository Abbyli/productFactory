insert into t_formula_def (ID, NAME, EXPRESSION, MEMO, RETURN_TYPE, RETURN_TYPE_CLASS, BUSI_TYPE, ALGO_TYPE)
values (67, '理赔D1', 'amnt*n*calExp(''${basic}'',''${pow}'',''${unit}'')', '保额*比例*（1+增长系数）^(领取次数-1)', 'number', '', '02', 'D1');

insert into t_formula_param_ref (ID, FORMULA_ID, NAME, PROPERTY, PARAM_TYPE, RETURN_TYPE, RETURN_TYPE_CLASS, REF_VALUE)
values (179, 67, '保额', 'amnt', '2', 'number', '', 'Bom.amnt');

insert into t_formula_param_ref (ID, FORMULA_ID, NAME, PROPERTY, PARAM_TYPE, RETURN_TYPE, RETURN_TYPE_CLASS, REF_VALUE)
values (180, 67, '比例', 'n', '1', 'number', '', '');

insert into t_formula_param_ref (ID, FORMULA_ID, NAME, PROPERTY, PARAM_TYPE, RETURN_TYPE, RETURN_TYPE_CLASS, REF_VALUE)
values (181, 67, '增长系数', 'basic', '1', 'number', '', '');

insert into t_formula_param_ref (ID, FORMULA_ID, NAME, PROPERTY, PARAM_TYPE, RETURN_TYPE, RETURN_TYPE_CLASS, REF_VALUE)
values (182, 67, '领取次数', 'pow', '2', 'number', '', 'Bom.pow');

insert into t_formula_param_ref (ID, FORMULA_ID, NAME, PROPERTY, PARAM_TYPE, RETURN_TYPE, RETURN_TYPE_CLASS, REF_VALUE)
values (183, 67, '计算单位', 'unit', '2', 'number', '', 'Bom.unit');



