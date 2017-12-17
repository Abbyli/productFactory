 /*** @author Administrator * @creationTime 2016-12-02 09:22:43 * @modificationTime 2017-03-23 11:03:30 * @version 1.0.0* @generated */dojo.provide("_factoryabclife.test.calTest.Processor");dojo.declare("_factoryabclife.test.calTest.Processor",unieap.view.Processor, {getInsurCode: function(code,_load,_error ){return this.run({ processorName:"getInsurCode", uParameters:[{name:"code",type:"string",javaType:"",value:code}],viewName:"calTest",loadSuccessed:this.view.getInsurCodeSuccess,boInvoked:{dcID:"factoryabclife",boID:"factoryabclife_calTest.business.xml_bo",methodName:"calTest.getInsurCode"},showLoading:true},_load,_error); },getPricingLiabDef: function(code,verNo,_load,_error ){return this.run({ processorName:"getPricingLiabDef", uParameters:[{name:"code",type:"string",javaType:"",value:code},{name:"verNo",type:"string",javaType:"",value:verNo}],viewName:"calTest",loadSuccessed:this.view.getPricingLiabDefSuccess,boInvoked:{dcID:"factoryabclife",boID:"factoryabclife_calTest.business.xml_bo",methodName:"calTest.getPricingLiabDefs"},showLoading:true},_load,_error); },getProtecLiabs: function(priceDutyId,_load,_error ){return this.run({ processorName:"getProtecLiabs", uParameters:[{name:"priceDutyId",type:"string",javaType:"",value:priceDutyId}],viewName:"calTest",loadSuccessed:this.view.getProtecLiabsSuccess,boInvoked:{dcID:"factoryabclife",boID:"factoryabclife_pfprestduty.business.xml_bo",methodName:"pfinsurtypeaccdef.queryPriceDutyIdNoPage"},showLoading:true},_load,_error); },cal: function(riskCode,riskVer,pricingLiabCode,protecLiabCode,algoType,subType1,subType2,subGetdutyCode,paramObj,_load,_error ){return this.run({ processorName:"cal", uParameters:[{name:"riskCode",type:"string",javaType:"",value:riskCode},{name:"riskVer",type:"string",javaType:"",value:riskVer},{name:"pricingLiabCode",type:"string",javaType:"",value:pricingLiabCode},{name:"protecLiabCode",type:"string",javaType:"",value:protecLiabCode},{name:"algoType",type:"string",javaType:"",value:algoType},{name:"subType1",type:"string",javaType:"",value:subType1},{name:"subType2",type:"string",javaType:"",value:subType2},{name:"subGetdutyCode",type:"string",javaType:"",value:subGetdutyCode},{name:"paramObj",type:"pojo",javaType:"",value:paramObj}],viewName:"calTest",loadSuccessed:this.view.calSuccess,boInvoked:{dcID:"factoryabclife",boID:"factoryabclife_pfWebServiceCore.business.xml_bo",methodName:"pftestcal.calTest"},showLoading:true},_load,_error); },premiumRate: function(insurtypeCode,verNo,pricingLiabCode,dto,_load,_error ){return this.run({ processorName:"premiumRate", uParameters:[{name:"insurtypeCode",type:"string",javaType:"",value:insurtypeCode},{name:"verNo",type:"string",javaType:"",value:verNo},{name:"pricingLiabCode",type:"string",javaType:"",value:pricingLiabCode},{name:"dto",type:"pojo",javaType:"",value:dto}],viewName:"calTest",loadSuccessed:this.view.premiumRateSuccess,boInvoked:{dcID:"factoryabclife",boID:"factoryabclife_pfWebServiceCore.business.xml_bo",methodName:"pftestcal.premiumRate"},showLoading:true},_load,_error); },getGivepay: function(id,_load,_error ){return this.run({ processorName:"getGivepay", uParameters:[{name:"id",type:"string",javaType:"",value:id}],viewName:"calTest",loadSuccessed:this.view.getGivepaySuccess,boInvoked:{dcID:"factoryabclife",boID:"factoryabclife_calTest.business.xml_bo",methodName:"calTest.getSurvvGivepay"},showLoading:true},_load,_error); }});