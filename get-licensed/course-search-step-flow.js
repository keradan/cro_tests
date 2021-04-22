// Версия чтоб понять загрузился ли на гитхаб или еще нет
let v = 72;

// Если IE тогда вместо currentScript будет так: document.querySelector('тут айдишник скрипта вставленный вручную')
const cur_test = window.keradan.get_cur_test(document.currentScript);

// Категория ивента для аналитики
cur_test.init.event_category = 'Exp — Course search page';

// Set dev behavior (for production need to comment out or remove):
cur_test.init.enable_log = true;
cur_test.init.enable_ga_events = false;

// Чтоб зафиксировать присутствие и версию
cur_test.log(`%c Keradan's test "${cur_test.init.go_title}" (v - ${v}) is here:`, 'background: #222; color: #bada55', cur_test);
cur_test.log(`%c Keradan's test script url:`, 'background: #222; color: #bada55', document.currentScript.getAttribute('src'));

cur_test.ga_event('loaded');

$('head').append('<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">');
$('head').append('<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>');

try {
    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:2258991,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
    window.hj=window.hj||function(){(hj.q=hj.q||[]).push(arguments)};
    hj('trigger', 'course_search_page');
} catch (e) {
    console.log('Hotjar error: ', e);
}

$('.courseCard:parent').remove()
$('.gl-pagination:parent').remove()


function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

var urlParams = new URLSearchParams(window.location.search);
var courseID = urlParams.get('courseID');
var data, locations
var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function changeLocation(location) {
    $('.location-picker').css('display', 'block')
    $('#nextButton').removeAttr('disabled');
    item = data.filter(function(item){return item.location == location})[0]
    $('#main_course').html(`${item.course_name} - ${location}`)
    $('.location').html(item.location_address)
    $('.course-picker').removeClass('opened')
    dates = getDates(location)
    $('.dates').html('')
    changeDate(location, dates[0].start, dates[0].end)

    dates.forEach(function (date) {
        $('.dates').append(`<li onclick="changeDate('${location}', '${date.start}', '${date.end}')">${getFormattedDate(date.start)} - ${getFormattedDate(date.end)}</li>`)
    })
}

function getFormattedDate(date) {
    dObj = new Date(date)

    return `${days[dObj.getDay()]}, ${monthNames[dObj.getMonth()]} ${dObj.getDate()}`
}

function changeDate(location, date, date_end)
{
    $('.main_date').html(`${getFormattedDate(date)} - ${getFormattedDate(date_end)}`)
    $('.course-picker').removeClass('opened')
    course = getCourse(location, date)[0]
    $('.course_time').html(`${course.start_time} - ${course.end_time}`)
    $('.course_tag').html(course.course_tag)
    $('#main_date').html(`${getFormattedDate(date)}<br>${course.start_time} to ${course.end_time}`)
    $('.course-name').html(`${course.course_name} - ${course.location}`)
    $('#wage_tag').html(course.wage_tag)
    $('#booked_times').html(course.booked)
    $('#results').html(course.faster_result)
    $('#price').html(course.price_without_discount)
    $('#discont_price').html(course.price_with_discount)
    $('#difference').html(course.price_without_discount - course.price_with_discount)
    $("#book").data('course-id', course.eventId)
}

function showDateItem() {
    $('.location-step').css('display', 'none')
    $('.date-step').css('display', 'flex')
}

function book(){
    var id = $("#book").data('course-id');
    data = {
        'locationID': id,
        '_token': $('input[name=_token]').val(),
        'currentPage': location.href,
    };
    $.ajax({
        url: 'https://www.get-licensed.co.uk/trainee/add-to-cart',
        type: "post",
        data: data,
        success: function(data){
            if (data == "Added")
                location.href = "https://www.get-licensed.co.uk/trainee/booking-step-1" + '/' + id;
            else if (data == "AddedToCheckout")
                location.href = "https://www.get-licensed.co.uk/trainee/checkout" + '/0/' + id;
            else if (data == "AddedToDirectCheckout")
                location.href = "https://www.get-licensed.co.uk/trainee/checkout" + '/2/' + id;
            else
                alert("Error adding course into cart");
        }
    }); // end of ajax request
}

