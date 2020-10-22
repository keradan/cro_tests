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
if (!window.keradan.get_test_data) window.keradan.get_test_data = function (sc) {
	let td = {
		client: sc.dataset.testClient,
		file_name: sc.dataset.testFileName,
		name: sc.dataset.testClient + '-' + sc.dataset.testFileName,
	};
	window.keradan[td.name] = {};
	return td;
}