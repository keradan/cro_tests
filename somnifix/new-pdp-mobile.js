(function () {
	// Если IE тогда вместо currentScript будет так: document.querySelector('тут айдишник скрипта вставленный вручную')
	const cur_test = window.keradan.get_cur_test(document.currentScript);
	cur_test.init.event_category = 'Exp — New PDP';

	// Set dev behavior:
	cur_test.init.enable_log = true;
	cur_test.init.enable_ga_events = false;
	// cur_test.init.debug_mode = false;

	let v = 7;
	cur_test.log(`%c Keradan's test "${cur_test.init.go_title}" (v - ${v}) is here:`, 'background: #222; color: #bada55',  cur_test);
	cur_test.log(`%c Keradan's test script url:`, 'background: #222; color: #bada55',  document.currentScript.getAttribute('src'));

	// if (!document.querySelector(`#monthly-banner-long .month-sale-info`)) return;
	
	cur_test.ga_event('loaded');

	// hotjar

	let model = cur_test.model = {
		is_ready: false,
		advantages: [
			'Promote nose breathing',
			'Reduce open-mouth snoring',
			'Boost CPAP experience ',
			'Improve sleep quality',
		],
		shipping: [],
		shipping_choosen_id: [],
		quantity_choosen: 1,
		pack_choosen_id: 'week_4',
		packs: {
			week_4: {
				days_count: 28,
				name: '4-week pack',
				auto_delivery_period: null,
				price: 19.97,
				old_price: null,
				save_money_percent: 0,
				have_subscription: false,
				image: 'dsjdsjkdskj',
			},
			week_12: {
				days_count: 84,
				name: '12-week pack',
				auto_delivery_period: 'every 12 months',
				price: 55.97,
				old_price: 59.97,
				save_money_percent: 7,
				have_subscription: true,
				image: 'dsjdsjkdskj',
			},
			month_12: {
				days_count: 365,
				name: '12-month pack',
				auto_delivery_period: 'every 12 months',
				price: 219.97,
				old_price: 230.97,
				save_money_percent: 17,
				have_subscription: true,
				image: 'dsjdsjkdskj',
			},
		},

		get shipping_choosen() {
			return this.shipping[this.shipping_choosen_id];
		},

		get pack_choosen() {
			pack = this.packs[this.pack_choosen_id];

			let model = this;

			Object.defineProperty(pack, "total_price", {
				get: function() {
					return this.price * model.quantity_choosen;
				}
			});

			Object.defineProperty(pack, "current_strips_count", {
				get: function() {
					return model.quantity_choosen * this.days_count;
				}
			});

			return pack;
		},

		set_shipping: function (new_shipping_choosen_id) {
			cur_test.data.shipping_choosen_id = new_shipping_choosen_id;
		},

		set_pack: function (new_pack_choosen_id) {
			this.pack_choosen_id = new_pack_choosen_id;
		},
	};

	// let model = cur_test.model;

	cur_test.html = document.createElement('div');
	cur_test.html.classList.add(cur_test.init.css_scope_name);
	cur_test.html.innerHTML = `
		<div class="pack-choose-box">
			<div class="arrow">
				<svg fill="none" viewBox="0 0 10 18"><path stroke="#4090D1" stroke-width="2" d="M1 1l7.2 7.5-7.3 8"/></svg>
				<span class="head">Pack size:</span>
				<br>
				<span class="pack-choosen"></span>
			</div>
		</div>
		<div class="current-pack-info"></div>
	`;

	cur_test.render_pack = function () {
		cur_test.html.querySelector('.pack-choose-box .pack-choosen').innerHTML = `
			<span>${model.pack_choosen.name} (${model.pack_choosen.days_count} strips)</span>
		`;

		cur_test.html.querySelector('.current-pack-info').innerHTML = `
			<div class="head">
				<div class="price">
					$<span class="number">${model.pack_choosen.total_price}</span>USD
				</div>
				<div class="made-in-usa">
					<svg fill="none" viewBox="0 0 19 14">
					  <path fill="#F5F5F5" d="M17.6.7H1.4C.6.7 0 1.4 0 2.2v9.6c0 .8.6 1.5 1.4 1.5h16.2c.8 0 1.4-.7 1.4-1.5V2.2c0-.8-.6-1.5-1.4-1.5z"/>
					  <path fill="#BF3E48" d="M0 1.7h19c-.3-.6-.8-1-1.4-1H1.4C.8.7.3 1.1.1 1.7zM19 4.6H0v1h19v-1zM19 2.7H0v1h19v-1zM0 7.2c0 .1.1.3.3.3H19v-1H0v.7zM19 10.4H0v1h19v-1zM19 12.3H0c.3.6.8 1 1.4 1h16.2c.6 0 1.1-.4 1.3-1zM19 8.4H0v1h19v-1z"/>
					  <path fill="#1E415F" d="M.3 7.5h8.2c.2 0 .3-.2.3-.3V1c0-.2-.1-.4-.3-.4h-7C.5.7 0 1.4 0 2.2v5c0 .1.1.3.3.3z"/>
					  <path fill="#F5F5F5" d="M1 1.5v.2h.2l-.1.2v.2H.7V2l-.2-.1h.3v-.3H1zM1 2.6V3h.2l-.1.2v.2l-.2-.1-.2.1V3l-.2-.2h.3v-.3H1zM1 3.8V4h.2l-.1.2v.2H.7v-.2l-.2-.1h.3v-.3H1zM1 5V5h.2v.1l-.1.1v.3l-.2-.1-.2.1v-.3H.5v-.1h.3v-.3H1zM1 6v.3h.2l-.1.2v.2H.7v-.2l-.2-.2h.3V6H1zM1.8 2v.3h.3l-.2.2.1.2-.2-.1-.2.1v-.2l-.2-.2h.3V2h.1zM1.8 3.2v.2h.3l-.2.2.1.2h-.4v-.2l-.2-.1h.3v-.3h.1zM1.8 4.3v.3h.3l-.2.2.1.2-.2-.1-.2.1v-.2l-.2-.2h.3v-.3h.1zM1.8 5.5v.2h.3L2 6l.1.2h-.4V6l-.2-.1h.3v-.3h.1zM2.7 1.5v.2H3l-.2.2v.2c.1 0 0 0 0 0H2.5V2l-.2-.1h.3v-.3zM2.7 2.6V3H3l-.2.2v.2c.1 0 0 0 0 0l-.1-.1-.2.1V3l-.2-.2h.3v-.3zM2.7 3.8V4H3l-.2.2v.2c.1 0 0 0 0 0H2.5v-.2l-.2-.1h.3v-.3zM2.7 5V5H3v.1l-.2.1v.3c.1 0 0 0 0 0l-.1-.1-.2.1v-.3h-.2v-.1h.3v-.3zM2.7 6v.3H3l-.2.2v.2c.1 0 0 0 0 0H2.5v-.2l-.2-.2h.3V6zM3.6 2v.3H4l-.2.2v.2l-.2-.1-.1.1s-.1 0 0 0v-.2l-.2-.2h.2l.1-.2zM3.6 3.2v.2H4l-.2.2v.2H3.4s-.1 0 0 0v-.2l-.2-.1h.2l.1-.3zM3.6 4.3v.3H4l-.2.2V5L3.5 5l-.1.1s-.1 0 0 0v-.2l-.2-.2h.2l.1-.3zM3.6 5.5v.2H4l-.2.2v.2H3.4s-.1 0 0 0V6l-.2-.1h.2l.1-.3zM4.5 1.5v.2h.3l-.2.2v.2h-.4V2l-.1-.1h.2v-.3h.2zM4.5 2.6V3h.3l-.2.2v.2l-.2-.1-.2.1V3l-.1-.2h.2v-.3h.2zM4.5 3.8V4h.3l-.2.2v.2h-.4v-.2l-.1-.1h.2v-.3h.2zM4.5 5V5h.3v.1l-.2.1v.3l-.2-.1-.2.1v-.3h-.1v-.1h.2v-.3h.2zM4.5 6v.3h.3l-.2.2v.2h-.4v-.2l-.1-.2h.2V6h.2zM5.3 2l.1.3h.2l-.1.2v.2l-.2-.1-.2.1v-.2L5 2.3h.2V2h.1zM5.3 3.2l.1.2h.2l-.1.2v.2H5v-.2L5 3.5h.2v-.3h.1zM5.3 4.3l.1.3h.2l-.1.2V5L5.3 5l-.2.1v-.2L5 4.6h.2v-.3h.1zM5.3 5.5l.1.2h.2l-.1.2v.2H5V6L5 5.8h.2v-.3h.1zM6.2 1.5v.2h.3l-.1.2v.2H6V2l-.2-.1h.3v-.3h.1zM6.2 2.6V3h.3l-.1.2v.2l-.2-.1-.2.1V3l-.2-.2h.3v-.3h.1zM6.2 3.8V4h.3l-.1.2v.2H6v-.2l-.2-.1h.3v-.3h.1zM6.2 5V5h.3v.1l-.1.1v.3l-.2-.1-.2.1v-.3h-.2v-.1h.3v-.3h.1zM6.2 6v.3h.3l-.1.2v.2H6v-.2l-.2-.2h.3V6h.1zM7.1 2v.3h.3l-.2.2.1.2-.2-.1-.2.1v-.2l-.2-.2H7V2h.1zM7.1 3.2v.2h.3l-.2.2.1.2h-.4v-.2l-.2-.1H7v-.3h.1zM7.1 4.3v.3h.3l-.2.2.1.2L7 5l-.2.1v-.2l-.2-.2H7v-.3h.1zM7.1 5.5v.2h.3l-.2.2.1.2h-.4V6l-.2-.1H7v-.3h.1zM8 1.5v.2h.3l-.2.2v.2c.1 0 0 0 0 0H7.8V2l-.2-.1H8v-.3zM8 2.6V3h.3l-.2.2v.2c.1 0 0 0 0 0L8 3.2l-.2.1V3l-.2-.2H8v-.3zM8 3.8V4h.3l-.2.2v.2c.1 0 0 0 0 0H7.8v-.2l-.2-.1H8v-.3zM8 5V5h.3v.1l-.2.1v.3c.1 0 0 0 0 0L8 5.5l-.2.1v-.3h-.2v-.1H8v-.3zM8 6v.3h.3l-.2.2v.2c.1 0 0 0 0 0H7.8v-.2l-.2-.2H8V6z"/>
					</svg>
					<span>Made in USA</span>
				</div>
			</div>
			<ul class="advantages">
				${model.advantages.map(item => `
					<li>${item}</li>
				`).join("")}
			</ul>
			<div class="shipping">
				Ship to:
				<select>
					dkjdsdjk
					${model.shipping.map((shipping_item, i) => `
						<option value="${i}">${shipping_item.country}</option>
					`).join("")}
				</select>
			</div>
			<div class="estimation">Est. Delivery ${model.shipping_choosen.dates}</div>
			<div class="free-shipping" ${model.shipping_choosen.price > 0 ? 'hidden' : ''} >Free shipping</div>
			<div class="stock-status">In Stock</div>
			<div class="quantity">
				<button>
					<span>Qty: ${model.quantity_choosen}</span>
					<svg fill="none" viewBox="0 0 18 8"><path stroke="#000" d="M17 1L8.74 7 1 1"/></svg>
				</button>
				<span>${model.quantity_choosen} pack = ${model.pack_choosen.current_strips_count} strips</span>
			</div>
			<label class="subscription-box">
				<div class="checkmark-col">
					<input type="checbox">
				</div>
				<div class="info-col">
					<p class="title">
						Subscribe and <span>save ${model.pack_choosen.save_money_percent}%</span>
					</p>
					<p class="description">
						Auto delivery ${model.pack_choosen.auto_delivery_period} for $${model.pack_choosen.total_price}.<br>Cancel anytime.
					</p>
				</div>
			</label>
			<div class="submit_buttons">
				<button class="buy">Add to cart</button>
				<button class="try-for-free">Try for free</button>
			</div>
			<div class="money-back-guarantee">
				<img src="#dsjdsjk" alt="30 days money back guarantee">
				<span>
					30-day Money-Back<br>Guarantee
				</span>
			</div>
		`;
	}

	document.querySelector("#styles-" + cur_test.init.name).innerHTML = `
	 	.${cur_test.init.css_scope_name} {
	 		display: flex;
	 	}
 	`;

	let shipping_countries_selector = 'form[action="/cart/add"] select.on-select[name="qauntry"] option';
	document.querySelectorAll(shipping_countries_selector).forEach(function (option){
		let shipping_price = option.dataset.free;
		shipping_price = shipping_price === 'free' ? 0 : shipping_price;
		if(shipping_price !== 0) shipping_price = parseInt(shipping_price.replace(/\D/g,''));

		model.shipping.push({
			country: option.value.trim(),
			price: shipping_price,
			dates: option.dataset.value.trim(),
		});

		model.is_ready = true;
	});

	// Шпора:
	// console.log('keradan product__information: ', document.querySelectorAll('.product-template.product-main .product__information'));

 	

})();








