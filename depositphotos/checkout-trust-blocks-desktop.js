(function () {
	let keradan_enable_log = true;
	function keradan_log() {
		if(keradan_enable_log) console.log.apply(this, arguments);
	}

	let keradan_ga_event = function(eventAction, eventLabel = null) {
		let dataLayer = window.dataLayer || [];
		let ga_data = {
			'event': 'event-to-ga',
			'eventCategory': 'dsjkddsjkdjskjkdsjsdkjdsjkdsjkdsjdsjkdsjkdsjkdsjkdskjdsjkdsjkdsjkdsjkdskjdsjkdsjkdskjdskjdskdjsdshlkdjshdlskjhdsljkkds',
			'eventAction': eventAction
		};
		if (eventLabel) ga_data['eventLabel'] = eventLabel;
		keradan_log('keradan ga event: ', ga_data);
		if(false) dataLayer.push(ga_data);
	}

	keradan_ga_event('loaded');

	try {
		(function(h,o,t,j,a,r){
    		h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
	        h._hjSettings={hjid:1651990,hjsv:6};
	        a=o.getElementsByTagName('head')[0];
	        r=o.createElement('script');r.async=1;
	        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
	        a.appendChild(r);
		})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
		window.hj = window.hj || function(){(hj.q = hj.q || []).push(arguments)};
    	hj('trigger', 'dkdsjkdsjkdsjdsjkdsjkdsjkdsjkdsjkdsjkdsjkdsjkdsjkdsjkdsjkdsjkdsjkdsjkdsjkdsjkdsjkdsjkdskjdsjkdsjkdskjdskjdsjkdskj');
	}
    catch (e) {
		keradan_log('Hotjar error: ', e);
	}

 	let styles = `
 	`;

 	let markup = `
 	`;

	let styles_el = document.createElement('style');
	styles_el.innerHTML = styles;
	document.querySelector('head').append(styles_el);

	console.log('keradan here deposit');
})();