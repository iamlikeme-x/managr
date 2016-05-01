function descript(sHtml) {
    sHtml = '<div>' + sHtml + '</div>';
    var noScript = sHtml.replace(/script/g, "THISISNOTASCRIPTREALLY");
    var html = $(noScript);
    html.find('THISISNOTASCRIPTREALLY').remove();
    return html.html();
}