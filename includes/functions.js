function eventListener() {
    //Determinar el tipo de contenido
    if (tipoMaquinaria == "Construction") {
        $(".maquinas-content.construction").show();
    } else {
        $(".maquinas-content.trucks").show();
    }

    mySwiper = new Swiper('.swiper-container', {
        // Optional parameters
        preloadImages: true,
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev'
    });

    var videoPlayer = document.getElementById("videoPlayer");

    var hm = $(window).height() / 3.15;
    $('.maq-content').height(hm);

    //MOSTRAR GALERIA DE IMAGENES MAQUINA
    $("#home .m-button").click(function () {
        var nombreCarpeta = $(this).attr("data-value");

        imgenes = new Array();

        getImagenes("Volvo Assets/" + tipoMaquinaria + "/Imagenes/" + nombreCarpeta + "/FOTOS");
        getDatosTec("Volvo Assets/" + tipoMaquinaria + "/Imagenes/" + nombreCarpeta + "/DATOS TECNICOS");

        $('#maquina .ui-content').css("visibility", "hidden");
        $("#maquina .header-content h1").html(nombreCarpeta);
        $('.swiper-wrapper').html('');
        mySwiper.slideTo(0);

        setTimeout(function () {
            if (imagenes.length == 0) {
                getImagenes("Volvo Assets/" + tipoMaquinaria + "/Imagenes/" + nombreCarpeta + "/FOTOS");

                setTimeout(function () {
                    cargarSlider();
                }, 1000);
            } else {
                cargarSlider();
            }
        }, 500);
    });

    $("#maquina").on("pageshow", function (event, ui) {
        var hc = ($(window).height() - $('#maquina .ui-header').height()) * 0.9;
        $('#maquina .ui-content').height(hc);

        mySwiper.update(true);

        $('#maquina .ui-content').css("visibility", "visible");
    });

    $("#maquina").on("pagehide", function (event, ui) {
        mySwiper.removeAllSlides();
        mostrar_galeria();
    });
    $("#videos").on("pageshow", function (event, ui) {
        var hc = ($(window).height() - $('#videos .ui-header').height()) * 0.9;

        $('#videos .ui-content').height(hc);

        if (video_galery == 0) {
            generar_galeria_videos();
            video_galery = 1;
        } else {
            $('#videos .ui-content').css("visibility", "visible");
            videoPlayer.play();
        }
    });
    $("#videos").on("pagehide", function (event, ui) {
        videoPlayer.pause();
    });
    $("#brochure").on("pageshow", function (event, ui) {
        var hc = ($(window).height() - $('#brochure .ui-header').height()) * 0.87;
        //mylog("HC = " + hc + " ---- WH = " + $(window).height() + " ---- HEADER = " + $('#videos .ui-header').height());
        $('#brochure .ui-content').height(hc);
        $('#brochure .ui-content').css("visibility", "visible");
    });

    getFilesVideos("Volvo Assets/" + tipoMaquinaria + "/Videos");
    getFilesThumbs("Volvo Assets/" + tipoMaquinaria + "/Videos/Thumbnails");

    $("#formulario").submit(function (e) {
        e.preventDefault();

        if (validarDatosForm()) {
            updateDB_callback("INSERT INTO suscriptores(`nombre`, `email`, `empresa`, `tipo`) VALUES (" + cleanField($('#nombre').val()) + ", " + cleanField($('#email').val()) + ", " + cleanField($('#empresa').val()) + ", " + tipoMaquinaria + ")",
                    function () {
                        queueSync('brochure', JSON.stringify({nombre: $('#nombre').val(), email: $('#email').val(), empresa: $('#empresa').val(), tipo: tipoMaquinaria}));
                        $('#nombre, #email, #empresa').val('');
                        openPopup("Gracias por suscribirse!");
                    });
        }

        return false;
    });

    $(".header-content .logo").click(function () {
        serverSync();
    });
}

function cargarSlider() {
    for (var i = 0; i < imagenes.length; i++) {
        $(".swiper-wrapper").append('<div class="swiper-slide"><img src="' + decodeURI(imagenes[i].nativeURL) + '" alt=""></div>');
    }

    $(".visor-pdf img").attr("src", decodeURI(datos_tec.nativeURL));

    $.mobile.changePage("#maquina");
}

function mostrar_galeria() {
    $("#maquina .ui-content").removeClass("datos-tecnicos").addClass("galeria");
}

function mostrar_datos_tecnicos() {
    $("#maquina .ui-content").removeClass("galeria").addClass("datos-tecnicos");
}

function generar_galeria_videos() {
    videoPlayer.src = decodeURI(videos[0].nativeURL);
    videoPlayer.poster = obtener_thumbs(videos[0].name, thumbs);

    for (var i = 0; i < videos.length; i++) {
        $("#videos .lista-videos").append('<li><a href="' + decodeURI(videos[i].nativeURL) + '"><img src="' + obtener_thumbs(videos[i].name, thumbs) + '" alt=""><span class="play-ss"></span></a></li>');
    }

    $('#videos .ui-content').css("visibility", "visible");

    $(".lista-videos a").click(function (e) {
        e.preventDefault();
        videoPlayer.src = $(this).attr("href");
        videoPlayer.poster = $(this).find("img").attr("src");
        videoPlayer.currentTime = 0;
        videoPlayer.load();
        videoPlayer.play();
        return false;
    });
}

