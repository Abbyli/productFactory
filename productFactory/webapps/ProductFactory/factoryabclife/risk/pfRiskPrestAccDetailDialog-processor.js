 /*** @author Administrator * @creationTime 2016-07-28 15:20:04 * @modificationTime 2016-09-28 16:59:34 * @version 1.0.0* @generated */dojo.provide("_factoryabclife.risk.pfRiskPrestAccDetailDialog.Processor");dojo.declare("_factoryabclife.risk.pfRiskPrestAccDetailDialog.Processor",unieap.view.Processor, {saveAccDetail: function(tClaimPayItemDetail,opt,_load,_error ){return this.run({ processorName:"saveAccDetail", uParameters:[{name:"tClaimPayItemDetail",type:"pojo",javaType:"",value:tClaimPayItemDetail},{name:"opt",type:"string",javaType:"",value:opt}],viewName:"pfRiskPrestAccDetailDialog",loadSuccessed:this.view.saveAccDetailSuccess,boInvoked:{dcID:"factoryabclife",boID:"factoryabclife_pfRiskPrestAccDetail.business.xml_bo",methodName:"pfRiskPrestAccDetail.saveAccDetail"},showLoading:true},_load,_error); }});