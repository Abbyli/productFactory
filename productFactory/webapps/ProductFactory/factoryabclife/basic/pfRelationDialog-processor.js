 /*** @author neusoft * @creationTime 2016-07-20 11:35:28 * @modificationTime 2016-11-03 14:32:00 * @version 1.0.0* @generated */dojo.provide("_factoryabclife.basic.pfRelationDialog.Processor");dojo.declare("_factoryabclife.basic.pfRelationDialog.Processor",unieap.view.Processor, {saveRelationDef: function(relationDef,opt,_load,_error ){return this.run({ processorName:"saveRelationDef", uParameters:[{name:"relationDef",type:"pojo",javaType:"",value:relationDef},{name:"opt",type:"string",javaType:"",value:opt}],viewName:"pfRelationDialog",loadSuccessed:this.view.saveRelationDefSuccess,boInvoked:{dcID:"factoryabclife",boID:"factoryabclife_pfrelation_def.business.xml_bo",methodName:"pfriskparam.saveRelationDef"},showLoading:true},_load,_error); }});