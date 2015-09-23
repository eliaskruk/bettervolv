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
});

function openPopup(msg) {
    alert(msg);
}
function mylog(cosa) {
    console.log(cosa);
}