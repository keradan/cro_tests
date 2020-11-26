(function () {
    // Если IE тогда вместо currentScript будет так: document.querySelector('тут айдишник скрипта вставленный вручную')
    const cur_test = window.keradan.get_cur_test(document.currentScript);
    cur_test.init.event_category = 'Exp - Benefits_SlideIn_cart';

    // Set dev behavior:
    cur_test.init.enable_log = true;
    cur_test.init.enable_ga_events = true;
    // cur_test.init.debug_mode = false;

    let v = 17;
    cur_test.log(`%c Keradan's test "${cur_test.init.go_title}" (v - ${v}) is here:`, 'background: #222; color: #bada55',  cur_test);
    cur_test.log(`%c Keradan's test script url:`, 'background: #222; color: #bada55',  document.currentScript.getAttribute('src'));

    cur_test.already_loaded = false;

    // let scope_parent = `.scope-parent[data-scope-name="krdn-filippoloreti-benefits-on-slide-in-cart-mobile"]`;
    let scope_parent = `.scope-parent[data-scope-name="${cur_test.init.css_scope_name}"]`;
    // let scope_parent = `.scope-parent[data-scope-name=${cur_test.init.css_scope_name}]`;
    document.querySelector("#styles-" + cur_test.init.name).innerHTML = `
        #CartContainer form.cart .drawer__inner {
            bottom: 166px!important;
        }
        #CartContainer form.cart .drawer__footer {
            height: auto!important;
            box-shadow: 0px -4px 20px rgba(0, 0, 0, 0.07);
        }
        #CartContainer form.cart .drawer__footer .cart-subtotal {
            background: white!important;
        }
        ${scope_parent}.benefits-box {
            margin: 0 45px;
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
        @media (max-width: 360px) {
            ${scope_parent}.benefits-box {
                font-size: 9px;
            }
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

    cur_test.insert_markup_into_dom = function() {
        if(document.querySelector(`${scope_parent}.benefits-box`) || !document.querySelector('#CartContainer form.cart')) return;
        if(!cur_test.already_loaded) {
            cur_test.already_loaded = true;
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
        }
        cur_test.log(`keradan need to insert benefits_box:`, cur_test.markup.els.benefits_box);
        document.querySelector('#CartContainer form.cart .cart-subtotal').after(cur_test.markup.els.benefits_box);
    }

    // Сперва в промисе ожидаем появления тега form в корзине
    let target_form_waiting_promise = new Promise(function(resolve, reject) {

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
        
        cur_test.log('start target form update monitoring');
        let target_form_update_timer = setInterval(() => cur_test.insert_markup_into_dom(), 500);

        cur_test.target_form.querySelector('button.cart__checkout').addEventListener('click', function() {
            cur_test.ga_event('Click on Checkout');
        });
        
    })
    .catch(function(error) {
        console.error(error);
    });







})();