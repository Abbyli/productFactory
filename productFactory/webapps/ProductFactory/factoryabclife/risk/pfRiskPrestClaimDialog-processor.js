 /*** @author zhy * @creationTime 2016-07-11 09:20:15 * @modificationTime 2017-02-15 16:41:40 * @version 1.0.0* @generated */dojo.provide("_factoryabclife.risk.pfRiskPrestClaimDialog.Processor");dojo.declare("_factoryabclife.risk.pfRiskPrestClaimDialog.Processor",unieap.view.Processor, {addPrestClaim: function(prestClaim,givePaid,protecLiabType,opt,_load,_error ){return this.run({ processorName:"addPrestClaim", uParameters:[{name:"prestClaim",type:"pojo",javaType:"",value:prestClaim},{name:"givePaid",type:"string",javaType:"",value:givePaid},{name:"protecLiabType",type:"string",javaType:"",value:protecLiabType},{name:"opt",type:"string",javaType:"",value:opt}],viewName:"pfRiskPrestClaimDialog",loadSuccessed:this.view.addPrestClaimSuccess,boInvoked:{dcID:"factoryabclife",boID:"factoryabclife_pfprestduty.business.xml_bo",methodName:"pfinsurtypeaccdef.addPrestClaim"},showLoading:true},_load,_error); },queryGivePaid: function(givepatId,_load,_error ){return this.run({ processorName:"queryGivePaid", uParameters:[{name:"givepatId",type:"string",javaType:"",value:givepatId}],viewName:"pfRiskPrestClaimDialog",loadSuccessed:this.view.queryGivePaidSuccess,boInvoked:{dcID:"factoryabclife",boID:"factoryabclife_pfprestduty.business.xml_bo",methodName:"pfinsurtypeaccdef.queryGivePaid"},showLoading:true},_load,_error); }});