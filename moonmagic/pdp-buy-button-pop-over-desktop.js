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
 		.keradan-pdp-buy-button-popover {
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
 		.krdnpbbp .arrow-down, .krdnpbbp .arrow-up {
 			position: absolute;
 			left: 50%;
		    transform: translateX(-50%), translateY(-50%), rotate(45deg);
		    background: red;
		    width: 12px;
		    height: 12px;
		    box-sizing: border-box;
 		}
 	`;

 	let checkmark = '<svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M3.85584 7L1.06436 3.971C1.02051 3.91539 0.997598 3.84386 1.0002 3.7707C1.0028 3.69754 1.03072 3.62814 1.07839 3.57637C1.12606 3.5246 1.18995 3.49427 1.25731 3.49144C1.32467 3.48862 1.39053 3.5135 1.44173 3.56112L3.85049 6.17734L8.55827 1.0699C8.60947 1.02228 8.67533 0.997391 8.74269 1.00022C8.81005 1.00304 8.87394 1.03337 8.92161 1.08514C8.96927 1.13691 8.9972 1.20631 8.9998 1.27947C9.0024 1.35263 8.97949 1.42416 8.93564 1.47977L3.85584 7Z" fill="#FCBEC0" stroke="#FCBEC0"/></svg>';
 	let markup = `
 		<ul>
 			<li>
 				${checkmark}
 				<span>Only genuine gemstones and high quality materials</span>
 			</li>
 			<li>
 				${checkmark}
 				<span>Hassle-free return if size doesn’t fit</span>
 			</li>
 		</ul>
 		<span class="arrow-down"></span>
 		<span class="arrow-up"></span>
 	`;

 	let styles_el = document.createElement('style');
	// styles_el.classList.add('keradan-pdp-buy-button-popover-styles'); // .krdnpbbp - minified wrapper class for scope
	styles_el.innerHTML = styles;
	document.querySelector('head').append(styles_el);

	let markup_el = document.createElement('div');
	markup_el.classList.add('keradan-pdp-buy-button-popover', 'krdnpbbp', 'show'); // .krdnpbbp - minified wrapper class for scope
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