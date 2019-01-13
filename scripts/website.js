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
        if (scroll > prevScroll && scroll >= 100) { // down
            if ($('nav').css('display') != 'none') {
                $('nav').fadeOut();
            }
            if ($('#front a').css('display') != 'none') {
                $('#front a').fadeOut();
            }
        }
        else { // up
            if ($('nav').css('display') == 'none') {
                $('nav').fadeIn();
            }
            if ($('#front a').css('display') == 'none') {
                $('#front a').fadeIn();
            }
        }
        prevScroll = scroll;
    });
});
