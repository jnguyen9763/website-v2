var prevScroll = 0;
var loadedFlower = false;

// source: Scott Dowding from StackOverflow
function isScrolledIntoView(elem)
{
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

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
            // if ($('nav').css('display') != 'none' && $('nav').css('opacity') == 1) {
            //     $('nav').fadeOut();
            // }
            if ($('#front a').css('display') != 'none' && $('#front a').css('opacity') == 1) {
                $('#front a').fadeOut();
            }
        }
        else { // up
            // if ($('nav').css('display') == 'none' && $('nav').css('opacity') == 1) {
            //     $('nav').fadeIn();
            // }
            if ($('#front a').css('display') == 'none' && $('#front a').css('opacity') == 1) {
                $('#front a').fadeIn();
            }
        }
        prevScroll = scroll;
        if (isScrolledIntoView($('#headshot'))) {
            $('#animation').removeClass('paused');
        }
    });
    $('#showi').on('click', function() {
        $('#skills').hide();
        $('#shows').removeClass('active');
        $('#intro').show();
        $('#showi').addClass('active');
    });
    $('#shows').on('click', function() {
        $('#intro').hide();
        $('#showi').removeClass('active');
        $('#skills').show();
        $('#shows').addClass('active');
    });
});
