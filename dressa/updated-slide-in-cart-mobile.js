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
	 	cart_el.classList.add(`scope-parent`, 'cart-wrapper', 'hide', 'loading', 'empty-cart');
	 	cart_el.setAttribute('data-scope-name', cur_test.init.css_scope_name);
	 	cart_el.setAttribute('data-test-name', cur_test.init.name);
		cart_el.innerHTML = `
	 		<div class="inner">
	 			<button class="close-cart" data-event="click" data-event-handler-name="close_cart">
	 				<svg width="21" height="21" viewBox="0 0 21 21" fill="none"><path d="M18.715 20.5493L10.5 12.3213L2.28497 20.5493L0.450806 18.7151L8.67872 10.5001L0.450806 2.28509L2.28497 0.450928L10.5 8.67884L18.715 0.463845L20.5362 2.28509L12.3212 10.5001L20.5362 18.7151L18.715 20.5493Z" fill="black"></path></svg>
	 			</button>
	 			<div class="head">
	 				<div class="title">Товары в корзине</div>
	 			</div>
	 			<div class="body">
	 				<div class="products-wrapper"></div>
	 				<div class="total"></div>
	 				<div class="promo-code-box">
			 			<input type="text" placeholder="Промокод">
			 			<button data-event="click" data-event-handler-name="assign_promo_code">Подтвердить</button>
		 			</div>
	 			</div>
	 			<div class="bottom">
	 				<hr class="top-line">
	 				<div class="total">
	 					<div class="title">Итог заказа</div>
	 					<div class="price"></div>
	 				</div>
		 			<div class="buttons">
		 				<button class="return-to-shopping" data-event="click" data-event-handler-name="close_cart">Продолжить<br>покупки</button>
		 				<button class="checkout" data-event="click" data-event-handler-name="checkout">Оформить заказ</button>
		 			</div>
	 			</div>
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
		// cur_test.iframe.el.setAttribute('width', '350');
		// cur_test.iframe.el.setAttribute('height', '500');
		cur_test.iframe.el.setAttribute('style', `
			position: fixed;
		    top: 110px;
		    height: 85vh;
		    left: 1vw;
		    border: 2px solid red;
		    width: 80vw;
		    opacity: 0.8;
		`);
		// cur_test.iframe.el.setAttribute('style', 'display: none;'); //border: 2px solid red; margin-bottom: 100px;
		document.body.append(cur_test.iframe.el);

		cur_test.iframe.doc = cur_test.iframe.el.contentWindow.document;
		cur_test.iframe.el.contentWindow.test_updated_slide_in_cart_mobile_already_running = true;

		// try {
	    	cur_test.iframe.doc.open();
			cur_test.iframe.doc.write(parent_doc_text);
			cur_test.iframe.doc.close();
	 //    }
	 //    catch (e) {
		// 	cur_test.log('iframe creation error: ', e);
		// }

		let iframe_creating_timer = setInterval(function(){
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

			// если товаров нет и я знаю об этом заранее, тогда мы не ждем их появления а сразу вызываем корзину
			if(document.querySelector('.basket-wrapper .products h3.empty')) {
				cur_test.show_cart();
				return Promise.reject(new Error('iframe promise rejected. Basket is empty (known in advance).'));
			}

			cur_test.iframe.doc.querySelector('.link__shopping').click();
			return get_iframe_promise(promises_attributes.basket_button_ready); // Ждем когда в попапе появится кнопка оформить заказ, чтобы мы могли перейти на страницу корзины
		})
		.then(function(msg) {
			cur_test.log(msg);
			cur_test.iframe.doc.querySelector('.basket-btn app-dressa-button').click();
			return get_iframe_promise(promises_attributes.basket_loaded); // Ждем пока загрузиться страница корзины
		})
		.then(function(msg) {
			cur_test.log(msg);
			cur_test.iframe.doc.querySelector('app-basket-page div.title').click(); // этот кусочек просто кликает по заголовку страницы, тем самым как-то оживляет почему-то спящий айфрейм
			return get_iframe_promise(promises_attributes.basket_products_loaded); // Ждем когда появятся товары
		})
		.then(function(msg) {
			cur_test.log(msg);
			let iframe_cart_items = cur_test.iframe.doc.querySelectorAll('app-cart-item');
			iframe_cart_items.forEach(function(cart_item, i){
				let product_data = cur_test.parse_iframe_cart_item(cart_item);

				cart_item.setAttribute('data-product-id', product_data.id);
				cart_item.setAttribute('data-product-key', i);
				cur_test.products.push(product_data);
				cur_test.product_keys[product_data.id] = i;
				if(i == iframe_cart_items.length - 1) {
					console.log('all products parsed');
					cur_test.fill_cart();
				}
			});
			
			setTimeout(()=>console.log('after product parsing'), 0);
		})
		.catch(function(error) {
			console.error(error);
			cur_test.fill_cart();
		});
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

	cur_test.render_cart_totals = function() {
		let iframe_cart_payment_box = cur_test.iframe.doc.querySelector('app-checkout-cart-mobile-block .cart__payment');
		return {
			body_totals_markup: iframe_cart_payment_box.innerHTML.replace(/\<\!\-\-\-\-\>/g, '').replace(/_ng(.)+=""/g, ''),
			bottom_total_price: iframe_cart_payment_box.querySelector('.cart__payment_total_text').innerHTML,
		};
	}

	cur_test.render_cart_item = function(product_data) {
		let select_size_box = [];
		product_data.sizes.list.forEach((size_item, i) => select_size_box.push(`
			<div class="size-item" data-event="click" data-event-handler-name="choose_size" data-size-item-key="${i + 1}" ${size_item.is_disabled ? 'data-size-item-disabled' : ''}>
				<span class="size">Размер: ${size_item.size}</span>
				<br>
				<span class="shipment">(${size_item.shipment})</span>
			</div>
		`));

		let markup = `
			<div class="photo-col">
				<a href="${product_data.link}"><img src="${product_data.img_src}"></a>
			</div>
			<div class="content-col">
				<div class="head">
					<a class="product-title" href="${product_data.link}">${product_data.title}</a>
					<button class="favorites ${product_data.is_favorite ? 'active' : ''}" data-event="click" data-event-handler-name="add_to_favorites" ${product_data.disable_favorite ? 'data-disable-favorite' : ''}>${cur_test.markup.content.heart_icon}</button>
				</div>
				<div class="sizes-wrapper">
					<div class="choosen-size-box" data-event="click" data-event-handler-name="toggle_sizes_select_box">
						<div class="content">
							<span class="size">Размер: ${product_data.sizes.current.size}</span>
							<br>
							<span class="shipment">(${product_data.sizes.current.shipment})</span>
						</div>
						<div class="arrow">${cur_test.markup.content.arrow_icon}</div>
					</div>
					<div class="select-size-box">${select_size_box.join('')}</div>
				</div>
				<div class="quantity-wrapper">
					<div class="controls">
						<button class="dec" data-event="click" data-event-handler-name="decrease_product_quantity" ${product_data.is_minimal_quantity ? 'data-disabled-button' : ''}>-</button>
						<span class="num">${product_data.quantity}</span>
						<button class="inc" data-event="click" data-event-handler-name="increase_product_quantity">+</button>
					</div>
					<div class="price">
						<span class="number">${product_data.price}</span>
						<span class="currency">${product_data.currency}</span>
					</div>
					<button class="delete" data-event="click" data-event-handler-name="delete_product">${cur_test.markup.content.trash_icon}</button>
				</div>
			</div>
		`;

		return markup;
	}

	cur_test.parse_iframe_cart_item = function(cart_item) {
		let get_size_data = function(elem) {
			let size_item_data = {
				is_disabled: elem.classList.contains('select__dropdown_item--gray'),
				size: elem.innerHTML.replace(/\<span.+span\>/gs, '').replace(/Размер:/i, '').trim(),
				shipment: elem.querySelectorAll('.select__dropdown_item_variant, .select__value_variant')[0].innerHTML.replace(/\<span.+span\>/g, '').trim(),
			};
			// console.log(size_item_data);
			return size_item_data;
		}

		let popup_logout = document.querySelector('.popup__logout');
		let iframe_popup_logout = cur_test.iframe.doc.querySelector('.popup__logout');

		let product_data = {
			id: cart_item.querySelector('a.item__photo').getAttribute('href').split('-').reverse()[0],
			img_src: cart_item.querySelector('a.item__photo img').getAttribute('src'),
			link: cart_item.querySelector('a.item__photo').getAttribute('href'),
			title: cart_item.querySelector('h3.item__info_title').innerHTML,
			is_favorite: cart_item.querySelector('.item__icons .icon__heart').classList.contains('icon__heart--active'),
			disable_favorite: (!popup_logout || !iframe_popup_logout || popup_logout.querySelector('.popup__logout').innerHTML != "Выйти" || iframe_popup_logout.querySelector('.popup__logout').innerHTML != "Выйти"),
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
		product_data.is_minimal_quantity = product_data.quantity == 1;

		cur_test.log(`%c keradan product_data for render product item:`, 'background: #d5ff00; color: #004454',  product_data);

		return product_data;
	}

	cur_test.fill_cart = function() {
		cur_test.log('keradan filling cart with products: ', cur_test.products);

		let cart_totals_data = cur_test.products.length > 0 ? cur_test.render_cart_totals() : {
			body_totals_markup: '', // `<div class="cart__payment_title">Корзина пуста</div>`
			bottom_total_price: '0 грн',
		};
		document.querySelector(`${scope_parent} .inner .body`).addEventListener('touchmove', (e) => e.stopPropagation(), true);
		document.querySelector(`${scope_parent} .inner .body .total`).innerHTML = cart_totals_data.body_totals_markup;
		document.querySelector(`${scope_parent} .inner .bottom .total .price`).innerHTML = cart_totals_data.bottom_total_price;
		document.querySelector(`${scope_parent}`).classList.toggle('empty-cart', cur_test.products.length == 0);
		setTimeout(() => cur_test.markup.elements.cart.classList.toggle('loading', false), 0);


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

	cur_test.cart_monitoring = function() {
		setTimeout(function(){
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
		}, 0);
	}

	cur_test.start_cart_recounting = function(product_el = null, iframe_product_el = null) {
		cur_test.markup.elements.cart.classList.toggle('loading', true);
		get_iframe_promise(promises_attributes.cart_payment_updating_begin)
		.then(function(msg) {
			cur_test.log(msg);
			return get_iframe_promise(promises_attributes.cart_payment_updating_end);
		})
		.then(function(msg) {
			cur_test.log(msg);

			let cart_totals_data = cur_test.render_cart_totals();
			document.querySelector(`${scope_parent} .inner .body .total`).innerHTML = cart_totals_data.body_totals_markup;
			document.querySelector(`${scope_parent} .inner .bottom .total .price`).innerHTML = cart_totals_data.bottom_total_price;

			if(product_el && iframe_product_el) {
				if(!cur_test.iframe.doc.contains(iframe_product_el)) { // если произошло удаление товара из корзины
					product_el.innerHTML = '';
					product_el.remove();
				} else {
					// делаем перерендеринг товара
					let product_data = cur_test.parse_iframe_cart_item(iframe_product_el);
					product_el.innerHTML = cur_test.render_cart_item(product_data);
					product_el.querySelectorAll(`*[data-event][data-event-handler-name]:not([data-already-listened])`).forEach(cur_test.add_cart_event);
				}
			}
			cur_test.markup.elements.cart.classList.toggle('loading', false);
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
			
			let promo_code_input_el = cur_test.markup.elements.cart.querySelector(`.promo-code-box input`);
			if(!promo_code_input_el.value) return;

			fetch("https://rest.dressa.com.ua/api/order-promocode/accept", {
				headers: {
					authorization: "Bearer Yzk4MGU0ZDViNjRjNGRjYjRjMTcxZTAzNDUzOGNjOWU0ZmNhNzExNTg3Zjk3ZTRlYmVmZGI5MGYzY2MxZmZhNQ",
				},
				body: JSON.stringify({code: promo_code_input_el.value}),
				method: "POST",
			}).then((response) => {
				return response.json();
			})
			.then((data) => {
				console.log(data);
			}).catch(error => console.error(error));

			// cur_test.change_status('is_showing_cart_updating_products_and_total');
			// cur_test.start_cart_recounting();

			// iframe.doc.querySelector('app-promo-code form input[name="promoCode"]').value = promo_code_input_el.value;
			// iframe.doc.querySelector('app-promo-code form app-dressa-button').click();
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
			if(elem.hasAttribute("data-disabled-button")) return;
			cur_test.change_status('is_showing_cart_updating_products_and_total');

			let product_el = elem.closest('.scope-product');
			let iframe_product_el = cur_test.iframe.doc.querySelector(`app-cart-item[data-product-id="${product_el.dataset.productId}"]`);

			cur_test.start_cart_recounting(product_el, iframe_product_el);

			iframe_product_el.querySelector('.counter__delete').click();
		},
		delete_product: function(elem, cur_test) {
			cur_test.log('delete_product button clicked. event target: ', elem);
			cur_test.change_status('is_showing_cart_updating_products_and_total');

			let product_el = elem.closest('.scope-product');
			let iframe_product_el = cur_test.iframe.doc.querySelector(`app-cart-item[data-product-id="${product_el.dataset.productId}"]`);

			cur_test.start_cart_recounting(product_el, iframe_product_el);

			iframe_product_el.querySelector('.item__icons .icon__trash').click();
		},
		add_to_favorites: function(elem, cur_test) {
			cur_test.log('add_to_favorites button clicked. event target: ', elem);

			// cur_test.log('is user authanticated: ', document.querySelector('.popup__logout').innerHTML == "Выйти");
			// cur_test.log('is user authanticated in iframe: ', cur_test.iframe.doc.querySelector('.popup__logout').innerHTML == "Выйти");
			let popup_logout = document.querySelector('.popup__logout');
			let iframe_popup_logout = cur_test.iframe.doc.querySelector('.popup__logout');
			if (!popup_logout || !iframe_popup_logout || popup_logout.querySelector('.popup__logout').innerHTML != "Выйти" || iframe_popup_logout.querySelector('.popup__logout').innerHTML != "Выйти") return;
			
			cur_test.change_status('is_showing_cart_updating_products_and_total');

			let product_el = elem.closest('.scope-product');
			let iframe_product_el = cur_test.iframe.doc.querySelector(`app-cart-item[data-product-id="${product_el.dataset.productId}"]`);

			cur_test.start_cart_recounting(product_el, iframe_product_el);

			iframe_product_el.querySelector('.item__icons .icon__heart').click();
		},
		toggle_sizes_select_box: function(elem, cur_test) {
			cur_test.log('toggle_sizes_select_box clicked. event target: ', elem);
			cur_test.log('closest sizes-wrapper: ', elem.closest('.sizes-wrapper'));
			elem.closest('.sizes-wrapper').classList.toggle('opened');
		},
		choose_size: function(elem, cur_test) {
			cur_test.log('choose_size clicked. event target: ', elem);
			
			if(elem.hasAttribute("data-size-item-disabled")) return;

			cur_test.change_status('is_showing_cart_updating_products_and_total');

			let product_el = elem.closest('.scope-product');
			let iframe_product_el = cur_test.iframe.doc.querySelector(`app-cart-item[data-product-id="${product_el.dataset.productId}"]`);
			let iframe_item_el = iframe_product_el.querySelector(`app-cart-item-size-filter ul.select__dropdown li:nth-child(${elem.dataset.sizeItemKey})`);
			
			cur_test.start_cart_recounting(product_el, iframe_product_el);

			console.log({
				iframe_item_el: iframe_item_el,
				item_el_click: iframe_item_el.click,
			});

			iframe_item_el.click();
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
			reject_msg: 'Not found basket_button in iframe by 30 seconds.',
			resolve_msg: 'Running cart in iframe: basket_button_ready.',
			max_promise_time: 30000,
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
			max_promise_time: 15000,
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
			reject_msg: '.cart.cart--payment-update updating too long: 15 seconds.',
			resolve_msg: 'Changing product data in cart: iframe cart updating ended',
			max_promise_time: 15000,
			promise_attempt_interval: 500,
		},
	};

	let scope_parent = `.scope-parent[data-scope-name=${cur_test.init.css_scope_name}]`;
	document.querySelector("#styles-" + cur_test.init.name).innerHTML = `
		/* Default elements hide: */
		app-add-product-to-card-modal, .openAddProductModal, #isBasketOpen, .header__main_links .basket-wrapper .products-overlay {
			display: none!important;
		}
		body {
			overflow: auto!important;
		}

		/* ___ TMP ___ */

		${scope_parent}.cart-wrapper {
			height: 20vh!important;
			overflow-y: scroll!important;
			bottom: 0!important;
			top: auto!important;

		}
		
		/* ___ TMP ___ */


		/* Our test styles: */
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

	 		font-family: Roboto;
			font-weight: normal;
			color: #000000;
	 	}
	 	${scope_parent}.cart-wrapper.hide {
	 		opacity: 0;
	 	}
	 	${scope_parent}.cart-wrapper .close-cart {
	 		position: absolute;
		    top: 0;
		    right: 0;
		    display: flex;
		    padding: 10px;
		    border: none;
		    background: transparent;
		    z-index: 1;
	 	}
	 	${scope_parent}.cart-wrapper .inner {
	 		position: absolute;
	 		bottom: 0;
	 		left: 0;
	 		width: 100vw;
	 		background: white;
	 	}
	 	${scope_parent}.cart-wrapper .body {
	 		overflow-y: scroll;
		    max-height: 60vh;
		    min-height: 40vh;
		    position: relative;
	 	}
	 	${scope_parent}.cart-wrapper.loading .inner .body::after {
		    content: "";
		    position: absolute;
		    top: 0;
		    left: 0;
		    width: 100%;
		    height: 100%;
		    background: rgb(255 255 255 / 0.85);
		    background-image: url(/assets/img/spinner.svg);
		    background-repeat: no-repeat;
		    background-position: center;
		    background-size: 50px;
		    z-index: 2;
		}
		${scope_parent}.cart-wrapper.empty-cart .inner .body::before {
			content: "Корзина пуста";
		    position: absolute;
		    top: 0;
		    height: 100%;
		    width: 100%;
		    display: flex;
		    justify-content: center;
		    align-items: center;
		    font-weight: bold;
		    font-size: 14px;
		    text-align: center;
		    letter-spacing: 0.3em;
		    text-transform: uppercase;
		    color: grey;
		    z-index: 1;
		}

		${scope_parent}.cart-wrapper.empty-cart .inner .body .products-wrapper,
		${scope_parent}.cart-wrapper.empty-cart .inner .body .total,
		${scope_parent}.cart-wrapper.empty-cart .inner .body .promo-code-box {
			display: none;
		}

	 	${scope_parent}.cart-wrapper .inner .head .title {
	 		font-weight: bold;
	    	font-size: 15px;
		    text-align: center;
		    letter-spacing: 0.3em;
		    text-transform: uppercase;
		    line-height: 73px;
		    border-bottom: 1px solid #CCCCCC;
	 	}
	 	${scope_parent}.cart-wrapper .products-wrapper {
	 		width: 100%;
	 		padding: 0 10px;
	 	}
	 	${scope_parent}.cart-wrapper .product-item-wrapper {
	 		display: flex;
	 		width: 100%;
	 		margin-top: 15px;
	 		padding-top: 15px;
	 		border-top: 1px solid #CCCCCC;
	 	}
	 	${scope_parent}.cart-wrapper .product-item-wrapper:first-child {
		    border-top: none;
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
	 		max-width: 70%;
	 		box-sizing: border-box;
	 		padding: 0 10px;
	 		display: flex;
		    flex-flow: column;
		    align-items: flex-start;
		    justify-content: space-between;
	 	}
	 	${scope_parent}.cart-wrapper .product-item-wrapper .content-col .head {
	 		display: flex;
	 		justify-content: space-between;
	 		align-items: center;
	 	}
	 	${scope_parent}.cart-wrapper .product-item-wrapper .content-col a.product-title {
	 		display: block;
	 		color: black;
	 		text-decoration: none;
	 		font-family: Roboto;
			font-weight: normal;
			font-size: 13px;
	 	}
	 	${scope_parent}.cart-wrapper .product-item-wrapper .content-col button.favorites {
	 		padding: 3px;
	 		background: transparent;
	 	}
	 	${scope_parent}.cart-wrapper .product-item-wrapper .content-col button.favorites[data-disable-favorite] {
	 		display: none;
	 	}
	 	
	 	${scope_parent}.cart-wrapper .product-item-wrapper .content-col .sizes-wrapper {
	 		position: relative;
	 		width: 100%;
	 	}
	 	${scope_parent}.cart-wrapper .product-item-wrapper .content-col .sizes-wrapper .choosen-size-box {
	 		border: 1px solid #CCCCCC;
	 		width: 100%;
	 		box-sizing: border-box;
	 		padding: 5px 10px;
	 		display: flex;
	 		justify-content: space-between;
	 		align-items: center;
	 	}
	 	${scope_parent}.cart-wrapper .product-item-wrapper .content-col .sizes-wrapper .choosen-size-box .arrow {
	 		transform: rotateX(0);
			transition: transform 0.2s ease;
	 	}
	 	${scope_parent}.cart-wrapper .product-item-wrapper .content-col .sizes-wrapper .choosen-size-box .content {
	 		margin: 0!important;
	 	}
	 	${scope_parent}.cart-wrapper .product-item-wrapper .content-col .sizes-wrapper.opened .choosen-size-box .arrow {
	 		transform: rotateX(-180deg);
	 	}
	 	${scope_parent}.cart-wrapper .product-item-wrapper .content-col .sizes-wrapper .select-size-box {
	 		position: absolute;
	 		left: 0;
	 		top: 100%;
	 		width: 100%;
		    max-height: 0;
		    overflow: hidden;
		    padding: 0 10px;
		    background: white;
		    border: 1px solid;
		    border-color: transparent;
		    border-top: none;
		    transition: all 0.3s ease;
		    z-index: 1;
	 	}
	 	${scope_parent}.cart-wrapper .product-item-wrapper .content-col .sizes-wrapper.opened .select-size-box {
		    max-height: 100vh;
		    border-color: #CCCCCC;
		    z-index: 2;
	 	}
	 	${scope_parent}.cart-wrapper .product-item-wrapper .content-col .sizes-wrapper .choosen-size-box .content,
	 	${scope_parent}.cart-wrapper .product-item-wrapper .content-col .sizes-wrapper .select-size-box .size-item {
	 		margin: 10px 0;
	 		font-family: Roboto;
			font-size: 14px;
			letter-spacing: 0.055em;
	 	}
	 	${scope_parent}.cart-wrapper .product-item-wrapper .content-col .sizes-wrapper .choosen-size-box .content span.size,
	 	${scope_parent}.cart-wrapper .product-item-wrapper .content-col .sizes-wrapper .select-size-box .size-item span.size {
	 		font-weight: 500;
	 	}
	 	${scope_parent}.cart-wrapper .product-item-wrapper .content-col .sizes-wrapper .choosen-size-box .content span.shipment,
	 	${scope_parent}.cart-wrapper .product-item-wrapper .content-col .sizes-wrapper .select-size-box .size-item span.shipment {
	 		font-size: 12px;
	 	}
	 	${scope_parent}.cart-wrapper .product-item-wrapper .content-col .sizes-wrapper .select-size-box .size-item[data-size-item-disabled] {
	 		color: #9b9b9b;
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
	 	${scope_parent}.cart-wrapper .product-item-wrapper .content-col .quantity-wrapper .controls button.dec,
	 	${scope_parent}.cart-wrapper .product-item-wrapper .content-col .quantity-wrapper .controls button.inc {
	 		color: black;
	 	}
	 	${scope_parent}.cart-wrapper .product-item-wrapper .content-col .quantity-wrapper .controls button.dec[data-disabled-button] {
	 		color: #d4d4d4;
	 	}
	 	${scope_parent}.cart-wrapper .product-item-wrapper .content-col .quantity-wrapper .controls span.num {
	 		font-family: Roboto;
		    font-weight: 500;
		    font-size: 14px;
		    color: black;
	 	}
	 	${scope_parent}.cart-wrapper .product-item-wrapper .content-col .quantity-wrapper button.delete {
	 		padding: 3px;
	 		background: transparent;
	 	}
	 	${scope_parent}.cart-wrapper .product-item-wrapper button.favorites .bg {
	 		opacity: 0;
	 	}
	 	${scope_parent}.cart-wrapper .product-item-wrapper button.favorites.active .bg {
	 		opacity: 1;
	 	}
	 	
	 	/* ______ body ______ */

	 	${scope_parent}.cart-wrapper .inner .body .total {
			border-top: 1px solid #CCCCCC;
			padding: 0 10px;
			margin-top: 15px;
			padding-top: 15px;
	 	}
	 	${scope_parent}.cart-wrapper .inner .body .total .cart__payment_title {
	 		font-weight: bold;
		    font-size: 15px;
		    letter-spacing: 0.3em;
		    text-transform: uppercase;
		    color: #162319;
		    margin-bottom: 15px;
	 	}
	 	${scope_parent}.cart-wrapper .inner .body .total .cart__payment_delivery {
 		    display: flex;
		    justify-content: space-between;
		    align-items: center;
		    font-size: 14px;
		    letter-spacing: 0.08em;
		    color: black;
	 	}
	 	${scope_parent}.cart-wrapper .inner .body .total .cart__payment_total {
 		    display: flex;
		    justify-content: space-between;
		    align-items: center;
		    font-weight: bold;
		    font-size: 16px;
		    letter-spacing: 0.08em;
		    color: black;
		    margin: 8px 0;
	 	}
	 	${scope_parent}.cart-wrapper .inner .body .total .cart__payment_shipping {
	 		color: #6d6d6d;
		    font-size: 13px;
		    line-height: 150%;
		    letter-spacing: 0.08em;
		    text-align: justify;
	 	}

	 	${scope_parent}.cart-wrapper .inner .body .promo-code-box {
	 		display: flex;
		    width: 100%;
		    padding: 0 10px;
		    justify-content: center;
		    align-items: center;
		    margin-top: 30px;
		    margin-bottom: 100px;
	 	}
	 	${scope_parent}.cart-wrapper .inner .body .promo-code-box input,
	 	${scope_parent}.cart-wrapper .inner .body .promo-code-box button {
			display: block;
			width: 40%;
			border: 1px solid;
			border-radius: 4px;
			padding: 0 10px;
			margin: 0;
			background: transparent;
			color: black;
			height: 40px;
	 	}
	 	${scope_parent}.cart-wrapper .inner .body .promo-code-box input {
	 		margin-right: 5%;
	 		border-color: #cccccc;
	 	}
	 	${scope_parent}.cart-wrapper .inner .body .promo-code-box input::placeholder {
	 		color: #cccccc;
	 	}
	 	${scope_parent}.cart-wrapper .inner .body .promo-code-box button {
			border-color: #594fa4;
			text-transform: uppercase;
			font-weight: bold;
			font-size: 12px;
			letter-spacing: 0.08em;
	 	}

	 	${scope_parent}.cart-wrapper .inner .bottom hr.top-line {
			height: 1px;
			box-sizing: border-box;
			border: none;
			border-top: 1px solid #CCCCCC;
			width: calc(100% - 20px);
			margin: 0 auto;
			transition: width 0.2s ease;
	 	}
	 	${scope_parent}.cart-wrapper .inner .bottom.show-total hr.top-line {
	 		width: 100%;
	 	}
	 	${scope_parent}.cart-wrapper .inner .bottom .total {
	 		display: flex;
		    justify-content: space-between;
		    align-items: center;
		    font-weight: bold;
		    font-size: 16px;
		    line-height: 100%;
		    color: #162319;
		    padding: 0 10px;
		    max-height: 1px;
		    overflow: hidden;
		    opacity: 0;
		    transition: all 0.1s ease;
		    transform: translateY(10px);
	 	}
	 	${scope_parent}.cart-wrapper .inner .bottom.show-total .total {
	 		padding-top: 15px;
		    max-height: 100px;
		    opacity: 1;
		    transform: translateY(0);
	 	}
	 	${scope_parent}.cart-wrapper .inner .bottom .total .title {
	 		text-transform: uppercase;
	 		letter-spacing: 0.3em;
	 	}
	 	${scope_parent}.cart-wrapper .inner .bottom .total .price {
	 		letter-spacing: 0.08em;
	 	}
	 	${scope_parent}.cart-wrapper .inner .bottom .buttons {
	 		display: flex;
		    justify-content: space-between;
		    align-items: center;
		    padding: 10px;
		    padding-top: 15px;
		    padding-bottom: 80px;
	 	}
	 	${scope_parent}.cart-wrapper .inner .bottom .buttons button {
	 		display: block;
		    width: calc(50% - 5px);
		    border: 1px solid #594FA4;
		    transition: transforn 0.2s ease;
		    border-radius: 4px;
		    height: 50px;
		    font-weight: bold;
		    font-size: 10px;
		    line-height: inherit;
		    letter-spacing: 0.2em;
		    text-transform: uppercase;
	 	}
	 	${scope_parent}.cart-wrapper .inner .bottom .buttons button.return-to-shopping {
	 		color: black;
	 		background: transparent;
	 		line-height: 15px;
	 	}
	 	${scope_parent}.cart-wrapper .inner .bottom .buttons button.checkout {
	 		color: white;
	 		background: #594FA4;
	 	}
 	`;

 	cur_test.markup = {
 		elements: {
 			cart: cur_test.get_default_cart_el(cur_test),
 		},
 		content: {
	 		arrow_icon: `<svg width="16" height="8" viewBox="0 0 16 8" fill="none"><path d="M15 0.999999L8 7L1 1" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
	 		heart_icon: `<svg height="23" width="22" viewBox="0 0 22 22"><path class="border" fill="#6458b7" d="M11.22 1.78c.85-.85 1.92-1.43 3.1-1.66 1.17-.24 2.38-.12 3.49.34 1.1.46 2.05 1.24 2.71 2.24.66.99 1.02 2.16 1.02 3.36 0 1.61-.64 3.15-1.77 4.29-.84.84-7.55 7.57-8.39 8.41-.15.15-.36.24-.58.24-.22 0-.43-.09-.59-.24-.83-.84-7.54-7.57-8.38-8.41C.7 9.21.06 7.67.06 6.06c0-1.6.64-3.15 1.77-4.28C2.96.64 4.5 0 6.1 0c1.61 0 3.14.64 4.28 1.78l.42.42.42-.42zm7.38 7.4c.61-.62 1.03-1.4 1.2-2.26.17-.85.09-1.74-.25-2.54-.33-.81-.89-1.5-1.62-1.98-.72-.48-1.57-.74-2.44-.74-1.16 0-2.28.46-3.1 1.29l-1.01 1.01c-.15.15-.36.24-.58.24-.22 0-.43-.09-.59-.24-.1-.1-.9-.91-1-1.01-.82-.83-1.94-1.29-3.11-1.29-1.16 0-2.28.46-3.1 1.29-.83.82-1.29 1.94-1.29 3.11S2.17 8.35 3 9.18c.52.52 3.12 3.13 7.8 7.82l6.79-6.81c.61-.61.94-.95 1.01-1.01z"></path><path class="bg" fill="#6458b7" d="M14 .88h2.65l2.43 1.57 1.8 2.43-.56 3.66-9.75 9.58-9.42-9.8-.17-2.65.79-2.54 2.6-1.97 3.6.17 2.83 2.03L14 .88z"></path></svg>`,
	 		trash_icon: `<svg width="20" height="21" viewBox="0 0 20 21"><path d="M15.1766 3.8185H19.0266C19.5586 3.8185 19.9891 4.2455 19.9891 4.77225C19.9891 5.29987 19.5586 5.72688 19.0266 5.72688H18.0641V18.1361C18.0641 19.7181 16.7718 21 15.1766 21H5.55164C3.95651 21 2.66414 19.7181 2.66414 18.1361V5.72688H1.70164C1.16964 5.72688 0.739136 5.29987 0.739136 4.77312C0.739136 4.2455 1.16964 3.8185 1.70164 3.8185H5.55164V2.86387C5.55164 1.28188 6.84401 0 8.43914 0H12.2891C13.8843 0 15.1766 1.28188 15.1766 2.86387V3.81763V3.8185ZM13.2516 3.8185V2.86387C13.2516 2.33625 12.8211 1.90925 12.2891 1.90925H8.43914C7.90714 1.90925 7.47664 2.33625 7.47664 2.863V3.8185H13.2516ZM16.1391 5.72688H4.58914V18.1361C4.58914 18.6637 5.01964 19.0908 5.55164 19.0908H15.1766C15.7086 19.0908 16.1391 18.6637 16.1391 18.137V5.726V5.72688Z" fill="#BDBDBD"/></svg>`,
	 	},
 	};

	cur_test.create_iframe();
	cur_test.cart_monitoring();

	// ПОДСКАЗКА:
	// window.keradan["dressa-updated-slide-in-cart-mobile"]
	// window.keradan["dressa-updated-slide-in-cart-mobile"].create_iframe(); window.keradan["dressa-updated-slide-in-cart-mobile"].run_iframe();














})();








