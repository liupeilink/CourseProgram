$(function(){
	//请求参数变量，值根据具体情况而变
	var pageSize = 0;
	var courseType = 10;
	
	init();

	function init(){
		getMainCourse();
		getHotCourse();
	}

	function getMainCourse(){
		// 获取窗口宽度
		var winWidth = getWinWidth();
		winWidth < 1206 ? pageSize=15 : pageSize=20; 
		getCourse($(".m-content-course>ul"), "http://study.163.com/webDev/couresByCategory.htm", {pageNo:1,psize:pageSize,type:courseType})
		
	}

	function getHotCourse(){
		getCourse($(".m-content-rank>.m-info"), "http://study.163.com/webDev/hotcouresByCategory.htm", {}, 10)
	}

	//事件代理，用以处理将来的元素
	$(".m-content-course").delegate("li", "mouseenter", function(){
		$(".m-hidden", this).css("display","block")
		
		return false;
	})
	$(".m-content-course").delegate("li", "mouseleave", function(){
		$(".m-hidden", this).css("display","none")
		
		return false;
	})

	//窗口尺寸改变添加事件，当窗口改变大小时，判断大小决定每页加载的课程数
	$(window).resize(function(){
	
		var winWidth = getWinWidth();
		var cpsize = winWidth < 1206 ? 15 : 20; 
		if(cpsize != pageSize){
			pageSize = cpsize;
			getCourse($(".m-content-course>ul"), "http://study.163.com/webDev/couresByCategory.htm", {pageNo:parseInt($(".m-page .z-crt").text()),psize:pageSize,type:courseType});
		}

	});

	//tab切换事件
	$(".m-hd a").bind("click", function(){

		courseType = ($(this).text() == "产品设计") ? 10 : 20;
		getCourse($(".m-content-course>ul"), "http://study.163.com/webDev/couresByCategory.htm", {pageNo:1 ,psize:pageSize,type:courseType});
		$(this).parent().addClass("z-crt")
				.siblings().removeClass("z-crt");
		$(".m-page a:eq(1)").addClass("z-crt").siblings().removeClass("z-crt");
		return false;
	});
	
	//分页器点击事件
	$(".m-page a").bind("click", function(){
		var $crt = $(this).parent().find(".z-crt")
		
		if($(this).hasClass("pageprv")){
			//向上翻页时，按钮crt之前的按钮
			if($crt.text() != 1){
				$crt.prev().click();
			}
			
		} else if($(this).hasClass("pagenxt")){
			var length = $(".m-page a").length;
			//向下翻页时，按钮crt之后的按钮
			if($crt.text() != length-2){
				$crt.next().click();
			}
		} else {
			$(this).addClass("z-crt")
				.siblings().removeClass("z-crt");
			getCourse($(".m-content-course>ul"),
			 	"http://study.163.com/webDev/couresByCategory.htm",
			 	{pageNo:parseInt($(".m-page .z-crt").text()),psize:pageSize,type:courseType});	
		}
		return false;
	});
	
});


// 获取窗口宽度
function getWinWidth(){
	if(window.innerWidth){
		return window.innerWidth;
	}
	else if((document.body) && (document.body.clientWidth)){
		return document.body.clientWidth;
	}
}

/**
 * 函数描述
 *
 * @param {JQuery Object} $elem 将要操作的节点
 * @param {string} url get请求的url地址
 *     那就换行了.
 * @param {Object} 请求参数
 * @param {number} 希望显示的个数, 用于热门课程
 */
function getCourse($elem, url, op_data, num){
	

	var cb = function(data){
		
		var html = "";
		$.each(data["list"]?data["list"]:data, function(index, course){
			if(index == num){
				return false;
			}	
			if($elem.hasClass("m-info"))
			{
				html += '<li class="clearfix">\
						<a href=""><img src="' + course["smallPhotoUrl"] + '" alt="' + course["name"] + '"></a>\
						<p><a href="">' + course["name"] + '</a></p>\
						<span>' + course["learnerCount"] + '</span>\
					</li>'
				

			}else{
				html += '<li>\
						<a href=""><img src="' + course["middlePhotoUrl"] + '" alt="' + course["name"] + '"></a>\
						<div class="m-info">\
							<p>' + course["name"] + '</p>\
							<span>' + course["provider"] + '</span>\
							<a href="" class="f-btn">' + course["learnerCount"] + '</a>\
							<span><em>&yen;' + course["price"] + '</em></span>\
						</div>\
						<div class="m-hidden">\
							<div class="m-hid-figure clearfix">\
								<div class="m-hidden-img">\
									<img src="' + course["middlePhotoUrl"] + '" alt="' + course["name"] + '">\
								</div>\
								<h2>' + course["name"] + '</h2>\
								<span>' + course["learnerCount"] + '人在学</span>\
								<span>发布者：' + course["provider"] + '</span>\
								<span>分类：' + course["categoryName"] + '</span>\
							</div>\
							<p>' + course["description"] + '</p>\
						</div>\
					</li>'
			}
		});
		$elem.empty();
		$elem.append(html);	
	};
		

	var options = {
		//ie9- 跨域请求bug
			crossDomain: true == !(document.all),
			url: url,
			dataType: "json",
			success: cb
	};

	
	$.extend(options, {data:op_data});

	$.ajax(options);

}