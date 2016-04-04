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
        if(window.popup){
            if(!window.popup.isclosed){
                window.popup.close();
            }
        }
        pressed.preventDefault();
        win.reloadDev();
        return false;
    } else if (pressed.keyCode === 116) {
        if(window.popup){
            if(!window.popup.isclosed){
                window.popup.close();
            }
        }
        pressed.preventDefault();
        win.reload();
        return false;
    }
}
///////////////////////////////////////
//END Node Webkit Stuff              //
///////////////////////////////////////

function checkAtts(a, obj) {
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

function classify(content) {
    console.log(content);
    content.find('img').each(function () {
        
        var colorThief = new ColorThief();
        palette = colorThief.getPalette(this, 4);
        var colors = [];
        for(i = 0; i < palette.length; i++){
            var colorName = window.classifier.classify(palette[i][0], palette[i][1], palette[i][2]);
            if (colors.indexOf(colorName) == -1) {
                colors.push(colorName);
            }
            $(this).attr('data-colors', colors.join(','));
        }
    });
    sessionStorage.setItem('cachedContent', content[0].outerHTML);
    sessionStorage.setItem('classified', 'true');
    return content;
}


function getHex(r, g, b) {
    return '#' + this.byte2Hex(r) + this.byte2Hex(g) + this.byte2Hex(b);
}

function byte2Hex(n) {
    var nybHexString = '012345789abcdef';
    return String(nybHexString.substr((n >> 4) & 0x0f, 1)) + nybHexString.substr(n & 0x0f, 1);
}

function filter(colors){
    var cachedContent = $(sessionStorage.getItem('cachedContent'));
    var classified = sessionStorage.getItem('classified') == 'true';
    if(cachedContent){
        if(!classified){
            cachedContent = classify(cachedContent);
        }
        $(cachedContent).find('img').each(function(){
            var colorList = $(this).data('colors');                        
            if(colorList){
                colorList = colorList.split(',');
                if(!checkAtts(colors, colorList)){
                    $(this).parent().remove();
                }
            }else{
                console.warn('No colors found for #'+$(this).attr('id'));
            }
        });
        $('#content').html(cachedContent);

        $('#popular').justifiedGallery({
            'rowHeight': 200,
            'lastRow': 'justify',
            'margins': 6
        });
    }else{
        loadRecentPhotos();
        filter(colors);
    }
}