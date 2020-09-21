(function () {
	let keradan_enable_log = true;
	function keradan_log() {
		if(keradan_enable_log) console.log.apply(this, arguments);
	}

	let keradan_ga_event = function(eventAction) {
		let dataLayer = window.dataLayer || [];
		let ga_data = {
			'event': 'event-to-ga',
			'eventCategory': 'defaultdefaultdefaultdefaultdefaultdefaultdefaultdefaultdefault',
			'eventAction': eventAction
		};
		keradan_log('keradan ga event: ', ga_data);
		if(false) dataLayer.push(ga_data);
	}

	keradan_ga_event('loaded');

	/*
		(function(h,o,t,j,a,r){
			h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
			h._hjSettings={hjid:1955547,hjsv:6};
			a=o.getElementsByTagName('head')[0];
			r=o.createElement('script');r.async=1;
			r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
			a.appendChild(r);
		})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
		window.hj = window.hj || function(){(hj.q = hj.q || []).push(arguments)};

		try {
			hj('trigger', 'popup_cta_non-us');
		}
	    catch (e) {
			keradan_log('Hotjar error: ', e);
		}
	*/

 	let styles = `
 		.keradan-delayed-popup-wrapper {
 			display: none;
 			position: absolute;
		    top: 0;
		    left: 50%;
		    transform: translateX(-50%);
		    width: 100%;
 		}
 		.krdnpbbp.show {
 			display: flex;
 		}
 		.krdnpbbp.show-above, .krdnpbbp.show-below {
 			display: flex;
 		}
 	`;

 	let markup = `
 		<span>
 			выорвыорврыорвроы
 		</span>
 	`;

 	let styles_el = document.createElement('style');
	styles_el.innerHTML = styles;
	document.querySelector('head').append(styles_el);

	let markup_el = document.createElement('div');
	markup_el.classList.add('keradan-delayed-popup-wrapper', 'krdnpbbp'); // .krdnpbbp - minified wrapper class for scope
	markup_el.innerHTML = markup;
	document.querySelector('#js-pp-add-to-cart').append(markup_el);

	

	
	// var popup_wrapper = document.querySelector('.krdndpw');

	// popup_wrapper.addEventListener('click', function(event){
	// 	if (event.target != popup_wrapper) return false;
	// 	keradan_ga_event('close popup - background');
	// 	close_popup();
	// });
	// popup_wrapper.querySelector('button.close').addEventListener('click', function(){
	// 	keradan_ga_event('close popup - X');
	// 	close_popup();
	// });
	// popup_wrapper.querySelector('a.request-button').addEventListener('click', function(){
	// 	keradan_ga_event('click on Watch this video to find out');
	// });

	// setTimeout(show_popup, 5000);
})();