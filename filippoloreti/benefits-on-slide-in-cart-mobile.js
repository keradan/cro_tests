(function () {
    // Если IE тогда вместо currentScript будет так: document.querySelector('тут айдишник скрипта вставленный вручную')
    const cur_test = window.keradan.get_cur_test(document.currentScript);
    cur_test.init.event_category = 'Exp - Benefits_SlideIn_cart';

    // Set dev behavior:
    cur_test.init.enable_log = true;
    cur_test.init.enable_ga_events = true;
    // cur_test.init.debug_mode = false;

    let v = 1;
    cur_test.log(`%c Keradan's test "${cur_test.init.go_title}" (v - ${v}) is here:`, 'background: #222; color: #bada55',  cur_test);
    cur_test.log(`%c Keradan's test script url:`, 'background: #222; color: #bada55',  document.currentScript.getAttribute('src'));

    cur_test.ga_event('loaded');

    try {
        // dskdklsdkdlskldskjcxjkjjkcjk
    }
    catch (e) {
        cur_test.log('Hotjar error: ', e);
    }

    let scope_parent = `.scope-parent[data-scope-name=${cur_test.init.css_scope_name}]`;
    document.querySelector("#styles-" + cur_test.init.name).innerHTML = `
        ${scope_parent}.benefits-box {
        }
    `;

    cur_test.markup.content = {
        benefits_list: [
            'Free shipping',
            'Easy 90-day returns',
            '10 year warranty',
        ],
    };
    
    let benefits_box = cur_test.markup.els.banner = document.createElement('a');
    banner.classList.add(`scope-parent`, 'benefits-box');
    banner.setAttribute('data-scope-name', cur_test.init.css_scope_name);
    banner.innerHTML = `
        <div>${cur_test.markup.content.benefits_list[0]}</div>
    `;

    // document.querySelector('body').prepend(banner);












})();