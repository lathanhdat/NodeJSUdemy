const request = require('request');

const geocode = (address,callback) =>{
    const geoURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +
    '.json?access_token=pk.eyJ1IjoibHRkYXQ5NSIsImEiOiJjanRlZzN5N3gxaGwyM3lwOXh6Zzd0aDhxIn0.cvAtUF_bn0duAIDqyqursQ&limit=1';

    request(geoURL,{json : true},(error,res,{features} = {})=>{
        if(error){
            callback('Unable to connect to internet',undefined);
        }
        else if (Object.keys(features).length === 0){
            callback('Unable to find location',undefined);
        }
        else{
            callback(undefined,{
                longitude : features[0].center[0],
                latitute : features[0].center[1],
                location : features[0].place_name
            });
        }
    });
}

module.exports = geocode;