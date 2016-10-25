$(function(){
	var $aSlideBtn = $(".u-pointer i");
	var length = $aSlideBtn.length;
	var index = 0;
	var timer = null;
	$aSlideBtn.click(function(){
	//利用按钮的索引确定显示第几张图片
		index = $aSlideBtn.index(this);
		showImg(index);
	});

	//鼠标悬停动画暂停，移出动画开始
	$(".m-slide").hover(function(){
		if(timer){
			clearInterval(timer)
		}
	}, function(){
		timer = setInterval(function(){
			index++;
			showImg(index);
			if(index == length-1){index = -1;}
		}, 5000)
	//触发器触发鼠标移出事件，开启定时器
	}).mouseleave();
});

function showImg(index){
	var $slide = $(".m-slide");
	var $aSlideBtn = $slide.find(".u-pointer i");
	$("li", $slide[0]).stop(true, true)
		.eq(index).fadeIn(500)
		.siblings().fadeOut(500);
	$aSlideBtn.removeClass("z-crt").eq(index).addClass("z-crt");
}