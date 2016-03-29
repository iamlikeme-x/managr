// Version 2.0
Object.size = function (obj) {
    var size = 1,
        key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};
sessionStorage.setItem('filterColors', '[]');

///////////////////////////////////////
//START Node Webkit Stuff            //
///////////////////////////////////////
//get node webkit GUI - WIN
var gui = require('nw.gui');
// get the window object
var win = gui.Window.get();

//Keyboard shortcuts
document.onkeydown = function (pressed) {
        if (pressed.ctrlKey === true && pressed.keyCode === 116) {
            pressed.preventDefault();
            win.reloadDev();
            return false;
        } else if (pressed.keyCode === 116) {
            pressed.preventDefault();
            win.reload();
            return false;
        }
    }
    ///////////////////////////////////////
    //END Node Webkit Stuff              //
    ///////////////////////////////////////

function loadImgs(arr) {
    window.classifier = new ColorClassifier();
    get_dataset('js/dataset.js', function (data) {
        window.classifier.learn(data);
    });
    var arrLength = Object.size(arr);
    var counter = 1;
<<<<<<< HEAD
    $.each(arr, function(key, value){
        var img = $('<img src="'+value+'" id="img'+counter+'" class="colorTaggedImage">');
        var a = $('<a id="img-container'+counter+'" href="#" data-title="'+key+'"></a>');
=======
    $.each(arr, function (key, value) {
        var img = $('<img src="' + value + '" id="img' + counter + '">');
        var a = $('<a id="img-container' + counter + '" href="#" data-title="' + key + '"></a>');
>>>>>>> refs/remotes/origin/master
        a.append(img);
        $('#popular').append(a);
        img.on('load', function () {
            var colorThief = new ColorThief();
            palette = colorThief.getPalette(img[0], 4);
            var color = [];

            $.each(palette, function (i) {
                var colorName = window.classifier.classify(palette[i][0], palette[i][1], palette[i][2]);
                if (color.indexOf(colorName) == -1) {
                    color.push(colorName);
                }
            });
            $(this).attr('data-colors', color.join());
            var filterColors = JSON.parse(sessionStorage.getItem('filterColors'));
            if (filterColors.length == 0 || checkAtts(filterColors, img.data('colors').split(','))) {
                $('#popular').append(a);
            }
            if (counter + 1 >= arrLength) {
                $("#popular").justifiedGallery({
                    'rowHeight': 200,
                    'lastRow': 'justify',
                    'margins': 6
                })
            }
            
            if(!sessionStorage.getItem('loaded')){
                sessionStorage.setItem('loaded', true);
                sessionStorage.setItem('originalContent', $('#content').html());
            }
        });

        counter++;
    });
}
<<<<<<< HEAD

//Load more images on scroll, not working atm
/*$(window).scroll(function() {
    if($(window).scrollTop() + $(window).height() == $(document).height()) {
        if (!window.pN){
            window.pN = 1;
        }
        window.pN += 1;
        loadRecentPhotos(window.pN)
        $('#popular').justifiedGallery('norewind');
    }
});*/


function checkAtts(a, obj){
=======
//$(window).scroll(function() {
//    if($(window).scrollTop() + $(window).height() == $(document).height()) {
//        if (!window.pN){
//            window.pN = 1;
//        }
//        window.pN += 1;
//        loadRecentPhotos(window.pN)
//        $('#popular').justifiedGallery('norewind');
//    }
//});

function createOauth(opts) {
    if (!opts) {
        var opts = {
            service: "request_token",
            token: false,
            method: "GET"
        }
    }
    if(!opts.config){
        config = getConfig();
    } else {
        config = opts.config;
        console.log("cfg ",config);
    }
    var oauth = new OAuth({
        consumer: {
            public: 'f558724ba49174dc32d3828d1a7302cd',
            secret: 'a1e01a255a63aabc'
        },
        signature_method: 'HMAC-SHA1'
    });

    if (!opts.service) {
        opts.service = "request_token";
    }
    var request_data = {
        url: 'https://www.flickr.com/services/oauth/' + opts.service,
        method: opts.method,
    };

    if (opts.extra && opts.extra.length >= 1) {
        var d = {}
        for (i in opts.extra) {
            d[opts.extra[i]] = config[opts.extra[i]];
        }
        console.log("d ",d);
        request_data["data"] = d;
    }

    if (opts.token) {
        var token = {
            public: config.oauth_token,
            secret: config.oauth_token_secret
        };
        var data = oauth.authorize(request_data, token);
    } else {
        var data = oauth.authorize(request_data);
    }
    console.log(data);
    return $.ajax({
        url: request_data.url,
        type: request_data.method,
        data: data,
        async: false,
        error: function(error) {
            console.log(error);
        }
    }).responseText;
}


function finishAuthentication(cfg) {
    config = getConfig();
    config["oauth_verifier"] = cfg.oauth_verifier;
    var opts = {
        token: true,
        method: "GET",
        service: "access_token",
        config: config,
        extra: ["oauth_verifier"]
    }
    var data = createOauth(opts);
    var data = JSON.parse('{"' + decodeURI(data).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
    saveData(data);
}

function checkAtts(a, obj) {
>>>>>>> refs/remotes/origin/master
    // a: attributes to check.
    // obj: object to check against.
    if (!obj) {
        return false;
    }
    for (i = 0; i < a.length; i++) {
        if (obj.indexOf(a[i]) != -1) {
            return true;
        }
    }
    return false;
}

function getHex(r, g, b) {
    return '#' + this.byte2Hex(r) + this.byte2Hex(g) + this.byte2Hex(b);
}

function byte2Hex(n) {
    var nybHexString = '012345789abcdef';
    return String(nybHexString.substr((n >> 4) & 0x0f, 1)) + nybHexString.substr(n & 0x0f, 1);
}
