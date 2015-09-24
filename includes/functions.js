$(document).ready(function () {
    var hm = $(window).height() / 3.15;
    $('.maq-content').height(hm);

    $("#galeria").on("pageshow", function (event, ui) {
//        $('#galeria .ui-content').css("visibility", "hidden");
        var hc = ($(window).height() - $('#galeria .ui-header').height()) * 0.9;
        $('#galeria .ui-content').height(hc);

        var mySwiper = new Swiper('.swiper-container', {
            // Optional parameters
            paginationClickable: true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev'
        });

//        $('#galeria .ui-content').css("visibility", "visible");
    });

    $("#datos-tecnicos").on("pageshow", function (event, ui) {
        var hc = ($(window).height() - $('#datos-tecnicos .ui-header').height()) * 0.9;
        $('#datos-tecnicos .ui-content').height(hc);

    });
});

$(document).on('backbutton', function (e) {
    e.preventDefault();
    // YOUR CODE GOES HERE
});

function openPopup(msg) {
    alert(msg);
}
function mylog(cosa) {
    console.log(cosa);
}