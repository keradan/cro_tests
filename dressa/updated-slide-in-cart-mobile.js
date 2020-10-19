(function () {
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
		if(true) dataLayer.push(ga_data);
	}

	keradan_ga_event('loaded');

	try {
    	// jdksdjdskjdsjkdsjkdsjkdsjkd
    }
    catch (e) {
		keradan_log('Hotjar error: ', e);
	}

	let markup_content = {
 		ddsjhdsjh: 'djdshjdsjh',
 		sksjskjaa: `dsjsdjhsdhj`,
 	};

 	let styles = `
	 	.keradan {
	 		background: red;
	 	}
 	`;

	let styles_el = document.createElement('style');
	styles_el.innerHTML = styles;
	document.querySelector('head').append(styles_el);

	console.log('Test "Updated slide in cart - Mobile" is here');












})();








