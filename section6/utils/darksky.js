const request = require('request');

const darksky = (latitude,longitude,callback)=>{
    const darkskyURL = 'https://api.darksky.net/forecast/5bafd0bc401b11ae9415e94269237556/'
                        +latitude+','+longitude+'?units=si';
    request(darkskyURL,{json : true},(error,res,resBody)=>{
        if(error){
            callback('Unable to connect to network',null);
        }
        else if(resBody.error){
            callback('Unable to find location',null);
        }
        else{
            callback(error,{
                temperature : resBody.currently.temperature
            })
        }
    });
}

module.exports = darksky;