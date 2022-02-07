

		// 에니메이션
		new WOW().init();


		$(document).ready(function() {
			fncOnloadInit();
		});

		//주요클리닉
		function fncOnloadInit() {

			$(".rolling_story").slick({
				centerMode: true
			});

			var visual_auto = setInterval(_visual_auto,4000);
			function _visual_auto(){
				$(".visual_next").trigger("click");
			}
			var play_stop_num=0;
			var visual_num=0;
			$(".visual_next").click(function(){
				visual_num++;
				if(visual_num>4){visual_num=0;}
				$(".visual_con").fadeOut();
				$(".visual_con").eq(visual_num).fadeIn();
			});
			$(".visual_prev").click(function(){
				visual_num--;
				if(visual_num<0){visual_num=3;}
				$(".visual_con").fadeOut();
				$(".visual_con").eq(visual_num).fadeIn();
			});
			$(".play_stop").click(function(){
				play_stop_num++;
				if(play_stop_num%2 == 0){
					visual_auto = setInterval(_visual_auto,4000);
					$(".play_stop img").attr("src","images/visual_puase.png");
				}else if(play_stop_num%2 == 1){
					clearInterval(visual_auto);
					$(".play_stop img").attr("src","images/visual_play.png");
				}
			});

		}

		//이벤트슬라이드
		$(function() {
			var honeySlide = $('.honey-slide');
			honeySlide.owlCarousel({
				items: 1,
				autoHeight:true,
				loop: true,
				margin: 5,
				mouseDrag: true,
				touchDrag: true,
				nav:false,
				autoplay: true,
				dots:true,
				smartSpeed: 150,
				dragEndSpeed: 300,
				autoplayTimeout: 4500,
				autoplayHoverPause: false,
			});
			$('.honey .prev').on('click',function(){honeySlide.trigger('prev.owl.carousel');	});
			$('.honey .next').on('click',function(){honeySlide.trigger('next.owl.carousel');	});
		});

		//메인슬라이드 로딩바, 버튼들
		$(function(){
			$("#mainVisual .slide-pasue-btn").on('click', function(e){
				swiper.autoplay.running ? swiper.autoplay.stop() : swiper.autoplay.start();
			});

			$("#mainVisual .slide-pasue-btn").on('click', function(e){
				function mains(){
					css({'transform':'translate(0px, 0px)'}).css({'background-repeat':'no-repeat'}).css({'background-size':'contain'})
				}
				swiper.autoplay.running ? $(this).css({'background':'url(main/images/pause.png)'}).css({'transform':'translate(0px, 0px)'}).css({'background-repeat':'no-repeat'}).css({'background-size':'contain'}) : $(this).css({'background':'url(main/images/play.png)'}).css({'background-repeat':'no-repeat'}).css({'transform':'translate(0px,0px)'});
			});

			$("#mainVisual .main-visual-loading-bar p").on('click', function(e){
				var target = $(e.currentTarget);
				var index = Number(target.index()) + 1;

				swiper.slideTo(index);
			});

			swiper.autoplay.stop();
			swiper.autoplay.start();
		})

	//  메인 비주얼
	if ($.exists('#mainVisual.full-height')) {
		mainVisualHeight();
		$(window).on('resize', mainVisualHeight);

		function mainVisualHeight () {
			var visual_height = getWindowHeight();
			$("#mainVisual").height(visual_height);
		}
	}
	// 메인 슬라이더
	var $mainVisual = $(".main-visual-slider");
	var $mainVisualItem = $mainVisual.find(".main-visual-item");
	var $mainLoadingBar = $mainVisual.find(".main-visual-loading-bar > span");
	var $mainCounter = $mainVisual.find(".main-visual-conuter");
	var mainVisualLength = $mainVisualItem.length;

	if ( detectBrowser () === "ie" ) {
		$(".main-visual-slider .overlay").remove();
	}

	var interleaveOffset = 0.75;
	var autoPlaySpeed = 4000;
	var swiperOptions = {
		loop: true,
		speed: 1200,
		parallax: false,
		draggable: false,
		autoplay: {
			delay: autoPlaySpeed,
			disableOnInteraction: false
		},
		allowTouchMove:false,
		watchSlidesProgress: true,

		pagination: {
			el: '.pagination-swiper',
			type: 'custom',
			renderCustom: function (swiper, current, total) {
				console.log(current);
				$('#mainVisual .main-visual-loading-bar span').removeClass('active').width(0);
				$('#mainVisual .main-visual-loading-bar span').addClass('active');
			}
		},
		navigation: {
			nextEl: '.main-visual-slider .slide-next-btn',
			prevEl: '.main-visual-slider .slide-prev-btn'
		},
		on: {
			init : function  () {
				$mainCounter.find(".total-num").text("0"+mainVisualLength);
			},
			progress: function () {
				var swiper = this;
				for (var i = 0; i < swiper.slides.length; i++) {
					var slideProgress = swiper.slides[i].progress;
					var innerOffset = swiper.width * interleaveOffset;
					var innerTranslate = slideProgress * innerOffset;

					if ( detectBrowser () !== "ie" ) {
						TweenMax.set(swiper.slides[i].querySelector(".slide-inner"), {
							x: innerTranslate,
						});
					}

				}
			},
			slideChange : function  () {
				$("#mainVisual .main-visual-loading-bar span").removeClass('active');
				$($("#mainVisual .main-visual-loading-bar span")[this.realIndex]).addClass('active');


				var swiper = this;
				var defaultSlideDelay = swiper.params.autoplay.delay;
				var currentIndex = swiper.realIndex + 1;
				var currentSlide = swiper.slides[currentIndex];
				var currentSlideDelay = currentSlide.getAttribute('data-swiper-autoplay') || defaultSlideDelay;

				updateSwiperProgressBar(progressBar, currentSlideDelay);
			},
			slideChangeTransitionStart : function(){
				var cur_idx = $(this.slides[this.activeIndex]).data("swiper-slide-index");

				// Counter
				$mainCounter.find(".cur-num").text("0"+(cur_idx+1));

				// 줌인효과
				$mainVisualImage = $(".swiper-slide-active").find(".visual-img");
				TweenMax.killTweensOf($mainVisualImage);
				TweenMax.fromTo($mainVisualImage, 2, { transform: "scale(1.4)" }, {transform: "scale(1)",force3D: true,ease: Circ.easeOut,delay: 0});

				// Text Motion
				$mainVisualText1 = $(".swiper-slide-active").find(".main-visual-tit span");
				$mainVisualText2 = $(".swiper-slide-active").find(".main-visual-txt span");
				$mainVisualButton = $(".swiper-slide-active").find(".main-visual-btn");
				TweenMax.fromTo($mainVisualText1, 1, {transform: "translateY(100%)",autoAlpha: 0}, {transform: "translateY(0%)",autoAlpha: 1,force3D: true,ease: Circ.easeOut,delay: 0.3});
				TweenMax.fromTo($mainVisualText2, 1, {transform: "translateY(100%)",autoAlpha: 0}, {transform: "translateY(0%)",autoAlpha: 1,force3D: true,ease: Circ.easeOut,delay: 0.7});
				TweenMax.fromTo($mainVisualButton, 0.5, {transform: "translateY(100%)",autoAlpha: 0}, {transform: "translateY(0%)",autoAlpha: 1,force3D: true,ease: Circ.easeOut,delay: 1});
			},
			touchStart: function () {
				var swiper = this;
				for (var i = 0; i < swiper.slides.length; i++) {
					swiper.slides[i].style.transition = "";
				}
			},
			setTransition: function (speed) {
				var swiper = this;
				if ( detectBrowser () !== "ie") {
					for (var i = 0; i < swiper.slides.length; i++) {
						swiper.slides[i].style.transition = speed + "ms";
						swiper.slides[i].querySelector(".slide-inner").style.transition =
						speed + "ms";
					}
				}
			}
		}
	};



	var swiper = new Swiper(".swiper-container", swiperOptions);


	/* 메인 비주얼 Side 영역  */
	var split_word;
	var splitWordEvent = {
		settings: {
		  letters: $('.cm-word-split'),
		},
		init: function() {
		  split_word = this.settings;
		  this.bindEvents();
		},
		bindEvents: function(){
		  split_word.letters.html(function (i, el) {
			var word_item = $.trim(el).split("");
			return '<em>' + word_item.join('</em><em>') + '</em>';
		  });
		},
	  };
	  splitWordEvent.init();


	 



	//클리닉
	$('.pdt_box').on('mouseenter',function(){
        $(this).find('.pdt_box_txt').css('bottom', '-90px');
		$(this).find('.pdt_box_txt > p:nth-of-type(1)').css('color', '#59c5d5');
	})
	.on('mouseleave', function () {
		$(this).find('.pdt_box_txt').css('bottom', '-180px');
		$(this).find('.pdt_box_txt > p:nth-of-type(1)').css('color', '#fff');
	})









