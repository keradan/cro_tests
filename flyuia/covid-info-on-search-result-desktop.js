(function () {	
	let test_data = window.keradan.get_test_data(document.currentScript);

	let keradan_enable_log = true;
	function keradan_log() {
		if(keradan_enable_log) console.log.apply(this, arguments);
	}

	let keradan_ga_event = function(eventAction, eventLabel = null) {
		let dataLayer = window.dataLayer || [];
		let ga_data = {
			'event': 'event-to-ga',
			'eventCategory': 'dfhjfdhdjfjhdfhjdfhjdfhdfdhfjhdfhjdfhdhjddfhjdfhjdfhjhjdfhjdhhjdhjdfhjdfhjfd',
			'eventAction': eventAction
		};
		if (eventLabel) ga_data['eventLabel'] = eventLabel;
		keradan_log('keradan ga event: ', ga_data);
		if(false) dataLayer.push(ga_data);
	}

	keradan_ga_event('loaded');

	try {
    	// jdksdjdskjdsjkdsjkdsjkdsjkd
    }
    catch (e) {
		keradan_log('Hotjar error: ', e);
	}

	keradan_log('test_data: ', test_data);

	window.keradan[test_data.name].flight_info = {
		departure_code: null,
		arrival_code: null,
	};

	document.querySelector("#styles-" + test_data.name).innerHTML = `
	 	.${test_data.css_scope_name}-top-box {
	 		position: relative;
	 		background: #DFECE7;
		    margin: 17px;
		    margin-top: 10px;
		    height: 100px;
		    display: flex;
		    justify-content: space-between;
		    align-items: center;
		    padding-left: 90px;
		    padding-right: 25px;
		    overflow: hidden;
	 	}
	 	.${test_data.css_scope_name}-top-box::before {
	 		content: "";
	 		position: absolute;
	 		width: 55%;
	 		height: 100%;
	 		top: 0;
	 		right: -50px;
	 		z-index: 0;
	 		background: rgba(9, 111, 74, 0.05);
	 		transform: skew(-35deg, 0);
	 	}
	 	.${test_data.css_scope_name}-top-box .big-right-text {
	 		width: 40%;
		    z-index: 1;
		    font-family: Open Sans;
		    font-weight: 600;
		    font-size: 18px;
		    align-items: center;
		    letter-spacing: -0.02em;
		    text-transform: uppercase;
		    color: #096F4A;
	 	}
	 	.${test_data.css_scope_name}-top-box .small-left-text {
	 		width: 50%;
		    z-index: 1;
		    font-family: Open Sans;
		    font-style: normal;
		    font-weight: 600;
		    font-size: 14px;
		    line-height: 21px;
		    text-align: right;
		    letter-spacing: -0.02em;
		    color: #096F4A;
	 	}

	 	.${test_data.css_scope_name}-top-box img.corona {
	 		position: absolute;
	 		top: 0;
	 		left: 0;
	 	}
	 	app-search-results .control-section {
	 		position: relative;
	 	}
	 	.${test_data.css_scope_name}-button-popup {
	 		position: absolute;
		    right: 15px;
		    bottom: 200%;
		    display: flex;
		    flex-flow: column;
		    justify-content: flex-start;
		    align-items: center;
		    background: white;
		    width: 290px;
		    box-shadow: 0px 6px 13px rgba(0, 0, 0, 0.2);
		    border-radius: 6px;
		    padding: 0 7px;
		    box-sizing: border-box;
		    max-height: 0;
		    opacity: 0;
		    transition: all 0.2s ease;
	 	}
	 	app-search-results .control-section button#next-page-button:hover + .${test_data.css_scope_name}-button-popup {
	 		bottom: calc(100% - 1rem);
		    max-height: 300px;
		    padding: 7px;
		    opacity: 1;
		}
	 	.${test_data.css_scope_name}-button-popup .title {
	 		font-family: Open Sans;
			font-weight: 600;
			font-size: 12px;
			letter-spacing: -0.02em;
			text-transform: uppercase;
			color: #000000;
			margin-bottom: 5px;
	 	}
	 	.${test_data.css_scope_name}-button-popup .text-1-wrapper, .${test_data.css_scope_name}-button-popup .text-2-wrapper {
	 		border-radius: 3px;
	 		display: flex;
		    justify-content: flex-start;
		    align-items: center;
		    height: 50px;
		    width: 100%;
		    padding: 0 15px;
	 	}
	 	.${test_data.css_scope_name}-button-popup .text-1-wrapper {
	 		background: rgba(9, 111, 74, 0.1);
		    margin-bottom: 7px;
		    font-family: Open Sans;
		    font-style: normal;
		    font-weight: normal;
		    font-size: 13px;
		    color: #096F4A;
	 	}
	 	.${test_data.css_scope_name}-button-popup .text-1-wrapper .check-mark {
	 		text-align: center;
	 		margin-right: 11px;
	 	}
	 	.${test_data.css_scope_name}-button-popup .text-2-wrapper {
	 		background: rgba(0, 0, 0, 0.1);
	 	}


 	`;

 	let markup_content = {
		covid_img_src: 'https://i.ibb.co/QXrCTqw/mau-corona.png',
 		popup_title: {
 			ru: 'Вам остался всего 1 шаг',
 			uk: 'Вам залишився всього 1 крок',
 			en: 'You only have 1 step left',
 		},
 		depending_on_country: {
 			ru: {
 				"KBP-TLV": {
 					popup_text_1: 'Бесплатное изменение дат',
 					popup_text_2: 'Если планы изменятся, самостоятельно меняйте даты путешествия.',
 					top_box_text_1: 'Въезд для граждан и резидентов<br>Израиля свободный.',
 					top_box_text_2: 'Для граждан других стран действуют ограничения.',
 				},
 				"TLV-KBP": {
 					popup_text_1: 'Бесплатное изменение дат',
 					popup_text_2: 'Если планы изменятся, самостоятельно меняйте даты путешествия.',
 					top_box_text_1: 'Для граждан и резидентов Украины<br>въезд свободный.',
 					top_box_text_2: 'Иностранцам въезд разрешён только при наличии<br>страхового полиса от COVID-19.',
 				},
 			},
 			uk: {
 				"KBP-TLV": {
 					popup_text_1: 'Безкоштовна зміна дат',
 					popup_text_2: 'Якщо плани зміняться, самостійно змінюйте дати подорожі.',
 					top_box_text_1: 'В‘їзд для громадян та резидентів<br>Ізраїлю вільний.',
 					top_box_text_2: 'Для громадян інших країн діють обмеження.',
 				},
 				"TLV-KBP": {
 					popup_text_1: 'Безкоштовна зміна дат',
 					popup_text_2: 'Якщо плани зміняться, самостійно змінюйте дати подорожі.',
 					top_box_text_1: 'Для громадян та резидентів України<br>в‘їзд вільний.',
 					top_box_text_2: 'Іноземцям в‘їзд дозволений лише при наявності<br>страхового полісу від COVID-19.',
 				},
 			},
 			en: {
 				"KBP-TLV": {
 					popup_text_1: 'Free date change',
 					popup_text_2: 'Book with confidence and, if needed, change travel dates yourself.',
 					top_box_text_1: 'Entry for citizens and residents of<br>Israel is free.',
 					top_box_text_2: 'Entry restrictions apply to citizens of other countries.',
 				},
 				"TLV-KBP": {
 					popup_text_1: 'Free date change',
 					popup_text_2: 'Book with confidence and, if needed, change travel dates yourself.',
 					top_box_text_1: 'Entry is free for Ukrainian<br>citizens and residents.',
 					top_box_text_2: 'Foreign citizens are allowed to enter if they are relatives of the first line of citizens of Ukraine, or have an official valid work permit in Ukraine.',
 				},
 			},
 		},
 	};

 	let markup_els = {
 		top_box: document.createElement('div'),
 		button_popup: document.createElement('div'),
 	};
 	markup_els.top_box.classList.add(`${test_data.css_scope_name}-top-box`);
 	markup_els.top_box.innerHTML = `
 		<img src="${markup_content.covid_img_src}" class="corona">
 		<div class="big-right-text"></div>
 		<div class="small-left-text"></div>
 	`;
 	
 	markup_els.button_popup.classList.add(`${test_data.css_scope_name}-button-popup`);
 	markup_els.button_popup.innerHTML = `
 		<div class="title"></div>
 		<div class="text-1-wrapper">
 			<div class="check-mark"><svg width="13" height="10" viewBox="0 0 13 10" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.28025 7.71975L11.25 0.75L12.3105 1.8105L4.28025 9.84075L0 5.5605L1.0605 4.5L4.28025 7.71975Z" fill="#096F4A"/></svg></div>
 			<div class="text-1"></div>
 		</div>
 		<div class="text-2-wrapper">
 			<div class="text-2"></div>
 		</div>
 	`;

	console.log('Test "Covid info on search result desktop" is here');

	let flight_info_promise = new Promise(function(resolve, reject) {
		setTimeout(function(){
			clearInterval(flight_info_promise_timer_id);
			reject(new Error('keradan flight info not received by 5 s'));
		}, 5000);

		flight_info_promise_timer_id = setInterval(function(){
			let flight_info_el = document.querySelector('app-flights-product .flight-info-container .flight-info');
			if(!flight_info_el) return;

			window.keradan[test_data.name].flight_info = {
				departure_code: flight_info_el.querySelector('.departure-info .info-code').innerHTML,
				arrival_code: flight_info_el.querySelector('.arrival-info .info-code').innerHTML,
			};
		    
		    clearInterval(flight_info_promise_timer_id);
		    resolve('keradan flight info received');
		}, 100);
	});

	flight_info_promise
	.then(function(msg) {
		keradan_log(msg);
		
		setInterval(function(){
			console.log('lang monitor');
			let new_lang = window.location.pathname.replace(/^\/{1}/, '').split('/')[0].toLowerCase();
			let new_main_title = document.querySelector('app-search-results .flights-section .outbound-section .product__title').innerHTML;

			if (new_lang !== window.keradan[test_data.name].lang || new_main_title !== window.keradan[test_data.name].main_title) {
				window.keradan[test_data.name].lang = new_lang;
				window.keradan[test_data.name].main_title = new_main_title;
				run();
			}
		}, 500);
		
	})
	.catch(error => console.error(error));

	function reset() {
		markup_els.top_box.querySelectorAll('.big-right-text, .small-left-text').forEach(item => item.innerHTML = '');
		markup_els.top_box.remove();
		markup_els.button_popup.querySelectorAll('.title, .text-1, .text-2').forEach(item => item.innerHTML = '');
		markup_els.button_popup.remove();
	}

	function run() {
		let lang = window.keradan[test_data.name].lang;
		if (lang !== 'ru' && lang !== 'uk' && lang !== 'en') {
			reset();
			return;
		}
		let flight_info = window.keradan[test_data.name].flight_info;
		let text_data = markup_content.depending_on_country[lang][`${flight_info.departure_code}-${flight_info.arrival_code}`];
		if (!text_data) {
			reset();
			return;
		}

		if (!document.querySelector(markup_els.top_box.getAttribute('class')))
			document.querySelector('app-search-results .flights-section .outbound-section').prepend(markup_els.top_box);
		
		if (!document.querySelector(markup_els.button_popup.getAttribute('class')))
			document.querySelector('app-search-results .control-section button#next-page-button').after(markup_els.button_popup);

		markup_els.top_box.querySelector('.big-right-text').innerHTML = text_data.top_box_text_1;
		markup_els.top_box.querySelector('.small-left-text').innerHTML = text_data.top_box_text_2;

		markup_els.button_popup.querySelector('.title').innerHTML = markup_content.popup_title[lang];
		markup_els.button_popup.querySelector('.text-1').innerHTML = text_data.popup_text_1;
		markup_els.button_popup.querySelector('.text-2').innerHTML = text_data.popup_text_2;
	}

	









})();








