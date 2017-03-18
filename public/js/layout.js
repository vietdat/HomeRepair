$(document).ready(function () {

    var menu = $('.scroll-menu');
    var origOffsetY = menu.offset().top;

    function scroll() {
        if ($(window).scrollTop() >= origOffsetY) {
            $('.scroll-menu').addClass('sticky');
        } else {
            $('.scroll-menu').removeClass('sticky');
        }
    }

    document.onscroll = scroll;

});