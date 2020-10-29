(function () {	
	let test_data = window.keradan.get_test_data(document.currentScript);

	let keradan_enable_log = true;
	function keradan_log() {
		if(keradan_enable_log) console.log.apply(this, arguments);
	}

	let keradan_ga_event = function(eventAction, eventLabel = null) {
		let dataLayer = window.dataLayer || [];
		let ga_data = {
			'event': 'autoEvent2',
			'eventCategory': 'Exp - Search results - covid info',
			'eventAction': eventAction
		};
		if (eventLabel) ga_data['eventLabel'] = eventLabel;
		keradan_log('keradan ga event: ', ga_data);
		if(false) dataLayer.push(ga_data);
	}

	keradan_ga_event('activated');

	try {
		(function(h,o,t,j,a,r){
		    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
		    h._hjSettings={hjid:1657822,hjsv:6};
		    a=o.getElementsByTagName('head')[0];
		    r=o.createElement('script');r.async=1;
		    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
		    a.appendChild(r);
		})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
		window.hj = window.hj || function(){(hj.q = hj.q || []).push(arguments)};
		hj('trigger', 'search-results-covid-info');
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
		    height: 90px;
		    display: flex;
		    justify-content: space-around;
		    align-items: center;
		    padding-left: 70px;
		    padding-right: 10px;
		    overflow: hidden;
		    transition: all 0.08s ease;
		    opacity: 1;
	 	}
	 	.${test_data.css_scope_name}-top-box.hide {
		    height: 0px;
		    margin-top: 0;
		    margin-bottom: 0;
		    opacity: 0;
		}
		/*
	 	.${test_data.css_scope_name}-top-box::before {
			content: "";
		    position: absolute;
		    width: calc(100% - 330px);
		    height: 100%;
		    top: 0;
		    right: -50px;
		    z-index: 0;
		    background: rgba(9, 111, 74, 0.05);
		    transform: skew(-25deg, 0);
	 	}
	 	*/
	 	.${test_data.css_scope_name}-top-box .big-left-text {
 		    width: 376px;
 		    width: 300px;
		    z-index: 1;
		    font-weight: 400;
		    font-size: 15px;
		    line-height: 24px;
		    align-items: center;
		    letter-spacing: -0.02em;
		    color: #096F4A;
	 	}
	 	.${test_data.css_scope_name}-top-box .big-left-text span {
			font-size: 18px;
			text-transform: uppercase;
			font-weight: 500;
		}
	 	.${test_data.css_scope_name}-top-box .small-right-text {
			position: relative;
			max-width: calc(100% - 305px);
			min-width: calc(50% + 20px);
			z-index: 1;
			font-style: normal;
			font-weight: 400;
			font-size: 12px;
			line-height: 22px;
			text-align: right;
			letter-spacing: -0.02em;
			color: #096F4A;
	 	}
	 	@media (max-width: 1420px) {
		 	.${test_data.css_scope_name}-top-box .small-right-text .small-text-11 {
		 		font-size: 11px;
		 	}
			.${test_data.css_scope_name}-top-box .small-right-text .small-text-10 {
				font-size: 10px;
			}
		}
		.${test_data.css_scope_name}-top-box .small-right-text::before {
			content: "";
			position: absolute;
			min-width: calc(100% + 530px);
			right: -500px;
			top: 50%;
			z-index: -1;
			background: rgba(9, 111, 74, 0.05);
			transform: skew(-25deg, 0) translateY(-50%);
			height: 90px;
		}

	 	.${test_data.css_scope_name}-top-box img.corona {
			position: absolute;
			top: 0;
			left: 0;
			width: 70px;
	 	}
 	`;
 	/* button-popup styles он в итоге стал не нужен
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
		    width: 330px;
		    box-shadow: 0px 6px 13px rgba(0, 0, 0, 0.2);
		    border-radius: 6px;
		    padding: 0 7px;
		    box-sizing: border-box;
		    max-height: 0;
		    opacity: 0;
		    transition: all 0.2s ease;
		    visibility: hidden;
	 	}
	 	app-search-results .control-section button#next-page-button:hover + .${test_data.css_scope_name}-button-popup {
	 		bottom: calc(100% - 1rem);
		    max-height: 300px;
		    padding: 7px;
		    opacity: 1;
		    visibility: visible;
		}
	 	.${test_data.css_scope_name}-button-popup .title {
			font-weight: 600;
			font-size: 12px;
			letter-spacing: -0.02em;
			text-transform: uppercase;
			color: #000000;
			margin-top: 5px;
			margin-bottom: 10px;
	 	}
	 	.${test_data.css_scope_name}-button-popup .text-1-wrapper, .${test_data.css_scope_name}-button-popup .text-2-wrapper {
	 		border-radius: 3px;
	 		display: flex;
		    justify-content: flex-start;
		    align-items: center;
		    height: 50px;
		    width: 100%;
		    padding: 0 15px;

		    font-family: sans-serif;
		    font-style: normal;
		    font-weight: normal;
		    font-size: 15px;
		    letter-spacing: 0.3px;
	 	}
	 	.${test_data.css_scope_name}-button-popup .text-1-wrapper {
	 		background: rgba(9, 111, 74, 0.1);
		    margin-bottom: 7px;
		    color: #096F4A;
	 	}
	 	.${test_data.css_scope_name}-button-popup .text-1-wrapper .check-mark {
	 		text-align: center;
	 		margin-right: 11px;
	 	}
	 	.${test_data.css_scope_name}-button-popup .text-2-wrapper {
	 		background: rgba(0, 0, 0, 0.1);
	 		color: #11415F;
	 	}
 	*/

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
 					top_box_text_1: '<span>Бесплатное изменение дат</span><br>Если планы изменятся, самостоятельно<br>меняйте даты путешествия',
 					top_box_text_2: 'Граждане или резиденты Израиля и иностранцы с разрешением на въезд<br>в Израиль, въезжающие на территорию Израиля из государства, относящегося к "красной"<br>зоне, должны пройти карантин и заполнить бланк-отчет о прохождении карантина.',
 				},
 				"TLV-KBP": {
 					top_box_text_1: '<span>Бесплатное изменение дат</span><br>Если планы изменятся, самостоятельно<br>меняйте даты путешествия',
 					top_box_text_2: '<span class="small-text-10">Пасажиры, которые приезжают из ”красной зоны” могут на выбор: установить приложение<br>”Дій.Вдома” и провести 14 дней на самоизоляции, или сдать тест на COVID-19  (не более чем за 48 часов<br>до момента пересечения границы) и при условии отрицательного результата не проходить самоизоляцию.</span>',
 				},
 				"KBP-IST": {
 					top_box_text_1: '<span>Бесплатное изменение дат</span><br>Если планы изменятся, самостоятельно<br>меняйте даты путешествия',
 					top_box_text_2: 'Въезд для граждан и резидентов Турции и Украины свободный при<br>условии наличия страхового полиса, который покрывает лечение COVID-19',
 				},
 				"IST-KBP": {
 					top_box_text_1: '<span>Бесплатное изменение дат</span><br>Если планы изменятся, самостоятельно<br>меняйте даты путешествия',
 					top_box_text_2: 'Въезд для граждан и резидентов Украины свободный. Иностранным гражданам<br>необходимо иметь страховой полис,который покрывает расходы на лечение COVID-19.',
 				},
 				"KBP-LGW": {
 					top_box_text_1: '<span>Бесплатное изменение дат</span><br>Если планы изменятся, самостоятельно<br>меняйте даты путешествия',
 					top_box_text_2: 'Пассажиры, которые прилетают в Великобританию, подлежат самоизоляции на 14 суток.',
 				},
 				"LGW-KBP": {
 					top_box_text_1: '<span>Бесплатное изменение дат</span><br>Если планы изменятся, самостоятельно<br>меняйте даты путешествия',
 					top_box_text_2: '<span class="small-text-11">Те, кто приезжает из “красной зоны” могут на выбор: установить ”Дій.Вдома” и провести<br>14 дней на самоизоляции, либо сдать тест на COVID-19 (не более чем за 48 часов до<br>пересечения границ) и при условии отрицательного результата не проходить самоизоляцию.</span>',
 				},
 				"KBP-DXB": {
 					top_box_text_1: '<span>Бесплатное изменение дат</span><br>Если планы изменятся, самостоятельно<br>меняйте даты путешествия',
 					top_box_text_2: 'Все пассажиры, которые летят в Дубай из любого города, должны<br>иметь распечатанный отрицательный сертификат ПЦР-теста на COVID-19,<br>а также страховой полис,который покрывает расходы на лечение COVID-19.',
 				},
 				"DXB-KBP": {
 					top_box_text_1: '<span>Бесплатное изменение дат</span><br>Если планы изменятся, самостоятельно<br>меняйте даты путешествия',
 					top_box_text_2: 'Въезд для граждан и резидентов Украины свободный. Иностранным гражданам<br>необходимо иметь страховой полис, который покрывает расходы на лечение COVID-19.',
 				},
 			},
 			uk: {
 				"KBP-TLV": {
 					top_box_text_1: '<span>Безкоштовна зміна дат</span><br>Якщо плани зміняться, самостійно<br>змінюйте дати подорожі',
 					top_box_text_2: 'Громадяни або резиденти Ізраїлю та іноземці з дозволом на в’їзд<br>в Ізраїль, що в’їжджають на територію країни з держави, яка належить до червоної зони,<br>мають пройти карантин та заповнити бланк-звіт щодо проходженяя карантина',
 				},
 				"TLV-KBP": {
 					top_box_text_1: '<span>Безкоштовна зміна дат</span><br>Якщо плани зміняться, самостійно<br>змінюйте дати подорожі',
 					top_box_text_2: '<span class="small-text-10">Пасажири, які приїжджають з “червоної зони” можуть на вибір: встановити<br>“Дій.Вдома” та провести 14 днів на самоізоляції, або здати тест на COVID-19 (не більше<br>ніж за 48 годин до перетину кордону) та за умови негативного результату не проходити самоізоляцію.</span>',
 				},
 				"KBP-IST": {
 					top_box_text_1: '<span>Безкоштовна зміна дат</span><br>Якщо плани зміняться, самостійно<br>змінюйте дати подорожі',
 					top_box_text_2: 'В’їзд для громадян та резидентів України та Туреччини вільний<br>за умови наявності страхового полісу, що покриває лікування COVID-19',
 				},
 				"IST-KBP": {
 					top_box_text_1: '<span>Безкоштовна зміна дат</span><br>Якщо плани зміняться, самостійно<br>змінюйте дати подорожі',
 					top_box_text_2: 'В’їзд для громадян та резидентів України вільний. Іноземним громадянам<br>необхідно мати страховий поліс, який покриває витрати на лікування COVID-19.',
 				},
 				"KBP-LGW": {
 					top_box_text_1: '<span>Безкоштовна зміна дат</span><br>Якщо плани зміняться, самостійно<br>змінюйте дати подорожі',
 					top_box_text_2: 'Пасажири, що прибувають до Великобританії, підлягають самоізоляції протягом 14 днів.',
 				},
 				"LGW-KBP": {
 					top_box_text_1: '<span>Безкоштовна зміна дат</span><br>Якщо плани зміняться, самостійно<br>змінюйте дати подорожі',
 					top_box_text_2: 'Ті, хто приїжджає з “червоної зони” можуть на вибір: встановити “Дій.Вдома”<br>та провести 14 днів на самоізоляції, або здати тест на COVID-19 (не більше, ніж за 48<br>годин до перетину кордону), та за негативного результату не проходити самоізоляцію.',
 				},
 				"KBP-DXB": {
 					top_box_text_1: '<span>Безкоштовна зміна дат</span><br>Якщо плани зміняться, самостійно<br>змінюйте дати подорожі',
 					top_box_text_2: 'Усі пасажири, які подорожують до Дубая з будь-якого міста, повинні<br>мати роздрукований негативний сертифікат ПЛР-тесту на COVID-19,<br>а також страховий поліс, який покриває витрати на лікування COVID-19.',
 				},
 				"DXB-KBP": {
 					top_box_text_1: '<span>Безкоштовна зміна дат</span><br>Якщо плани зміняться, самостійно<br>змінюйте дати подорожі',
 					top_box_text_2: 'В’їзд для громадян та резидентів України вільний. Іноземним громадянам<br>необхідно мати страховий поліс, який покриває витрати на лікування COVID-19.',
 				},
 			},
 			en: {
 				"KBP-TLV": {
 					top_box_text_1: '<span>Free date change</span><br>Book with confidence and, if needed,<br>change travel dates yourself',
 					top_box_text_2: 'Citizens and residents of Israel along with foreigners that<br>have permission to enter, may enter Israel from a red zone country,<br>but only if quarantined with the quarantine form filled out.',
 				},
 				"TLV-KBP": {
 					top_box_text_1: '<span>Free date change</span><br>Book with confidence and, if needed,<br>change travel dates yourself',
 					top_box_text_2: '<span class="small-text-10">Passengers who come from the “red zone” can choose to: install the ”Diy.Home”<br>application and self-isolate for 14 days, or take a COVID-19 test (no more than<br>48 hours before crossing the border), and subject to a negative result, avoid self-isolation.</span>',
 				},
 				"KBP-IST": {
 					top_box_text_1: '<span>Free date change</span><br>Book with confidence and, if needed,<br>change travel dates yourself',
 					top_box_text_2: 'Entry for citizens and residents of Turkey and Ukraine is free<br>if they have insurance covering the costs of COVID-19 treatment.',
 				},
 				"IST-KBP": {
 					top_box_text_1: '<span>Free date change</span><br>Book with confidence and, if needed,<br>change travel dates yourself',
 					top_box_text_2: 'Entry is free for Ukrainian citizens and residents. Foreign citizens are<br>allowed to enter if they have an insurance that covers the costs of COVID-19 treatment.',
 				},
 				"KBP-LGW": {
 					top_box_text_1: '<span>Free date change</span><br>Book with confidence and, if needed,<br>change travel dates yourself',
 					top_box_text_2: 'Passengers arriving to the UK are required by law to self-isolate for 14 days.',
 				},
 				"LGW-KBP": {
 					top_box_text_1: '<span>Free date change</span><br>Book with confidence and, if needed,<br>change travel dates yourself',
 					top_box_text_2: '<span class="small-text-11">Those who come from a “red zone” country can choose to install ”Diy.Home” and<br>spend 14 days in self-isolation, or take a COVID-19 test no earlier than 48 hours before crossing<br>the border, with a negative result. If the result is negative, there is no need to self-isolate.</span>',
 				},
 				"KBP-DXB": {
 					top_box_text_1: '<span>Free date change</span><br>Book with confidence and, if needed,<br>change travel dates yourself',
 					top_box_text_2: 'All passengers travelling to Dubai from any destination must<br>have a printed negative COVID-19 PCR test certificate and<br>also insurance covering the costs of COVID-19 treatment.',
 				},
 				"DXB-KBP": {
 					top_box_text_1: '<span>Free date change</span><br>Book with confidence and, if needed,<br>change travel dates yourself',
 					top_box_text_2: 'Entry is free for Ukrainian citizens and residents. Foreign citizens are<br>allowed to enter if they have insurance covering the costs of COVID-19 treatment.',
 				},
 			},
 		},
 	};

 	let markup_els = {
 		top_box: document.createElement('div'),
 		button_popup: document.createElement('div'),
 	};
 	markup_els.top_box.classList.add(`${test_data.css_scope_name}-top-box`, 'hide');
 	markup_els.top_box.innerHTML = `
 		<img src="${markup_content.covid_img_src}" class="corona">
 		<div class="big-left-text"></div>
 		<div class="small-right-text"></div>
 	`;
 	
 	// markup_els.button_popup.classList.add(`${test_data.css_scope_name}-button-popup`);
 	// markup_els.button_popup.innerHTML = `
 	// 	<div class="title"></div>
 	// 	<div class="text-1-wrapper">
 	// 		<div class="check-mark"><svg width="13" height="10" viewBox="0 0 13 10" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.28025 7.71975L11.25 0.75L12.3105 1.8105L4.28025 9.84075L0 5.5605L1.0605 4.5L4.28025 7.71975Z" fill="#096F4A"/></svg></div>
 	// 		<div class="text-1"></div>
 	// 	</div>
 	// 	<div class="text-2-wrapper">
 	// 		<div class="text-2"></div>
 	// 	</div>
 	// `;

	console.log('Test "Covid info on search result desktop" is here');

	let flight_info_promise = new Promise(function(resolve, reject) {
		// setTimeout(function(){
		// 	clearInterval(flight_info_promise_timer_id);
		// 	reject(new Error('keradan flight info not received by 15 s'));
		// }, 15000);

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
			let new_main_title_el = document.querySelector('app-search-results .flights-section .outbound-section .product__title');
			if(!new_main_title_el) return;

			let new_flight_info_el = document.querySelector('app-flights-product .flight-info-container .flight-info');
			if(!new_flight_info_el) return;

			let new_lang = window.location.pathname.replace(/^\/{1}/, '').split('/')[0].toLowerCase();

			let new_flight_info = {
				departure_code: new_flight_info_el.querySelector('.departure-info .info-code').innerHTML,
				arrival_code: new_flight_info_el.querySelector('.arrival-info .info-code').innerHTML,
			};
			let new_flight_info_text = `${new_flight_info.departure_code}-${new_flight_info.arrival_code}`;

			let old_flight_info = window.keradan[test_data.name].flight_info;
			let old_flight_info_text = `${old_flight_info.departure_code}-${old_flight_info.arrival_code}`;
			
			if (new_lang !== window.keradan[test_data.name].lang || new_main_title_el.innerHTML !== window.keradan[test_data.name].main_title || new_flight_info_text !== old_flight_info_text) {
				window.keradan[test_data.name].lang = new_lang;
				window.keradan[test_data.name].main_title = new_main_title_el.innerHTML;
				window.keradan[test_data.name].flight_info = new_flight_info;
				run();
			}
		}, 500);
		
	})
	.catch(error => console.error(error));

	function reset() {
		markup_els.top_box.classList.add('hide');
		setTimeout(function(){
			markup_els.top_box.querySelectorAll('.big-left-text, .small-right-text').forEach(item => item.innerHTML = '');
			markup_els.top_box.remove();
			// markup_els.button_popup.querySelectorAll('.title, .text-1, .text-2').forEach(item => item.innerHTML = '');
			// markup_els.button_popup.remove();
		}, 200);
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
		
		// if (!document.querySelector(markup_els.button_popup.getAttribute('class')))
		// 	document.querySelector('app-search-results .control-section button#next-page-button').after(markup_els.button_popup);

		markup_els.top_box.querySelector('.big-left-text').innerHTML = text_data.top_box_text_1;
		markup_els.top_box.querySelector('.small-right-text').innerHTML = text_data.top_box_text_2;

		// markup_els.button_popup.querySelector('.title').innerHTML = markup_content.popup_title[lang];
		// markup_els.button_popup.querySelector('.text-1').innerHTML = text_data.popup_text_1;
		// markup_els.button_popup.querySelector('.text-2').innerHTML = text_data.popup_text_2;

		setTimeout(() => markup_els.top_box.classList.remove('hide'), 0);
	}

	









})();








