(function () {
	// Если IE тогда вместо currentScript будет так: document.querySelector('тут айдишник скрипта вставленный вручную')
	const cur_test = window.keradan.get_cur_test(document.currentScript);
	cur_test.log(`Test "${cur_test.init.go_title}" is here: `, cur_test);

	// Set dev behavior:
	cur_test.init.enable_log = true;
	cur_test.init.enable_ga_events = false;

	cur_test.ga_event('loaded');

	try {
    	// jdksdjdskjdsjkdsjkdsjkdsjkd
    }
    catch (e) {
		cur_test.log('Hotjar error: ', e);
	}

	let markup_content = {
 		ddsjhdsjh: 'djdshjdsjh',
 		sksjskjaa: `dsjsdjhsdhj`,
 	};

	document.querySelector("#styles-" + cur_test.init.name).innerHTML = `
	 	.${cur_test.init.css_scope_name}-something {
	 		background: red;
	 	}
 	`;

 	cur_test.iframe = {el: null, doc: null, status: null};
 	cur_test.timers = [];
 	cur_test.start_time = new Date().getTime();
 	cur_test.products = [];
 	cur_test.product_keys = {};

 	const promises_attributes = {
		iframe_is_created: {
			is_resolve: function(iframe){
				if(iframe.status != 'created') return false;
			    if(!iframe.doc) return false;
			    if(!iframe.doc.querySelector('.link__shopping')) return false;
			    return true;
			},
			reject_msg: 'Iframe not created longer than 15 seconds.',
			resolve_msg: 'Running cart in iframe: iframe_is_created.',
		},
		basket_button_ready: {
			is_resolve: function(iframe){
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
		},
		basket_loaded: {
			is_resolve: function(iframe){
				if(!iframe.doc.querySelector('section.basket-page')) return false;
			    return true;
			},
			reject_msg: 'Not found section.basket-page in iframe by 15 seconds.',
			resolve_msg: 'Running cart in iframe: section.basket-page founded - basket page has been loaded.',
		},
		basket_products_loaded: {
			is_resolve: function(iframe, timer_end, resolve_anyway){
				if(!iframe.doc.querySelector('section.basket-page .buttons__checkout app-dressa-button')) return false;
			    return true;
			},
			reject_msg: 'Not found basket products in iframe by 15 seconds.',
			resolve_msg: 'Running cart in iframe: basket products founded in iframe.',
			max_promise_time: 3000,
			promise_attempt_interval: 100,
		},
	};

	function get_iframe_promise (attributes) {
		let test = cur_test;
		if (!attributes.max_promise_time) attributes.max_promise_time = 15000;
		if (!attributes.promise_attempt_interval) attributes.promise_attempt_interval = 200;
		
		let promise = new Promise(function(resolve, reject) {
			let promise_timer_id = test.timers.push(null) - 1;

			setTimeout(function(){
				clearInterval(test.timers[promise_timer_id]);
				reject(new Error('iframe promise rejected. ' + attributes.reject_msg ?? ''));
			}, attributes.max_promise_time);

			test.timers[promise_timer_id] = setInterval(function(){
				if(attributes.is_resolve(test.iframe) !== true) return;
			    clearInterval(test.timers[promise_timer_id]);
			    resolve(`iframe promise resolved. ${attributes.resolve_msg ?? ''} \r resolved after ${window.keradan.get_test_time(cur_test.init.name)}s of test work.`);
			}, attributes.promise_attempt_interval);
		});
		return promise;
	}

	cur_test.create_iframe = function() {
		cur_test.iframe.status = 'loading';
		let old_iframe = document.querySelector('.keradan-cart-iframe');
		if(old_iframe) old_iframe.remove();
		cur_test.products = [];
		cur_test.product_keys = {};

		let parent_doc_text = document.documentElement.innerHTML;
		parent_doc_text = parent_doc_text.replace(/src=\"https:\/\/keradan\.github\.io\/cro_tests/, "src=\"");

		cur_test.iframe.el = document.createElement('iframe');
		cur_test.iframe.el.classList.add('keradan-cart-iframe');
		cur_test.iframe.el.setAttribute('width', '350');
		cur_test.iframe.el.setAttribute('height', '500');
		cur_test.iframe.el.setAttribute('style', 'border: 2px solid red; margin-bottom: 100px;');
		document.body.append(cur_test.iframe.el);

		cur_test.iframe.doc = cur_test.iframe.el.contentWindow.document;
		cur_test.iframe.el.contentWindow.test_updated_slide_in_cart_mobile_already_running = true;

		cur_test.iframe.doc.open();
		cur_test.iframe.doc.write(parent_doc_text);
		cur_test.iframe.doc.close();

		cur_test.iframe.status = 'created';
		return cur_test.iframe;
	}

	cur_test.run_iframe = function() {
		// let iframe = cur_test.iframe;

		get_iframe_promise(promises_attributes.iframe_is_created) // Ждем когда появится кнопка корзины чтобы нажать на нее и вывести попап с корзиной
		.then(function(msg) {
			cur_test.log(msg);
			cur_test.iframe.doc.querySelector('.link__shopping').click();
			return get_iframe_promise(promises_attributes.basket_button_ready); // Ждем когда в попапе появится кнопка оформить заказ, чтобы мы могли перейти на страницу корзины
		})
		.then(function(msg) {
			cur_test.log(msg);
			if(cur_test.iframe.doc.querySelector('.basket-wrapper .products h3.empty')) {
				// Открываем корзину на этом этапе, и пишем там что она пустая
				cur_test.show_cart();
				return Promise.reject();
			}
			cur_test.iframe.doc.querySelector('.basket-btn app-dressa-button').click();
			return get_iframe_promise(promises_attributes.basket_loaded); // Ждем пока загрузиться страница корзины
		})
		.then(function(msg) {
			cur_test.log(msg);
			return get_iframe_promise(promises_attributes.basket_products_loaded); // Ждем когда появятся товары
		})
		.then(function(msg) {
			cur_test.log(msg);
			// Hачинаем парсить товары, или что-то делаем с пустой корзиной
			// Нужно взять и начинить обьект данными из корзину. Так же должен для этого обьекта быть еще индикатор статуса.
			// Если статус ready то можно юзать, если другой то надо ждать в промисе
			// После этого можно будет переходить к работе над ивентами по открытию корзины
			cur_test.iframe.doc.querySelectorAll('app-cart-item').forEach(function(cart_item, i){
				let get_size_data = function(elem) {
					let size_data = elem.innerText.split('-');
					return {
						size: size_data[0].trim().replace(/[\D]+/g, ''),
						shipment: size_data[1].trim(),
					};
				}

				let product_data = {
					id: cart_item.querySelector('a.item__photo').getAttribute('href').split('-').reverse()[0],
					img_src: cart_item.querySelector('a.item__photo img').getAttribute('src'),
					link: cart_item.querySelector('a.item__photo').getAttribute('href'), // 'https://dressa.com.ua'
					title: cart_item.querySelector('h3.item__info_title').innerHTML,
					quantity: parseInt(cart_item.querySelector('div.item__quantity_counter span.counter__quantity').innerHTML),
					price: parseInt(cart_item.querySelector('div.item__price .item__price_amount').innerHTML.replace(/[\D]+/g, '')),
					sizes: {
						current: get_size_data(cart_item.querySelector('app-cart-item-size-filter div.select__value')),
						list: [],
					},
				};
				cart_item.querySelectorAll('app-cart-item-size-filter ul.select__dropdown li').forEach(item => product_data.sizes.list.push(get_size_data(item)));
				product_data.price_singular = product_data.price / product_data.quantity;

				cart_item.setAttribute('data-product-id', product_data.id);
				cart_item.setAttribute('data-product-key', i);
				cur_test.products.push(product_data);
				cur_test.product_keys[product_data.id] = i;
			});
	 		cur_test.show_cart();
		})
		.catch(error => console.error(error));
	}

	cur_test.show_cart = function() {
		cur_test.log('keradan showing cart with products: ', cur_test.products);
	}
	cur_test.change_something_in_cart = function() {
		iframe.doc.querySelectorAll('.counter__add')[1].click();
	}

	// document.addEventListener('readystatechange', function(){
	// 	cur_test.log('keradan readyState changed and now is: ', document.readyState);
	// 	if (document.readyState == 'complete') {

	// 		cur_test.log(`keradan create and run iframe, after ${get_current_test_time()} seconds of waiting`);

			cur_test.create_iframe();
			cur_test.run_iframe();
	// 	}
	// });

	// ПОДСКАЗКА:
	// window.keradan["dressa-updated-slide-in-cart-mobile"]
	// window.keradan["dressa-updated-slide-in-cart-mobile"].create_iframe(); window.keradan["dressa-updated-slide-in-cart-mobile"].run_iframe();














})();








