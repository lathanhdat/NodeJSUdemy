const request = require('request');

const geocode = (address,callback) =>{
    const geoURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +
    '.json?access_token=pk.eyJ1IjoibHRkYXQ5NSIsImEiOiJjanRlZzN5N3gxaGwyM3lwOXh6Zzd0aDhxIn0.cvAtUF_bn0duAIDqyqursQ&limit=1';

    request(geoURL,{json : true},(error,res,resBody)=>{
        if(error){
            callback('Unable to connect to internet',null);
        }
        else if (Object.keys(resBody.features).length === 0){
            callback('Unable to find location',null);
        }
        else{
            callback(null,{
                longitude : resBody.features[0].center[0],
                latitute : resBody.features[0].center[1],
                location : resBody.features[0].place_name
            });
        }
    });
}

module.exports = geocode;