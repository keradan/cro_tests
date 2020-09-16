(function () {
 
 	let show_popup = function () {
 		console.log('show_popup');
 		popup_wrapper.classList.toggle('show', true);
 	}

 	let close_popup = function () {
 		console.log('close_popup');
 		popup_wrapper.classList.toggle('show', false);
 	}

 	let markup_content = {
 		headline: 'How to find out if<br>He is cheating on you?',
 		sub_headline: 'This <span>online tool</span> can legally and anonymously check:',
 		list_items: '',
 		list_items_text: [
 			'Who He’s been contacting frequently?',
 			'What contact details he is using',
 			'Did he download dating apps',
 			'Is he married or divorced',
 			'Does he have kids?',
 			'And a lot more...',
 		],
 		list_item_mark: '<svg width="20" height="16" viewBox="0 0 20 16" fill="none"><path d="M19.7071 0.949099C19.3166 0.558552 18.6835 0.558552 18.2929 0.949099L6.31228 12.9298L1.70713 8.32469C1.31662 7.93414 0.683496 7.93418 0.29291 8.32469C-0.0976367 8.71519 -0.0976367 9.34832 0.29291 9.73887L5.60518 15.0511C5.99557 15.4416 6.62916 15.4413 7.01939 15.0511L19.7071 2.36332C20.0977 1.97281 20.0976 1.33965 19.7071 0.949099Z" fill="#E768B5"/></svg>',
 		cancel_button_text: 'I prefer to don’t know about this',
 		request_button_text: 'I want to learn more about this tool',
 		request_button_link: '#',
 	};

 	markup_content.list_items_text.forEach(function(text_item){
 		markup_content.list_items += `
 			<li>
	 			<span class="mark">${markup_content.list_item_mark}</span>
	 			<span class="text">${text_item}</span>
 			</li>
 		`;
 	});

 	/* .krdndpw - minified wrapper class for scope */
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
 		}
 		.keradan-delayed-popup:not(.krdndpw.show) {
 			display: none!important;
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
		    text-align: center;
		    margin: 15px;
    		padding: 0;
 		}
 		.krdndpw .popup .sub-headline span {
 			font-weight: 600;
 			font-style: italic;
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
		    padding-top: 4px;
 		}
 		.krdndpw .popup ul li span.text {
 			font-family: PT Serif;
		    font-size: 20px;
		    line-height: 26px;
		    letter-spacing: -0.5px;
		    max-width: calc(100% - 33px);
 		}
 		.krdndpw .popup button.cancel-button, .krdndpw .popup a.request-button {
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
 		}
 		.krdndpw .popup button.cancel-button {
 			color: #E768B5;
		    background: transparent;
		    margin-top: 20px;
		    margin-bottom: 10px;
 		}
 		.krdndpw .popup a.request-button {
 			text-decoration: none;
 			color: white;
		    background: #E768B5;
		    margin-bottom: 15px;
		    box-shadow: 0 5px 10px rgba(133, 35, 94, 0.25);
 		}
 	`;

 	let markup = `
 		<div class="popup">
 			<button class="close"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8.88368 8.00076L15.8167 1.06771C16.0608 0.823614 16.0608 0.427865 15.8167 0.183803C15.5726 -0.0602597 15.1769 -0.060291 14.9328 0.183803L7.99975 7.11686L1.06673 0.183803C0.822637 -0.060291 0.426888 -0.060291 0.182826 0.183803C-0.0612362 0.427896 -0.0612675 0.823646 0.182826 1.06771L7.11584 8.00073L0.182826 14.9338C-0.0612675 15.1779 -0.0612675 15.5736 0.182826 15.8177C0.304857 15.9397 0.464825 16.0007 0.624794 16.0007C0.784762 16.0007 0.944699 15.9397 1.06676 15.8177L7.99975 8.88467L14.9328 15.8177C15.0548 15.9397 15.2148 16.0007 15.3747 16.0007C15.5347 16.0007 15.6946 15.9397 15.8167 15.8177C16.0608 15.5736 16.0608 15.1778 15.8167 14.9338L8.88368 8.00076Z" fill="black"/></svg></button>
 			<p class="headline">${markup_content.headline}</p>
 			<p class="sub-headline">${markup_content.sub_headline}</p>
 			<ul>${markup_content.list_items}</ul>
 			<button class="cancel-button">${markup_content.cancel_button_text}</button>
 			<a href="${markup_content.request_button_link}" class="request-button">${markup_content.request_button_text}</a>
 		</div>
 	`;

 	let styles_el = document.createElement('style');
	styles_el.innerHTML = styles;
	document.querySelector('head').append(styles_el);

	let markup_el = document.createElement('div');
	markup_el.classList.add('keradan-delayed-popup-wrapper', 'krdndpw');
	markup_el.innerHTML = markup;
	document.querySelector('body').append(markup_el);
	
	var popup_wrapper = document.querySelector('.krdndpw');

	popup_wrapper.addEventListener('click', function(event){
		if (event.target == popup_wrapper) close_popup();
	});
	popup_wrapper.querySelector('button.close').addEventListener('click', close_popup);
	popup_wrapper.querySelector('button.cancel-button').addEventListener('click', close_popup);

	

	setTimeout(show_popup, 1000);
})();