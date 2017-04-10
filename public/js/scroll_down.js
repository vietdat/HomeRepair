
var html ='<a href="" class="list-group-item">'
		+ '<div class="list">'
		+	'<div class="img_banner">'
		+ '<img src="http://localhost:3000/images/gioithieu1.jpg" alt="" class="logo">'
		+ '</div>'
		+ '<div class="title_banner">'
		+	'<h3 class="padding-0 margin-0" style="font-size: 16px">'
		+		'<span>T?i sao DT xây d?ng nhà th?u tính l?i nhi?u...1</span>'
		+	'</h3>'
		+ '</div>'
		+'</div>'	
		+'</a>'
		+'<a href="" class="list-group-item">'
		+ '<div class="list">'
		+	'<div class="img_banner">'
		+ '<img src="http://localhost:3000/images/gioithieu1.jpg" alt="" class="logo">'
		+ '</div>'
		+ '<div class="title_banner">'
		+	'<h3 class="padding-0 margin-0" style="font-size: 16px">'
		+		'<span>T?i sao DT xây d?ng nhà th?u tính l?i nhi?u...1</span>'
		+	'</h3>'
		+ '</div>'
		+'</div>'	
		+'</a>'
		+'<a href="" class="list-group-item">'
		+ '<div class="list">'
		+	'<div class="img_banner">'
		+ '<img src="http://localhost:3000/images/gioithieu1.jpg" alt="" class="logo">'
		+ '</div>'
		+ '<div class="title_banner">'
		+	'<h3 class="padding-0 margin-0" style="font-size: 16px">'
		+		'<span>T?i sao DT xây d?ng nhà th?u tính l?i nhi?u...1</span>'
		+	'</h3>'
		+ '</div>'
		+'</div>'	
		+'</a>'
		+'<a href="" class="list-group-item">'
		+ '<div class="list">'
		+	'<div class="img_banner">'
		+ '<img src="http://localhost:3000/images/gioithieu1.jpg" alt="" class="logo">'
		+ '</div>'
		+ '<div class="title_banner">'
		+	'<h3 class="padding-0 margin-0" style="font-size: 16px">'
		+		'<span>T?i sao DT xây d?ng nhà th?u tính l?i nhi?u...1</span>'
		+	'</h3>'
		+ '</div>'
		+'</div>'	
		+'</a>'
		+'<a href="" class="list-group-item">'
		+ '<div class="list">'
		+	'<div class="img_banner">'
		+ '<img src="http://localhost:3000/images/gioithieu1.jpg" alt="" class="logo">'
		+ '</div>'
		+ '<div class="title_banner">'
		+	'<h3 class="padding-0 margin-0" style="font-size: 16px">'
		+		'<span>T?i sao DT xây d?ng nhà th?u tính l?i nhi?u...1</span>'
		+	'</h3>'
		+ '</div>'
		+'</div>'	
		+'</a>'
		+'<a href="" class="list-group-item">'
		+ '<div class="list">'
		+	'<div class="img_banner">'
		+ '<img src="http://localhost:3000/images/gioithieu1.jpg" alt="" class="logo">'
		+ '</div>'
		+ '<div class="title_banner">'
		+	'<h3 class="padding-0 margin-0" style="font-size: 16px">'
		+		'<span>T?i sao DT xây d?ng nhà th?u tính l?i nhi?u...1</span>'
		+	'</h3>'
		+ '</div>'
		+'</div>'	
		+'</a>'
		+'<a href="" class="list-group-item">'
		+ '<div class="list">'
		+	'<div class="img_banner">'
		+ '<img src="http://localhost:3000/images/gioithieu1.jpg" alt="" class="logo">'
		+ '</div>'
		+ '<div class="title_banner">'
		+	'<h3 class="padding-0 margin-0" style="font-size: 16px">'
		+		'<span>T?i sao DT xây d?ng nhà th?u tính l?i nhi?u...1</span>'
		+	'</h3>'
		+ '</div>'
		+'</div>'	
		+'</a>'



$(document).ready(function() {
	if ($('.content').height() > $('.container').height()) {
        setInterval(function () {
            start();
       }, 3000); 
   
    }
});
var animationOffset = 0;
function animateContent(direction) {  
    // var animationOffset = $('.container1').height() - $('.content').height() - 30;
    animationOffset = animationOffset - 200;
    console.log("Animation: ", animationOffset);
    $('.content').animate({ "marginTop": (animationOffset)+ "px" }, 10000);
}

function down(){
    animateContent("down")
}

function start(){
	down();

	$('.content').append(html);
	// setTimeout(function () {
	   
	// }, 0);
}    
