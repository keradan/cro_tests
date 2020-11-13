(function () {
	// Если IE тогда вместо currentScript будет так: document.querySelector('тут айдишник скрипта вставленный вручную')
	const cur_test = window.keradan.get_cur_test(document.currentScript);
	cur_test.init.event_category = 'dsgsgdsghdsghdsgh';

	// Set dev behavior:
	cur_test.init.enable_log = true;
	cur_test.init.enable_ga_events = false;
	// cur_test.init.debug_mode = false;

	let v = 1;
	cur_test.log(`%c Keradan's test "${cur_test.init.go_title}" (v - ${v}) is here:`, 'background: #222; color: #bada55',  cur_test);
	cur_test.log(`%c Keradan's test script url:`, 'background: #222; color: #bada55',  document.currentScript.getAttribute('src'));

	try {
	    // dsdjkdskjdskjdsjhdjhjhdshjdshjdsh
    }
    catch (e) {
		cur_test.log('Hotjar error: ', e);
	}

	cur_test.get_banner_el = function() {
		let cart_el = document.createElement('div');
	 	cart_el.classList.add(`scope-parent`, 'banner-wrapper', 'hide');
	 	cart_el.setAttribute('data-scope-name', cur_test.init.css_scope_name);
	 	cart_el.setAttribute('data-test-name', cur_test.init.name);
		cart_el.innerHTML = `
	 		<div>blablabalbalblabl</div>
	 	`;
	 	return cart_el;
	}

	cur_test.reload_banner = function() {
		let old_banner = document.querySelector(`.banner-wrapper[data-scope-name=${cur_test.init.css_scope_name}]`);
		if(old_banner) old_banner.remove();
		
		let banner = cur_test.get_banner_el();
		document.querySelector('.product__title').before(banner);

		setTimeout(() => banner.classList.toggle('hide', false), 0);
	}

	let scope_parent = `.scope-parent[data-scope-name=${cur_test.init.css_scope_name}]`;
	document.querySelector("#styles-" + cur_test.init.name).innerHTML = `
		${scope_parent}.banner-wrapper {
			background: red;
			padding: 10px;
		}
 	`;

 	cur_test.markup = {
 		elements: {},
 		content: {
	 		arrow_icon: `<svg width="16" height="8" viewBox="0 0 16 8" fill="none"><path d="M15 0.999999L8 7L1 1" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
	 		heart_icon: `<svg height="23" width="22" viewBox="0 0 22 22"><path class="border" fill="#6458b7" d="M11.22 1.78c.85-.85 1.92-1.43 3.1-1.66 1.17-.24 2.38-.12 3.49.34 1.1.46 2.05 1.24 2.71 2.24.66.99 1.02 2.16 1.02 3.36 0 1.61-.64 3.15-1.77 4.29-.84.84-7.55 7.57-8.39 8.41-.15.15-.36.24-.58.24-.22 0-.43-.09-.59-.24-.83-.84-7.54-7.57-8.38-8.41C.7 9.21.06 7.67.06 6.06c0-1.6.64-3.15 1.77-4.28C2.96.64 4.5 0 6.1 0c1.61 0 3.14.64 4.28 1.78l.42.42.42-.42zm7.38 7.4c.61-.62 1.03-1.4 1.2-2.26.17-.85.09-1.74-.25-2.54-.33-.81-.89-1.5-1.62-1.98-.72-.48-1.57-.74-2.44-.74-1.16 0-2.28.46-3.1 1.29l-1.01 1.01c-.15.15-.36.24-.58.24-.22 0-.43-.09-.59-.24-.1-.1-.9-.91-1-1.01-.82-.83-1.94-1.29-3.11-1.29-1.16 0-2.28.46-3.1 1.29-.83.82-1.29 1.94-1.29 3.11S2.17 8.35 3 9.18c.52.52 3.12 3.13 7.8 7.82l6.79-6.81c.61-.61.94-.95 1.01-1.01z"></path><path class="bg" fill="#6458b7" d="M14 .88h2.65l2.43 1.57 1.8 2.43-.56 3.66-9.75 9.58-9.42-9.8-.17-2.65.79-2.54 2.6-1.97 3.6.17 2.83 2.03L14 .88z"></path></svg>`,
	 		trash_icon: `<svg width="20" height="21" viewBox="0 0 20 21"><path d="M15.1766 3.8185H19.0266C19.5586 3.8185 19.9891 4.2455 19.9891 4.77225C19.9891 5.29987 19.5586 5.72688 19.0266 5.72688H18.0641V18.1361C18.0641 19.7181 16.7718 21 15.1766 21H5.55164C3.95651 21 2.66414 19.7181 2.66414 18.1361V5.72688H1.70164C1.16964 5.72688 0.739136 5.29987 0.739136 4.77312C0.739136 4.2455 1.16964 3.8185 1.70164 3.8185H5.55164V2.86387C5.55164 1.28188 6.84401 0 8.43914 0H12.2891C13.8843 0 15.1766 1.28188 15.1766 2.86387V3.81763V3.8185ZM13.2516 3.8185V2.86387C13.2516 2.33625 12.8211 1.90925 12.2891 1.90925H8.43914C7.90714 1.90925 7.47664 2.33625 7.47664 2.863V3.8185H13.2516ZM16.1391 5.72688H4.58914V18.1361C4.58914 18.6637 5.01964 19.0908 5.55164 19.0908H15.1766C15.7086 19.0908 16.1391 18.6637 16.1391 18.137V5.726V5.72688Z" fill="#BDBDBD"/></svg>`,
	 	},
 	};

 	cur_test.lang = window.location.pathname.replace(/^\/{1}/, '').split('/')[0].toLowerCase();
 	cur_test.main_title = dskjdkjs;

 	cur_test.monitor = function() {
 		let new_main_title_el = document.querySelector('app-search-results .flights-section .outbound-section .product__title');
		if(!new_main_title_el) return;

		let new_lang = window.location.pathname.replace(/^\/{1}/, '').split('/')[0].toLowerCase();
		
		if (new_lang !== window.keradan[test_data.name].lang || new_main_title_el.innerHTML !== window.keradan[test_data.name].main_title || new_flight_info_text !== old_flight_info_text) {
			window.keradan[test_data.name].lang = new_lang;
			window.keradan[test_data.name].main_title = new_main_title_el.innerHTML;
			window.keradan[test_data.name].flight_info = new_flight_info;
			run();
		}
 	}

 	setInterval(function(){
		let new_main_title_el = document.querySelector('app-search-results .flights-section .outbound-section .product__title');
		if(!new_main_title_el) return;

		let new_lang = window.location.pathname.replace(/^\/{1}/, '').split('/')[0].toLowerCase();
		
		if (new_lang !== window.keradan[test_data.name].lang || new_main_title_el.innerHTML !== window.keradan[test_data.name].main_title || new_flight_info_text !== old_flight_info_text) {
			window.keradan[test_data.name].lang = new_lang;
			window.keradan[test_data.name].main_title = new_main_title_el.innerHTML;
			window.keradan[test_data.name].flight_info = new_flight_info;
			run();
		}
	}, 500);









	









})();








