
//Get data
function getAllData(cb) {
	var param = window.location.pathname.substring(12);
	$.getJSON ({
	    url: "http://localhost:3000/data/data-gioi-thieu/" + param,
	    dataType: "json",
	    data: '{"data": "TEST"}',
	    type: 'GET',
	    jsonpCallback: 'callback',
	    success: function (data) {
	    	console.log("Data ", data);
	        cb(data);
	    },
	    error: function (xhr, status, error) {
	        console.log('Error: ' + error.message);
	    }
	});
}

//handle data
function handleData(data) {
	if(data) {

		// $("#body-content").append(data.content);
	} else {
		return;
	}
}

getAllData(handleData);
