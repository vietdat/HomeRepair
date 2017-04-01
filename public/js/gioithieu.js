
//Get data
function getAllData(cb) {
	$.getJSON ({
	    url: "http://localhost:3000/data/data-gioi-thieu",
	    dataType: "json",
	    data: '{"data": "TEST"}',
	    type: 'GET',
	    jsonpCallback: 'callback',
	    success: function (data) {
	        console.log("data ", data);
	        cb(data);
	    },
	    error: function (xhr, status, error) {
	        console.log('Error: ' + error.message);
	    }
	});
}

//handle data
function handleData(data) {
	//get current url/
	var pathname = window.location.pathname; // Returns path only
	var host = document.location.protocol + "//" + document.location.host + "/gioi-thieu";
	//show html
	if(data) {
		$.each(data, function(key, value) {
			$("#list-article").append('<div class="col-sm-12 margin-buttom-10 no-padding-left">'
				+ '<div class="row">'
				+ '<div class="col-sm-2">'
				+ '<div>'
				+ '<a href="#" class="full-image">'
				+ '<img alt="'+ value.image.alt + '" src="' + value.image.src +'" style="height:100px; width: 100px" />'
				+ '</a>'
				+ '</div>'
				+ '</div>'
				+ '<div class="col-sm-10">'
				+ '<h4 class="no-padding-top no-margin-top">'
				+ '<a href="'+ host + '/' + value.url +'">'+ value.title +'</a>'
				+ '</h4>'
				+ '<div class="col-md-12 no-padding-left">'
				+ '<div class="entry-content">'
				+ '<p>'+ value.description +'</p>'
				+ '</div>'
				+ '</div>'
				+ '</div>'
				+ '</div>'
				+ '</div>'
			);
			console.log("element ", value);
		});
	}
}

getAllData(handleData);
