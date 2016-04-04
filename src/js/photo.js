function loadPhotoInfo(data) {
    console.log(data);
    $('.imgInfo #title').html(data.photo.title._content);
    $('.imgInfo #desc').html(data.photo.description._content.replace(/\n/g, "<br>"));
    $('.imgInfo #user').html(data.photo.owner.username);
    $('.imgInfo').fadeIn();
}

//"Function to be called" - Decided to keep Jake's description of this function in here...

function loadRecentPhotos(pageNum) {
    if (sessionStorage.getItem('cachedContent')) {
        $('#content').html(sessionStorage.getItem('cachedContent'));
        $('#loadercntnr').hide();
        $("#popular").justifiedGallery({
            'rowHeight': 200,
            'lastRow': 'justify',
            'margins': 6
        });

        return;
    }

    $('#loadercntnr').fadeIn(200);

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
            per_page: 50,
            jsoncallback: 'formatPhotos'
        },
        dataType: 'jsonp',
        async: false
    });
}

/*
 * JSONP callback - automatically called when the ajax call in loadRecentPhotos() completes
 * @param object data all photos returned from Flickr
 */
function formatPhotos(data) {
    var splitList = [];
    var imgUrls = {};

    for (i = 0; i < data.photos.photo.length; i++) {
        var photo = data.photos.photo[i];
        var farm = photo.farm;
        var id = photo.id;
        var owner = photo.owner;
        var secret = photo.secret;
        var server = photo.server;
        var title = photo.title;

        var url = 'https://farm' + farm + '.staticflickr.com/' + server + '/' + id + '_' + secret + '.jpg';

        imgUrls[title] = [url, id, secret];
    }

    var executionTime = (new Date().getTime() - window.timestamp) / 1000;
    console.log('loadRecentPhotos() execution time: ' + executionTime);

    loadImgs(imgUrls);
}

function loadImgs(arr) {
    $('#popular').fadeOut(200);
    var arrLength = Object.size(arr);
    counter = 1;
    $.each(arr, function (key, val) {
        $('#popular').append($('<a id="img-container' + counter + '" href="#" data-id="'+val[1]+'" data-secret="'+val[2]+'" data-title="' + key.replace(/"/g, '&quot;') + '"><img src="' + val[0] + '" id="img' + counter + '" class="colorTaggedImage"></a>'));
        if(counter == 50){
            $("#popular").justifiedGallery({
                'rowHeight': 200,
                'lastRow': 'justify',
                'margins': 6
            });
            if(!$('#loadercntnr').is(':hidden')){
                $('#loadercntnr').fadeOut(200);
            }
            $('#popular').fadeIn(200);
            
        }
        counter++;
    });

    sessionStorage.setItem('cachedContent', $('#content').html());
}
