
insert into t_function_def (ID, FUNC_PROPERTY, FUNC_NAME, CLASS_NAME, METHOD_NAME, FUNC_TYPE)
values (16, 'getValueEnd', '年末现价', 'com.neusoft.abclife.util.PfTestFunc', 'getValueEnd', 'static');




insert into t_function_arg_ref (ID, FUNC_ID, NAME, ORDER_NUM, ARG_TYPE, RETURN_TYPE, REF_VALUE, FLAG)
values (45, '16', 'pricingLiabCode', 1, '3', 'string', '', 'outter');

insert into t_function_arg_ref (ID, FUNC_ID, NAME, ORDER_NUM, ARG_TYPE, RETURN_TYPE, REF_VALUE, FLAG)
values (46, '16', 'riskVer', 2, '3', 'string', '', 'outter');

insert into t_function_arg_ref (ID, FUNC_ID, NAME, ORDER_NUM, ARG_TYPE, RETURN_TYPE, REF_VALUE, FLAG)
values (47, '16', 'unit', 3, '3', 'string', '', 'outter');

insert into t_function_arg_ref (ID, FUNC_ID, NAME, ORDER_NUM, ARG_TYPE, RETURN_TYPE, REF_VALUE, FLAG)
values (48, '16', 'insYear', 4, '3', 'string', '', 'outter');





update t_formula_def set expression = 'getMax(''#0{prem*n}0#'',''#0{getValueEnd(''${pricingLiabCode}'',''${riskVer}'',''${unit}'',''${insYear}'')}0#'')' where id = 25;
update t_formula_def set expression = 'getMax(''#0{amnt*n}0#'',''#0{getValueEnd(''${pricingLiabCode}'',''${riskVer}'',''${unit}'',''${insYear}'')}0#'')' where id = 24;



delete  from t_formula_param_ref where formula_id in (24,25);

insert into t_formula_param_ref (ID, FORMULA_ID, NAME, PROPERTY, PARAM_TYPE, RETURN_TYPE, RETURN_TYPE_CLASS, REF_VALUE)
values (32, 24, '基本保额', 'amnt', '2', 'number', '', 'Bom.amnt');

insert into t_formula_param_ref (ID, FORMULA_ID, NAME, PROPERTY, PARAM_TYPE, RETURN_TYPE, RETURN_TYPE_CLASS, REF_VALUE)
values (33, 24, '比例', 'n', '1', 'nunber', '', '');

insert into t_formula_param_ref (ID, FORMULA_ID, NAME, PROPERTY, PARAM_TYPE, RETURN_TYPE, RETURN_TYPE_CLASS, REF_VALUE)
values (34, 24, '定价责任', 'pricingLiabCode', '2', 'number', '', 'Bom.pricingLiabCode');

insert into t_formula_param_ref (ID, FORMULA_ID, NAME, PROPERTY, PARAM_TYPE, RETURN_TYPE, RETURN_TYPE_CLASS, REF_VALUE)
values (35, 25, '已交保费', 'prem', '2', 'number', '', 'Bom.prem');

insert into t_formula_param_ref (ID, FORMULA_ID, NAME, PROPERTY, PARAM_TYPE, RETURN_TYPE, RETURN_TYPE_CLASS, REF_VALUE)
values (36, 25, '比例', 'n', '1', 'number', '', '');

insert into t_formula_param_ref (ID, FORMULA_ID, NAME, PROPERTY, PARAM_TYPE, RETURN_TYPE, RETURN_TYPE_CLASS, REF_VALUE)
values (37, 25, '定价责任', 'pricingLiabCode', '2', 'number', '', 'Bom.pricingLiabCode');

insert into t_formula_param_ref (ID, FORMULA_ID, NAME, PROPERTY, PARAM_TYPE, RETURN_TYPE, RETURN_TYPE_CLASS, REF_VALUE)
values (196, 24, '版本号', 'riskVer', '2', 'number', '', 'Bom.riskVer');

insert into t_formula_param_ref (ID, FORMULA_ID, NAME, PROPERTY, PARAM_TYPE, RETURN_TYPE, RETURN_TYPE_CLASS, REF_VALUE)
values (197, 24, '计算单位', 'unit', '2', 'nunber', '', 'Bom.unit');

insert into t_formula_param_ref (ID, FORMULA_ID, NAME, PROPERTY, PARAM_TYPE, RETURN_TYPE, RETURN_TYPE_CLASS, REF_VALUE)
values (198, 24, '保单年度', 'insYear', '2', 'nunber', '', 'Bom.insYear');

insert into t_formula_param_ref (ID, FORMULA_ID, NAME, PROPERTY, PARAM_TYPE, RETURN_TYPE, RETURN_TYPE_CLASS, REF_VALUE)
values (199, 25, '版本号', 'riskVer', '2', 'number', '', 'Bom.riskVer');

insert into t_formula_param_ref (ID, FORMULA_ID, NAME, PROPERTY, PARAM_TYPE, RETURN_TYPE, RETURN_TYPE_CLASS, REF_VALUE)
values (200, 25, '计算单位', 'unit', '2', 'nunber', '', 'Bom.unit');

insert into t_formula_param_ref (ID, FORMULA_ID, NAME, PROPERTY, PARAM_TYPE, RETURN_TYPE, RETURN_TYPE_CLASS, REF_VALUE)
values (201, 25, '保单年度', 'insYear', '2', 'nunber', '', 'Bom.insYear');

