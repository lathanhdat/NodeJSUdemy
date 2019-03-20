const darksky = require('./utils/darksky');
const geocode = require('./utils/geocode');
const yourLocation = process.argv[2];

if(!yourLocation)
{
    console.log('Please provide location.')
}
else{
    geocode(yourLocation,(error,{latitute, longitude, location})=>{
        if(error) return console.log(error);
    
        darksky(latitute,longitude,(error,{temperature})=>{
            if(error) return console.log(error);
            console.log(`It's now ${temperature} celcius degree in ${location}`);
        });
    });
}