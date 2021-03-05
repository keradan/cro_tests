(function () {
	// Если IE тогда вместо currentScript будет так: document.querySelector('тут айдишник скрипта вставленный вручную')
	const cur_test = window.keradan.get_cur_test(document.currentScript);
	cur_test.init.event_category = 'Exp — New PDP';

	// Set dev behavior:
	cur_test.init.enable_log = true;
	cur_test.init.enable_ga_events = false;
	// cur_test.init.debug_mode = false;

	let v = 1;
	cur_test.log(`%c Keradan's test "${cur_test.init.go_title}" (v - ${v}) is here:`, 'background: #222; color: #bada55',  cur_test);
	cur_test.log(`%c Keradan's test script url:`, 'background: #222; color: #bada55',  document.currentScript.getAttribute('src'));

	if (!document.querySelector(`#monthly-banner-long .month-sale-info`)) return;
	
	cur_test.ga_event('loaded');

	// hotjar

	document.querySelector("#styles-" + cur_test.init.name).innerHTML = `
	 	.${cur_test.init.css_scope_name} {
	 		display: flex;
	 	}
 	`;

 	console.log('keradan product__information: ', document.querySelectorAll('.product-template.product-main .product__information'));

})();








