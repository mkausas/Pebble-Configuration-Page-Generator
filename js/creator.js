
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
		case "checkbox":
			page += '<label class="item">' + 
							pair[1] + // TODO: FIX this ----------------->
  						'<input type="checkbox" class="item-toggle" name="toggle-'+ toggleCount + '" checked>' + 
					'</label>';
			toggleCount++;
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