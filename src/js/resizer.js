(function ( $ ) {         
$.fn.resize = function( options ) {
    var settings = $.extend({
        imgs: [],
        row_height: 300,
        margin: 10
    }, options);

    var container = $(this);

    //create a div for each image
    for(var i=0;i<settings.imgs.length;i++){
        $(this).append("<div class='imgwrapper'></div>");
    }

    //setup the css for the imgwrappers
    $("head").append("<style type='text/css'>.imgwrapper{ float: left; margin-left: "+settings.margin+"px; margin-top: "+settings.margin+"px; height: 261px; background-repeat: no-repeat; background-position: center; background-size: cover;}</style>")

    //define some global vars
    var imgs_aspect = [];
    var imgs_rows = [0];
    var tot = 0;
    var loaded = 0;

    function setup(){
        var imgs = settings.imgs;
        var row_width = 0;
        $(".imgwrapper").each(function(index){
            var imgwrapper = $(this);
            var img = new Image();
            img.src = imgs[index];
            img.onload = function(){
                //determine the aspect ratio of the image
                var img_aspect = img.height/img.width;
                imgs_aspect.push(img_aspect);
                //work out a rough width for the image
                var w = settings.row_height*img_aspect;
                row_width += w;
                //check if there is still space on this row for another image
                if(row_width >= container.width()){
                    imgs_rows.push(1);
                    row_width = 0;
                }
                else{
                    imgs_rows[imgs_rows.length-1]++;
                }
                //set some of the css vars
                imgwrapper.css("width",w+"px"); 
                imgwrapper.css("height",settings.row_height+"px"); 
                imgwrapper.css("background-image","url("+imgs[index]+")");
                loaded++;
                checkIfLoaded();
            }
        });
    }

    function checkIfLoaded(){
        //make sure all images are loaded
        if(loaded == $(".imgwrapper").length){
            setHeight();
        }
    }

    function setHeight(){
      for(var r=0;r<imgs_rows.length;r++){
        if(r==0){
          var y = 0;
        }
        else{
          var y = 0;
          for(var j=0;j<r;j++){
            y += imgs_rows[j]
          }
        }
        if(imgs_rows[r] == 0){

        }
        else{
          tot = 0;
          for(var i=y;i<(y+imgs_rows[r]);i++){
            tot += imgs_aspect[i];
          }
          //work out optimum height of image to fit perfectly on the row
          var h = ((container.width()-(settings.margin*(imgs_rows[r]+1)))/tot);
          $(".imgwrapper").each(function(index){
            if(index >= y && index < (y+imgs_rows[r])){
                //work out width using height
                var w = h*imgs_aspect[index];
                $(this).css("width",w+"px");
            }
          });
        }
      }
    }
    setup();
};

}( jQuery ));