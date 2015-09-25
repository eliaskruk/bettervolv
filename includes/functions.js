function eventListener() {
    var videoPlayer = document.getElementById("videoPlayer");
    
    var hm = $(window).height() / 3.15;
    $('.maq-content').height(hm);

    $("#maquina").on("pageshow", function (event, ui) {
        var hc = ($(window).height() - $('#maquina .ui-header').height()) * 0.9;
        mylog("HC = " + hc + " ---- WH = " + $(window).height() + " ---- HEADER = " + $('#maquina .ui-header').height());
        $('#maquina .ui-content').height(hc);
        $('#maquina .ui-content').css("visibility", "visible");

        var mySwiper = new Swiper('.swiper-container', {
            // Optional parameters
            preloadImages: true,
            paginationClickable: true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev'
        });
    });

    $("#videos").on("pageshow", function (event, ui) {
        var hc = ($(window).height() - $('#videos .ui-header').height()) * 0.9;
        mylog("HC = " + hc + " ---- WH = " + $(window).height() + " ---- HEADER = " + $('#videos .ui-header').height());
        $('#videos .ui-content').height(hc);
        $('#videos .ui-content').css("visibility", "visible");
    });
    
    $(".lista-videos a").click(function(e){
        e.preventDefault();
        
        videoPlayer.src = $(this).attr("href");
        videoPlayer.poster = $(this).find("img").attr("src");
        
        return false;
    });
    
    $(".back").click(function(){
        videoPlayer.pause();
    });
}

function videos() {
    var apppath_ = cordova.file.externalRootDirectory;
    alert('base: ' + apppath_);
}
function openPopup(msg) {
    alert(msg);
}
function mylog(cosa) {
    console.log(cosa);
}

function mostrar_galeria() {
    $("#maquina .ui-content").removeClass("datos-tecnicos").addClass("galeria");
}

function mostrar_datos_tecnicos() {
    $("#maquina .ui-content").removeClass("galeria").addClass("datos-tecnicos");
}