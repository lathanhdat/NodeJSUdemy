const weatherForm = document.querySelector('form');
const searchBox = document.querySelector('input');
const errorMessage = document.querySelector('#mes1');
const dataMessage = document.querySelector('#mes2');


// errorMessage.textContent = 'From javascript';
console.log(errorMessage);

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = searchBox.value
    const fetchChanel = 'http://localhost:3000/weather?address='

    fetch(fetchChanel + location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            errorMessage.textContent = `Error: ${data.error}`;
            dataMessage.textContent = ``;
        }
        else
        {
            errorMessage.textContent = `Locations: ${data.location}`;
            dataMessage.textContent = `Temperature: ${data.temperature}`;
        }
    })
})
})


