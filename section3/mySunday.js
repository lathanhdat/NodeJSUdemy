const hangOutWithCrush = () =>{console.log('hangOutWithCush')}
const sleepAtHome = () =>{console.log('sleepAtHome')}

let crush = {
    name : "Alo",
    age : 23,
    Agree : false
}



const inviteCrushHangOut = (crush) => {
    return new Promise((resolve,reject)=>{
        if(crush.Agree) return resolve(console.log('Cush :May gio anh qua'))
        reject('Crush : Hom nay em ban')
})}

const mySunday = async(crush) =>{
    try {
        await inviteCrushHangOut(crush)
        hangOutWithCrush()
    } catch (error) {
        console.log(error)
        sleepAtHome()
    }
}




mySunday(crush)