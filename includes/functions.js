function eventListener() {
    var hm = $(window).height() / 3.15;
    $('.maq-content').height(hm);

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
    });
}

function videos() {
    var basepath_ = cordova.file.dataDirectory + 'workout/';
    var apppath_ = cordova.file.applicationDirectory;
    alert('base: ' + basepath_);
    alert('app: ' + apppath_);


//    var fileTransfer = new FileTransfer();
//    var uri = cordova.file.applicationDirectory + 'www/' + workouts[curWorkout].exercices[curEx].video;
//    fileTransfer.download(
//            uri,
//            cordova.file.dataDirectory + workouts[curWorkout].exercices[curEx].video,
//            function (entry) {
//                console.log("download complete: " + entry.fullPath);
//                videoPlayer.src = cordova.file.dataDirectory + entry.fullPath;
//                console.log("videoPlayer.src: " + videoPlayer.src);
//            },
//            function (error) {
//                alert("download error source " + error.source + " (code: " + error.code + ")");
//            }
//    );
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