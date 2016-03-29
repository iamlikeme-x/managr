function getConfig(){
    if(localStorage.getItem('config')){
        return JSON.parse(localStorage.getItem('config'));
    }else{
        localStorage.setItem('config', '{"loggedIn": false}');
        return localStorage.getItem('config');
    }
}

//Save given data as localStorage item as config
function saveData(data){
    if(localStorage.getItem('config')) { // Does config already exist?
        var config = getConfig(); // Get the config
        if (typeof data == "string"){ // If data is a string (else should be an object)
            data = JSON.parse(data); //turn data into an object
        }
        data = JSON.stringify($.extend(config, data)); // Overwrite/Merge config with data
    }else if (typeof data == "object"){
        data = data.stringify(data);
    }
    localStorage.setItem('config', data); //Save config in localStorage
    
}