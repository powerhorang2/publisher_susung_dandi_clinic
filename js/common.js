
/* 브라우저 스크롤 위치 이동 */
function moveScrollTop (top) {
	$("html, body").animate({scrollTop:top},500,"easeInOutExpo");
}

/* addClass Active */
function addActive (activeItem) {
	$(activeItem).addClass("active");
}

/* selector length */
$.exists = function(selector) {
	return ($(selector).length > 0);
}


/* 브라우저 체크 */
function detectBrowser () {
	var agent = navigator.userAgent.toLowerCase();
	var browser;

	if ( (agent.indexOf('msie') > -1) || (agent.indexOf('trident') > -1) || (agent.indexOf('edge') > -1) ) {
		browser = 'ie'
	}else if(agent.indexOf('firefox') > -1) {
		browser = 'firefox'
	}else if(agent.indexOf('opr') > -1) {
		browser = 'opera'
	}else if(agent.indexOf('chrome') > -1) {
		browser = 'chrome'
	}else if(agent.indexOf('safari') > -1) {
		browser = 'safari'
	}

	return browser;
}



/* 모바일/PC 체크 */
function isMobile(){
	var UserAgent = navigator.userAgent;
	if (UserAgent.match(/iPhone|iPad|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || UserAgent.match(/LG|SAMSUNG|Samsung/) != null)
	{
		return true;
	}else{
		return false;
	}
}

/* 브라우저 가로, 세로크기 측정 */
function getWindowWidth () {
	return $(window).outerWidth() + getScrollBarWidth() ;
}
function getWindowHeight () {
	return $(window).height() ;
}

/* 브라우저 스크롤위치 측정 */
function getScrollTop () {
	return $(window).scrollTop();
}







jQuery(function($){
	/* *********************** 브라우저 체크 및 기기체크 ************************ */
	if ( isMobile() ) {
		// $("body").addClass("is-mobile").addClass(detectOS()+"-os");
	}else {
		$("body").addClass("is-pc").addClass(detectBrowser()+"-browser");
	}

	/* *********************** 모달영역 붙이기 ************************ */
	$("body").append(" <article class='modal-fixed-pop-wrapper'><div class='modal-fixed-pop-inner'><div class='modal-loading'><span class='loading'></span></div><div class='modal-inner-box'><div class='modal-inner-content'></div></div></div></article>");

	/* *********************** 드롭메뉴 공통 ************************ */
	$(".cm-drop-menu-box").each(function  () {
		var $dropBox = $(this);
		var $dropOpenBtn = $(this).children(".cm-drop-open-btn");
		var $dropList = $(this).children(".cm-drop-list");
		var eventState = $dropBox.data("drop-event");

		if ( eventState === "click" ) {
			$dropOpenBtn.click(function  () {
				$dropList.slideToggle(500);
				$dropBox.toggleClass("open");
				$dropBox.on("mouseleave", function  () {
					dropClose ();
				});
				return false;
			});
			$("body").click(function  () {
				dropClose();
			});
		}else if ( eventState === "hover" ) {
			$dropBox.hover(function  () {
				$dropList.slideDown(500);
				$dropBox.addClass("open");
			},function  () {
				dropClose ();
			});
		}



		function dropClose () {
			if ( $dropBox.data("drop-width") ) {
				if ( getWindowWidth () < $dropBox.data("drop-width")+1 ) {
					$dropList.slideUp(500);
					$dropBox.removeClass("open");
				}
			}else {
				$dropList.slideUp(500);
				$dropBox.removeClass("open");
			}

		}
		$(window).resize(function  () {
			if ( getWindowWidth () > $dropBox.data("drop-width") ) {
				$dropList.show();
			}else {
				$dropList.hide();
			}
		});
	});







});
