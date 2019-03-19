const darksky = require('./utils/darksky');
const geocode = require('./utils/geocode');
const yourLocation = process.argv[2];

if(!yourLocation)
{
    console.log('Please provide location.')
}
else{
    geocode(yourLocation,(error,geodata)=>{
        if(error) return console.log(error);
    
        darksky(geodata.latitute,geodata.longitude,(error,weather)=>{
            if(error) return console.log(error);
            console.log(`It's now ${weather.temperature} celcius degree in ${geodata.location}`);
        });
    });
}