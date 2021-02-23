(function () {
	// Если IE тогда вместо currentScript будет так: document.querySelector('тут айдишник скрипта вставленный вручную')
	const cur_test = window.keradan.get_cur_test(document.currentScript);
	cur_test.init.event_category = 'Exp - In stock banner';

	// Set dev behavior:
	cur_test.init.enable_log = true;
	cur_test.init.enable_ga_events = true;
	// cur_test.init.debug_mode = false;

	let v = 4;
	cur_test.log(`%c Keradan's test "${cur_test.init.go_title}" (v - ${v}) is here:`, 'background: #222; color: #bada55',  cur_test);
	cur_test.log(`%c Keradan's test script url:`, 'background: #222; color: #bada55',  document.currentScript.getAttribute('src'));

	if (!document.querySelector(`#monthly-banner-long .month-sale-info`)) return;
	
	cur_test.ga_event('loaded');

	try {
	    (function(h,o,t,j,a,r){
	        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
	        h._hjSettings={hjid:1831568,hjsv:6};
	        a=o.getElementsByTagName('head')[0];
	        r=o.createElement('script');r.async=1;
	        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
	        a.appendChild(r);
	    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        window.hj=window.hj||function(){(hj.q=hj.q||[]).push(arguments)};
        hj('trigger', 'PDP_spread');
    }
    catch (e) {
		cur_test.log('Hotjar error: ', e);
	}

	document.querySelector("#styles-" + cur_test.init.name).innerHTML = `
	 	.${cur_test.init.css_scope_name} {
	 		display: flex;
		    flex-wrap: wrap;
		    justify-content: flex-start;
		    align-items: center;
	 	}
	 	.${cur_test.init.css_scope_name} .original-text {
	 		font-size: 13px;
	 		font-weight: bold;
	 	}
	 	.${cur_test.init.css_scope_name} .big-text{
	 		text-transform: uppercase;
	 		font-size: 20px;
	 		font-weight: bold;
	 		margin-left: 10px;
		}
 	`;

 	let banner_original_text = document.querySelector(`#monthly-banner-long .month-sale-info`).innerText.split('- Order Online or Call 800-348-1287')[0].trim();
	let new_text = 'In stock, ready to ship';
	document.querySelector(`#monthly-banner-long .month-sale-info`).classList.add(cur_test.init.css_scope_name);

	document.querySelector(`#monthly-banner-long .month-sale-info`).innerHTML = `
		<span class="original-text">${banner_original_text}</span>
		<span class="big-text">${new_text}</span>
	`;

})();








