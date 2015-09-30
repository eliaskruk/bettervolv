var insertOrUpdateQueue = [];
var syncing = false;
var srvsyncing = false;
var dbController = null;
var onweb = false;
var pathSD = "file:///storage/sdcard1";
var popup_opened = true;
var siteUrl = 'http://thepastoapps.com/proyectos/pumas/';
var responseUrl = siteUrl + 'response.php';
var timeoutID = null;
var downloadTimeout = null;
var downloadInterval = null;
var uploadTimeout = null;
var uploadInterval = null;
var showInterval = null;
var actualizando = null;

var tipoMaquinaria = "Construction";
var inDirectory = new Array();
var videos = new Array();
var thumbs = new Array();
var video_galery = 0;
var imagenes = new Array();
var datos_tec = new Array();


if (onweb) {
    $(document).ready(function () {
        eventListener();
    });
} else {
    document.addEventListener("deviceready", onDeviceReady, false);
    document.addEventListener("backbutton", onBackKeyDown, false);
}


function onBackKeyDown() {
    return false;
//    if ($.mobile.activePage.attr("id") === "home") {
//        return false;
//    } else {
//        if (onweb) {
//            history.back();
//        } else {
//            var nav = window.navigator;
//            if (this.phonegapNavigationEnabled &&
//                    nav &&
//                    nav.app &&
//                    nav.app.backHistory) {
//                nav.app.backHistory();
//                videoPlayer.pause();
//            } else {
//                window.history.back();
//                videoPlayer.pause();
//            }
//        }
//    }
}
function onDeviceReady() {
    // Alert Bienvenida
    //navigator.notification.alert("Este es un prototipo de la aplicación. Los datos no son reales y las funcionalidades no se encuentran implementadas.hayekipo_");
    //alert("Este es un prototipo de la aplicación. Los datos no son reales y las funcionalidades no se encuentran implementadas.");

    /* Permisos */
    $.mobile.allowCrossDomainPages = true;
    $.ajaxSetup({cache: false});

    /* Insert Inicial*/
    //dbController = new DBController();
    //dbController.init("pumas");

    eventListener();
}
