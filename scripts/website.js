var prevScroll = 0;

$(document).ready(function() {
    $('#front').children('h1').delay(2000).slideDown('slow').siblings('a').delay(3000).fadeIn('slow');
    // source: w3schools
    $('a').on('click', function(event) {
        if (this.hash !== '') {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function() {
                window.location.hash = hash;
            });
        }
    });
    $(window).scroll(function (event) {
        var scroll = $(window).scrollTop();
        if (scroll < 100) {
            $('nav').fadeIn();
            $('#front a').fadeIn();
        }
        else {
            if (scroll > prevScroll) {
                $('nav').fadeOut();
            }
            else {
                $('nav').fadeIn();
            }
            $('#front a').fadeOut();
        }
        prevScroll = scroll;
    });
});
