var at_top = true;

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
            $('#front a').fadeIn();
            if ($('nav').css('opacity') == 0) {
                $('nav').fadeTo(400, 1);
            }
            at_top = true;
        }
        else {
            $('#front a').fadeOut();
            if ($('nav').css('opacity') == 1) {
                $('nav').fadeTo(400, 0);
            }
            at_top = false;
        }
    });
    $('nav').hover(function() {
        if (!at_top && $('nav').css('opacity') == 0) {
            $('nav').fadeTo(400, 1);
        }
    }, function() {
        if (!at_top && $('nav').css('opacity') == 1) {
            $('nav').fadeTo(400, 0);
        }
    });
});
