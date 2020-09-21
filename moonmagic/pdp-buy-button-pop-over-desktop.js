(function () {
	let keradan_enable_log = true;
	function keradan_log() {
		if(keradan_enable_log) console.log.apply(this, arguments);
	}

	let keradan_ga_event = function(eventAction) {
		let dataLayer = window.dataLayer || [];
		let ga_data = {
			'event': 'event-to-ga',
			'eventCategory': 'defaultdefaultdefaultdefaultdefaultdefaultdefaultdefaultdefault',
			'eventAction': eventAction
		};
		keradan_log('keradan ga event: ', ga_data);
		if(false) dataLayer.push(ga_data);
	}

	keradan_ga_event('керадат тут');
	keradan_ga_event('loaded');

	// (function(h,o,t,j,a,r){
	// 	h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
	// 	h._hjSettings={hjid:1955547,hjsv:6};
	// 	a=o.getElementsByTagName('head')[0];
	// 	r=o.createElement('script');r.async=1;
	// 	r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
	// 	a.appendChild(r);
	// })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
	// window.hj = window.hj || function(){(hj.q = hj.q || []).push(arguments)};

	// try {
	// 	hj('trigger', 'popup_cta_non-us');
	// }
 //    catch (e) {
	// 	keradan_log('Hotjar error: ', e);
	// }

 	


 	// let styles = `
 	// 	.keradan-delayed-popup-wrapper {
 	// 		position: fixed;
 	// 		top: 0;
 	// 		left: 0;
 	// 		width: 100vw;
 	// 		height: 100vh;
 	// 		display: flex;
 	// 		align-items: center;
 	// 		justify-content: center;
 	// 		background: rgba(0,0,0,0.4);
 	// 		z-index: 9999999999;
 	// 		opacity: 1;
 	// 		transition: opacity 0.3s ease;
 	// 	}
 	// 	.keradan-delayed-popup-wrapper:not(.displayed) {
 	// 		display: none!important;
 	// 	}
 	// 	.keradan-delayed-popup-wrapper:not(.show) {
 	// 		opacity: 0;
 	// 	}
 	// 	.krdndpw .popup {
 	// 		position: relative;
 	// 		display: flex;
 	// 		flex-flow: column;
 	// 		align-items: center;
 	// 		justify-content: center;
 	// 		background: white;
 	// 		width: calc(100vw - 30px);
 	// 		box-sizing: border-box;
 	// 		border-radius: 5px;
 	// 		margin: 0;
 	// 		padding: 15px;
 	// 		transform: translateY(0);
 	// 		transition: transform 0.3s cubic-bezier(0.3, 0.4, 0.2, 1.5);
 	// 	}
 	// 	.keradan-delayed-popup-wrapper:not(.show) .popup {
 	// 		transform: translateY(-5%);
 	// 	}
 	// 	.krdndpw .popup button.close {
 	// 		position: absolute;
		//     top: 10px;
		//     right: 10px;
		//     border: none;
		//     background: transparent;
		//     opacity: 0.3;
		//     width: 26px;
		//     height: 26px;
		//     padding: 5px;
		//     margin: 0;
		//     display: flex;
 	// 	}
 	// 	.krdndpw .popup .headline {
 	// 		font-family: PT Serif;
		//     font-size: 24px;
		//     line-height: 32px;
		//     letter-spacing: -0.5px;
		//     color: #000000;
		//     text-align: center;
		//     margin: 0;
  //   		padding: 0;
  //   		margin-top: 15px;
 	// 	}
 	// 	.krdndpw .popup .sub-headline {
 	// 		font-family: PT Serif;
		//     font-size: 20px;
		//     line-height: 26px;
		//     letter-spacing: -0.5px;
		//     color: #404040;
		//     text-align: left;
		//     width: calc(100% - 60px);
		//     margin: 15px 30px;
  //   		padding: 0;
 	// 	}
 	// 	.krdndpw .popup ul {
 	// 		margin: 0;
 	// 		padding: 0;
 	// 	}
 	// 	.krdndpw .popup ul li {
 	// 		display: flex;
 	// 		flex-wrap: nowrap;
 	// 		margin: 10px 0;
 	// 	}
 	// 	.krdndpw .popup ul li span.mark {
 	// 		display: flex;
		//     width: 33px;
		//     justify-content: flex-start;
		//     align-items: flex-start;
		//     padding-top: 6px;
 	// 	}
 	// 	.krdndpw .popup ul li span.text {
 	// 		font-family: PT Serif;
		//     font-size: 20px;
		//     line-height: 26px;
		//     letter-spacing: -0.5px;
		//     max-width: calc(100% - 33px);
 	// 	}
 	// 	.krdndpw .popup a.request-button {
 	// 		display: flex;
		//     justify-content: center;
		//     align-items: center;
		//     border: 2px solid #E768B5;
		//     box-sizing: border-box;
		//     border-radius: 10px;
		//     font-family: PT Serif;
		//     font-size: 16px;
		//     letter-spacing: -0.5px;
		//     height: 50px;
		//     width: 100%;
 	// 		text-decoration: none;
 	// 		color: white;
		//     background: #E768B5;
		//     margin: 15px 0;
		//     box-shadow: 0 5px 10px rgba(133, 35, 94, 0.25);
 	// 	}
 	// `;

 	// let markup = `
 	// 	<div class="popup">
 	// 		<button class="close"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8.88368 8.00076L15.8167 1.06771C16.0608 0.823614 16.0608 0.427865 15.8167 0.183803C15.5726 -0.0602597 15.1769 -0.060291 14.9328 0.183803L7.99975 7.11686L1.06673 0.183803C0.822637 -0.060291 0.426888 -0.060291 0.182826 0.183803C-0.0612362 0.427896 -0.0612675 0.823646 0.182826 1.06771L7.11584 8.00073L0.182826 14.9338C-0.0612675 15.1779 -0.0612675 15.5736 0.182826 15.8177C0.304857 15.9397 0.464825 16.0007 0.624794 16.0007C0.784762 16.0007 0.944699 15.9397 1.06676 15.8177L7.99975 8.88467L14.9328 15.8177C15.0548 15.9397 15.2148 16.0007 15.3747 16.0007C15.5347 16.0007 15.6946 15.9397 15.8167 15.8177C16.0608 15.5736 16.0608 15.1778 15.8167 14.9338L8.88368 8.00076Z" fill="black"/></svg></button>
 	// 		<p class="headline">${markup_content.headline}</p>
 	// 		<p class="sub-headline">${markup_content.sub_headline}</p>
 	// 		<ul>${markup_content.list_items}</ul>
 	// 		<a href="${markup_content.request_button_link}" class="request-button">${markup_content.request_button_text}</a>
 	// 	</div>
 	// `;

 // 	let styles_el = document.createElement('style');
	// styles_el.innerHTML = styles;
	// document.querySelector('head').append(styles_el);

	// let markup_el = document.createElement('div');
	// markup_el.classList.add('keradan-delayed-popup-wrapper', 'krdndpw'); // .krdndpw - minified wrapper class for scope
	// markup_el.innerHTML = markup;
	// document.querySelector('body').append(markup_el);

	
	// var popup_wrapper = document.querySelector('.krdndpw');

	// popup_wrapper.addEventListener('click', function(event){
	// 	if (event.target != popup_wrapper) return false;
	// 	keradan_ga_event('close popup - background');
	// 	close_popup();
	// });
	// popup_wrapper.querySelector('button.close').addEventListener('click', function(){
	// 	keradan_ga_event('close popup - X');
	// 	close_popup();
	// });
	// popup_wrapper.querySelector('a.request-button').addEventListener('click', function(){
	// 	keradan_ga_event('click on Watch this video to find out');
	// });

	// setTimeout(show_popup, 5000);
})();