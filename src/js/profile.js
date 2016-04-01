function getUsername() {
    cfg = getConfig();
    if(cfg.loggedIn){
        return cfg.username;
    } else {
        return "no user!";
    }
}

function getName() {
    cfg = getConfig();
    if(cfg.loggedIn){
        return cfg.fullname;
    } else {
        return "no user!";
    }
}   

// function getGalleryList() // future function