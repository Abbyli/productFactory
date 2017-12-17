dojo.provide("unieap.tests.robot.logic.form.module");

try{
	doh.registerUrl('自动化测试-初始化参数',
   	 		dojo.moduleUrl('logic','form/init/test_init.html'),999999);
	
	doh.registerUrl('表单-Button测试',
   	 		dojo.moduleUrl('logic','form/Button/test_button.html'),999999);
	
	doh.registerUrl('表单-CheckBox测试',
   	 		dojo.moduleUrl('logic','form/CheckBox/test_checkbox.html'),999999);
			
	doh.registerUrl('表单-CheckBoxGroup测试',
   	 		dojo.moduleUrl('logic','form/CheckGroup/test_checkgroup.html'),999999);
			
	doh.registerUrl('表单-RadioButton测试',
   	 		dojo.moduleUrl('logic','form/RadioButton/test_radiobutton.html'),999999);
			
	doh.registerUrl('表单-RadioButtonGroup测试',
			dojo.moduleUrl('logic','form/RaidoButtonGroup/test_radioroup.html'),999999);
			
	doh.registerUrl('表单-(Number)TextBox测试',
			dojo.moduleUrl('logic','form/TextBox/test_textbox.html'),999999);
			
	doh.registerUrl('表单-DateTextBox测试',
			dojo.moduleUrl('logic','form/DateTextBox/test_datetextbox.html'),999999);
			
	doh.registerUrl('表单-ComboBox测试',
			dojo.moduleUrl('logic','form/ComboBox/test_combobox.html'),999999);
			
	doh.registerUrl('表单-NumberTextBox测试',
			dojo.moduleUrl('logic','form/NumberTextBox/test_numbertextbox.html'),999999);
	
	doh.registerUrl('表单-ComboBoxtree测试',
			dojo.moduleUrl('logic','form/ComboBoxTree/test_comboboxtree.html'),999999);
	
	doh.registerUrl('表单-Form测试',
			dojo.moduleUrl('logic','form/Form/test_form.html'),999999);
			
	doh.registerUrl('表单-InlineEditBox测试',
			dojo.moduleUrl('logic','form/InlineEditBox/test_inlineeditbox.html'),999999);
			
}catch(e){
	alert('发现错误！！'+e.toString());
}


	

