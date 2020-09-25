(function () {
	let keradan_enable_log = true;

	function keradan_get_cookie(name) {
		let matches = document.cookie.match(new RegExp(
			"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
		));
		return matches ? decodeURIComponent(matches[1]) : undefined;
	}
	function keradan_set_cookie(name, value, options = {}) {
		if (!options.path) options.path = '/';

		if (options.expires instanceof Date) {
			options.expires = options.expires.toUTCString();
		}
		let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

		for (let optionKey in options) {
			updatedCookie += "; " + optionKey;
			let optionValue = options[optionKey];
			if (optionValue !== true) {
				updatedCookie += "=" + optionValue;
			}
		}
		document.cookie = updatedCookie;
	}
	function keradan_delete_cookie(name) {
		setCookie(name, "", {
			'max-age': -1
		})
	}

	function keradan_log() {
		if(keradan_enable_log) console.log.apply(this, arguments);
	}

	let keradan_ga_event = function(eventAction) {
		let dataLayer = window.dataLayer || [];
		let ga_data = {
			'event': 'event-to-ga',
			'eventCategory': 'Popup with CTA - non-US',
			'eventAction': eventAction
		};
		keradan_log('keradan ga event: ', ga_data);
		if(true) dataLayer.push(ga_data);
	}

	keradan_ga_event('loaded');
	
	(function(h,o,t,j,a,r){
		h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
		h._hjSettings={hjid:1955547,hjsv:6};
		a=o.getElementsByTagName('head')[0];
		r=o.createElement('script');r.async=1;
		r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
		a.appendChild(r);
	})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
	window.hj = window.hj || function(){(hj.q = hj.q || []).push(arguments)};

	try {
		hj('trigger', 'popup_cta_non-us');
	}
    catch (e) {
		keradan_log('Hotjar error: ', e);
	}

 	let show_popup = function () {
 		keradan_ga_event('view popup');
 		document.cookie = "delayed_popup_was_shown=true; path=/";
 		popup_wrapper.classList.toggle('displayed', true);
 		setTimeout(() => popup_wrapper.classList.toggle('show', true), 10);
 	}

 	let close_popup = function () {
 		console.log('close_popup');
 		popup_wrapper.classList.toggle('show', false);
 		setTimeout(() => popup_wrapper.classList.toggle('displayed', false), 300);
 	}

 	let markup_content = {
 		headline: 'How to make your boyfriend<br>truly commited to you?',
 		sub_headline: 'Watch this video to learn:',
 		list_items: '',
 		list_items_text: [
 			'why men can lose interest in a woman after the initial attraction wears off',
 			'why men are reluctant to commit long term, even when the early signs of relationship seem so promising?',
 			'why men can pull away suddenly and stop communicating with their partners?',
 		],
 		list_item_mark: '<svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M7.50002 0C3.35786 0 0 3.35786 0 7.50002C0 11.6422 3.35786 15 7.50002 15C11.6422 15 15 11.6422 15 7.50002C15 3.35786 11.6421 0 7.50002 0ZM7.50002 13.125C4.39344 13.125 1.87502 10.6066 1.87502 7.50002C1.87502 4.39344 4.39344 1.87502 7.50002 1.87502C10.6066 1.87502 13.125 4.39344 13.125 7.50002C13.125 10.6066 10.6066 13.125 7.50002 13.125Z" fill="#E768B5"/></svg>',
 		request_button_text: 'Watch this video to find out',
 		request_button_link: 'https://hernorm.com/become-his-obsession/',
 	};

 	markup_content.list_items_text.forEach(function(text_item){
 		markup_content.list_items += `
 			<li>
	 			<span class="mark">${markup_content.list_item_mark}</span>
	 			<span class="text">${text_item}</span>
 			</li>
 		`;
 	});

 	let styles = `
 		.keradan-delayed-popup-wrapper {
 			position: fixed;
 			top: 0;
 			left: 0;
 			width: 100vw;
 			height: 100vh;
 			display: flex;
 			align-items: center;
 			justify-content: center;
 			background: rgba(0,0,0,0.4);
 			z-index: 9999999999;
 			opacity: 1;
 			transition: opacity 0.3s ease;
 		}
 		.keradan-delayed-popup-wrapper:not(.displayed) {
 			display: none!important;
 		}
 		.keradan-delayed-popup-wrapper:not(.show) {
 			opacity: 0;
 		}
 		.krdndpw .popup {
 			position: relative;
 			display: flex;
 			flex-flow: column;
 			align-items: center;
 			justify-content: center;
 			background: white;
 			width: calc(100vw - 30px);
 			box-sizing: border-box;
 			border-radius: 5px;
 			margin: 0;
 			padding: 15px;
 			transform: translateY(0);
 			transition: transform 0.3s cubic-bezier(0.3, 0.4, 0.2, 1.5);
 		}
 		.keradan-delayed-popup-wrapper:not(.show) .popup {
 			transform: translateY(-5%);
 		}
 		.krdndpw .popup button.close {
 			position: absolute;
		    top: 10px;
		    right: 10px;
		    border: none;
		    background: transparent;
		    opacity: 0.3;
		    width: 26px;
		    height: 26px;
		    padding: 5px;
		    margin: 0;
		    display: flex;
 		}
 		.krdndpw .popup .headline {
 			font-family: PT Serif;
		    font-size: 24px;
		    line-height: 32px;
		    letter-spacing: -0.5px;
		    color: #000000;
		    text-align: center;
		    margin: 0;
    		padding: 0;
    		margin-top: 15px;
 		}
 		.krdndpw .popup .sub-headline {
 			font-family: PT Serif;
		    font-size: 20px;
		    line-height: 26px;
		    letter-spacing: -0.5px;
		    color: #404040;
		    text-align: left;
		    width: calc(100% - 60px);
		    margin: 15px 30px;
    		padding: 0;
 		}
 		.krdndpw .popup ul {
 			margin: 0;
 			padding: 0;
 		}
 		.krdndpw .popup ul li {
 			display: flex;
 			flex-wrap: nowrap;
 			margin: 10px 0;
 		}
 		.krdndpw .popup ul li span.mark {
 			display: flex;
		    width: 33px;
		    justify-content: flex-start;
		    align-items: flex-start;
		    padding-top: 6px;
 		}
 		.krdndpw .popup ul li span.text {
 			font-family: PT Serif;
		    font-size: 20px;
		    line-height: 26px;
		    letter-spacing: -0.5px;
		    max-width: calc(100% - 33px);
 		}
 		.krdndpw .popup a.request-button {
 			display: flex;
		    justify-content: center;
		    align-items: center;
		    border: 2px solid #E768B5;
		    box-sizing: border-box;
		    border-radius: 10px;
		    font-family: PT Serif;
		    font-size: 16px;
		    letter-spacing: -0.5px;
		    height: 50px;
		    width: 100%;
 			text-decoration: none;
 			color: white;
		    background: #E768B5;
		    margin: 15px 0;
		    box-shadow: 0 5px 10px rgba(133, 35, 94, 0.25);
 		}
 	`;

 	let markup = `
 		<div class="popup">
 			<button class="close"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8.88368 8.00076L15.8167 1.06771C16.0608 0.823614 16.0608 0.427865 15.8167 0.183803C15.5726 -0.0602597 15.1769 -0.060291 14.9328 0.183803L7.99975 7.11686L1.06673 0.183803C0.822637 -0.060291 0.426888 -0.060291 0.182826 0.183803C-0.0612362 0.427896 -0.0612675 0.823646 0.182826 1.06771L7.11584 8.00073L0.182826 14.9338C-0.0612675 15.1779 -0.0612675 15.5736 0.182826 15.8177C0.304857 15.9397 0.464825 16.0007 0.624794 16.0007C0.784762 16.0007 0.944699 15.9397 1.06676 15.8177L7.99975 8.88467L14.9328 15.8177C15.0548 15.9397 15.2148 16.0007 15.3747 16.0007C15.5347 16.0007 15.6946 15.9397 15.8167 15.8177C16.0608 15.5736 16.0608 15.1778 15.8167 14.9338L8.88368 8.00076Z" fill="black"/></svg></button>
 			<p class="headline">${markup_content.headline}</p>
 			<p class="sub-headline">${markup_content.sub_headline}</p>
 			<ul>${markup_content.list_items}</ul>
 			<a data-tracking-group="digistore24" data-action="sale.hso" href="${markup_content.request_button_link}" class="request-button krdn-affiliate-link">${markup_content.request_button_text}</a>
 		</div>
 	`;

 	let styles_el = document.createElement('style');
	styles_el.innerHTML = styles;
	document.querySelector('head').append(styles_el);

	let markup_el = document.createElement('div');
	markup_el.classList.add('keradan-delayed-popup-wrapper', 'krdndpw'); // .krdndpw - minified wrapper class for scope
	markup_el.innerHTML = markup;
	document.querySelector('body').append(markup_el);
	
	var popup_wrapper = document.querySelector('.krdndpw');

	popup_wrapper.addEventListener('click', function(event){
		if (event.target != popup_wrapper) return false;
		keradan_ga_event('close popup - background');
		close_popup();
	});
	popup_wrapper.querySelector('button.close').addEventListener('click', function(){
		keradan_ga_event('close popup - X');
		close_popup();
	});
	popup_wrapper.querySelector('a.request-button').addEventListener('click', function(){
		keradan_ga_event('click on Watch this video to find out');
	});

	if (keradan_get_cookie('delayed_popup_was_shown')) keradan_log('popup was already shown in this session');
	else {
		let keradan_doInit = window.doInit.toString();
		keradan_doInit = window.doInit.toString().replace("jQuery('a[data-tracking-group]').each", "jQuery('.krdn-affiliate-link').each")
			.replace("jQuery('a[data-tracking-group]').click", "jQuery('.krdn-affiliate-link').click")
			.replace("jQuery('a[data-tracking-group]').mousedown", "jQuery('.krdn-affiliate-link').mousedown");

		setTimeout(parseFunction(keradan_doInit)(), 1000);
		setTimeout(show_popup, 15000);

		function parseFunction (str) {
			var fn_body_idx = str.indexOf('{'),
				fn_body = str.substring(fn_body_idx+1, str.lastIndexOf('}')),
				fn_declare = str.substring(0, fn_body_idx),
				fn_params = fn_declare.substring(fn_declare.indexOf('(')+1, fn_declare.lastIndexOf(')')),
				args = fn_params.split(',');

			args.push(fn_body);

			function Fn () {
				return Function.apply(this, args);
			}
			Fn.prototype = Function.prototype;

			return new Fn();
		}
	}
})();