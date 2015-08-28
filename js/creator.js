
//file:///Users/Marty/Documents/Programming/Websites/Pebble%20Configuration%20Page%20Generator/Test.html?id=3
// startitem=1&header=hello%20world&wtf=dhajskda

// var basePath = window.location.search.substring(1);

// Replace all %20 with spaces
function replaceSpaces(text) {
	while (text.indexOf("%20") != -1) {
		text = text.replace("%20", ' ');
	}
	return text;
}

// get map of all parameters and their values
var urlParam = window.location.search.substring(1);
var splitParams = urlParam.split("&");
console.log("Url Parameters = " + urlParam);
console.log("Split url param = " + splitParams);


var page = '<form id="main-form">';
var toggleCount = 0;
var checkboxCount = 0;
var radioCount = 0;
var inputFieldCount = 0;
var sliderCount = 0;
var timeCount = 0;
var dateCount = 0;
var colorCount = 0;
var dropdownCount = 0;
var tabCount = 0;

var sliderValue = 50;
var sliderMin = 0;
var sliderMax = 100;

// loop through them and add them to the body appropriately
for (var i = 0; i < splitParams.length; i++) {
	// seperate the key/value pair
	var pair = splitParams[i].split("=");
	console.log("Pair = [ " + pair[0] + ", " + pair[1] + " ]");

	// replace %20 with a space
	pair[1] = replaceSpaces(pair[1]);
	console.log("Param value with spaces = " + pair[1]);

	// check for the type of the of the item to be added			
	// add it to the new body text variable
	switch (pair[0]) {
		case "startitem":
			page += '<div class="item-container">';
			break;
		case "enditem":
			page += '</div>';
			break;

		case "header":
			page += '<div class="item-container-header">' + 
						pair[1] + 
					'</div>';
			break;
		case "paragraph":
			page +=	'<div class="item">' +
						pair[1] + 
					'</div>';
			break;
		case "toggleswitch":
			page += '<label class="item">' + 
							pair[1] + // TODO: FIX this ----------------->
  						'<input type="checkbox" class="item-toggle" name="toggle-'+ toggleCount + '" checked>' + 
					'</label>';
			toggleCount++;
			break;
		case "checkboxitem":
			page += '<label class="item">' + 
          				pair[1] + 
          				'<input type="checkbox" class="item-checkbox" name="checkbox-' + checkboxCount + '">' + 
        			'</label>';
        	checkboxCount++;
        	break;
        case "inputfield":
        	page += '<label class="item">' + 
          				'<div class="item-input-wrapper">' + 
            				'<input type="text" class="item-input" name="input-' + inputFieldCount + '" placeholder="' + pair[1] + '">' + 
          				'</div>' + 
        			'</label>';
        	break;
        case "slider":
        	page += '<label class="item">' + 
          				'<input type="range" class="item-slider" name="slider-' + sliderCount + '" value="' + parseInt(pair[1]) + '">' + 
    				    '<div class="item-input-wrapper item-slider-text">' + 
            				'<input type="text" class="item-input" name="slider-' + sliderCount + '" value="' + parseInt(pair[1]) + '">' + 
		   			    '</div>' + 
		   			'</label>';
   			sliderCount++;
   			break;

   		case "startdraggablelist":
   			page += '<div class="item-draggable-list">';
   			break;
   		case "draggablelistitem":
   			page += '<label class="item">' + pair[1] + '</label>';
   			break;
   		case 'enddraggablelist':
   			page += '</div>';
   			break;

   		case "startdynamiclist":
   			page += '<div class="item-dynamic-list">';
   			break;
   		case "dynamiclistitem":
   			page += '<label class="item">' + pair[1] + '</label>';
        	break;
        case "enddynamiclist":
        	page += '</div>';
        	break

       	// radio button
        case "startradiogroup":
        	// no purpose, just for show
        	break;
        case "radioitemtitle":
        	page += '<label class="item">' + pair[1];
          	break;
        case "radioitemvalue":
        	page += '<input type="radio" class="item-radio" name="radio-' + radioCount + '" value="' + pair[1] + '">' + 
        		'</label>';
        	break;
        case "endradiogroup":
        	radioCount++;
        	break;


		case "timepicker":
			page += '<label class="item">' + 
          				pair[1] +  
          				'<input type="time" class="item-time" name="time-' + timeCount + '" value="18:35">' +  
          			'</label>';
          	timeCount++;
          	break;
		case "datepicker":
			page += '<label class="item">' + 
			        	pair[1] + 
          				'<input type="date" class="item-date" name="date-' + dateCount + '" value="2015-02-12">' + 
    			    '</label>';
          	dateCount++;
          	break;
        case "colorpicker":
        	page += '<label class="item">' + 
          				pair[1] + 
          				'<input type="text" class="item-color item-color-normal" name="color-' + colorCount + '" value="0xFFFFFF">' + 
        			'</label>';
        	colorCount++;
        	break;
        case "sunnycolorpicker":
	        page += '<label class="item">' + 
	          			pair[1] + 
	         			'<input type="text" class="item-color item-color-sunny" name="color-' + colorCount + '" value="0xFFFFFF">' + 
	        		'</label>';
	        colorCount++;
	        break;


		case "startdropdown":
			page += '<label class="item">' + 
          				pair[1] + 
          				'<select name="select-' + dropdownCount + '" dir="rtl" class="item-select">';
            dropdownCount++;
            break;
        case "dropdownitem":
        	page += '<option class="item-select-option">' + pair[1] + '</option>';
          	break;
        case "enddropdown":
        	page += '</select>' + 
				'</label>';
        	break;

        case "starttabgroup":
        	page += '<label class="item tab-buttons">';
        	break;
        case "tabitem":
        	page += '<a name="tab-' + tabCount + '" class="tab-button">' + pair[1] + '</a>';
        	break;
        case "tabitemactive":
        	page += '<a name="tab-' + tabCount + '" class="tab-button active">' + pair[1] + '</a>';
        	break;
        case "endtabgroup":
        	page += '</label>';
        	tabCount++;
        	break;


		case "footer":
			page += '<div class="item-container-footer">' + 
						pair[1] + 
					'</div>';
			break;

		case "startgroup":
				page +='<div class="item-container-content">';
			break;
		case "endgroup":
				page +='</div>';
			break;	

		default:
			page += pair[1] + " not recognized";
	}
}

// Add submit button and end the form
page += '<div class="item-container">' + 
	      '<div class="button-container">' + 
	        '<input type="button" class="item-button" value="SEND">' + 
	      '</div>' + 
	    '</div>' + 
	  '</form>';


// Pring out new body innerHTML for debugging purposes
console.log("page = " + page);

document.body.innerHTML = page;