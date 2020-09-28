(function () {
	let keradan_enable_log = true;
	function keradan_log() {
		if(keradan_enable_log) console.log.apply(this, arguments);
	}

	let keradan_ga_event = function(eventAction, eventLabel = null) {
		let dataLayer = window.dataLayer || [];
		let ga_data = {
			'event': 'event-to-ga',
			'eventCategory': 'fjfjfjfdhjdjhdfjhdjhdfjhdjhfdhjdfhj',
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
    	hj('trigger', 'sdhsdhsdhsdhsdhsdhsdhsdhsdhsdhsdh');
	}
    catch (e) {
		keradan_log('Hotjar error: ', e);
	}

 	let styles = `
 		.keradan-money-back-box {

 		}
 		.krdnmbb .summary-box {

 		}
 	`;

 	let exp_data = {
 		summary_title: 'My Order Summary',
 		arrow: '<svg width="19" height="10" viewBox="0 0 19 10" fill="none"><path d="M1.1875 8.875L9.5 1.75L17.8125 8.875" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
 		check_mark: '<svg width="15" height="12" viewBox="0 0 15 12" fill="none"><path d="M5 8.586L1.707 5.293L0.292999 6.707L5 11.414L14.707 1.707L13.293 0.292999L5 8.586Z" fill="#32B259"/></svg>',
 		list: [
 			'Cancel subscription anytime inside your customer account',
 			'100% money-back guarantee',
 		],
 	};

 	let markup = `
 		<div class="summary-box collapsed">
 			<div class="head">
 				<div class="title">${exp_data.summary_title}</div>
 				<div class="price">
 					<span class="number">65.90</span>
 				</div>
 				<div class="arrow">${exp_data.arrow}</div>
 			</div>
 			<div class="body">
 				jkdsjkjkdsjksdjk
 			</div>
 		</div>
 		<div class="container money-back-text">
	 		<div class="column">
	 			<ul></ul>
	 		</div>
 		</div>
 	`;

 	let styles_el = document.createElement('style');
	styles_el.innerHTML = styles;
	document.querySelector('head').append(styles_el);

	let markup_el = document.createElement('div');
	markup_el.classList.add('keradan-money-back-box', 'krdnmbb'); // .krdnmbb - minified wrapper class for scope
	markup_el.innerHTML = markup;
	// document.querySelector('#js-pp-add-to-cart').append(markup_el);
	document.querySelector('.content').prepend(markup_el);
	
	exp_data.list.forEach(function(list_item_text){
		let li = document.createElement('li');
		li.innerHTML = `${exp_data.check_mark} <span class="text">${list_item_text}</span>`;
		markup_el.querySelector('.money-back-text ul').append(li);
	});
	

	// document.querySelector('#js-pp-add-to-cart').addEventListener('mouseenter', function(){
	// 	keradan_ga_event('hover', 'Button Add to cart');

	// 	// console.log('button entered');
	// 	markup_el.classList.toggle('show-above', false);
	// 	markup_el.classList.toggle('show-below', false);
	// 	markup_el.classList.toggle('show', true);
		
	// 	let btn = document.querySelector('#js-pp-add-to-cart');
	// 	let btn_distance_to_top = btn.getBoundingClientRect().height + btn.getBoundingClientRect().y;
	// 	if (btn_distance_to_top < (window.innerHeight - 100)) {
	// 		console.log('снизу');
	// 		markup_el.classList.toggle('show-below', true);
	// 	} else {
	// 		console.log('сверху');
	// 		markup_el.classList.toggle('show-above', true);
	// 	}
		
	// });
	// markup_el.addEventListener('mouseenter', function(){
	// 	markup_el.classList.toggle('show', false);
	// });
	// document.querySelector('#js-pp-add-to-cart').addEventListener('mouseleave', function(){
	// 	markup_el.classList.toggle('show', false);
	// });

	

	
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