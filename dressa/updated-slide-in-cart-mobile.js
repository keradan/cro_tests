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

	window.keradan_cart_iframe_status = null;

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

	window.create_iframe = function() {
		window.keradan_cart_iframe = document.createElement('iframe');
		window.keradan_cart_iframe.classList.add('keradan-cart-iframe');
		// window.keradan_cart_iframe.setAttribute('src', 'https://dressa.com.ua/cart');
		window.keradan_cart_iframe.setAttribute('width', '350');
		window.keradan_cart_iframe.setAttribute('height', '500');
		window.keradan_cart_iframe.setAttribute('style', 'border: 2px solid red; margin-bottom: 100px;');
		window.keradan_cart_iframe_status = 'created';
		// window.keradan_cart_iframe_status = 'ready_to_use';
		keradan_log('keradans cart iframe:', {
			iframe: window.keradan_cart_iframe,
			iframe_status: window.keradan_cart_iframe_status,
		});
	}

	window.run_iframe = function() {
		keradan_log('run_iframe');

		document.body.append(window.keradan_cart_iframe);

		let keradan_cart_iframe_document = window.keradan_cart_iframe.contentWindow.document;

		window.keradan_cart_iframe.contentWindow.document.open();
		window.keradan_cart_iframe.contentWindow.document.write(document.documentElement.innerHTML);
		window.keradan_cart_iframe.contentWindow.document.close();

		// window.keradan_cart_iframe.contentWindow.document.querySelector('.link__shopping').click();
		//window.keradan_cart_iframe.contentWindow.document.querySelector('.basket-btn app-dressa-button').click();
		//window.keradan_cart_iframe.contentWindow.document.querySelectorAll('.counter__add')[1].click();
	}












})();








