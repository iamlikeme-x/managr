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

function loadImgs(arr){
    window.classifier = new ColorClassifier();
    get_dataset('js/dataset.js', function(data){
        window.classifier.learn(data);
    });
    var arrLength = Object.size(arr);
    counter = 1;
    $.each(arr, function(key, value){
        var img = $('<img src="'+value+'" id="img'+counter+'" class="colorTaggedImage">');
        var a = $('<a id="img-container'+counter+'" href="#" title="'+key.replace(/"/g, '&quot;')+'"></a>');
        a.append(img);
        $('#popular').append(a);
        img.on('load', function(){
//            console.log(img);
//            var colorThief = new ColorThief();
//            palette = colorThief.getPalette(img[0], 4);
//            var color = [];
//
//            //Iterate through each color in palette
//            $.each(palette, function(i){
//                var colorName = window.classifier.classify(palette[i][0], palette[i][1], palette[i][2]); //Convert color in palette from RGB to english color name
//                if(color.indexOf(colorName) == -1){
//                    color.push(colorName);
//                }
//            });
//            
//            //Append determined colors to element as data-colors attribute
//            $(this).attr('data-colors', color.join());
            
            $("#popular").justifiedGallery({
                'rowHeight': 200,
                'lastRow': 'justify',
                'margins': 6
            });
        });
        counter++;
    });
    
    sessionStorage.setItem('cachedContent', $('#popular').html());
}

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

function getHex(r, g, b) {
    return '#' + this.byte2Hex(r) + this.byte2Hex(g) + this.byte2Hex(b);
}

function byte2Hex(n) {
    var nybHexString = '012345789abcdef';
    return String(nybHexString.substr((n >> 4) & 0x0f, 1)) + nybHexString.substr(n & 0x0f, 1);
}
