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
 	window.keradan[test_data.name].timers = [];
 	window.keradan[test_data.name].start_time = new Date().getTime();

	function get_current_test_time(){
		return Math.round((new Date().getTime() - window.keradan[test_data.name].start_time) / 100) / 10;
	}
	

	console.log('Test "Updated slide in cart - Mobile" is here');

	const iframe_is_created_promise_attributes = {
		is_resolve: function(iframe){
			if(iframe.status != 'created') return false;
		    if(!iframe.doc) return false;
		    if(!iframe.doc.querySelector('.link__shopping')) return false;
		    return true;
		},
		reject_msg: 'Iframe not created longer than 15 seconds.',
		resolve_msg: 'Running cart in iframe: iframe_is_created.',
	};
	
	const basket_button_ready_promise_attributes = {
		is_resolve: function(iframe){
			// if(!iframe.doc.querySelector('section.basket-page')) return false;
			if(!iframe.doc.querySelector('.link__shopping')) return false;
			if(!iframe.doc.querySelector('.basket-btn app-dressa-button')) {
				iframe.doc.querySelector('.link__shopping').click();
				return false;
			}
		    return true;
		},
		reject_msg: 'Not found basket_button in iframe by 15 seconds.',
		resolve_msg: 'Running cart in iframe: basket_button_ready.',
		promise_attempt_interval: 500,
		// max_promise_time: 20000,
	};
	
	const basket_loaded_promise_attributes = {
		is_resolve: function(iframe){
			if(!iframe.doc.querySelector('section.basket-page')) return false;
		    return true;
		},
		reject_msg: 'Not found section.basket-page in iframe by 15 seconds.',
		resolve_msg: 'Running cart in iframe: section.basket-page founded - basket page has been loaded.',
	};

	const basket_products_loaded_promise_attributes = {
		is_resolve: function(iframe, timer_end, resolve_anyway){
			if(timer_end) {
				resolve_anyway('basket is empty');
				return true;
			}
			if(!iframe.doc.querySelector('section.basket-page .buttons__checkout app-dressa-button')) return false;
		    return true;
		},
		reject_msg: 'Not found basket products in iframe by 15 seconds.',
		resolve_msg: 'Running cart in iframe: basket products founded in iframe.',
		max_promise_time: 3000,
		promise_attempt_interval: 100,
	};

	function get_iframe_promise (attributes) {
		let test = window.keradan[test_data.name];
		if (!attributes.max_promise_time) attributes.max_promise_time = 15000;
		if (!attributes.promise_attempt_interval) attributes.promise_attempt_interval = 200;
		
		let promise = new Promise(function(resolve, reject) {		  
			let promise_timer_id = test.timers.push(null) - 1;
			let last_iteration = attributes.max_promise_time / attributes.promise_attempt_interval;
			let iteration = 0;
			let timer_end = false;

			setTimeout(function(){
				clearInterval(test.timers[promise_timer_id]);
				reject(new Error('iframe promise rejected. ' + attributes.reject_msg ?? ''));
			}, attributes.max_promise_time);

			test.timers[promise_timer_id] = setInterval(function(){
				let resolve_anyway = function(msg = null){
					resolve('iframe promise force resolved. ' + msg ?? '');
			    	keradan_log(`resolved after ${get_current_test_time()}s of test work`);
				}
				if (iteration == last_iteration - 1) timer_end = true;
				let is_resolve = attributes.is_resolve(test.iframe, timer_end, resolve_anyway);
				if(is_resolve !== true) return;
			    clearInterval(test.timers[promise_timer_id]);
			    resolve('iframe promise resolved. ' + attributes.resolve_msg ?? '');
			    keradan_log(`resolved after ${get_current_test_time()}s of test work`);
			    iteration++;
			}, attributes.promise_attempt_interval);
		});
		return promise;
	}

	window.keradan[test_data.name].create_iframe = function() {
		let iframe = window.keradan[test_data.name].iframe;
		iframe.status = 'loading';
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
		iframe.el.contentWindow.test_updated_slide_in_cart_mobile_already_running = true;

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

		get_iframe_promise(iframe_is_created_promise_attributes) // Ждем когда появится кнопка корзины чтобы нажать на нее и вывести попап с корзиной
		.then(function(msg) {
			keradan_log(msg);
			iframe.doc.querySelector('.link__shopping').click();
			return get_iframe_promise(basket_button_ready_promise_attributes); // Ждем когда в попапе появится кнопка оформить заказ, чтобы мы могли перейти на страницу корзины
		})
		.then(function(msg) {
			keradan_log(msg);
			iframe.doc.querySelector('.basket-btn app-dressa-button').click();
			return get_iframe_promise(basket_loaded_promise_attributes); // Ждем пока загрузиться страница корзины
		})
		.then(function(msg) {
			keradan_log(msg);
			return get_iframe_promise(basket_products_loaded_promise_attributes); // Ждем когда появятся товары
		})
		.then(function(msg) {
			keradan_log(msg);
			// Hачинаем парсить товары, или что-то делаем с пустой корзиной
			// Нужно взять и начинить обьект данными из корзину. Так же должен для этого обьекта быть еще индикатор статуса.
			// Если статус ready то можно юзать, если другой то надо ждать в промисе
			// После этого можно будет переходить к работе над ивентами по открытию корзины
			
		})
		.catch(error => console.error(error));
	}

	window.keradan[test_data.name].change_something_in_cart = function() {
		iframe.doc.querySelectorAll('.counter__add')[1].click();
	}

	document.addEventListener('readystatechange', function(){
		keradan_log('keradan readyState changed and now is: ', document.readyState);
		if (document.readyState == 'complete') {

			keradan_log(`keradan create and run iframe, after ${get_current_test_time()} seconds of waiting`);

			window.keradan[test_data.name].create_iframe();
			window.keradan[test_data.name].run_iframe();
		}
	});

	// ПОДСКАЗКА:
	// window.keradan["dressa-updated-slide-in-cart-mobile"]
	// window.keradan["dressa-updated-slide-in-cart-mobile"].create_iframe(); window.keradan["dressa-updated-slide-in-cart-mobile"].run_iframe();














})();








