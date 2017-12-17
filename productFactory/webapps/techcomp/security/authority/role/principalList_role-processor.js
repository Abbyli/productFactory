 /*** @author hanyongxu * @creationTime 2014-08-08 16:28:31 * @modificationTime 2014-12-31 16:39:49 * @version 1.0.0* @generated */dojo.provide("_security.authority.role.principalList_role.Processor");dojo.declare("_security.authority.role.principalList_role.Processor",unieap.view.Processor, {getAllEnableSysSecRole: function(_load,_error ){return this.run({ processorName:"getAllEnableSysSecRole", uParameters:[],viewName:"principalList_role",loadSuccessed:this.view.getAllEnableSysSecRoleSuccess,boInvoked:{dcID:"security",boID:"security_role.business.xml_bo",methodName:"security.role.getAllEnableSysSecRoleForUnieap"},showLoading:true},_load,_error); },getAuthorityMenuList: function(id,principal,_load,_error ){return this.run({ processorName:"getAuthorityMenuList", uParameters:[{name:"id",type:"string",javaType:"",value:id},{name:"principal",type:"string",javaType:"",value:principal}],viewName:"principalList_role",loadSuccessed:this.view.getAuthorityMenuListSuccess,pagingInfo:{pageNumber:1,pageSize:10,calcRecordCount:true},boInvoked:{dcID:"security",boID:"security_menu.business.xml_bo",methodName:"security.authority.getAuthorityMenuListForUnieap"},showLoading:true},_load,_error); },getMenuTree: function(appId,pageNumber,pageSize,_load,_error ){return this.run({ processorName:"getMenuTree", uParameters:[{name:"appId",type:"string",javaType:"",value:appId},{name:"pageNumber",type:"string",javaType:"",value:pageNumber},{name:"pageSize",type:"string",javaType:"",value:pageSize}],viewName:"principalList_role",loadSuccessed:this.view.getMenuTreeSuccess,pagingInfo:{pageNumber:1,pageSize:1000,calcRecordCount:true},boInvoked:{dcID:"security",boID:"security_menu.business.xml_bo",methodName:"security.menu.getAllAuthorityMenuListForUnieap"},serverExportCompatible:true,showLoading:true},_load,_error); },saveAuthority: function(sid,principal,classPath,commonList,_load,_error ){return this.run({ processorName:"saveAuthority", uParameters:[{name:"sid",type:"string",javaType:"",value:sid},{name:"principal",type:"string",javaType:"",value:principal},{name:"classPath",type:"string",javaType:"",value:classPath},{name:"commonList",type:"pojoList",javaType:"",value:commonList}],viewName:"principalList_role",loadSuccessed:this.view.saveAuthoritySuccess,boInvoked:{dcID:"security",boID:"security_authority.business.xml_bo",methodName:"security.authority.inserRoleAuthorityForUnieap"},showLoading:true},_load,_error); }});