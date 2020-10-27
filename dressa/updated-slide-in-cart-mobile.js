(function () {
	// Если IE тогда вместо currentScript будет так: document.querySelector('тут айдишник скрипта вставленный вручную')
	const cur_test = window.keradan.get_cur_test(document.currentScript);

	// Set dev behavior:
	cur_test.init.enable_log = true;
	cur_test.init.enable_ga_events = false;

	cur_test.log(`%c Keradan's test "${cur_test.init.go_title}" is here:`, 'background: #222; color: #bada55',  cur_test);

	cur_test.ga_event('loaded');

	try {
    	// jdksdjdskjdsjkdsjkdsjkdsjkd
    }
    catch (e) {
		cur_test.log('Hotjar error: ', e);
	}

	function get_iframe_promise (attributes) {
		if (!attributes.max_promise_time) attributes.max_promise_time = 15000;
		if (!attributes.promise_attempt_interval) attributes.promise_attempt_interval = 200;
		
		let promise = new Promise(function(resolve, reject) {
			let promise_timer_id = cur_test.timers.push(null) - 1;

			setTimeout(function(){
				clearInterval(cur_test.timers[promise_timer_id]);
				reject(new Error('iframe promise rejected. ' + attributes.reject_msg ?? ''));
			}, attributes.max_promise_time);

			cur_test.timers[promise_timer_id] = setInterval(function(){
				if(attributes.is_resolve(cur_test.iframe) !== true) return;
			    clearInterval(cur_test.timers[promise_timer_id]);
			    resolve(`iframe promise resolved. ${attributes.resolve_msg ?? ''} \r resolved after ${window.keradan.get_test_time(cur_test.init.name)} of test work.`);
			}, attributes.promise_attempt_interval);
		});
		return promise;
	}

	cur_test.get_default_cart_el = function(cur_test) {
		let cart_el = document.createElement('div');
	 	cart_el.classList.add(`scope-parent`, 'cart-wrapper', 'hide');
	 	cart_el.setAttribute('data-scope-name', cur_test.init.css_scope_name);
	 	cart_el.setAttribute('data-test-name', cur_test.init.name);
		cart_el.innerHTML = `
	 		<div class="inner">
	 			<button class="close-cart" data-event="click" data-event-handler-name="close_cart">close X</button>
	 			<button class="return-to-shopping" data-event="click" data-event-handler-name="close_cart">Продолжить покупки</button>
	 			<button class="checkout" data-event="click" data-event-handler-name="checkout">Оформить заказ</button>
	 			
	 			<button data-event="click" data-event-handler-name="assign_promo_code">Подтвердить</button>
	 			
	 			<div class="products-wrapper"></div>
	 		</div>
	 	`;
	 	return cart_el;
	}

	cur_test.create_iframe = function() {
		// cur_test.iframe.status = 'loading';
		cur_test.change_status('loading');
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

		try {
	    	cur_test.iframe.doc.open();
			cur_test.iframe.doc.write(parent_doc_text);
			cur_test.iframe.doc.close();
	    }
	    catch (e) {
			cur_test.log('iframe creation error: ', e);
		}

		let iframe_creating_timer = setInterval(function(){
			// cur_test.log('attempt to create iframe: ', {
			// 	doc: cur_test.iframe.doc,
			// 	bx24_form_container_15: cur_test.iframe.doc.querySelector('#bx24_form_container_15'),
			// 	link__shopping: cur_test.iframe.doc.querySelector('.link__shopping'),
			// });
			if(!cur_test.iframe.doc) return false;
			if(!cur_test.iframe.doc.querySelector('.bx-crm-widget-form-config-sidebar-hamburger')) return false; // этот елемент прогружается не сразу, юзаем его как индикатор что страница загрузилась (хоть примерно)
			if(!cur_test.iframe.doc.querySelector('.link__shopping')) return false;
			
			clearInterval(iframe_creating_timer);
			cur_test.change_status('created_and_ready_for_run_cart');
		}, 200);

		return cur_test.iframe;
	}

	cur_test.change_status = function(new_status) {
		cur_test.iframe.status = new_status;
		cur_test.log(`%c keradan iframe status changed (${window.keradan.get_test_time(cur_test.init.name)}): `, 'background: #ff00f429; color: #004077', new_status);
	}

	cur_test.run_iframe = function() {
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
				let product_data = cur_test.parse_iframe_cart_item(cart_item);

				cart_item.setAttribute('data-product-id', product_data.id);
				cart_item.setAttribute('data-product-key', i);
				cur_test.products.push(product_data);
				cur_test.product_keys[product_data.id] = i;
			});
		})
		.catch(error => console.error(error))
		.finally(() => cur_test.fill_cart());
	}

	cur_test.assign_promo_code = function() {
	}

	cur_test.checkout = function() {
		let default_buttons = document.querySelectorAll('#isBasketOpen .order-btn app-dressa-button, app-product-info .shop_in_dressa_buttons .button__confirm app-dressa-button');
		if(default_buttons.length == 0) return;

		default_buttons[0].click();
	}

	cur_test.close_cart = function() {
		cur_test.change_status('closed');

		document.querySelectorAll('#isBasketOpen .close-btn, app-add-product-to-card-modal .close').forEach((default_close_btn) => default_close_btn.click());
		
		cur_test.markup.elements.cart.classList.toggle('hide', true);
		setTimeout(function(){
			cur_test.markup.elements.cart.remove();
			cur_test.markup.elements.cart = cur_test.get_default_cart_el(cur_test);
		}, 300);
		
		setTimeout(() => cur_test.create_iframe(), 601); // когда я закрываю корзину, начинаем перегружать айфрейм
	}

	cur_test.add_cart_event = function(elem){
		elem.addEventListener(elem.dataset.event, function (e) {
			let cur_test = window.keradan[e.currentTarget.closest('.scope-parent').dataset.testName];
			cur_test.event_handlers[e.currentTarget.dataset.eventHandlerName](e.currentTarget, cur_test);
		});
		elem.setAttribute('data-already-listened', '');
	}

	cur_test.show_cart = function() {
		cur_test.change_status('is_showing_loading_cart');
		cur_test.log('keradan showing cart without products (loading)');
		
		document.body.append(cur_test.markup.elements.cart);
		document.querySelectorAll(`${scope_parent} *[data-event][data-event-handler-name]:not([data-already-listened])`).forEach(cur_test.add_cart_event);
		document.querySelector(`${scope_parent}.cart-wrapper`).addEventListener('click', function(e){
			if(e.target == this) cur_test.event_handlers.close_cart(this, window.keradan[this.dataset.testName]);
		});

		setTimeout(() => cur_test.markup.elements.cart.classList.toggle('hide', false), 0);
	}

	cur_test.render_cart_item = function(product_data) {
		let select_size_box = [];
		product_data.sizes.list.forEach((size_item) => select_size_box.push(`
			<div class="size-item" data-event="click" data-event-handler-name="choose_size">
				<span class="size">Размер: ${size_item.size}</span>
				<br>
				<span class="shipment">${size_item.shipment}</span>
			</div>
		`));

		let markup = `
			<div class="photo-col">
				<a href="${product_data.link}"><img src="${product_data.img_src}"></a>
			</div>
			<div class="content-col">
				<a class="title" href="${product_data.link}">${product_data.title}</a>
				<div class="sizes-wrapper">
					<div class="choosen-size-box" data-event="click" data-event-handler-name="open_sizes">
						<div class="content">
							<span class="size">Размер: ${product_data.sizes.current.size}</span>
							<br>
							<span class="shipment">${product_data.sizes.current.shipment}</span>
						</div>
						<div class="arrow">${cur_test.markup.content.arrow_icon}</div>
					</div>
					<div class="select-size-box">${select_size_box.join('')}</div>
				</div>
				<div class="quantity-wrapper">
					<div class="controls">
						<button class="dec" data-event="click" data-event-handler-name="decrease_product_quantity">-</button>
						<span class="num">${product_data.quantity}</span>
						<button class="inc" data-event="click" data-event-handler-name="increase_product_quantity">+</button>
					</div>
					<div class="price">
						<span class="number">${product_data.price}</span>
						<span class="currency">${product_data.currency}</span>
					</div>
				</div>
			</div>
			<div class="actions-col">
				<button class="favorites" data-event="click" data-event-handler-name="add_to_favorites">${cur_test.markup.content.heart_icon}</button>
				<button class="delete" data-event="click" data-event-handler-name="delete_product">${cur_test.markup.content.trash_icon}</button>
			</div>
		`;

		return markup;
	}

	cur_test.parse_iframe_cart_item = function(cart_item) {
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
			currency: 'грн',
			sizes: {
				current: get_size_data(cart_item.querySelector('app-cart-item-size-filter div.select__value')),
				list: [],
			},
		};
		cart_item.querySelectorAll('app-cart-item-size-filter ul.select__dropdown li').forEach(item => product_data.sizes.list.push(get_size_data(item)));
		product_data.price_singular = product_data.price / product_data.quantity;

		return product_data;
	}

	cur_test.fill_cart = function() {
		cur_test.log('keradan filling cart with products: ', cur_test.products);
		cur_test.products.forEach(function(product_data, i){
			let product_el = document.createElement('div');
			product_el.classList.add('scope-product', 'product-item-wrapper');
			product_el.setAttribute('data-product-key', i);
			product_el.setAttribute('data-product-id', product_data.id);
			product_el.innerHTML = cur_test.render_cart_item(product_data);

			document.querySelector(`${scope_parent} .products-wrapper`).append(product_el);
			product_el.querySelectorAll(`*[data-event][data-event-handler-name]:not([data-already-listened])`).forEach(cur_test.add_cart_event);

			if(i == cur_test.products.length - 1) cur_test.change_status('is_showing_cart_filled_with_product');
		});
	}

	cur_test.change_something_in_cart = function() {
		iframe.doc.querySelectorAll('.counter__add')[1].click();
	}

	cur_test.cart_monitoring = function() {
		let cart_monitoring_timer_id = setInterval(function(){
			// тут чекаем открыта ли дефолтная корзина
			let default_cart_els = document.querySelectorAll('#isBasketOpen, app-add-product-to-card-modal');
			if(default_cart_els.length == 0) return;
			if(cur_test.iframe.status != 'created_and_ready_for_run_cart') return;
			// if(['is_showing_loading_cart', 'is_showing_cart_filled_with_product'].includes(cur_test.iframe.status)) return;


			// если да тогда мы показываем нашу и запускаем айфрейм ран
			cur_test.show_cart();
			cur_test.run_iframe();
			// когда промис резолвнется или реджектнется мы выводим туда контент наш
		}, 200);
	}

	cur_test.start_cart_recounting = function(product_el, iframe_product_el) {
		get_iframe_promise(promises_attributes.cart_payment_updating_begin)
		.then(function(msg) {
			cur_test.log(msg);
			return get_iframe_promise(promises_attributes.cart_payment_updating_end);
		})
		.then(function(msg) {
			cur_test.log(msg);
			// тут нужно сделать перерендеринг товара
			let product_data = cur_test.parse_iframe_cart_item(iframe_product_el);
			product_el.innerHTML = cur_test.render_cart_item(product_data);

			// тут будет пересчет тотала


			product_el.querySelectorAll(`*[data-event][data-event-handler-name]:not([data-already-listened])`).forEach(cur_test.add_cart_event);
			cur_test.change_status('is_showing_cart_filled_with_product');
		})
		.catch(error => console.error(error));
	}

	cur_test.iframe = {el: null, doc: null, status: null};
 	cur_test.timers = [];
 	cur_test.products = [];
 	cur_test.product_keys = {};

 	cur_test.event_handlers = {
		close_cart: function(elem, cur_test) {
			cur_test.log('cart closed. event target: ', elem);
			cur_test.close_cart();
		},
		checkout: function(elem, cur_test) {
			cur_test.log('checkout button clicked. event target: ', elem);
			cur_test.checkout();
			cur_test.close_cart();
		},
		assign_promo_code: function(elem, cur_test) {
			cur_test.log('assign_promo_code button clicked. event target: ', elem);
			cur_test.assign_promo_code();
		},
		increase_product_quantity: function(elem, cur_test) {
			cur_test.log('increase_product_quantity button clicked. event target: ', elem);
			cur_test.change_status('is_showing_cart_updating_products_and_total');

			let product_el = elem.closest('.scope-product');
			let iframe_product_el = cur_test.iframe.doc.querySelector(`app-cart-item[data-product-id="${product_el.dataset.productId}"]`);

			cur_test.start_cart_recounting(product_el, iframe_product_el);

			iframe_product_el.querySelector('.counter__add').click();
		},
		decrease_product_quantity: function(elem, cur_test) {
			cur_test.log('decrease_product_quantity button clicked. event target: ', elem);
			cur_test.change_status('is_showing_cart_updating_products_and_total');

			let product_el = elem.closest('.scope-product');
			let iframe_product_el = cur_test.iframe.doc.querySelector(`app-cart-item[data-product-id="${product_el.dataset.productId}"]`);

			cur_test.start_cart_recounting(product_el, iframe_product_el);

			iframe_product_el.querySelector('.counter__delete').click();
		},
		delete_product: function(elem, cur_test) {
			cur_test.log('delete_product button clicked. event target: ', elem);
		},
		add_to_favorites: function(elem, cur_test) {
			cur_test.log('add_to_favorites button clicked. event target: ', elem);
		},
		open_sizes: function(elem, cur_test) {
			cur_test.log('open_sizes clicked. event target: ', elem);
		},
		choose_size: function(elem, cur_test) {
			cur_test.log('choose_size clicked. event target: ', elem);
		},
	};

 	const promises_attributes = {
		iframe_is_created: {
			is_resolve: function(iframe){
				if(!['created', 'is_showing_loading_cart'].includes(iframe.status)) return false;
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
		cart_payment_updating_begin: {
			is_resolve: function(iframe){
				if(!iframe.doc.querySelector('app-checkout-cart-mobile-block .cart.cart--payment-update')) return false;
			    return true;
			},
			reject_msg: 'Not found .cart.cart--payment-update in iframe by 5 seconds.',
			resolve_msg: 'Changing product data in cart: iframe cart updating started',
			max_promise_time: 5000,
			promise_attempt_interval: 70,
		},
		cart_payment_updating_end: {
			is_resolve: function(iframe){
				if(iframe.doc.querySelector('app-checkout-cart-mobile-block .cart.cart--payment-update') != null) return false;
			    return true;
			},
			reject_msg: '.cart.cart--payment-update updating too long: 5 seconds.',
			resolve_msg: 'Changing product data in cart: iframe cart updating ended',
			max_promise_time: 5000,
			promise_attempt_interval: 70,
		},
	};

	let scope_parent = `.scope-parent[data-scope-name=${cur_test.init.css_scope_name}]`;
	document.querySelector("#styles-" + cur_test.init.name).innerHTML = `
	 	${scope_parent}.cart-wrapper {
	 		position: fixed;
	 		top: 0;
	 		left: 0;
	 		height: 100vh;
	 		width: 100vw;
	 		background: #00000099;
	 		z-index: 9999999999999999999999999999;
	 		transition: all 0.3s ease;
	 		opacity: 1;
	 	}
	 	${scope_parent}.cart-wrapper.hide {
	 		opacity: 0;
	 	}

	 	${scope_parent}.cart-wrapper .products-wrapper {
	 		overflow-y: scroll;
	 		max-height: 60vh;
	 	}
	 	${scope_parent}.cart-wrapper .product-item-wrapper {
	 		display: flex;
	 		background: transparent;
	 		background: white;
	 		margin: 10px 0;
	 		padding: 5px;
	 	}
	 	${scope_parent}.cart-wrapper .product-item-wrapper .photo-col {
	 		display: block;
		    width: 30%;
		    overflow: hidden;
	 	}
	 	${scope_parent}.cart-wrapper .product-item-wrapper .photo-col a {
	 		display: block;
	 	}
	 	${scope_parent}.cart-wrapper .product-item-wrapper .photo-col a img {
	 		display: block;
	 		max-width: 100%;
	 	}
	 	${scope_parent}.cart-wrapper .product-item-wrapper .content-col {
	 		max-width: 60%;
	 		box-sizing: border-box;
	 		padding: 0 10px;
	 		display: flex;
		    flex-flow: column;
		    align-items: flex-start;
		    justify-content: space-between;
	 	}
	 	${scope_parent}.cart-wrapper .product-item-wrapper .content-col a.title {
	 		color: red;
	 	}
	 	${scope_parent}.cart-wrapper .product-item-wrapper .content-col .sizes-wrapper {
	 		color: red;
	 	}
	 	${scope_parent}.cart-wrapper .product-item-wrapper .content-col .sizes-wrapper .choosen-size-box {
	 		color: blue;
	 	}
	 	${scope_parent}.cart-wrapper .product-item-wrapper .content-col .sizes-wrapper .choosen-size-box .content {
	 		color: red;
	 	}
	 	${scope_parent}.cart-wrapper .product-item-wrapper .content-col .sizes-wrapper .choosen-size-box .arrow {
	 		color: green;
	 	}
	 	${scope_parent}.cart-wrapper .product-item-wrapper .content-col .sizes-wrapper .select-size-box {
	 		color: green;
	 		position: absolute;
		    height: 0;
		    overflow: hidden;
	 	}
	 	${scope_parent}.cart-wrapper .product-item-wrapper .content-col .sizes-wrapper .select-size-box .size-item {
	 		color: purple;
	 	}
	 	${scope_parent}.cart-wrapper .product-item-wrapper .content-col .quantity-wrapper {
	 		display: flex;
		    width: 100%;
		    justify-content: space-between;
		    align-items: center;
	 	}
	 	${scope_parent}.cart-wrapper .product-item-wrapper .content-col .quantity-wrapper .controls {
	 		display: flex;
		    width: 45%;
		    justify-content: space-between;
		    align-items: center;
		    border: 1px solid #CCCCCC;
	 	}
	 	${scope_parent}.cart-wrapper .product-item-wrapper .content-col .quantity-wrapper .controls button {
	 		width: 30px;
		    height: 30px;
		    font-family: monospace;
		    font-size: 23px;
		    display: flex;
		    justify-content: center;
		    align-items: center;
		    background: transparent;
		    padding-bottom: 2px;
	 	}
	 	${scope_parent}.cart-wrapper .product-item-wrapper .content-col .quantity-wrapper .controls button.dec {
	 		color: #989898;
	 	}
	 	${scope_parent}.cart-wrapper .product-item-wrapper .content-col .quantity-wrapper .controls button.inc {
	 		color: black;
	 	}
	 	${scope_parent}.cart-wrapper .product-item-wrapper .content-col .quantity-wrapper .controls span.num {
	 		font-family: Roboto;
		    font-weight: 500;
		    font-size: 14px;
		    color: black;
	 	}
	 	${scope_parent}.cart-wrapper .product-item-wrapper .actions-col {
	 		max-width: 10%;
		    display: flex;
		    flex-flow: column;
		    justify-content: space-between;
		    align-items: center;
	 	}
	 	${scope_parent}.cart-wrapper .product-item-wrapper .actions-col button {
	 		padding: 3px;
	 		background: transparent;
	 	}
 	`;

 	cur_test.markup = {
 		elements: {
 			cart: cur_test.get_default_cart_el(cur_test),
 		},
 		content: {
	 		arrow_icon: `<svg width="16" height="8" viewBox="0 0 16 8" fill="none"><path d="M15 0.999999L8 7L1 1" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
	 		heart_icon: `<svg width="22" height="19" viewBox="0 0 22 19" fill="none"><path d="M10.7988 2.19947L11.2201 1.77698C12.0652 0.928653 13.1423 0.350836 14.3151 0.11667C15.4879 -0.117497 16.7035 0.00251563 17.8082 0.461516C18.913 0.920516 19.857 1.69787 20.521 2.69517C21.1849 3.69248 21.5389 4.8649 21.5381 6.06404C21.5381 7.67117 20.9012 9.21368 19.7669 10.3494L11.382 18.7579C11.2271 18.9129 11.0172 19 10.7984 19C10.5795 19 10.3696 18.9129 10.2147 18.7579L1.8298 10.3486C0.69642 9.21194 0.059737 7.67033 0.0598145 6.06292C0.0598919 4.4555 0.696724 2.91395 1.83021 1.7774C2.9637 0.640837 4.501 0.00236933 6.10392 0.002447C7.70684 0.00252466 9.24408 0.641142 10.3775 1.77781L10.7988 2.2003V2.19947ZM17.5934 10.1854L18.5988 9.17723C19.2137 8.56153 19.6325 7.77674 19.8024 6.92219C19.9722 6.06764 19.8854 5.18178 19.5529 4.37674C19.2204 3.5717 18.6572 2.88369 17.9346 2.39981C17.212 1.91594 16.3624 1.65795 15.4935 1.65852C14.3287 1.65852 13.2118 2.12243 12.3874 2.94919L11.3828 3.95737C11.2279 4.11268 11.0178 4.19992 10.7988 4.19992C10.5797 4.19992 10.3696 4.11268 10.2147 3.95737L9.20936 2.94919C8.38578 2.12319 7.26872 1.65911 6.10392 1.65903C4.93913 1.65895 3.82201 2.12289 2.99832 2.94878C2.17463 3.77467 1.71184 4.89486 1.71177 6.06292C1.71169 7.23098 2.17433 8.35123 2.99791 9.17723L10.7988 17.0008L17.5934 10.1862V10.1854Z" fill="#6458B7"/></svg>`,
	 		trash_icon: `<svg width="20" height="21" viewBox="0 0 20 21" fill="none"><path d="M15.1766 3.8185H19.0266C19.5586 3.8185 19.9891 4.2455 19.9891 4.77225C19.9891 5.29987 19.5586 5.72688 19.0266 5.72688H18.0641V18.1361C18.0641 19.7181 16.7718 21 15.1766 21H5.55164C3.95651 21 2.66414 19.7181 2.66414 18.1361V5.72688H1.70164C1.16964 5.72688 0.739136 5.29987 0.739136 4.77312C0.739136 4.2455 1.16964 3.8185 1.70164 3.8185H5.55164V2.86387C5.55164 1.28188 6.84401 0 8.43914 0H12.2891C13.8843 0 15.1766 1.28188 15.1766 2.86387V3.81763V3.8185ZM13.2516 3.8185V2.86387C13.2516 2.33625 12.8211 1.90925 12.2891 1.90925H8.43914C7.90714 1.90925 7.47664 2.33625 7.47664 2.863V3.8185H13.2516ZM16.1391 5.72688H4.58914V18.1361C4.58914 18.6637 5.01964 19.0908 5.55164 19.0908H15.1766C15.7086 19.0908 16.1391 18.6637 16.1391 18.137V5.726V5.72688Z" fill="#BDBDBD"/></svg>`,
	 	},
 	};

	cur_test.create_iframe();
	cur_test.cart_monitoring();

	// ПОДСКАЗКА:
	// window.keradan["dressa-updated-slide-in-cart-mobile"]
	// window.keradan["dressa-updated-slide-in-cart-mobile"].create_iframe(); window.keradan["dressa-updated-slide-in-cart-mobile"].run_iframe();














})();








