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

	let markup_content = {
 		ddsjhdsjh: 'djdshjdsjh',
 		sksjskjaa: `dsjsdjhsdhj`,
 	};

	document.querySelector("#styles-" + test_data.name).innerHTML = `
	 	.${test_data.css_scope_name}-top-box {
	 		background: red;
	 	}
	 	app-search-results .control-section {
	 		position: relative;
	 	}
	 	.${test_data.css_scope_name}-button-popup {
	 		position: absolute;
		    right: 15px;
		    bottom: calc(100% - 1rem);
		    display: flex;
		    justify-content: center;
		    align-items: center;
		    background: white;
		    width: 290px;
	 	}
 	`;

 	let markup_els = {
 		top_box: document.createElement('div'),
 		button_popup: document.createElement('div'),
 	};
 	markup_els.top_box.classList.add(`${test_data.css_scope_name}-top-box`);
 	markup_els.top_box.innerHTML = 'keradan here helloooo';
 	
 	markup_els.button_popup.classList.add(`${test_data.css_scope_name}-button-popup`);
 	markup_els.button_popup.innerHTML = 'popup over button';

	console.log('Test "Covid info on search result desktop" is here');

	let flight_info = document.querySelector('app-flights-product .flight-info-container .flight-info');
	let departure_code = flight_info.querySelector('.departure-info .info-code').innerHTML;
	let arrival_code = flight_info.querySelector('.arrival-info .info-code').innerHTML;
	
	keradan_log('flight_info', {
		departure_code: departure_code,
		arrival_code: arrival_code,
	});

	function run() {
		// тут делаем проверку: если уже есть мои куски верстки - тогда ничего не надо делать.
		// Проверка вторая: что за рейсы откуда и куда - в зависимости от этого мы выводим нужную инфо, или не выводим ничего
		document.querySelector('app-search-results .flights-section .outbound-section').prepend(markup_els.top_box);
		document.querySelector('app-search-results .control-section button#next-page-button').before(markup_els.button_popup);

	}

	run();














})();








