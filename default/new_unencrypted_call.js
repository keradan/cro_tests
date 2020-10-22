let v = test_info.production ? test_info.version : Math.floor(Date.now() / 1000);
let d = test_info.production ? 'https://keradan.github.io' : 'https://keradan.github.io';

let sc = document.createElement('script');
sc.setAttribute('data-test-client', test_info.client);
sc.setAttribute('data-test-file-name', test_info.file_name);
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
if (!wk.get_test_data) wk.get_test_data = function (sc) {
	let td = {
		client: sc.dataset.testClient,
		file_name: sc.dataset.testFileName,
	};
	td.name = td.client + '-' + td.file_name;
	td.css_scope_name = `krdn${wk.simple_str_hash(td.name)}`;
	td.start_time = new Date().getTime();
	wk[td.name] = {};
	wk[td.name].test_data = td;
	return td;
}
if (!wk.get_test_time) wk.get_test_time = (tdn) => (Math.round((new Date().getTime() - wk[tdn].test_data.start_time) / 100) / 10) + 's';





