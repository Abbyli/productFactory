<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<!-- THE-NODE-OF-SESSION-TIMEOUT -->
<%@ page contentType="text/html; charset=UTF-8"%>
<%
	String path = request.getContextPath();
	String login_title = "保险产品管理系统";
	String login_copyright = "&copy; 2015 Neusoft SIPF serise. All rights reserved.";
	String login_username = "用户名:&nbsp;&nbsp;";
	boolean jcaptchaEnabled = false;
	String login_password = "密&nbsp;&nbsp;&nbsp;码:";
	String login_validCode = "验证码:";
	String login_refreshValidCode = "刷新验证码";
	String login_msg_killByUser = "此种情况用户需自己处理！";
%>
<html style="overflow: hidden;">
<head>
<meta http-equiv="Pragma" CONTENT="no-cache" Set-Cookie="name=value; HttpOnly" />
<title><%=login_title%></title>
<link href="<%=request.getContextPath()%>/techcomp/security/css/login.css" rel="stylesheet"></link>

<script type="text/javascript">
	unieap = {};
	unieap.WEB_APP_NAME = "<%=request.getContextPath()%>";
	var sumbitted = false;
	if (top.location != self.location)top.location=self.location;
	function setClass(eleName,clsName) {
		document.getElementById(eleName).className = clsName; 
	}

	/* 
	* 特殊字符在ASCII码中所表示的范围为32~48，57~65，90~97 
	* event.returnValue=false;设置键盘输入主false，则不能在文本框中输入内容 
	*去掉"_"(96),"-"(45),"."(46)
	*/ 
	function userNameKeyPress(){ 
		if (( event.keyCode > 32 && event.keyCode < 45) || 
			( event.keyCode > 47 && event.keyCode < 48) || 
			( event.keyCode > 57 && event.keyCode < 65) || 
			( event.keyCode > 90 && event.keyCode < 95)||
			event.keyCode == 96)  
			event.returnValue = false;
	} 

	function userNameOnBlur() {
		var s = document.getElementById("j_username").value;
	    var pattern = new RegExp("[`~!@#$^%&*+()=|{}':;',\\[\\]<>/?~！@#￥……&*（）|{}【】‘；：”“'。，、？]")
	        var rs = "";
	    for (var i = 0; i < s.length; i++) {
	        rs = rs + s.substr(i, 1).replace(pattern, '');
	    }
	    if (rs.length>32){
		    document.getElementById("j_username").value = "";
		    alert("用户帐号超长，请重新输入。");
		}else
		    document.getElementById("j_username").value = rs;
	}
	
	function enterToTab(evt,target){
		if(evt.keyCode != 13){
			return;
		}
		target = document.getElementById(target);
		target && target.focus();
	}

	function enterToSubmit(evt){
	  if (evt.keyCode == 13){
	    submit_form();
	  }
	}

	function MM_swapImgRestore() {
		  document.getElementById('btnImg').src="<%=request.getContextPath()%>/techcomp/security/images/login_static.png";
		}
		
	function MM_swapImage(imgSrc) {
		document.getElementById('btnImg').src=imgSrc;
	}
	
	function handleSessionTimeout(){
		 var win = window.top;
		 if(win.opener && typeof win.opener !="undefined"){
		 		if(!win.opener.top.rootmenu){
		 			return;
		 		}
				win.opener.top.location = win.opener.top.location;
				win.close();
				return;
		 }
		 if(win.dialogArguments){
		 	try{
		 		if(!win.dialogArguments.top.rootmenu){
		 			return;
		 		}
				win.dialogArguments.top.location=win.dialogArguments.top.location;			
				win.close();
				return;
			}catch(e){
				alert("<%=login_msg_killByUser%>");
			}
		 }
		 
	    //设置初始焦点，当页面中已有其它焦点时，不再设置初始焦点
		 var active=document.activeElement;
		 if(active.type!="input"){
			document.getElementById("j_username").focus();	
		 }
	 }

	function submit_form(){
	  if (!sumbitted){
		  var username = document.getElementById("j_username").value;
		  var password = document.getElementById("j_password").value;

		  if (username.length>0&&password.length>0){
		  	  //document.getElementById("logonform").submit();
		  	  login(username, password);
			  sumbitted = true;
		  }
		  else{
			  alert("请输入用户名和密码。");
		  }
	  }
	}

	function page_init(){
		var username = '';
		<%if (request.getParameter("j_username")!=null){%>
			username = '<%=request.getParameter("j_username")%>'
		<%}%>
	    document.getElementById("j_username").value = username;
	
	   handleSessionTimeout();
	}

	function login(userName, passWord){
		var validationCode = $("#jcaptcha_response").val();
		$.post(
			"<%=path%>/login.action",
			{ "userName": userName, "passWord": passWord, "validationCode": validationCode},
			function(data)
			{
				sumbitted = false;
				if(data.successFlag){
		    		if(data.successFlag==1)
		    		{
		    			//没有启动验证码
			    		if($("#jcaptcha_response").val()==null&&data.content.errorCode=="0")
			    		{
			    			document.location.href = "<%=request.getContextPath()%>/techcomp/menu/index.jsp";
					    }	
			    		else if($("#jcaptcha_response").val()==null&&data.content.errorCode!="0")
			    		{
	                        $("#errorMsg").text("登陆失败！");
				    	}
				    	//启动验证码
			    		else if($("#jcaptcha_response").val()!=null)
			    		{	
			    			if(data.content.validationCode && data.content.validationCode=="-1"){
			    				$("#errorMsg").text("验证码错误！");
			   					$("#jcaptcha").attr("src",AppPath+"/vs.action?"+Math.random());
								return ;
			   				}else if (data.content.errorCode == "0"){
			   					document.location.href = "<%=request.getContextPath()%>/techcomp/menu/index.jsp";
			    			}else if (data.content.errorCode != "0"){
			    				alert(data.content.message);
			    			}
			    			else{alert(data.content.validationCode);
			   					$("#jcaptcha").attr("src",AppPath+"/vs.action?"+Math.random());
								return ;
			   				}
			    		}
		    		}
		    		else
		    		{
		    			$("#errorMsg").text("登录出现错误："+data.messages);
		    		}
				}else{
					$("#errorMsg").text("系统错误");
				}
	    	},"json"
	    );
	}
