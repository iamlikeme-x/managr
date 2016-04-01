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
    var data = JSON.parse('{"' + decodeURI(data).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '","loggedIn":true}');
    saveData(data);
}