function showResultItem() {
    $('.date-step').css('display', 'none')
    $('.course-step').css('display', 'flex')
}


function getDates(location) {
    return data.filter(function (item) {
        return item.location == location
    })
        .map(function (item) {
            return {
                'start': item.start_date,
                'end': item.end_date
            }
        })
}

function getCourse(location, date) {
    return data.filter(function (item) {
        return item.location == location && item.start_date == date
    })
}

$.getJSON('https://www.get-licensed.co.uk/api/course/' + courseID)
    .then(function (item) {
        data = item
        locations = data.map(function (item) {
            return  {
                value: item.location,
                label: item.location,
                // desc: item.location_address
            }
        }).reduce(function(memo, e1){
            var matches = memo.filter(function(e2){
                return e1.value == e2.value && e1.desc == e2.desc
            })
            if (matches.length == 0) {
                memo.push(e1)
            }
            return memo;
        }, [])

        console.log('locations: ', locations);

        setTimeout(function(){
        	location_step_selector = `.${cur_test.init.css_scope_name} .step.location-step`;
        	let location_step = document.querySelector(location_step_selector);
        	console.log('location_step_selector: ', location_step_selector);
        	console.log('location_step: ', location_step);
        	location_step.classList.remove('loading');

        	let choosen = location_step.querySelector('.choosen');

        	if (choosen.parentElement.classList.contains('show-loader')) setTimeout(function(){
        		console.log('choosen: ', choosen);
        		console.log('choosen clicked!');
        		choosen.click();
        	}, 100);
        }, 1);

        $('.locations').html('')
        $( ".course" ).autocomplete({
            source: locations,
            minLength: 0,
            select: function( event, ui ) {
                $( ".course" ).val(ui.item.label)
                $(this).parent().removeClass('opened')
                changeLocation(ui.item.value)

                return false;
            },
            response: function(event, ui) {
                if (!ui.content.length) {
                    $('.location-picker').css('display', 'none')
                    $('#nextButton').attr('disabled', 'disabled');
                    var noResult = { value:"",label:"No results found. Please try to search by boroughs or cities", desc: "" };
                    ui.content.push(noResult);
                }
            }
        });

        $('.choosen.locs').click(function () {
            hasClass = $(this).parent().hasClass('opened')
            if (hasClass) {
                $(".ui-menu-item").hide();
                $(this).parent().removeClass('opened')
            } else {
                $(this).find(".course").autocomplete('search', '')
                $(this).parent().addClass('opened')
            }
        })
    })

// Создаем враппер для всей нашей верстки, и закидываем его в документ
cur_test.html = document.createElement('div');
cur_test.html.classList.add(cur_test.init.css_scope_name);
document.querySelector('.course-results').prepend(cur_test.html);
document.querySelector('.course-results').parentElement.classList.remove('col-md-9');
document.querySelector('.searchTopSection').parentElement.remove();

document.querySelector('.nearestCourseBox h3').parentElement.classList.remove('col-sm-9');
document.querySelector('.nearestCourseBox h3').parentElement.classList.add('col-xs-12');