</script> 
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieap/util/ieUpgrade.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/techcomp/security/js/jquery.min.js"></script>
<style>
body{
	background-image: url(../images/new/login_bg0.png);
    background-repeat: repeat-x;
}
</style>
</head>

<body style="margin-top: 0px; overflow: visible;" onload="page_init()">
<div style="width:100%;height:660px; position:relative;text-align: center;">
	<center>
		<div style="position:relative;width:1020px;height:660px;background-image:url(../images/new/login_bg.png);background-repeat: no-repeat;">
			<div style="position:absolute;left:540px;top:180px;;width:268px;">
				<div style="background-image:url(../images/new/login_box.png);width:268px;height:94px;">
						<input tabIndex="1" maxLength="32" style="display: block;position:relative;left:20px;top:10px;height:30px;width:200px;border: 0px;color: #585858;font-size: large;"
									type="text" id="j_username" name="j_username" size="20" 
									onkeypress="userNameKeyPress()" onblur="userNameOnBlur()"
									onkeydown="enterToTab(event,'j_password')" />
				
						<input tabIndex="2"  style="display: block;position:relative;height:30px;left:20px;top:15px;width:200px;border: 0px;color: #585858;font-size: large;"
						name="j_password" type="password" maxLength="32" autocomplete="off"
						onmousedown="this.oncontextmenu = function(){return false;}"
						onpaste="return false" size="20" id="j_password"
						<% if(jcaptchaEnabled){%>
						onkeydown="enterToTab(event,'jcaptcha_response')"
						<%} else{ %>
						onkeydown="enterToSubmit(event)"
						<%} %>
						/>
				</div>
				<div height="25px">
					<span style="color: #faeed4;font-size: 14px;font-family: 微软雅黑;" id="errorMsg"></span>
				</div>
				<div style="width:268px;">
					<a href="#" onclick="javascript:submit_form()" ><img src="../images/new/login_btn.png" style="border: 0px"/></a>
				</div>
			</div>
		</div>
	</center>
</div>
<div style="width:100%;height:18px;position: relative;background-image: url(../images/new/footer_line.png);background-repeat: repeat-x;"></div>
<div style="width:100%;text-align: center;font-family: 微软雅黑;font-size: 14px;color: #585858"><%=login_copyright%></div>

</body>
<% 
	request.getSession().invalidate();//清空session
	if (request.getCookies()!=null&&request.getCookies().length!=0){
		Cookie cookie = request.getCookies()[0];//获取cookie
		cookie.setMaxAge(0);//让cookie过期
	}
%>
</html>