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

	if (!window.keradan) window.keradan = {};
	window.keradan.updated_slide_in_cart = {};
	window.keradan.updated_slide_in_cart.iframe = {el: null, doc: null, status: null};

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

	window.keradan.updated_slide_in_cart.create_iframe = function() {
		let iframe = window.keradan.updated_slide_in_cart.iframe;

		iframe.el = document.createElement('iframe');
		iframe.el.classList.add('keradan-cart-iframe');
		// window.keradan_cart_iframe.setAttribute('src', 'https://dressa.com.ua/cart');
		iframe.el.setAttribute('width', '350');
		iframe.el.setAttribute('height', '500');
		iframe.el.setAttribute('style', 'border: 2px solid red; margin-bottom: 100px;');
		document.body.append(iframe.el);

		iframe.doc = iframe.el.contentWindow.document;

		iframe.doc.open();
		iframe.doc.write(document.documentElement.innerHTML);
		iframe.doc.close();

		iframe.status = 'created';
		return iframe;
	}

	window.keradan.updated_slide_in_cart.run_iframe = function() {
		let iframe = window.keradan.updated_slide_in_cart.iframe;
		
		iframe.doc.querySelector('.link__shopping').click();
		iframe.doc.querySelector('.basket-btn app-dressa-button').click();
		//iframe.doc.querySelectorAll('.counter__add')[1].click();
	}












})();








