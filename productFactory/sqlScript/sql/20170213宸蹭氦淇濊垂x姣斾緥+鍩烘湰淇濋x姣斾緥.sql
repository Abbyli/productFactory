insert into t_formula_def (ID, NAME, EXPRESSION, MEMO, RETURN_TYPE, RETURN_TYPE_CLASS, BUSI_TYPE, ALGO_TYPE)
values (70, '理赔D1', 'prem*n+amnt*m', '已交保费*比例+保额*比例', 'number', '', '02', 'D1');

insert into t_formula_param_ref (ID, FORMULA_ID, NAME, PROPERTY, PARAM_TYPE, RETURN_TYPE, RETURN_TYPE_CLASS, REF_VALUE)
values (202, 70, '已交保费', 'prem', '2', 'number', '', 'Bom.prem');

insert into t_formula_param_ref (ID, FORMULA_ID, NAME, PROPERTY, PARAM_TYPE, RETURN_TYPE, RETURN_TYPE_CLASS, REF_VALUE)
values (203, 70, '保费比例', 'n', '1', 'number', '', '');

insert into t_formula_param_ref (ID, FORMULA_ID, NAME, PROPERTY, PARAM_TYPE, RETURN_TYPE, RETURN_TYPE_CLASS, REF_VALUE)
values (204, 70, '保额', 'amnt', '2', 'number', '', 'Bom.amnt');

insert into t_formula_param_ref (ID, FORMULA_ID, NAME, PROPERTY, PARAM_TYPE, RETURN_TYPE, RETURN_TYPE_CLASS, REF_VALUE)
values (205, 70, '保额比例', 'm', '1', 'number', '', '');