// Добавляем всю верстку тут
document.querySelector('.' + cur_test.init.css_scope_name).innerHTML = `
		<div class="step location-step loading" data-step="location">
			<div class="step-title">
				<div class="grey">Step 1</div>
				<div class="green">Pick a location</div>
			</div>
			<div class="text-label">Find your nearest course</div>
			<div class="course-picker">
				<div class="help-tip">Please search using boroughs/cities</div>
				<div class="choosen locs" onclick="this.parentElement.classList.toggle('show-loader')">
					<div class="loader">
						<svg xmlns="http://www.w3.org/2000/svg" style="margin: auto; background: none; display: block; shape-rendering: auto; animation-play-state: running; animation-delay: 0s;" width="50px" height="50px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
							<circle cx="50" cy="50" r="30" stroke-width="5" stroke="#1a1a1a" stroke-dasharray="47.12388980384689 47.12388980384689" fill="none" stroke-linecap="round" style="animation-play-state: running; animation-delay: 0s;" transform="rotate(270.944 50 50)">
							  <animateTransform attributeName="transform" type="rotate" dur="4s" repeatCount="indefinite" keyTimes="0;1" values="0 50 50;360 50 50" style="animation-play-state: running; animation-delay: 0s;"></animateTransform>
							</circle>
							<circle cx="50" cy="50" r="24" stroke-width="5" stroke="#42af58" stroke-dasharray="37.69911184307752 37.69911184307752" stroke-dashoffset="37.69911184307752" fill="none" stroke-linecap="round" style="animation-play-state: running;animation-delay: 0s;" transform="rotate(-270.944 50 50)">
							  <animateTransform attributeName="transform" type="rotate" dur="4s" repeatCount="indefinite" keyTimes="0;1" values="0 50 50;-360 50 50" style="animation-play-state: running; animation-delay: 0s;"></animateTransform>
							</circle>
						</svg>
					</div>
					<input type="text" placeholder="Please enter your location" class="course">
					<svg fill="none" viewBox="0 0 12 8"><path fill="#757575" d="M10.6.3L6 4.9 1.4.3 0 1.7l6 6 6-6L10.6.3z"/></svg>
				</div>
			</div>
			<div class="location-picker">
			    <div class="text-label">Location</div>
			<div class="data-with-icon">
				<svg fill="none" viewBox="0 0 14 20">
					<path fill="#757575" d="M7 0a7 7 0 00-7 7c0 5.3 7 13 7 13s7-7.8 7-13a7 7 0 00-7-7zM2 7a5 5 0 0110 0c0 2.9-2.9 7.2-5 9.9-2-2.7-5-7-5-9.9zm2.5 0a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0z" />
				</svg>
				<div class="text location"></div>
			</div>
            </div>
			<div class="button-wrapper">
				<button onclick="showDateItem()" disabled id="nextButton">Next</button>
			</div>
		</div>

		<div class="step date-step" data-step="date">
			<div class="step-title">
				<div class="grey">Step 2</div>
				<div class="green">Pick date</div>
			</div>
			<div class="text-label">Course date picker</div>
			<div class="course-picker">
				<div class="choosen" onclick="this.parentElement.classList.toggle('opened')">
					<div class="text main_date">
						7th Jun
					</div>
					<svg fill="none" viewBox="0 0 12 8"><path fill="#757575" d="M10.6.3L6 4.9 1.4.3 0 1.7l6 6 6-6L10.6.3z"/></svg>
				</div>
				<ul class="dates">
				</ul>
			</div>
			<div class="text-label">Course time</div>
			<div class="data-with-icon">
				<svg fill="none" viewBox="0 0 17 17">
					<path fill="#757575" d="M11.5 10L9.2 8.2V4.6a.7.7 0 10-1.4 0v4c0 .2.1.4.3.5l2.6 2a.7.7 0 001-.2c.2-.3.1-.7-.2-.9z"/>
					<path fill="#757575" d="M8.5 0a8.5 8.5 0 100 17 8.5 8.5 0 000-17zm0 15.7a7.2 7.2 0 110-14.4 7.2 7.2 0 010 14.4z"/>
				</svg>
				<div class="text course_time">8:00am - 6:00pm</div>
			</div>
			<div class="button-wrapper">
				<button onclick="showResultItem()">Next</button>
			</div>
		</div>

		<div class="step course-step" data-step="course">
			<div class="course-head">
				<div class="tag orange-tag course_tag">
					Best selling SIA course
				</div>
				<div class="date" id="main_date">
					7th Jun 8am to 6pm
				</div>
			</div>
			<div class="course-name">
				Door Supervisor Training — Aylesbury
			</div>
			<div class="data-with-icon">
				<svg fill="none" viewBox="0 0 14 20">
					<path fill="#757575" d="M7 0a7 7 0 00-7 7c0 5.3 7 13 7 13s7-7.8 7-13a7 7 0 00-7-7zM2 7a5 5 0 0110 0c0 2.9-2.9 7.2-5 9.9-2-2.7-5-7-5-9.9zm2.5 0a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0z" />
				</svg>
				<div class="text location">Future Inns Bristol Cabot Circus, Bond St South, Bristol BS1 3EN</div>
			</div>
			<div class="green-tags">
				<div class="tag green-tag">
					<span class="icon-man2 ico2"></span>
					<span id="booked_times">Booked 1,640 times</span>
				</div>
				<div class="tag green-tag">
					<span class="icon-cash-pound ico"></span>
					<span id="wage_tag">Avg. wage rate £16/hr</span>
				</div>
				<div class="tag green-tag show-on-wide-screen">
					<span class="icon-medal-empty ico"></span>
					<span>Instant eLearning access</span>
				</div>
			</div>
			<div class="available">
				<span class="icon-power ico"></span>
				<span id="results">Results available in 5 days</span>
			</div>
			<div class="expand-box">
				<div class="head" onclick="this.parentElement.classList.toggle('opened')">
					<div class="text">
						Change date or location
					</div>
					<svg fill="none" viewBox="0 0 18 12"><path fill="#757575" d="M0 0v2h18V0H0zm7 12h4v-2H7v2zm8-5H3V5h12v2z"/></svg>
				</div>
				<div class="body">
					<div class="course-picker">
						<div class="choosen locs loc">
							<input type="text" placeholder="Search by dropdown" class="course">
							<svg fill="none" viewBox="0 0 12 8"><path fill="#757575" d="M10.6.3L6 4.9 1.4.3 0 1.7l6 6 6-6L10.6.3z"/></svg>
						</div>
					</div>
					<div class="course-picker">
						<div class="choosen dat" onclick="this.parentElement.classList.toggle('opened')">
							<div class="text main_date">
								Change date
							</div>
							<svg fill="none" viewBox="0 0 12 8"><path fill="#757575" d="M10.6.3L6 4.9 1.4.3 0 1.7l6 6 6-6L10.6.3z"/></svg>
						</div>
						<ul class="dates">
							<li>7th Jun</li>
							<li>8th Jun</li>
							<li>9th Jun</li>
							<li>10th Jun</li>
							<li>11th Jun</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="green-title">Reserve your seat</div>
			<div class="price-box">
				<div class="price">
					<span class="old" id="price">213.99</span>
					<span class="save">
						You save 
						<span id="difference">24</span>
					</span>
				</div>
				<div class="total" id="discont_price">
					<span>189.99</span>
				</div>
			</div>
			<div class="button-wrapper" id="book">
				<button onclick="book()">Book</button>
			</div>
		</div>
	`;

