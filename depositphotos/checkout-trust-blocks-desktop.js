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
	 	.content-container_september-offer {
	    	background-color: transparent!important;
	    }
	    .content-container_september-offer:before {
	    	width: 100%!important;
	    	height: 50%!important;
	    	background-size: cover!important;
	    	background-image: url(https://images.unsplash.com/photo-1543007354-0bc99b7d096b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80)!important;
	    }
	    .content-container_september-offer .billing-page:before {
	    	display: none!important;
	    }
	    .content-container_september-offer .billing-page:after {
	    	background-color: transparent!important;
	    }
 	`;

 	let markup = `
 	`;

	let styles_el = document.createElement('style');
	styles_el.innerHTML = styles;
	document.querySelector('head').append(styles_el);	

	let keradan_markup_update_timer = setInterval(function(){
		console.log('okkkk');
		let cols = document.querySelectorAll('.billing-page__cell');
		let l_col = cols[0];
		let r_col = cols[1];
		let billing_settings = document.querySelector('.billing-settings');
		let btn_box = document.querySelector('._process');

		if (billing_settings.parentElement != l_col) l_col.append(billing_settings);
		if (btn_box.parentElement != l_col) billing_settings.before(btn_box);
		console.log({
			billing_settings: billing_settings,
			l_col: l_col,
			btn_box: btn_box,
			"billing_settings_parent": billing_settings.parentElement,
			"btn_box_parent": btn_box.parentElement,
		});
	}, 500);

})();