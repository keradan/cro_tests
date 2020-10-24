let v = test_info.production ? test_info.version : Math.floor(Date.now() / 1000);
let d = test_info.production ? 'https://keradan.github.io' : 'https://keradan.github.io';

let sc = document.createElement('script');
sc.setAttribute('data-test-info', window.btoa(JSON.stringify(test_info)));
// sc.setAttribute('data-test-client', test_info.client);
// sc.setAttribute('data-test-file-name', test_info.file_name);
sc.setAttribute('id', `script-${test_info.client}-${test_info.file_name}`);
sc.setAttribute('src', `${d}/cro_tests/${test_info.client}/${test_info.file_name}.js?v=${v}`);
document.querySelector('head').append(sc);

let st = document.createElement('style');
st.setAttribute('id', `styles-${test_info.client}-${test_info.file_name}`);
document.querySelector('head').append(st);

if (!window.keradan) window.keradan = {};
let wk = window.keradan;
if (!wk.simple_str_hash) wk.simple_str_hash = function (s) {
    var h = 0;
    if (s.length == 0) return h;
    for (var i = 0; i < s.length; i++) {
        var char = s.charCodeAt(i);
        h = ((h<<5)-h)+char;
        h = h & h;
    }
    return Math.abs(h).toString(16);
}
if (!wk.get_cur_test) wk.get_cur_test = function (sc) {
	let o = window.atob(JSON.parse(sc.dataset.testInfo));
	o.start_time = new Date().getTime();
	o.name = o.client + '-' + o.file_name;
	o.css_scope_name = `krdn${wk.simple_str_hash(o.name)}`;
	
	wk[o.name] = {};
	wk[o.name].init = o;
	wk[o.name].log = function() {
		if(wk[o.name].init.enable_log) console.log.apply(this, arguments);
	};
	wk[o.name].ga_event = function(event_action, event_label = null) {
		let dl = window.dataLayer || [];
		let ga = {
			'event': 'event-to-ga',
			'eventCategory': wk[o.name].init.event_category,
			'eventAction': event_action
		};
		if (event_label) ga['eventLabel'] = event_label;
		wk[o.name].log('keradan ga event: ', ga);
		if(wk[o.name].init.enable_ga_events) dl.push(ga);
	};
	return wk[o.name];
}
if (!wk.get_test_time) wk.get_test_time = (tdn) => (Math.round((new Date().getTime() - wk[tdn].init.start_time) / 100) / 10) + 's';





