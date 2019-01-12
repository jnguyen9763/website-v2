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
        var opacityNum = (100 - scroll) / 100;
        $('#front a').css('opacity', opacityNum);
    });
});
