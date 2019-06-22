const request = require('request');

const darksky = (latitude,longitude,callback)=>{
    const darkskyURL = 'https://api.darksky.net/forecast/5bafd0bc401b11ae9415e94269237556/'
                        +latitude+','+longitude+'?units=si';
    request(darkskyURL,{json : true},(error,res,{error:resBodyerror,currently} = {})=>{
        if(error){
            callback('Unable to connect to network',undefined);
        }
        else if(resBodyerror){
            callback('Unable to find location',undefined);
        }
        else{
            callback(undefined,{
                temperature : currently.temperature,
                summary : currently.summary
            })
        }
    });
}

module.exports = darksky;