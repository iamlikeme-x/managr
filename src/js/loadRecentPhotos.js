// Version 2.0

//Function to be called
function loadRecentPhotos(pageNum){
    
    if(sessionStorage.getItem('cachedContent')){
        $('#content').html(sessionStorage.getItem('cachedContent'));
        
        $("#popular").justifiedGallery({
            'rowHeight': 200,
            'lastRow': 'justify',
            'margins': 6
        });
        
        return;
    }
    
    var method = 'flickr.interestingness.getList';
    var apiKey = 'f558724ba49174dc32d3828d1a7302cd';
    var format = 'json';
    
    window.timestamp = new Date().getTime();
    
    $.ajax({
        method: 'GET',
        url: 'https://api.flickr.com/services/rest/',
        data: {
            method: method,
            api_key: apiKey,
            format: format,
            page: pageNum,
            per_page: 50
        },
        dataType: 'jsonp',
        async: false
    });
}

//JSONP callback - automatically called when the ajax call in loadRecentPhotos() completes
/*
* @param {Object} data all photos returned from Flickr
*/
function jsonFlickrApi(data){
    var splitList = [];
    var imgUrls = {};
    
    for(i = 0; i < data.photos.photo.length; i++){
        var photo  = data.photos.photo[i];
        var farm   = photo.farm;
        var id     = photo.id;
        var owner  = photo.owner;
        var secret = photo.secret;
        var server = photo.server;
        var title  = photo.title;

        var url = 'https://farm'+farm+'.staticflickr.com/'+server+'/'+id+'_'+secret+'.jpg';
        
        imgUrls[title] = url;
        /*if((i+1)%3==0) {
            splitList.push(imgUrls);
            imgUrls = {};
        }*/
    }
    
    var executionTime = (new Date().getTime() - window.timestamp)/1000;
    console.log('loadRecentPhotos() execution time: '+executionTime);
    
    loadImgs(imgUrls);
}