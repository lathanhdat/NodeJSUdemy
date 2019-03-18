const fs = require('fs');
const request = require('request');

const darkskyURL = 'https://api.darksky.net/forecast/5bafd0bc401b11ae9415e94269237556/10.7758,106.7018?units=si'
const geoURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Ho%20Chi%20Minh.json?access_token=pk.eyJ1IjoibHRkYXQ5NSIsImEiOiJjanRlZzN5N3gxaGwyM3lwOXh6Zzd0aDhxIn0.cvAtUF_bn0duAIDqyqursQ&limit=1'


request(geoURL,{json : true},(error,res,resBody)=>{
    if(!error)
    {
        console.log(`Longitude ${resBody.features[0].center[0]} Laitude ${resBody.features[0].center[1]}.`);
    }
    else
    {
        console.log(error);
    }
});



request(darkskyURL,{json : true},(error,res,resBody)=>{
    if(!error)
    {
        console.log(`It's now ${resBody.currently.temperature} celcius in ${resBody.timezone}.`);
    }
    else
    {
        console.log(error);
    }
});

