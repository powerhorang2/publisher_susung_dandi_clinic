
var dep1;
var dep2;

jQuery(function($){

	// PC
	var $gnb = $("#gnb");
	var $gnbList = $("#gnb > ul");
	var $gnb_dep1 = $("#gnb > ul > li");
	var $gnb_dep2 = $("#gnb > ul > li .gnb-2dep");
	var $gnbBg = $('.gnb-overlay-bg');
	var $snb = $(".snb");
	// 모바일
	var $menuBtn = $("#header .nav-open-btn");
	var $gnbM = $("#gnbM");
	var $gnbMList = $gnbM.find("#navigation").children("li");
	var $gnbMBg = $('.gnb-overlay-bg-m');
	var menuState = false;

	// 모바일 gnb열린 후 창 크게했을때 스크롤바 생성
	$(window).resize(function  () {
		if ( menuState ) {
			if ( getWindowWidth() > 1200 ) {
				$("body").css({'height':'auto', 'overflow':'auto'});
			}
		}
	});

	if ( $gnb.is(".total-menu") ) {
		gnb_total_on();
	}else if ( $gnb.is(".each-menu") ) {
		gnb_each_on();
	}

	// gnb 전체메뉴
	function gnb_total_on () {
		$gnbList.children("li").children("a").on("mouseenter focus",function  () {
			if (!($gnb.is(".open"))) {
				$("#gnb").addClass("open");
				$gnbBg.stop().fadeIn();
			}
		})

		$gnbList.on("mouseleave",gnb_return);
		$gnbList.find("a").last().on("focusout",gnb_return);

		function gnb_return () {
			$("#gnb").removeClass("open");
			$gnbBg.hide();
			if ( dep1 > 0 && dep2 ) {
				$gnbList.children("li").eq(dep1-1).addClass("active");
			}
		}
	}

	// gnb 각각메뉴
	function gnb_each_on () {
		$gnbList.children("li").children("a").on("mouseenter focus",function  () {
			$gnbList.children("li").removeClass("on").children(".gnb-2dep").removeClass("open"); //.hide();
			$(this).parent("li").addClass("on").children(".gnb-2dep").stop().addClass("open"); //.slideDown(500);
		})

		$gnbList.children("li").on("mouseleave",gnb_return);
		$gnbList.find("a").last().on("focusout",gnb_return);

		function gnb_return () {
			// if (!$gnb.find('*').is(':animated')) {
				$gnbList.children("li").removeClass("on").children(".gnb-2dep").removeClass("open"); //.hide();
			// }
			if ( dep1 > 0 && dep2 ) {
				$gnbList.children("li").eq(dep1-1).addClass("active");
			}
		}
	}

	// gnb 2차 메뉴에 마우스 올렸을때 대메뉴 on
	$gnb_dep2.hover(function(){
		$(this).parent("li").addClass("on");
	},function  () {
		$gnb_dep1.removeClass("on");
	});

	// 서브메뉴에서 해당메뉴 on
	if ( dep1 > 0 && dep2 > 0) {
		$gnbList.children("li").eq(dep1-1).addClass("active");
		$gnbMList.eq(dep1-1).addClass("on");
		$snb.each(function  () {
			$(this).find("li").eq(dep2-1).addClass("on");
		});
	}

	/* *********************** MOBILE NAV ************************ */
	$menuBtn.click(function  () {
		if ( menuState ) {
			menuClose();
			menuState = false;
			$(this).removeClass("active");
		}else {
			menuOpen();
			menuState = true;
			$(this).addClass("active");
		}
		return false;
	});

	$gnbMBg.click(function  () {
		menuClose();
		menuState = false;
		$menuBtn.removeClass("active");
	});

	/* 메뉴열기 */
	function menuOpen () {
		$gnbM.addClass("open");
		$gnbMBg.fadeIn();
		$("body").css({'height':$(window).height(), 'overflow':'hidden'});
	}
	/* 메뉴닫기 */
	function menuClose () {
		$gnbM.removeClass("open");
		$gnbMBg.hide();
		$("body").css({'height':'auto', 'overflow':'auto'});
	}

	/* GNB MOBILE 2DEPTH 클래스 붙이기  */
	$("#navigation > li:has('.gnb-2dep')").addClass("has-2dep");
	$("#navigation > li:has('.gnb-2dep')").each(function  () {
		$(this).children("a").append("<span class='gnb-icon close-icon'><i class='material-icons'>&#xE145;</i></span><span class='gnb-icon open-icon' style='display:none;'><i class='material-icons'>&#xE15B;</i></span>");
	});

	/* GNB MOBILE 2DEPTH 오픈 */
	$("#navigation > li:has('.gnb-2dep')").children("a").click(function(event){
		/* 2dep가 열려있을때 */
		if ( $(this).parent("li").hasClass("active") ){
			$(this).parent("li").removeClass("active");
			$(this).children(".open-icon").hide();
			$(this).children(".close-icon").show();
			$(this).siblings(".gnb-2dep").slideUp(400);
		}
		/* 2dep가 닫혀있을때 */
		else{
			$("#navigation > li").has(".gnb-2dep").each(function() {
				if ( $(this).hasClass("active") ){
					$(this).removeClass("active");
					$(this).find(".open-icon").hide();
					$(this).find(".close-icon").show();
					$(this).children(".gnb-2dep").slideUp(400);
				}
			});
			$(this).parent("li").addClass("active");
			$(this).children(".close-icon").hide();
			$(this).children(".open-icon").show();
			$(this).siblings(".gnb-2dep").slideDown(400);
		}
		return false;
	});

	/* 해당페이지의 GNB 모바일 2depth 열기 & ON  */
	if ( dep1> 0 && dep2> 0 ) {
		$("#navigation > li").eq(dep1-1).addClass("active").children(".gnb-2dep").show().children("li").eq(dep2-1).addClass("on");
		$("#navigation > li").eq(dep1-1).find(".close-icon").hide();
		$("#navigation > li").eq(dep1-1).find(".open-icon").show(); // 모바일 네비 on
	}

	/* 메뉴상단고정 */
	$(window).scroll(function() {
		var currentSct = $(this).scrollTop();
		if(currentSct > 0) {
			$('#headerInner').addClass('sticky');
			$('#gnb').addClass('sticky');
			$('.nav-open-btn').addClass('sticky');
			
		}else {
			$('#headerInner').removeClass('sticky');
			$('#gnb').removeClass('sticky');
			$('.nav-open-btn').removeClass('sticky');
		}
	});


});
