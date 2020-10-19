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
		if(true) dataLayer.push(ga_data);
	}

	keradan_ga_event('loaded');

	try {
    	// jdksdjdskjdsjkdsjkdsjkdsjkd
    }
    catch (e) {
		keradan_log('Hotjar error: ', e);
	}

	keradan_log(test_data);

	let markup_content = {
 		ddsjhdsjh: 'djdshjdsjh',
 		sksjskjaa: `dsjsdjhsdhj`,
 	};

	document.querySelector("#styles-" + test_data.name).innerHTML = `
	 	.keradan {
	 		background: red;
	 	}
 	`;

 	window.keradan[test_data.name].iframe = {el: null, doc: null, status: null};
	

	console.log('Test "Updated slide in cart - Mobile" is here');

	window.keradan[test_data.name].create_iframe = function() {
		let iframe = window.keradan[test_data.name].iframe;
		let old_iframe = document.querySelector('.keradan-cart-iframe');
		if(old_iframe) old_iframe.remove();

		let parent_doc_text = document.documentElement.innerHTML;
		parent_doc_text = parent_doc_text.replace(/src=\"https:\/\/keradan\.github\.io\/cro_tests/, "src=\"");
		// parent_doc_text = parent_doc_text.replace(/<(\w+)\s[^>]*id=\"styles-dressa-updated-slide-in-cart-mobile\"[^>]*>[\s\S]*\1>/, "");

		iframe.el = document.createElement('iframe');
		iframe.el.classList.add('keradan-cart-iframe');
		// iframe.el.setAttribute('src', 'https://dressa.com.ua/cart');
		iframe.el.setAttribute('width', '350');
		iframe.el.setAttribute('height', '500');
		iframe.el.setAttribute('style', 'border: 2px solid red; margin-bottom: 100px;');
		document.body.append(iframe.el);

		iframe.doc = iframe.el.contentWindow.document;

		iframe.doc.open();
		iframe.doc.write(parent_doc_text);
		// iframe.doc.querySelector('#script-' + test_data.name).remove();
		// iframe.doc.querySelector('#styles-' + test_data.name).remove();
		// iframe.doc.querySelector('iframe.keradan-cart-iframe').remove();
		iframe.doc.close();

		iframe.status = 'created';
		return iframe;
	}

	window.keradan[test_data.name].run_iframe = function() {
		let iframe = window.keradan[test_data.name].iframe;
		
		iframe.doc.querySelector('.link__shopping').click();
		// iframe.doc.querySelector('.basket-btn app-dressa-button').click();
		//iframe.doc.querySelectorAll('.counter__add')[1].click();
	}












})();








