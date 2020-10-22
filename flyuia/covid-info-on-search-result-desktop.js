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
 	`;

 	let markup_el = document.createElement('div');
 	markup_el.classList.add(`${test_data.css_scope_name}-top-box`);
 	markup_el.innerHTML = 'keradan here helloooo';
 	document.querySelector('app-search-results .flights-section .outbound-section').prepend(markup_el);

 	window.keradan[test_data.name].start_time = new Date().getTime();
	function get_current_test_time(){
		return (Math.round((new Date().getTime() - window.keradan[test_data.name].start_time) / 100) / 10) + 's';
	}

	console.log('Test "Covid info on search result desktop" is here');

	let flight_info = document.querySelector('app-flights-product .flight-info-container .flight-info');
	let departure_code = flight_info.querySelector('.departure-info .info-code').innerHTML;
	let arrival_code = flight_info.querySelector('.arrival-info .info-code').innerHTML;
	
	keradan_log('flight_info', {
		departure_code: departure_code,
		arrival_code: arrival_code,
	});














})();








