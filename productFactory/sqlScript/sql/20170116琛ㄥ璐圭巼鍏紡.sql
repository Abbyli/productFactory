insert into t_formula_def (ID, NAME, EXPRESSION, MEMO, RETURN_TYPE, RETURN_TYPE_CLASS, BUSI_TYPE, ALGO_TYPE)
values (68, '表外费率算法', 'calExportRate(''${appAge}'',''${newAppAge}'',''${sex}'',''${newAppSex}'',''${pricingLiabCode}'',''${riskVer}'',''RT_P'')', '表外费率算法1', 'number', '', '05', 'EXPORT');

insert into t_formula_def (ID, NAME, EXPRESSION, MEMO, RETURN_TYPE, RETURN_TYPE_CLASS, BUSI_TYPE, ALGO_TYPE)
values (69, '表外费率算法', 'calExportRate(''${appAge}'',''${newAppAge}'',''${sex}'',''${newAppSex}'',''${pricingLiabCode}'',''${riskVer}'',''RT_A'')', '表外费率算法2', 'number', '', '05', 'EXPORT');

insert into t_formula_param_ref (ID, FORMULA_ID, NAME, PROPERTY, PARAM_TYPE, RETURN_TYPE, RETURN_TYPE_CLASS, REF_VALUE)
values (184, 68, '原年龄', 'appAge', '2', 'number', '', 'Bom.appAge');

insert into t_formula_param_ref (ID, FORMULA_ID, NAME, PROPERTY, PARAM_TYPE, RETURN_TYPE, RETURN_TYPE_CLASS, REF_VALUE)
values (185, 68, '修改后年龄', 'newAppAge', '2', 'number', '', 'Bom.newAppAge');

insert into t_formula_param_ref (ID, FORMULA_ID, NAME, PROPERTY, PARAM_TYPE, RETURN_TYPE, RETURN_TYPE_CLASS, REF_VALUE)
values (186, 68, '原性别', 'sex', '2', 'number', '', 'Bom.sex');

insert into t_formula_param_ref (ID, FORMULA_ID, NAME, PROPERTY, PARAM_TYPE, RETURN_TYPE, RETURN_TYPE_CLASS, REF_VALUE)
values (187, 68, '修改后性别', 'newAppSex', '2', 'number', '', 'Bom.newAppSex');

insert into t_formula_param_ref (ID, FORMULA_ID, NAME, PROPERTY, PARAM_TYPE, RETURN_TYPE, RETURN_TYPE_CLASS, REF_VALUE)
values (188, 68, '定价责任代码', 'pricingLiabCode', '2', 'number', '', 'Bom.pricingLiabCode');

insert into t_formula_param_ref (ID, FORMULA_ID, NAME, PROPERTY, PARAM_TYPE, RETURN_TYPE, RETURN_TYPE_CLASS, REF_VALUE)
values (189, 68, '版本', 'riskVer', '2', 'number', '', 'Bom.riskVer');

insert into t_formula_param_ref (ID, FORMULA_ID, NAME, PROPERTY, PARAM_TYPE, RETURN_TYPE, RETURN_TYPE_CLASS, REF_VALUE)
values (190, 69, '原年龄', 'appAge', '2', 'number', '', 'Bom.appAge');

insert into t_formula_param_ref (ID, FORMULA_ID, NAME, PROPERTY, PARAM_TYPE, RETURN_TYPE, RETURN_TYPE_CLASS, REF_VALUE)
values (191, 69, '修改后年龄', 'newAppAge', '2', 'number', '', 'Bom.newAppAge');

insert into t_formula_param_ref (ID, FORMULA_ID, NAME, PROPERTY, PARAM_TYPE, RETURN_TYPE, RETURN_TYPE_CLASS, REF_VALUE)
values (192, 69, '原性别', 'sex', '2', 'number', '', 'Bom.sex');

insert into t_formula_param_ref (ID, FORMULA_ID, NAME, PROPERTY, PARAM_TYPE, RETURN_TYPE, RETURN_TYPE_CLASS, REF_VALUE)
values (193, 69, '修改后性别', 'newAppSex', '2', 'number', '', 'Bom.newAppSex');

insert into t_formula_param_ref (ID, FORMULA_ID, NAME, PROPERTY, PARAM_TYPE, RETURN_TYPE, RETURN_TYPE_CLASS, REF_VALUE)
values (194, 69, '定价责任代码', 'pricingLiabCode', '2', 'number', '', 'Bom.pricingLiabCode');

insert into t_formula_param_ref (ID, FORMULA_ID, NAME, PROPERTY, PARAM_TYPE, RETURN_TYPE, RETURN_TYPE_CLASS, REF_VALUE)
values (195, 69, '版本', 'riskVer', '2', 'number', '', 'Bom.riskVer');

