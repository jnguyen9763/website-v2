$(document).ready(function() {
    $('#front').children('h1').delay(3000).slideDown('slow').siblings('a').delay(4000).fadeIn('slow');
    // source: w3schools
    $("a").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function(){
                window.location.hash = hash;
            });
        }
    });
});
