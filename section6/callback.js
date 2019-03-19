// const geocode = (address,callback)=>{
//     setTimeout(() => {
//         callback;
//     }, 2000);
// }

// geocode('Philadelphia',(latitude,longtitude) => {
    
// });
console.log('Hello');

const add = (a,b,callback) =>{
    setTimeout(()=>{callback(a+b);},2000);
}

add(1,4,(sum)=>{
    console.log(sum);
})