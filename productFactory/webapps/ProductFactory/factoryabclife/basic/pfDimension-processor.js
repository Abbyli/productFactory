 /*** @author think * @creationTime 2016-07-13 16:03:06 * @modificationTime 2017-03-13 09:59:44 * @version 1.0.0* @generated */dojo.provide("_factoryabclife.basic.pfDimension.Processor");dojo.declare("_factoryabclife.basic.pfDimension.Processor",unieap.view.Processor, {getDimensionDef: function(dimensionDef,pageNumber,pageSize,_load,_error ){return this.run({ processorName:"getDimensionDef", uParameters:[{name:"dimensionDef",type:"pojo",javaType:"",value:dimensionDef},{name:"pageNumber",type:"string",javaType:"",value:pageNumber},{name:"pageSize",type:"string",javaType:"",value:pageSize}],viewName:"pfDimension",loadSuccessed:this.view.getDimensionDefSuccess,pagingInfo:{pageNumber:1,pageSize:20,calcRecordCount:true},boInvoked:{dcID:"factoryabclife",boID:"factoryabclife_pfDimensionDef.business.xml_bo",methodName:"pfriskparam.queryDimensionDef"},serverExportCompatible:true,showLoading:true},_load,_error); },delDimensionDef: function(dimensionDef,_load,_error ){return this.run({ processorName:"delDimensionDef", uParameters:[{name:"dimensionDef",type:"pojo",javaType:"",value:dimensionDef}],viewName:"pfDimension",loadSuccessed:this.view.delDimensionDefSuccess,boInvoked:{dcID:"factoryabclife",boID:"factoryabclife_pfDimensionDef.business.xml_bo",methodName:"pfriskparam.delDimensionDef"},showLoading:true},_load,_error); },queryDimensionNoPage: function(dimensionDef,_load,_error ){return this.run({ processorName:"queryDimensionNoPage", uParameters:[{name:"dimensionDef",type:"pojo",javaType:"",value:dimensionDef}],viewName:"pfDimension",loadSuccessed:this.view.queryDimensionNoPageSuccess,syncRequest:true,boInvoked:{dcID:"factoryabclife",boID:"factoryabclife_pfDimensionDef.business.xml_bo",methodName:"pfriskparam.queryDimensionDefNoPage"},showLoading:true},_load,_error); },changeOrder: function(dimensionDef1,dimensionDef2,_load,_error ){return this.run({ processorName:"changeOrder", uParameters:[{name:"dimensionDef1",type:"pojo",javaType:"",value:dimensionDef1},{name:"dimensionDef2",type:"pojo",javaType:"",value:dimensionDef2}],viewName:"pfDimension",loadSuccessed:this.view.changeOrderSuccess,boInvoked:{dcID:"factoryabclife",boID:"factoryabclife_pfDimensionDef.business.xml_bo",methodName:"pfriskparam.changeOrderNum"},showLoading:true},_load,_error); }});