$(document).ready(function () {
    var hm = $(window).height() / 3.15;
    $('.maq-content').height(hm);

    $(window).load(function () {

    });

    $("#maquina").on("pagebeforeshow", function (event, ui) {
        $('#maquina .ui-content').css("visibility", "hidden");
    });

    $("#maquina").on("pageshow", function (event, ui) {
        var hc = ($(window).height() - $('#maquina .ui-header').height()) * 0.9;
        $('#maquina .ui-content').height(hc);
        $('#maquina .ui-content').css("visibility", "visible");

        var mySwiper = new Swiper('.swiper-container', {
            // Optional parameters
            preloadImages: true,
            paginationClickable: true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev'
        });

        mySwiper.on('init', function () {
            console.log('slide change start 2');
        });



    });
});


$(document).on('backbutton', function (event, ui) {
    event.preventDefault();
    // YOUR CODE GOES HERE
    return false;
});

function openPopup(msg) {
    alert(msg);
}
function mylog(cosa) {
    console.log(cosa);
}

function mostrar_galeria(){
    $("#maquina .ui-content").removeClass("datos-tecnicos").addClass("galeria");
}

function mostrar_datos_tecnicos(){
    $("#maquina .ui-content").removeClass("galeria").addClass("datos-tecnicos");
}