(function () {
    // Если IE тогда вместо currentScript будет так: document.querySelector('тут айдишник скрипта вставленный вручную')
    const cur_test = window.keradan.get_cur_test(document.currentScript);
    cur_test.init.event_category = 'Exp - Banner with CTA';

    // Set dev behavior:
    cur_test.init.enable_log = true;
    cur_test.init.enable_ga_events = false;
    // cur_test.init.debug_mode = false;

    let v = 1;
    cur_test.log(`%c Keradan's test "${cur_test.init.go_title}" (v - ${v}) is here:`, 'background: #222; color: #bada55',  cur_test);
    cur_test.log(`%c Keradan's test script url:`, 'background: #222; color: #bada55',  document.currentScript.getAttribute('src'));

    cur_test.ga_event('loaded');

    try {
        (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:1955547,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        window.hj = window.hj || function(){(hj.q = hj.q || []).push(arguments)};
        hj('trigger', 'banner_with_CTA');
    }
    catch (e) {
        cur_test.log('Hotjar error: ', e);
    }



    let scope_parent = `.scope-parent[data-scope-name=${cur_test.init.css_scope_name}]`;
    document.querySelector("#styles-" + cur_test.init.name).innerHTML = `
        #adhesion_desktop_wrapper {
            bottom: 54px!important;
            display:none!important;
        }

        ${scope_parent}.banner {
            display: flex;
            box-sizing: border-box;
            justify-content: center;
            align-items: center;
            position: fixed;
            margin: 0;
            padding: 0;
            left: 0;
            width: 100vw;
            height: 55px;
            bottom: 0;
            background: #E768B5;
            box-shadow: 0px 0px 10px rgba(133, 35, 94, 0.25);
            color: white;
            text-decoration: none;
            z-index: 99999999999;
            transition: all 0.2s ease;
            opacity: 1;
            transform: translateX(0);
        }

        ${scope_parent}.banner.hide {
            opacity: 0;
            transform: translateX(-101%);
        }
        ${scope_parent}.banner span {
            transition: all 0.25s cubic-bezier(0.5, -0.5, 0.1, 2);
            position: relative;
            transform: translateX(0);
        }
        ${scope_parent}.banner.hide span {
            transform: translateX(-100px);
        }
        ${scope_parent}.banner span.text {
            transition-delay: 0.8s;
        }
        ${scope_parent}.banner span.button {
            transition-delay: 0.2s;
        }

        ${scope_parent}.banner span.text {
            color: white;
            font-family: Montserrat;
            font-style: normal;
            font-weight: 600;
            font-size: 16px;
            line-height: 21px;
            letter-spacing: -0.4px;
        }

        ${scope_parent}.banner span.button {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 35px;
            height: 35px;
            background: #A53579;
            margin: 0;
            margin-left: 10px;
            border-radius: 50%;
        }
        ${scope_parent}.banner span.button svg {
            position: relative;
            left: 1px;
        }

        .hide-sticky-add {
            display:none!important;
        }
    `;

    cur_test.markup.content = {
        link: `https://www.truthfinder.com/p/home/?utm_source=BBX3&traffic[source]=BBX3&utm_medium=affiliate&traffic[medium]=affiliate&utm_campaign=&traffic[campaign]=bb219299a9q8ccc0a82fquns6cpssak8t5m9bpifv3rlt1bm85mzpm7ix1ei:&utm_term=&traffic[term]=&utm_content=&traffic[content]=&s1=&s2=bb219299a9q8ccc0a82fquns6cpssak8t5m9bpifv3rlt1bm85mzpm7ix1ei&s3=&s4=&s5=&traffic[funnel]=tf&traffic[sub_id]=&traffic[s2]=bb219299a9q8ccc0a82fquns6cpssak8t5m9bpifv3rlt1bm85mzpm7ix1ei&subtheme=cheaters&tone=caution`,
        text: `3 Ways to Find Out If He’s Cheating?`,
        arrow_icon: `<svg width="10" height="16" viewBox="0 0 10 16" fill="none"><path d="M9.44469 7.37568L2.32449 0.255608C2.15981 0.090796 1.93997 0 1.70557 0C1.47116 0 1.25133 0.090796 1.08664 0.255608L0.562291 0.779831C0.22109 1.12142 0.22109 1.6766 0.562291 2.01767L6.5413 7.99668L0.555657 13.9823C0.390975 14.1471 0.300049 14.3668 0.300049 14.6011C0.300049 14.8357 0.390975 15.0554 0.555657 15.2203L1.08001 15.7444C1.24482 15.9092 1.46453 16 1.69893 16C1.93334 16 2.15317 15.9092 2.31785 15.7444L9.44469 8.61782C9.60976 8.45248 9.70043 8.23174 9.69991 7.99707C9.70043 7.7615 9.60976 7.54088 9.44469 7.37568Z" fill="white"/></svg>`,
    };
    
    let banner = cur_test.markup.els.banner = document.createElement('a');
    banner.classList.add(`scope-parent`, 'banner', 'hide');
    banner.setAttribute('data-scope-name', cur_test.init.css_scope_name);
    banner.setAttribute('href', cur_test.markup.content.link);
    banner.innerHTML = `
        <span class="text">${cur_test.markup.content.text}</span>
        <span class="button">${cur_test.markup.content.arrow_icon}</span>
    `;
    banner.addEventListener('click', () => cur_test.ga_event('click on Sticky banner'));
    document.querySelector('body').prepend(banner);

    setTimeout(function(){
        let sticky_add = document.querySelector('div[data-gg-moat]');
        if(sticky_add) sticky_add.classList.add('hide-sticky-add');
        banner.classList.toggle('hide', false);
    },10000);

})();