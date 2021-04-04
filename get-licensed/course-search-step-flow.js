(function () {
	let v = 1;

	// Если IE тогда вместо currentScript будет так: document.querySelector('тут айдишник скрипта вставленный вручную')
	const cur_test = window.keradan.get_cur_test(document.currentScript);
	cur_test.init.event_category = 'Exp — New PDP';

	// Set dev behavior (for production need to comment out or remove):
	cur_test.init.enable_log = true;
	cur_test.init.enable_ga_events = false;


	cur_test.log(`%c Keradan's test "${cur_test.init.go_title}" (v - ${v}) is here:`, 'background: #222; color: #bada55',  cur_test);
	cur_test.log(`%c Keradan's test script url:`, 'background: #222; color: #bada55',  document.currentScript.getAttribute('src'));
	
	cur_test.ga_event('loaded');

	try {
		// hotjar here
	}
    catch (e) {
		// keradan_log('Hotjar error: ', e);
	}


	cur_test.html = document.createElement('div');
	cur_test.html.classList.add(cur_test.init.css_scope_name);
	cur_test.html.innerHTML = `
	`;
	// document.querySelector('.product-template.product-main .product__information').before(cur_test.html);

	

	document.querySelector("#styles-" + cur_test.init.name).innerHTML = `
 	`;




})();