// Добавляем все стили тут:
document.querySelector("#styles-" + cur_test.init.name).innerHTML = `
		
		/* working with default elements */
			.searchTopSection, .nearestCourseBox .fynCourseBox { display: none; }
			.nearestCourseBox { text-align: center; }

		.${cur_test.init.css_scope_name} .step {
			position: relative;
			display: flex;
		    flex-direction: column;
		    justify-content: center;
		    align-items: flex-start;
		    background: #FFFFFF;
		    box-shadow: 0px 0px 10px rgb(0 0 0 / 10%);
		    border-radius: 10px;
		    padding: 15px;
		}
		.${cur_test.init.css_scope_name} .step .loader {
			position: absolute;
		    top: 100%;
		    height: 70px;
		    width: 100%;
		    background: #FAFAFA;
		    display: flex;
		    justify-content: center;
		    align-items: center;
		}
		.${cur_test.init.css_scope_name} .step .loader svg {
			width: 40px!important;
		}
		.${cur_test.init.css_scope_name} .step:not(.loading) .loader {
			display: none!important;
		}
		.${cur_test.init.css_scope_name} .course-picker:not(.show-loader) .choosen .loader {
			display:none;
		}
		.${cur_test.init.css_scope_name} .date-step, .${cur_test.init.css_scope_name} .course-step {
			display: none;
		}
		.${cur_test.init.css_scope_name} .step-title {
			width: 100%;
		}
		.${cur_test.init.css_scope_name} .step-title .grey {
			text-align: center;
		    font-weight: bold;
		    font-size: 14px;
		    color: #808080;
		}
		.${cur_test.init.css_scope_name} .step-title .green {
			text-align: center;
		    font-weight: bold;
		    font-size: 18px;
		    color: #42AF58;
		    margin-top: 5px;
		    margin-bottom: 15px;
		}
		.${cur_test.init.css_scope_name} .text-label {
			font-weight: bold;
		    font-size: 12px;
		    color: #808080;
		}
		.${cur_test.init.css_scope_name} .location-picker {
			display:none;
		}
		.${cur_test.init.css_scope_name} .course-picker {
			position: relative;
			width: 100%;
		    border: 1px solid #F2F2F2;
		    box-sizing: border-box;
		    border-radius: 5px;
		    padding: 0;
		    margin-bottom: 25px;
		}
		.${cur_test.init.css_scope_name} .course-picker .help-tip {
			position: absolute;
		    top: 100%;
		    right: 0;
		    font-weight: 600;
		    font-size: 10px;
		    line-height: 12px;
		    color: #808080;
		    margin-top: 5px;
		}
		.${cur_test.init.css_scope_name} .course-picker input {
			width: 100%;
		    height: 100%;
		    border: none;
		    outline: none;
		    background: transparent;
		    padding-left: 8px;
		    font-size: 14px;
		    color: #808080;
		}
		.${cur_test.init.css_scope_name} .course-picker.opened {
			border-radius: 5px 5px 0 0;
		}
		.${cur_test.init.css_scope_name} .course-picker .choosen {
			position: relative;
			padding: 0;
			padding-right: 8px;
			height: 45px;
		    display: flex;
		    align-items: center;
		    justify-content: space-between;
		}
		.${cur_test.init.css_scope_name} .course-picker .choosen .text {
			font-size: 14px;
			color: #808080;
			max-width: calc(100% - 15px);
			padding-left: 8px;
		}
		.${cur_test.init.css_scope_name} .course-picker .choosen svg {
			width: 12px;
			transform: rotate(-180deg);
			transition: all 0.2s ease;
		}
		.${cur_test.init.css_scope_name} .course-picker:not(.opened) .choosen svg {
			transform: rotate(0);
		}
		.${cur_test.init.css_scope_name} .course-picker ul {
			margin: 0;
		    position: absolute;
		    width: calc(100% + 2px);
		    left: -1px;
		    top: 100%;
		    max-height: 150px;
		    overflow-y: scroll;
		    border: 1px solid #F2F2F2;
		    background: #FAFAFA;
		    list-style: none;
		    padding: 0;
		    opacity: 1;
		    transition: all 0.2s ease;
		    z-index: 1;
		}
		.${cur_test.init.css_scope_name} .course-picker:not(.opened) ul {
			max-height: 0px;
			opacity: 0;
		}
		.${cur_test.init.css_scope_name} .course-picker ul li {
			height: 40px;
		    display: flex;
		    align-items: center;
		    font-size: 14px;
		    color: #3C3C3C;
		    padding: 0 8px;
		    border-bottom: 1px solid #F2F2F2;
		}
		.${cur_test.init.css_scope_name} .course-picker ul li:last-child {
			border-bottom: none;
		}
		.${cur_test.init.css_scope_name} .step .data-with-icon {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			width: 100%;
			margin-top: 10px;
		}
		.${cur_test.init.css_scope_name} .step .data-with-icon svg {
			width: 15px;
			margin-right: 10px;
		}
		.${cur_test.init.css_scope_name} .step .data-with-icon .text {
			font-size: 14px;
		    line-height: 17px;
		    color: #808080;
		    max-width: calc(100% - 25px);
		    text-align: justify;
		}
		.${cur_test.init.css_scope_name} .button-wrapper {
			width: 100%;
			margin-top: 20px;
			margin-bottom: 5px;
			text-align: center;
		}
		.${cur_test.init.css_scope_name} .button-wrapper button {
			width: 100%;
		    height: 50px;
		    background: #42AF58;
		    border: none;
		    border-radius: 5px;
		    color: white;
		    font-weight: bold;
		    font-size: 17px;
		}
		.${cur_test.init.css_scope_name} .course-head {
			display: flex;
		    justify-content: space-between;
		    align-items: center;
		    margin-bottom: 15px;
		    width: 100%;
		}
		.${cur_test.init.css_scope_name} .course-head .date {
			font-size: 14px;
			line-height: 14px;
			color: #808080;
			text-align: right;
		}
		.${cur_test.init.css_scope_name} .tag {
		    border-radius: 60px;
		    padding: 5px 10px;
		    white-space: nowrap;
		    font-weight: bold;
		    font-size: 11px;
		    display: flex;
		    justify-content: center;
		    align-items: center;
		    margin: 5px 0;
		}
		.${cur_test.init.css_scope_name} .tag .icon-man2 {
			margin-right: 3px;
		}
		.${cur_test.init.css_scope_name} .tag .icon-cash-pound {
			margin-right: 8px;
		}
		.${cur_test.init.css_scope_name} .tag.green-tag {
			background: #D0EBD5;
			color: #42AF58;
		}
		.${cur_test.init.css_scope_name} .tag.orange-tag {
			background: #FFD6BB;
			color: #F16622;
		}
		.${cur_test.init.css_scope_name} .course-name {
			font-weight: bold;
		    font-size: 14px;
		    color: #42AF58;
		}
		.${cur_test.init.css_scope_name} .course-step .data-with-icon {
			margin-bottom: 10px;
		}
		.${cur_test.init.css_scope_name} .available {
			font-size: 12px;
			color: #808080;
		}
		.${cur_test.init.css_scope_name} .green-title {
			font-weight: bold;
		    font-size: 18px;
		    text-align: center;
		    color: #42AF58;
		}
		.${cur_test.init.css_scope_name} .price-box {
			display: flex;
		    justify-content: space-between;
		    width: 100%;
		    align-items: center;
		}
		.${cur_test.init.css_scope_name} .price-box .price {
			display: flex;
			flex-direction: column;
		}
		.${cur_test.init.css_scope_name} .price-box .price .old {
			font-size: 14px;
		    text-decoration-line: line-through;
		    color: #3C3C3C;
		}
		.${cur_test.init.css_scope_name} .price-box .price .save {
			font-weight: 600;
		    font-size: 14px;
		    color: #3C3C3C;
		}
		.${cur_test.init.css_scope_name} .price-box .total {
			font-weight: bold;
		    font-size: 18px;
		    color: #3C3C3C;
		}
		.${cur_test.init.css_scope_name} .price-box .price .old::before,
		.${cur_test.init.css_scope_name} .price-box .price .save span::before,
		.${cur_test.init.css_scope_name} .price-box .total::before {
			content: "£";
		}
		.${cur_test.init.css_scope_name} .expand-box {
			position: relative;
		    width: 100%;
		    border: 1px solid #F2F2F2;
		    border-radius: 3px;
		    margin: 15px 0;
		}
		.${cur_test.init.css_scope_name} .expand-box .head {
			display: flex;
		    justify-content: space-between;
		    align-items: center;
		    height: 45px;
		    padding: 0 8px;
		}
		.${cur_test.init.css_scope_name} .expand-box .head .text {
			max-width: calc(100% - 25px);
		}
		.${cur_test.init.css_scope_name} .expand-box .head svg {
			width: 18px;
		}
		.${cur_test.init.css_scope_name} .expand-box .body {
			width: 100%;
			left: -1px;
			top: 100%;
			transition: all 0.2s ease;
			max-height: 999px;
		}
		.${cur_test.init.css_scope_name} .expand-box:not(.opened) .body {
			max-height: 0;
			overflow: hidden;
		}
		.${cur_test.init.css_scope_name} .course-step .course-picker {
			background: #FAFAFA;
			border-radius: 0;
			margin: 0;
			border: none;
			border-top: 1px solid #F2F2F2;
		}
		.${cur_test.init.css_scope_name} .course-step .course-picker ul {
			background: white;
		}

		@media (max-width: 499px) {
			.krdn-get-licensed-course-search-step-flow .course-step .green-tag.show-on-wide-screen {
				display: none;
			}
		}
		@media (min-width: 500px) {
			.${cur_test.init.css_scope_name} .button-wrapper button {
				width: 320px;
			}
			.krdn-get-licensed-course-search-step-flow .step {
				padding: 30px calc(50% - 200px);
			}
		}
		@media (min-width: 720px) {
			.krdn-get-licensed-course-search-step-flow .course-step {
				padding: 30px calc(50% - 280px);

				align-items: center;
			}
			.krdn-get-licensed-course-search-step-flow .course-head {
				position: relative;
				justify-content: center;
			}
			.krdn-get-licensed-course-search-step-flow .course-head .date {
				position: absolute;
				right: calc(50% - 280px);
			}
			.krdn-get-licensed-course-search-step-flow .course-step .green-tags {
				display: flex;
			}
			.krdn-get-licensed-course-search-step-flow .course-step .green-tag {
				margin: 5px;
			}
			.krdn-get-licensed-course-search-step-flow .course-step .data-with-icon {
				width: auto;
			}
			.krdn-get-licensed-course-search-step-flow .price-box {
				position: relative;
				justify-content: center;
				text-align: center;
			}
			.krdn-get-licensed-course-search-step-flow .price-box .price .old {
				margin-bottom: 40px;
				margin-top: 5px;
			}
			.krdn-get-licensed-course-search-step-flow .price-box .total {
				position: absolute;
				color: #F16622;
			}
		}

		/* search-drop-down */
			.ui-autocomplete {
				max-width: 530px!important;
				margin-left: -5px!important;
				max-height: 200px!important;
				overflow-y: scroll!important;
			}
			#ui-id-2 {
				max-width: 400px!important;
			    border: 1px solid #F2F2F2!important;
			    background: #FAFAFA!important;
			    margin-left: -2px!important;
			}
			#ui-id-3 {
				border: 1px solid #F2F2F2!important;
				background: white!important;
				margin-left: -2px!important;
			}
			#ui-id-2 .ui-menu-item, #ui-id-3 .ui-menu-item {
				padding: 7px 5px!important;
				border-bottom: 1px solid #F2F2F2!important;
			}

			@media (max-width: 499px) {
				#ui-id-2, #ui-id-3 {
					max-width: calc(100vw - 76px)!important;
				}
			}

		/* /search-drop-down */
 	`;

