
	$(function() {

		setEqualHeight();  //-- установка блокам одинаковой высоты
		initSliders(); // -- инициализация слайдеров
		animateInputLabel();  //-- установка классов текстовым полям для анимации подсказок
		animateDishTabs();  //-- анимирование переключения табов по клику на блюде в карусели
	
		
	});

	// Add it after jquery.magnific-popup.js and before first initialization code
	$.extend(true, $.magnificPopup.defaults, {
	  tClose: 'Закрыть (Esc)', // Alt text on close button
	  tLoading: 'Идет загрузка...', // Text that is displayed during loading. Can contain %curr% and %total% keys
	  gallery: {
	    tPrev: 'Предыдущая (или кнопка «влево»)', // Alt text on left arrow
	    tNext: 'Следающая (или кнопка «вправо»)', // Alt text on right arrow
	    tCounter: '%curr% из %total%' // Markup for "1 of 7" counter
	  },
	  image: {
	    tError: '<a href="%url%">Изображения по такой ссылке</a> нет.' // Error message when image could not be loaded
	  },
	  ajax: {
	    tError: '<a href="%url%">Содержимое</a> не загружается.' // Error message when ajax request failed
	  }
	});




	function initModalImg (zoomClass) {


		$('.'+ zoomClass).magnificPopup({
			gallery:{enabled:true},
			delegate: '.' + zoomClass + '__target', // child items selector, by clicking on it popup will open
			type: 'image',

			image: {
				titleSrc: function(item) {
					var imgDate = item.el.attr('data-date');
					var imgTitle = item.el.attr('title');
					if (imgDate === undefined) {imgDate = '';}
					if (imgTitle === undefined) {imgTitle = '';}
					var imgCapture = '<small class="mfp-title__date">' + imgDate + '</small>' + imgTitle;
					return imgCapture;
				}
			},

			mainClass: 'mfp-with-zoom', // this class is for CSS animation below

			  zoom: {
			    enabled: false, // By default it's false, so don't forget to enable it

			    duration: 300, // duration of the effect, in milliseconds
			    easing: 'ease-in-out', // CSS transition easing function 

			    // The "opener" function should return the element from which popup will be zoomed in
			    // and to which popup will be scaled down
			    // By defailt it looks for an image tag:
			    opener: function(openerElement) {
			      // openerElement is the element on which popup was initialized, in this case its <a> tag
			      // you don't need to add "opener" option if this code matches your needs, it's defailt one.
			      return openerElement.is('img') ? openerElement : openerElement.find('img');
			    }
			  }

		});

	} // initModalImg ()

	function animateDishTabs() {

		var tabCtrls = $('.js-dish-tab')

		tabCtrls.each( function() {
			
			var activeClass = 'is-active';

			$(this).on('click', function(event) {
				event.preventDefault();

				var tabCtrl = $(this);
				var tabIndex = tabCtrl.data('tab');

				var tabs = $('.dish-tabs__tab');
				var targetTab = $('.dish-tabs__tab_num_' + tabIndex);

				tabs.removeClass( activeClass );
				targetTab.addClass( activeClass );

				tabCtrls.removeClass( activeClass );
				tabCtrl.addClass( activeClass );

				console.log(tabIndex);

				$(window).scrollTo('.js-scroll-to-this', 500);
			});


			


		});
		
	} // animateDishTabs()

	function initSliders() {

		$('.js-one-item-slider').bxSlider({
			auto: true,
			autoHover: true,
			mode: 'horizontal',
			speed: 700,
			pause: 5000,
			slideWidth: 1000,
			slideMargin: 60,
			controls: true,
			pager: true,
			minSlides: 1,
			maxSlides: 1,
			infiniteLoop: false,
			hideControlOnEnd: true
		});

		$('.js-dish-slider').bxSlider({
			auto: true,
			autoHover: true,
			mode: 'horizontal',
			speed: 700,
			pause: 5000,
			slideWidth: 189,
			slideMargin: 60,
			controls: true,
			pager: false,
			minSlides: 4,
			maxSlides: 4,
			infiniteLoop: false,
			hideControlOnEnd: true
		});


		$('.js-gallery-slider').bxSlider({
			auto: true,
			autoHover: true,
			mode: 'horizontal',
			speed: 700,
			pause: 5000,
			slideWidth: 189,
			slideMargin: 10,
			controls: true,
			pager: false,
			minSlides: 4,
			maxSlides: 4,
			infiniteLoop: false,
			hideControlOnEnd: true
		});


		
	} // initSliders()

	function setEqualHeight() {
		var headers = $(".js-same-height").find('.teaser__h');
		var text = $(".js-same-height").find('.teaser__txt');

		setEqualHeightMagic(headers);
		setEqualHeightMagic(text);

		function setEqualHeightMagic (columns) {
			var tallestcolumn = 0;
			var columnsNum = 4;
			var elNum = columns.length;

			columns.css('height', '');

			for(var i = 0; i < elNum; i += columnsNum) {
				
				var arr = columns.slice(i, i + columnsNum);
				tallestcolumn = 0;

				arr.each(function() {
					currentHeight = $(this).height();
					if(currentHeight > tallestcolumn) {
						tallestcolumn = currentHeight;
						}
					});
					arr.height(tallestcolumn);
			}
		} // setEqualHeightMagic
		
	} // setEqualHeight()



	function animateInputLabel () {


		function checkFilledOrNot(input) {

			if (input.val() !== '') {
				input.parent().addClass('is-filled'); 
			} else {
				input.parent().removeClass('is-filled');
			}
		} // addRemoveSearch()


		$('.field').each( function() {

			var field = $(this);
			var fieldInput = field.find('.field__input');

			checkFilledOrNot( fieldInput );

			fieldInput.blur(function() {

				checkFilledOrNot( fieldInput );
			});

			fieldInput.focusin(function() {

				field.addClass('is-focused');
			}).focusout(function() {

				field.removeClass('is-focused');
			});
			 
		});
		

	} // animateInputLabel ()