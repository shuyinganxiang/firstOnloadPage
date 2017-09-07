//jQuery是一个js库，他为我们封装了许多繁琐而常用的功能
//只需要调用他内部的方法,就可以轻松实现炫酷的效果
//jQuery的基本语法：$(selecter).action();
//1.使用美元符号定义jQuery函数
//2.selecter选择器,完全兼容四种选择器
//3.action()为要执行的函数

//计算当前页面
var nowpage = 0;

//js入口
$(document).ready(function(e){
	
	//获取屏幕的宽高
	var width = window.innerWidth;
	var height = window.innerHeight;
	
	//计算大的div宽高
	$(".content").width(width);
	$(".content").height(4*height);
	
	//计算每个页面的宽和高
	$(".page").width(width);
	$(".page").height(height);
	
	//触动监听
	$(".content").swipe({
		swipe:function(event,direction,distance,duration,fingerCount){
			//如果向上滑
			if(direction == "up"){
				//页面 + 1
				nowpage = nowpage + 1;
			}
			else if(direction == "down"){
				//页面 - 1
				nowpage = nowpage - 1;
			}
			if(nowpage < 0){
				nowpage = 0;
			}
			if(nowpage > 3){
				nowpage = 3;
			}
			
			//动画：移动content盒子的位置       继续执行complate方法中自定义的一个函数（animations）
			$(".content").animate({top:nowpage*-100+"%"},{duration:500,complete:animations()});
			
		}
	})
	
	//第一个页面的动画
	//楼房淡出(2000毫秒出来)，之后(执行function)小人、飞机变大
	$(".page1-building").fadeIn(2000,function(){
		//获取小人、飞机图片     设置变大后的宽度     变大的过程为2s
		$(".page1-avatar").animate({width:"70%"},{duration:2000});	
	});
});


//实现封装的函数animations()
function animations(){
	if(nowpage == 1){
		$(".page2-bg").fadeIn(2000,function(){
			$(".page2-text1").animate({width:"70%"},{durtion:2000});
			$(".page2-text1").fadeIn(2000,function(){
				$(".page2-text2").animate({width:"70%"},{durtion:2000});
			});
		});
	}
	
	if(nowpage == 2){
		$(".page3-title1").fadeIn(2000);
		$(".page3-title2").fadeIn(2000);
		
		//车往左运动     两秒消失
		$(".page3-bus").animate({left:"-100%"},{duration:2000});
		$(".page3-avatar").animate({right:"50%"},{duration:3000,complete:function(){
			//  消失    强制隐藏
			$(".page3-title1,.page3-title2").fadeOut("slow",function(){display:none});
			//  消失 ...
			$(".page3-station,.page3-title1,.page3-title2,.page3-avatar").fadeOut("slow",function(){
				$(".page3-wall").fadeIn(2000,function(){
					$(".page3-my").fadeIn(2000,function(){
						$(".page3-space").animate({width:"30%"},{duration:1000,complete:function(){
							$(".page3-where").animate({width:"40%"},{duration:1000});
						}});
					});
				});
			});
		}});
//		$(".page3-avatar").fadeOut(2000,function(){
//			
//		});
	}
	
}

//灯的点击事件
function start(img){
	img.src="img/lightOn.png";
//	场景一消失
	$(".page4-click,.page4-title,.page4-bg").fadeOut("slow",function(){
		//背景图片要出来
		$(".page4-onBg").fadeIn(2000,function(){
			$(".page4-wky").fadeIn(2000);
		});
	});
}

//音乐控制
function playPause(img){
	//获取音乐
	var player = document.getElementById("musicPlayer");
	
	//判断音乐状态
	//如果暂停
	
	if(player.paused){
		//播放音乐
		player.play();
		img.src = "img/musicBtn.png";
	}else{
		//暂停音乐
		player.pause();
		img.src = "img/musicBtnOff.png";
	}
	
}