var getTimeout = function(){var e=setTimeout,b={};setTimeout=function(a,c){var d=e(a,c);b[d]=[Date.now(),c];return d};return function(a){return(a=b[a])?Math.max(a[1]-Date.now()+a[0],0):NaN}}();

//
function sanitisePercentage(i){
	return Math.min(100,Math.max(0,i));
}

// Slider
var percentTime;
var tick;
var progressBar = document.querySelector('.swiper-hero-progress');


function updateSwiperProgressBar(bar, slideDelay) {
	var bar = $('.main-visual-loading-bar span.active')[0];

	function startProgressBar() {
		resetProgressBar();
		tick = setInterval(progress, 50);
	}

	function progress() {
		var timeLeft = getTimeout(swiper.autoplay.timeout);

		if ( swiper.autoplay.running && !swiper.autoplay.paused ) {

			percentTime = sanitisePercentage(100 - Math.round(timeLeft / slideDelay * 100));


			bar.style.width = percentTime + '%';

			if (percentTime > 100) {
				resetProgressBar();
			}
		}

		if ( swiper.autoplay.paused ) {
			percentTime = 0;
			bar.style.width = 0;
		}

	}

	function resetProgressBar() {
		percentTime = 0;
		bar.style.width = 0;
		clearInterval(tick);
	}

	startProgressBar();


}
