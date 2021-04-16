// Версия чтоб понять загрузился ли на гитхаб или еще нет
let v = 16;

// Если IE тогда вместо currentScript будет так: document.querySelector('тут айдишник скрипта вставленный вручную')
const cur_test = window.keradan.get_cur_test(document.currentScript);

// Категория ивента для аналитики
cur_test.init.event_category = 'Exp — New PDP';

// Set dev behavior (for production need to comment out or remove):
cur_test.init.enable_log = true;
cur_test.init.enable_ga_events = false;

// Чтоб зафиксировать присутствие и версию
cur_test.log(`%c Keradan's test "${cur_test.init.go_title}" (v - ${v}) is here:`, 'background: #222; color: #bada55', cur_test);
cur_test.log(`%c Keradan's test script url:`, 'background: #222; color: #bada55', document.currentScript.getAttribute('src'));

// Пример отправки ивента в аналитику
cur_test.ga_event('loaded');

try {
    // hotjar here
} catch (e) {
    // keradan_log('Hotjar error: ', e);
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

function changeLocation(location) {
    item = data.filter(function(item){return item.location == location})[0]
    $('#main_course').html(`${item.course_name} - ${location}`)
    $('.location').html(item.location_address)
    $('.course-picker').removeClass('opened')
    dates = getDates(location)
    $('.dates').html('')
    changeDate(location, dates[0])

    dates.forEach(function (date) {
        $('.dates').append(`<li onclick="changeDate('${location}', '${date}')">${getFormattedDate(date)}</li>`)
    })
}

function getFormattedDate(date) {
    dObj = new Date(date)

    return `${monthNames[dObj.getMonth()]} ${dObj.getDate()}`
}

function changeDate(location, date)
{
    $('.main_date').html(getFormattedDate(date))
    $('.course-picker').removeClass('opened')
    course = getCourse(location, date)[0]
    $('.course_time').html(`${course.start_time} - ${course.end_time}`)
    $('.course_tag').html(course.course_tag)
    $('#main_date').html(`${getFormattedDate(date)} ${course.start_time} to ${course.end_time}`)
    $('.course-name').html(`${course.course_name} - ${course.location}`)
    $('#wage_tag').html(course.wage_tag)
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
            return item.start_date
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
            return item.location
        }).filter(onlyUnique)
        $('.locations').html('')
        changeLocation(locations[0])
        $('#nextButton').removeAttr('disabled');
        locations.forEach(function (location) {
            $('.locations').append(`<li onclick="changeLocation('${location}')">${data[0].course_name} - ${location}</li>`)
        })
    })

// Создаем враппер для всей нашей верстки, и закидываем его в документ
cur_test.html = document.createElement('div');
cur_test.html.classList.add(cur_test.init.css_scope_name);
document.querySelector('.course-results').prepend(cur_test.html);


// Добавляем всю верстку тут
document.querySelector('.' + cur_test.init.css_scope_name).innerHTML = `
		<div class="step location-step" data-step="location">
			<div class="step-title">
				<div class="grey">Step 1</div>
				<div class="green">Pick a location</div>
			</div>
			<div class="text-label">Course</div>
			<div class="course-picker">
				<div class="choosen" onclick="this.parentElement.classList.toggle('opened')">
					<div class="text" id="main_course">
						Select course
					</div>
					<svg fill="none" viewBox="0 0 12 8"><path fill="#757575" d="M10.6.3L6 4.9 1.4.3 0 1.7l6 6 6-6L10.6.3z"/></svg>
				</div>
				<ul class="locations">
					
				</ul>
			</div>
			<div class="text-label">Location</div>
			<div class="data-with-icon">
				<svg fill="none" viewBox="0 0 14 20">
					<path fill="#757575" d="M7 0a7 7 0 00-7 7c0 5.3 7 13 7 13s7-7.8 7-13a7 7 0 00-7-7zM2 7a5 5 0 0110 0c0 2.9-2.9 7.2-5 9.9-2-2.7-5-7-5-9.9zm2.5 0a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0z" />
				</svg>
				<div class="text location"></div>
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
			<div class="tag green-tag">
				<span class="icon-man2 ico2"></span>
				<span>Booked 1,640 times</span>
			</div>
			<div class="tag green-tag">
				<span class="icon-cash-pound ico"></span>
				<span id="wage_tag">Avg. wage rate £16/hr</span>
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
						<div class="choosen" onclick="this.parentElement.classList.toggle('opened')">
							<div class="text">
								Change location
							</div>
							<svg fill="none" viewBox="0 0 12 8"><path fill="#757575" d="M10.6.3L6 4.9 1.4.3 0 1.7l6 6 6-6L10.6.3z"/></svg>
						</div>
						<ul class="locations">
							<li>Door Supervisor Training - Barnsley</li>
							<li>Door Supervisor Training - Birmingham</li>
							<li>Door Supervisor Training - Aylesbury</li>
							<li>Door Supervisor Training - Chelmsford</li>
							<li>Door Supervisor Training - London</li>
						</ul>
					</div>
					<div class="course-picker">
						<div class="choosen" onclick="this.parentElement.classList.toggle('opened')">
							<div class="text">
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
		.searchTopSection, .nearestCourseBox { display: none; }

		.${cur_test.init.css_scope_name} .step {
			display: flex;
		    flex-direction: column;
		    justify-content: center;
		    align-items: flex-start;
		    background: #FFFFFF;
		    box-shadow: 0px 0px 10px rgb(0 0 0 / 10%);
		    border-radius: 10px;
		    padding: 15px;
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
		.${cur_test.init.css_scope_name} .course-picker {
			position: relative;
			width: 100%;
		    border: 1px solid #F2F2F2;
		    box-sizing: border-box;
		    border-radius: 5px;
		    padding: 0;
		    margin-bottom: 15px;
		}
		.${cur_test.init.css_scope_name} .course-picker.opened {
			border-radius: 5px 5px 0 0;
		}
		.${cur_test.init.css_scope_name} .course-picker .choosen {
			padding: 0 8px;
			height: 45px;
		    display: flex;
		    align-items: center;
		    justify-content: space-between;
		}
		.${cur_test.init.css_scope_name} .course-picker .choosen .text {
			font-size: 14px;
			color: #808080;
			max-width: calc(100% - 15px);
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
		    margin-bottom: 5px;
		    width: 100%;
		}
		.${cur_test.init.css_scope_name} .course-head .date {
			font-size: 14px;
			color: #808080;
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
 	`;









