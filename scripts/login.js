$(function(){
	
	
	$(".m-logo .f-btn").bind("click", function(){
		if(!sessionStorage.loginSuc){
			login();
		}else{
			//未设置关注
			if(!localStorage.followSuc){
				follow()
				$(this).hide().next().show();
				
			//已关注
			}else {
				unfollow();
				$(this).hide().prev().show();
			}
			
		}
	})
	$(".m-msg .f-cancel").click(function(){

		localStorage.noTips = "1";
		$(".m-msg").hide();
		return false;
	})

	if(sessionStorage.loginSuc && localStorage.followSuc){
		
		$(".follow").hide().next().show();
		
	}

	if(localStorage.noTips){
		$(".m-msg").hide();
	}

	
});

function login(){
	$(".m-modal").show();

	//验证输入
	$(".m-modal input").bind("keyup",function(){
		var index = $(".m-modal input").index(this)
		if(index == 0){
			if(!/^[a-zA-Z0-9_-]{6,20}$/.test($(this).val())){
				$(this).addClass("error");
			}else{
				$(this).removeClass("error");
			}
		}else{
			if(!/^[\.a-zA-Z0-9_-]{6,20}$/.test($(this).val())){
				$(this).addClass("error");
			}else{
				$(this).removeClass("error");
			}
		}

	})

	$(".modal_wrap button").click(function(){
		
		var username = hex_md5($("input:text").val());
		var password = hex_md5($("input:password").val());
		
		
		var options = {
		//ie9- 跨域请求bug
			//crossDomain: true == !(document.all),
			url: "http://study.163.com/webDev/login.htm",
			success: logincb,
			data: {userName: username,
					password:password
				}
		};
		$.ajax(options);
		return false;
	});

	function logincb(data){
		if(data==0){
			alert("用户名或密码错误")
			$(".modal_wrap").find("input").val("");
		}else{
			sessionStorage.setItem("loginSuc", 1);
			$(".m-modal").hide();
			//$(".m-logo .f-btn:visible").click();
		}
		if(localStorage.followSuc)
			$(".follow").hide().next().show();
	}
}

function follow(){

	var options = {
	//ie9- 跨域请求bug
		//crossDomain: true == !(document.all),
		url: "http://study.163.com/webDev/attention.htm",
		success: followcb,
	};
	$.ajax(options);

	function followcb(data){
		if(data==1){
			localStorage.setItem("followSuc", 1);
			//alert(localStorage.followSuc);
			//console.log("follow")
		}
	}

}

function unfollow(){
	delete localStorage.followSuc;
	//console.log("unfollow")
}

$(function(){
	
})