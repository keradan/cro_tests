(function () {
    // Если IE тогда вместо currentScript будет так: document.querySelector('тут айдишник скрипта вставленный вручную')
    const cur_test = window.keradan.get_cur_test(document.currentScript);
    cur_test.init.event_category = 'Exp - Benefits_SlideIn_cart';

    // Set dev behavior:
    cur_test.init.enable_log = true;
    cur_test.init.enable_ga_events = true;
    // cur_test.init.debug_mode = false;

    let v = 9;
    cur_test.log(`%c Keradan's test "${cur_test.init.go_title}" (v - ${v}) is here:`, 'background: #222; color: #bada55',  cur_test);
    cur_test.log(`%c Keradan's test script url:`, 'background: #222; color: #bada55',  document.currentScript.getAttribute('src'));

    cur_test.ga_event('loaded');

    try {
        (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:1885763,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        window.hj=window.hj||function(){(hj.q=hj.q||[]).push(arguments)};
        hj('trigger', 'Benefits_SlideIn_cart');
    }
    catch (e) {
        cur_test.log('Hotjar error: ', e);
    }

    let scope_parent = `.scope-parent[data-scope-name=${cur_test.init.css_scope_name}]`;
    document.querySelector("#styles-" + cur_test.init.name).innerHTML = `
        #CartContainer form.cart .drawer__inner {
            bottom: 166px!important;
        }
        #CartContainer form.cart .drawer__footer {
            height: 166px!important;
            box-shadow: 0px -4px 20px rgba(0, 0, 0, 0.07);
        }
        #CartContainer form.cart .drawer__footer .cart-subtotal {
            background: white!important;
        }
        ${scope_parent}.benefits-box {
            margin: 0 47px;
            padding: 15px 0;
            border-top: 1px solid rgba(0,0,0,0.1);
            font-family: Montserrat, "HelveticaNeue", "Helvetica Neue", sans-serif;
            font-weight: 500;
            font-size: 11px;
            line-height: 13px;
            color: #272C3B;
            letter-spacing: 0;
        }
        ${scope_parent}.benefits-box ul {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 0;
            padding: 0;
        }
        ${scope_parent}.benefits-box ul li {
            display: flex;
            align-items: center;
        }
        ${scope_parent}.benefits-box ul li span {
            font-size: 20px;
            margin-right: 3px;
            margin-bottom: 1px;
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
        <ul>
            <li><span>•</span> ${cur_test.markup.content.benefits_list[0]}</li>
            <li><span>•</span> ${cur_test.markup.content.benefits_list[1]}</li>
            <li><span>•</span> ${cur_test.markup.content.benefits_list[2]}</li>
        </ul>
    `;

    cur_test.insert_markup_into_dom = function(mutationRecords) {
        if(cur_test.target_form.querySelector(`${scope_parent}.benefits-box`)) return;
        cur_test.target_form.querySelector('.cart-subtotal').after(benefits_box);
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

        cur_test.target_form.querySelector('button.cart__checkout').addEventListener('click', function() {
            cur_test.ga_event('Click on Checkout');
        });
        
    })
    .catch(function(error) {
        console.error(error);
    });







})();