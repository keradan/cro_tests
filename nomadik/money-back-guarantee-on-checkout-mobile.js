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
 		.krdnmbb .summary-box, .krdnmbb .shipping-schedule-box {
 			background: #F6F6F6;
 			padding: 10px 25px;
 		}
 		.krdnmbb .summary-box .head, .krdnmbb .shipping-schedule-box .head {
 			position: relative;
 			display: flex;
		    width: 100%;
		    margin: 0 auto;
		    justify-content: space-between;
		    align-items: center;
		    padding-right: 30px;
 		}
 		.krdnmbb .summary-box .head .title, .krdnmbb .shipping-schedule-box .head .title {
 			font-family: Open Sans;
		    font-style: normal;
		    font-weight: 800;
		    font-size: 16px;
		    color: #282562;
		}
		.krdnmbb .shipping-schedule-box .head .title {
			font-family: Roboto;
			font-weight: bold;
			font-size: 16px;
		}
 		.krdnmbb .summary-box .head .price {
 			margin: 0;
		    padding: 0;
		    font-family: Roboto;
		    font-weight: bold;
		    font-size: 16px;
		    color: #212032;
 		}
 		.krdnmbb .summary-box .head .arrow, .krdnmbb .shipping-schedule-box .head .arrow {
 			position: absolute;
		    right: 0;
		    width: 20px;
		    transform: rotate3d(0, 0, 0, 0);
		    transition: all 0.3s ease;
 		}
 		.krdnmbb .summary-box.collapsed .head .arrow, .krdnmbb .shipping-schedule-box.collapsed .head .arrow {
 			transform: rotate3d(180, 0, 0, 180deg);
 		}
 		.krdnmbb .summary-box .body {
 			border-top: 1px solid #DCDCDC;
 			margin: 0;
		    margin-top: 10px;
		    padding: 0;
		    padding-top: 10px;
		    max-height: 100vh;
		    overflow: hidden;
		    opacity: 1;
		    transition: all 0.2s ease;
 		}
 		.krdnmbb .shipping-schedule-box .body {
 			margin: 0;
		    margin-top: 10px;
		    padding: 0;
		    padding-top: 10px;
		    max-height: 100vh;
		    overflow: hidden;
		    opacity: 1;
		    transition: all 0.2s ease;
		    color: #212032;
		    font-family: Roboto;
		    font-weight: normal;
		    font-size: 14px;
		    line-height: 18px;
 		}
 		.krdnmbb .shipping-schedule-box .body p {
 			margin: 0;
 			padding: 0;
 			margin-bottom: 10px;
 		}
 		.krdnmbb .summary-box.collapsed .body, .krdnmbb .shipping-schedule-box.collapsed .body {
		    margin-top: 0;
		    padding-top: 0;
		    max-height: 0;
		    opacity: 0;
 		}
 		.krdnmbb .summary-box .body .summary-row {
 			display: flex;
		    flex-flow: row;
		    align-items: flex-start;
		    justify-content: space-between;
		    margin-bottom: 20px;
 		}
 		.krdnmbb .summary-box .body .summary-row button.delete {
 			border: none;
		    background: transparent;
		    margin: 0;
		    padding: 5px;
		    padding-left: 0;
		    width: 30px;
 		}
 		.krdnmbb .summary-box .body .summary-row .product_data {
 			width: calc(100% - 100px);
 		}
 		.krdnmbb .summary-box .body .summary-row .product_data .product-name {
 			font-family: Roboto;
		    font-weight: bold;
		    font-size: 16px;
		    line-height: 19px;
		    color: #212032;
 		}
 		.krdnmbb .summary-box .body .summary-row .product_data .subscription-plan {
 			margin-top: 5px;
 			font-family: Roboto;
		    font-weight: normal;
		    font-size: 14px;
		    line-height: 16px;
		    color: #212032;
 		}
 		.krdnmbb .summary-box .body .summary-row .product_data .subscription-autorenew {
 			font-family: Roboto;
		    font-weight: bold;
		    font-size: 14px;
		    line-height: 16px;
		    color: #212032;
 		}
 		.krdnmbb .summary-box .body .summary-row .price {
 			font-family: Roboto;
		    font-weight: normal;
		    font-size: 16px;
		    color: #212032;
		    margin: 0;
		    padding: 0;
		    margin-top: 2px;
		    width: 70px;
		    text-align: right;
 		}

 		.krdnmbb .money-back-text ul {
 			list-style: none;
		    margin: 0;
		    margin-top: 10px;
		    margin-bottom: -10px;
		    padding: 0 11px;
		    display: flex;
		    flex-flow: column;
		    justify-content: center;
		    align-items: flex-start;
 		}
 		.krdnmbb .money-back-text ul li {
 			display: flex;
		    margin: 5px 0;
		    padding: 0;
 		}
 		.krdnmbb .money-back-text ul li svg {
 			min-width: 15px;
		    margin-top: 2px;
		    margin-right: 5px;
		}
 		.krdnmbb .money-back-text ul li .text {
 			font-family: Roboto;
		    font-weight: 500;
		    font-size: 14px;
		    line-height: 16px;
		}
 	`;

 	let exp_data = {
 		delete_icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18ZM10 8.586L12.828 5.757L14.243 7.172L11.414 10L14.243 12.828L12.828 14.243L10 11.414L7.172 14.243L5.757 12.828L8.586 10L5.757 7.172L7.172 5.757L10 8.586Z" fill="#ED143D"/></svg>',
 		summary_title: 'My Order Summary',
 		shipping_schedule_title: 'Shipping Schedule',
 		arrow: '<svg width="19" height="10" viewBox="0 0 19 10" fill="none"><path d="M1.1875 8.875L9.5 1.75L17.8125 8.875" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
 		check_mark: '<svg width="15" height="12" viewBox="0 0 15 12" fill="none"><path d="M5 8.586L1.707 5.293L0.292999 6.707L5 11.414L14.707 1.707L13.293 0.292999L5 8.586Z" fill="#32B259"/></svg>',
 		list: [
 			'Cancel subscription anytime inside your customer account',
 			'100% money-back guarantee',
 		],
 		shipping_schedule_body: `
			<p>If you order before the 14th your box will ship by the 24th of this month.</p>
			<p>If you order after the 14th your box ships next month by the 24th.</p>
			<p>if you want it sooner, email us after you order <a href="mailto:info@thenomadik.com">info@thenomadik.com</a> we can expedite your first box for free.</p>
 		`,
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
 			<div class="body"></div>
 		</div>
 		<div class="shipping-schedule-box collapsed">
 			<div class="head">
 				<div class="title">${exp_data.shipping_schedule_title}</div>
 				<div class="arrow">${exp_data.arrow}</div>
 			</div>
 			<div class="body">${exp_data.shipping_schedule_body}</div>
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

	document.querySelector('.krdnmbb .summary-box .head .price .number').innerHTML = document.querySelector('#total_price').textContent;

	function keradan_add_row_to_summary(row_data) {
		console.log(row_data);
		let row_el = document.createElement('div');
		row_el.classList.add('summary-row');
		row_el.innerHTML = `
			<button class="delete" onclick="document.querySelector('form#${row_data.form_id}').submit();">${exp_data.delete_icon}</button>
			<div class="product_data">${row_data.product_data}</div>
			<div class="price">${row_data.price}</div>
		`;
		markup_el.querySelector('.krdnmbb .summary-box .body').append(row_el);
	}

	document.querySelectorAll('.cart_listing table.item_table .delete_column').forEach(function(delete_column){
		let row = delete_column.parentElement;
		let form = delete_column.querySelector('form');
		let product_column = row.querySelector('td.product_column');
		let price_column = row.querySelector('td.price_column');
		
		if (!form || !product_column || !price_column) return;

		keradan_add_row_to_summary({form_id: form.getAttribute('id'), product_data: product_column.innerHTML, price: price_column.textContent});
	});

	document.querySelector('.krdnmbb .summary-box .head').addEventListener('click', function(){
		document.querySelector('.krdnmbb .summary-box').classList.toggle('collapsed');
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