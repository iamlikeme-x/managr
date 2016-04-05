function loadPhotoInfo(data) {
    console.log(data);
    $('.imgInfo #title').html(data.photo.title._content);
    $('.imgInfo #desc').html(data.photo.description._content.replace(/\n/g, "<br>"));
    $('.imgInfo #user').html(data.photo.owner.username);
    $('.imgInfo').fadeIn();
}