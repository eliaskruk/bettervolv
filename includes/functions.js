function eventListener() {
    var inDirectory = new Array();

    var videoPlayer = document.getElementById("videoPlayer");
    var hm = $(window).height() / 3.15;
    $('.maq-content').height(hm);
    $("#maquina").on("pageshow", function (event, ui) {

        var hc = ($(window).height() - $('#maquina .ui-header').height()) * 0.9;
        //mylog("HC = " + hc + " ---- WH = " + $(window).height() + " ---- HEADER = " + $('#maquina .ui-header').height());
        $('#maquina .ui-content').height(hc);
        $('#maquina .ui-content').css("visibility", "visible");
        mySwiper = new Swiper('.swiper-container', {
            // Optional parameters
            preloadImages: true,
            paginationClickable: true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev'
        });
    });
    $("#maquina").on("pagehide", function (event, ui) {
//mySwiper.update();
    });
    $("#videos").on("pageshow", function (event, ui) {
        var hc = ($(window).height() - $('#videos .ui-header').height()) * 0.9;
        //mylog("HC = " + hc + " ---- WH = " + $(window).height() + " ---- HEADER = " + $('#videos .ui-header').height());
        $('#videos .ui-content').height(hc);
        $('#videos .ui-content').css("visibility", "visible");
    });
    $("#videos").on("pagehide", function (event, ui) {
        videoPlayer.pause();
    });
    $(".lista-videos a").click(function (e) {
        e.preventDefault();
        videoPlayer.src = $(this).attr("href");
        videoPlayer.poster = $(this).find("img").attr("src");
        return false;
    });
    $("#brochure").on("pageshow", function (event, ui) {
        var hc = ($(window).height() - $('#brochure .ui-header').height()) * 0.9;
        //mylog("HC = " + hc + " ---- WH = " + $(window).height() + " ---- HEADER = " + $('#videos .ui-header').height());
        $('#brochure .ui-content').height(hc);
        $('#brochure .ui-content').css("visibility", "visible");
    });
}

//function videos() {
//    var apppath_ = cordova.file.externalRootDirectory;
//    //alert('SD PATH: ' + apppath_);
//
//    window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
//    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
//}
//function gotFS(fileSystem) {
//    //var filePaht_ = fileSystem.root.fullPath;
//    //console.log(filePaht_);
//
//    var reader = fileSystem.root.createReader();
//    reader.readEntries(gotList, fail);
//}
//function gotList(entries) {
//    var i;
//    for (i = 0; i < entries.length; i++) {
//        console.log(entries[i]);
//    }
//}
//function fail(e) {
//    console.log(e);
//}

function getPhoneGapPath() {
    /*'use strict';*/
    var path = window.location.pathname;
    var phoneGapPath = path.substring(0, path.lastIndexOf('/') + 1);
    console.log(phoneGapPath);
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


function getAll_in_dir(dir) {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
        fs.root.getDirectory(dir, {}, function (dirEntry) {
            var dirReader = dirEntry.createReader();
            dirReader.readEntries(function (entries) {
                inDirectory = entries;
            }, fail);
        }, fail);
    }, fail);
}

function getFolders_in_dir(dir) {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
        fs.root.getDirectory(dir, {}, function (dirEntry) {
            var dirReader = dirEntry.createReader();
            dirReader.readEntries(function (entries) {
                for (var i = 0; i < entries.length; i++) {
                    var entry = entries[i];
                    if (entry.isDirectory) {
                        inDirectory.push(entry);
                    }
                }
            }, fail);
        }, fail);
    }, fail);
}

function getFiles_in_dir(dir) {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
        fs.root.getDirectory(dir, {}, function (dirEntry) {
            var dirReader = dirEntry.createReader();
            dirReader.readEntries(function (entries) {
                for (var i = 0; i < entries.length; i++) {
                    var entry = entries[i];
                    if (entry.isFile) {
                        inDirectory.push(entry);
                    }
                }
            }, fail);
        }, fail);
    }, fail);
}

function fail(e) {
    console.log(e);
}


var sw_permitir = 9999;
function enviar(callback) {
    $.post("sdsad", {"asdasd": "asdas"}, function (data) {
        if (data == 1) {
            sw_permitir = 1;
        }
        else {
            sw_permitir = 0;
        }
        callback(sw_permitir)
    });
}

function boton() {
    enviar(function (sw_permitir) {
        alert(sw_permitir);
    });
}