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
 			position: absolute;
		    top: 70px;
    		left: 0;
		    width: 100%;
		    border: 1px solid pink;
		    background: white;
		    box-shadow: 0 0 15px rgba(0,0,0,0.1);
		    padding: 5px;
		    transition: all 0.2s ease;
		    opacity: 1;

 		}
 		.keradan-pdp-buy-button-popover:not(.show){
 			height: 0;
		    padding: 0 5px;
		    border-width: 0;
		    opacity: 0;
 		}
 		.krdnpbbp.show {
 			display: flex!important;
 		}
 		.krdnpbbp.show-above, .krdnpbbp.show-below {
 			display: flex;
 		}
 		.krdnpbbp .arrow {
		    position: absolute;
		    left: 50%;
		    box-sizing: border-box;
		    width: 12px;
		    height: 12px;
		    background: white;
		    border-right: 1px solid transparent;
		    border-bottom: 1px solid transparent;
		    border-left: 1px solid pink;
		    border-top: 1px solid pink;
		    transition: all 0.2s ease;
 		}
 		.krdnpbbp .arrow.up {
 			top: 0;
		    transform: translateX(-50%) translateY(-50%) rotate(45deg);
		}
 		.krdnpbbp .arrow.down {
 			bottom: 0;
 			transform: translateX(-50%) translateY(50%) rotate(-135deg);
 		}
 		.krdnpbbp:not(.show) .arrow {
 			width: 0;
		    height: 0;
		    border-width: 0;
 		}
 		.krdnpbbp ul {
 			overflow: hidden;
 			transition: all 0.2s ease;
		}
		.krdnpbbp:not(.show) ul {
			height: 0;
		}
 		.krdnpbbp ul li {
 			display: flex;
 			margin-bottom: 8px;
 		}
 		.krdnpbbp ul li:last-child {
 			margin-bottom: 0;
 		}
 		.krdnpbbp ul li svg {
 			width: 10px;
		    height: 10px;
		    transform: translateY(3px);
		    margin-right: 4px;
 		}
 		.krdnpbbp ul li span.text {
 			font-family: Montserrat;
		    font-weight: 500;
		    font-size: 12px;
		    line-height: 16px;
		    text-transform: none;
		    max-width: calc(100% - 14px);
		    text-align: left;
 		}
 	`;

 	let checkmark = '<svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M3.85584 7L1.06436 3.971C1.02051 3.91539 0.997598 3.84386 1.0002 3.7707C1.0028 3.69754 1.03072 3.62814 1.07839 3.57637C1.12606 3.5246 1.18995 3.49427 1.25731 3.49144C1.32467 3.48862 1.39053 3.5135 1.44173 3.56112L3.85049 6.17734L8.55827 1.0699C8.60947 1.02228 8.67533 0.997391 8.74269 1.00022C8.81005 1.00304 8.87394 1.03337 8.92161 1.08514C8.96927 1.13691 8.9972 1.20631 8.9998 1.27947C9.0024 1.35263 8.97949 1.42416 8.93564 1.47977L3.85584 7Z" fill="#FCBEC0" stroke="#FCBEC0"/></svg>';
 	let markup = `
 		<ul>
 			<li>
 				${checkmark}
 				<span class="text">Only genuine gemstones and high quality materials</span>
 			</li>
 			<li>
 				${checkmark}
 				<span class="text">Hassle-free return if size doesn’t fit</span>
 			</li>
 		</ul>
 		<span class="arrow up"></span>
 	`;

 	let styles_el = document.createElement('style');
	// styles_el.classList.add('keradan-pdp-buy-button-popover-styles'); // .krdnpbbp - minified wrapper class for scope
	styles_el.innerHTML = styles;
	document.querySelector('head').append(styles_el);

	let markup_el = document.createElement('div');
	markup_el.classList.add('keradan-pdp-buy-button-popover', 'krdnpbbp'); // .krdnpbbp - minified wrapper class for scope
	markup_el.innerHTML = markup;
	document.querySelector('#js-pp-add-to-cart').append(markup_el);

	document.querySelector('#js-pp-add-to-cart').addEventListener('mouseenter', function(){
		console.log('button entered');
		markup_el.classList.toggle('show', true);
	});
	markup_el.addEventListener('mouseenter', function(){
		console.log('popover entered');
		markup_el.classList.toggle('show', false);
	});
	document.querySelector('#js-pp-add-to-cart').addEventListener('mouseleave', function(){
		console.log('button leave');
		markup_el.classList.toggle('show', false);
	});

	

	
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