function obtener_thumbs(nombreVideo, thumbs) {
    var nombSinExtension = nombreVideo.substring(nombreVideo.lastIndexOf("."), 0);

    for (var i = 0; i < thumbs.length; i++) {
        var nombreThumb = thumbs[i].name;
        if (nombreThumb.indexOf(nombSinExtension) > -1) {
            return decodeURI(thumbs[i].nativeURL);
        }
    }
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
                inDirectory = new Array();
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
                inDirectory = new Array();
                for (var i = 0; i < entries.length; i++) {
                    var entry = entries[i];
                    if (entry.isFile) {
                        if (entry.name != "Thumbs.db" && entry.name != ".DS_Store") {
                            inDirectory.push(entry);
                        }
                    }
                }
            }, fail);
        }, fail);
    }, fail);
}

function getFilesVideos(dir) {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
        fs.root.getDirectory(dir, {}, function (dirEntry) {
            var dirReader = dirEntry.createReader();
            dirReader.readEntries(function (entries) {
                videos = new Array();
                for (var i = 0; i < entries.length; i++) {
                    var entry = entries[i];
                    if (entry.isFile) {
                        if (entry.name != "Thumbs.db" && entry.name != ".DS_Store") {
                            videos.push(entry);
                        }
                    }
                }
            }, fail);
        }, fail);
    }, fail);
}

function getFilesThumbs(dir) {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
        fs.root.getDirectory(dir, {}, function (dirEntry) {
            var dirReader = dirEntry.createReader();
            dirReader.readEntries(function (entries) {
                thumbs = new Array();
                for (var i = 0; i < entries.length; i++) {
                    var entry = entries[i];
                    if (entry.isFile) {
                        if (entry.name != "Thumbs.db" && entry.name != ".DS_Store") {
                            thumbs.push(entry);
                        }
                    }
                }
            }, fail);
        }, fail);
    }, fail);
}

function getImagenes(dir) {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
        fs.root.getDirectory(dir, {}, function (dirEntry) {
            var dirReader = dirEntry.createReader();
            dirReader.readEntries(function (entries) {
                imagenes = new Array();
                for (var i = 0; i < entries.length; i++) {
                    var entry = entries[i];
                    if (entry.isFile) {
                        if (entry.name != "Thumbs.db" && entry.name != ".DS_Store") {
                            imagenes.push(entry);
                        }
                    }
                }
            }, fail);
        }, fail);
    }, fail);
}
function getDatosTec(dir) {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
        fs.root.getDirectory(dir, {}, function (dirEntry) {
            var dirReader = dirEntry.createReader();
            dirReader.readEntries(function (entries) {
                imagenes = new Array();
                for (var i = 0; i < entries.length; i++) {
                    var entry = entries[i];
                    if (entry.isFile) {
                        if (entry.name != "Thumbs.db" && entry.name != ".DS_Store") {
                            datos_tec = entry;
                        }
                    }
                }
            }, fail);
        }, fail);
    }, fail);
}

function fail(e) {
    console.log(e);
}

//si un objeto está vacío
function is_empty(obj) {

    // null and undefined are empty
    if (obj == null)
        return true;
    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length && obj.length > 0)
        return false;
    if (obj.length === 0)
        return true;

    for (var key in obj) {
        if (hasOwnProperty.call(obj, key))
            return false;
    }

    return true;
}
function checkConnect() {//return false;
    if (onweb) {
        return true;
    }
    try {
        if (navigator.connection.type != Connection.NONE) {
            return true;
        } else {
            showErroresConexion();
            return false;
        }
    } catch (e) {
        mylog(e);
    }
}
Number.isInteger = Number.isInteger || function (value) {
    return typeof value === "number" &&
            isFinite(value) &&
            Math.floor(value) === value;
};

function cleanField(field) {
    var trimeado = $.trim(field);
    //if(field*1==trimeado){

    if (Number.isInteger(field)) {
        return "'" + (field) + "'";
    } else {
        if (trimeado == '' || trimeado == null || trimeado == 'null' || trimeado == undefined || trimeado == 'undefined') {
            return "null";
        } else {
            return "'" + field + "'";
        }
    }
}
function validateEmail($email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test($email);
}

function openPopup(msg) {
    alert(msg);
}
function mylog(cosa) {
    console.log(cosa);
}
function showLoading() {
    return true;
}
function hideLoading() {
    return true;
}

function validarDatosForm() {
    if ($.trim($('#nombre').val()) == '') {
        openPopup('Ingrese un nombre.');
        return false;
    } else if (!validateEmail($('#email').val()) || $.trim($('#email').val()) == '') {
        openPopup('Ingrese un e-mail válido.');
        return false;
    } else if ($.trim($('#empresa').val()) == '') {
        openPopup('Ingrese una empresa.');
        return false;
    } else {
        return true;
    }
}

function viewfullscreen() {
    
    if (fullscreen == 0) {
        $("#maquina .ui-content.datos-tecnicos").addClass("fullscreen");
        fullscreen = 1;
    } else {
        $("#maquina .ui-content.datos-tecnicos").removeClass("fullscreen");
        fullscreen = 0;
    }
    mylog("fullscreen =" + fullscreen);
}