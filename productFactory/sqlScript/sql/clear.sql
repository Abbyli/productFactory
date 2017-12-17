--险种表
delete from t_Insurtype_Basic_Inf;
-- 产品状态表                            
delete from t_product_status_inf; 
-- 产品流程表                             
delete from t_product_def_apply;
-- 产品审核表                              
delete from t_product_def_approve;
-- 定价责任表
delete from t_pricing_liab_def;
-- 责任加费表
delete from T_LIAB_FEE_DEF;
-- 对象要素表   
delete from t_obj_skelement;
-- 对象要素展现表  
delete from t_prop_show_def;
-- 保障责任表
delete from t_protec_liab_def;
-- 理赔给付表
delete from t_claim_givepay_def;
--给付后处理动作
delete from T_GIVEPAID_PROCESS_DEF;
-- 理赔账单明细表
delete from t_claim_pay_item_detail;
-- 对象公式表相关
delete from t_obj_formula;
delete from t_obj_entrance;
delete from t_obj_param;
delete from t_obj_relation;
-- 生存给付表 
delete from t_survv_givepay_def;
-- 精算数据表
delete from t_obj_rate;
--险种精算费率表维度关联表
delete from T_OBJ_RATE_DIMEN_REF;
-- 费用费率表
delete from t_fee_rate;
-- 账户定义表
delete from t_insurtype_acc_def;
-- 险种账户中间表
delete from t_insurtype_rel_to_acc;
-- 参数定义表  
delete from t_product_param_def;
-- 人员定义表
delete from t_insurtype_cust_elem_ctrl;

-- 责任限额
delete from t_liab_limit;
--保全属性
delete from t_insurtype_ps_attrib_def;
-- 保全定义
delete from t_insurtype_ps_item_def;
-- 险种搭配表
delete from t_product_insurtype_match_rel;
-- 险种属性表
delete from t_combo_attrib;
-- 险种信息
delete from t_combo_inf;
--组合险种
delete from t_combo_insurtype;
--组合要素关系
delete from t_combo_insurtype_elem_rel;
--现价利率
--delete from t_curr_price_intrate;
--红利参数
--delete from t_divid_param;
-- 组合算法入口
delete from t_obj_entrance_combine;
-- 
delete from t_pro_interface_ref;
--条款
delete from t_rule_manage_def;
--万能结算利率
--delete from t_univrsl_settl_intrate;
--费用定义表
delete from t_insurtype_fee_def;
--贷款 自垫利率
delete from t_loan_auto_pay_intrate;
--生存金累计生息利率
delete from t_survv_bene_accum_intbe_intra;
















