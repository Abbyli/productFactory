 /*** @author user * @creationTime 2014-07-03 18:41:37 * @modificationTime 2014-11-14 14:22:06 * @version 1.0.0* @generated */dojo.provide("_security.datascope.datascope_add.Processor");dojo.declare("_security.datascope.datascope_add.Processor",unieap.view.Processor, {save: function(dataScope,dataScopeParamList,_load,_error ){return this.run({ processorName:"save", uParameters:[{name:"dataScope",type:"pojo",javaType:"",value:dataScope},{name:"dataScopeParamList",type:"pojoList",javaType:"",value:dataScopeParamList}],viewName:"datascope_add",loadSuccessed:this.view.saveSuccess,boInvoked:{dcID:"security",boID:"security_dataScope.business.xml_bo",methodName:"security.dataScope.insertDataScopeForUniEAP"},showLoading:true},_load,_error); },getSourceList: function(_load,_error ){return this.run({ processorName:"getSourceList", uParameters:[],viewName:"datascope_add",loadSuccessed:this.view.getSourceListSuccess,boInvoked:{dcID:"security",boID:"security_dataSource.business.xml_bo",methodName:"security.dataSource.getDataSourceSelectListForUniEAP"},showLoading:true},_load,_error); }});