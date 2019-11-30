const r2 = require("r2");
const request = require("request");
const querystring = require("querystring");
const API_KEY = process.env.ANIMAL_API_TOKEN;

async function loadCatDogImage(apiURL){
    let headers = {
        'X-API-KEY': API_KEY,
    }
    var queryParams = {
        'has_breeds':true, // we only want images with at least one breed data object - name, temperament etc
        'mime_types':'jpg,png', // we only want static images as Discord doesn't like gifs
        'size':'small',   // get the small images as the size is prefect for Discord's 390x256 limit
        'limit': 1       // only need one
    }
    // convert this obejc to query string 
    let queryString = querystring.stringify(queryParams);

    try {
        // construct the API Get request url
        let reqUrl = apiURL + `v1/images/search?${queryString}`;
        // make the request passing the url, and headers object which contains the API_KEY
        return await r2.get(reqUrl , {headers} ).json
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    loadCatDogImage
};

