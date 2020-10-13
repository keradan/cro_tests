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

	let markup_content = {
 		prices_compare_image_src: 'https://i.ibb.co/qgSMfwy/fl-prices-compare.png',
 		new_description_text: `We at Filippo Loreti wanted to make luxury watches accessible to anyone. While major brands in watch industry markup their products by 8x-16x of the actual cost, we do things differently. By bypassing traditional channels, building direct relationships with manufacturers and designing our products in-house, we're able to provide high-quality, beautiful luxury goods at down-to-earth prices.`,
 	};


 	let styles = `
 		.product-section-promo-text .product-information-block-text {
 			background: transparent;
 			padding-top: 30px;
 		}
 		.product-section-promo-text .img-section {
 			display: none;
 		}
 		.product-section-promo-text .product-information-block__title, .product-section-promo-text .description {
 			color: black;
 		}
 		.product-section-promo-text .page-width {
 			background: transparent;
 		}
 	`;

	let styles_el = document.createElement('style');
	styles_el.innerHTML = styles;
	document.querySelector('head').append(styles_el);

	keradan_log('test - sales-copy-on-pdp-2-mobile');

	let description_block = document.querySelector('.product-section-promo-text .product-information-block-text .description');
	description_block.innerHTML = markup_content.new_description_text;
	
	let image_block = document.createElement('div');
	image_block.classList.add('image-block');
	image_block.innerHTML = `<img src="${markup_content.prices_compare_image_src}">`;
	description_block.before(image_block);


})();