// ga events
	document.querySelector('.location-step .course-picker .choosen').addEventListener('click', function(){
		cur_test.ga_event('click on dropdown', 'Step #01: Pick a location');
	});

	document.querySelector('.location-step button').addEventListener('click', function(){
		cur_test.ga_event('click on button Next', 'Step #01: Pick a location');
	});

	document.querySelector('.date-step .course-picker .choosen').addEventListener('click', function(){
		cur_test.ga_event('click on dropdown', 'Step #02: Pick time and date');
	});

	document.querySelector('.date-step button').addEventListener('click', function(){
		cur_test.ga_event('click on button Next', 'Step #02: Pick time and date');
	});

	document.querySelector('.course-step .expand-box .head').addEventListener('click', function(){
		cur_test.ga_event('click on dropdown Change selection', 'Step #03: Verify information');
	});

	document.querySelector('.course-picker .choosen.loc').addEventListener('click', function(){
		cur_test.ga_event('collapse Course', 'Step #03: Verify information');
	});
	
	document.querySelector('.course-picker .choosen.dat').addEventListener('click', function(){
		cur_test.ga_event('collapse Course date picker', 'Step #03: Verify information');
	});

	document.querySelector('#ui-id-2 .ui-menu-item').addEventListener('click', function(){
		cur_test.ga_event('choose city', 'Step #01: Pick a location');
	});

	document.querySelector('#ui-id-3 .ui-menu-item').addEventListener('click', function(){
		cur_test.ga_event('choose city', 'Step #03: Verify information');
	});

	document.querySelector('.date-step .course-picker ul.dates li').addEventListener('click', function(){
		cur_test.ga_event('choose date', 'Step #02: Pick time and date');
	});

	document.querySelector('.course-step .course-picker ul.dates li').addEventListener('click', function(){
		cur_test.ga_event('choose date', 'Step #03: Verify information');
	});
// ga events end









