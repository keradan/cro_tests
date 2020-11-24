(function () {
    // Если IE тогда вместо currentScript будет так: document.querySelector('тут айдишник скрипта вставленный вручную')
    const cur_test = window.keradan.get_cur_test(document.currentScript);
    cur_test.init.event_category = 'Exp - Benefits_SlideIn_cart';

    // Set dev behavior:
    cur_test.init.enable_log = true;
    cur_test.init.enable_ga_events = true;
    // cur_test.init.debug_mode = false;

    let v = 3;
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
    
    let benefits_box = cur_test.markup.els.benefits_box = document.createElement('div');
    benefits_box.classList.add(`scope-parent`, 'benefits-box');
    benefits_box.setAttribute('data-scope-name', cur_test.init.css_scope_name);
    benefits_box.innerHTML = `
        <div>${cur_test.markup.content.benefits_list[0]}</div>
    `;

    cur_test.insert_markup_into_dom = function(mutationRecords) {
        cur_test.log('cur_test insert_markup_into_dom triggered');
        cur_test.log(mutationRecords);
        // document.querySelector('body').prepend(banner);
    }

    // Сперва в промисе ожидаем появления тега form в корзине
    let target_form_waiting_promise = new Promise(function(resolve, reject) {
        setTimeout(function(){
            clearInterval(target_form_waiting_timer);
            reject(new Error('keradan target form not found by 15 sec'));
        }, 15000);

        let target_form_waiting_timer = setInterval(function(){
            
            let target_form = document.querySelector('#CartContainer form.cart');
            if(!target_form) return;

            cur_test.target_form = document.querySelector('#CartContainer form.cart');

            clearInterval(target_form_waiting_timer);

            setTimeout(() => resolve(`keradan target form successfully found`), 100);
        }, 200);
    });

    target_form_waiting_promise
    .then(function(msg) {
        cur_test.log(msg);

        // дальше вешаем мютейшн обсервер на форму, вернее на ее детей, он будет следить чтобы в форме постоянно был наш добавленный блок
        let observer = new MutationObserver(cur_test.insert_markup_into_dom);
        observer.observe(cur_test.target_form, {
            childList: true, // наблюдать за непосредственными детьми
            subtree: true, // и более глубокими потомками
            characterDataOldValue: true,
        });
    })
    .catch(function(error) {
        console.error(error);
    });







})();