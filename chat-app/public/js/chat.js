var socket = io()

//Get element
const chatForm = document.querySelector('.message-from')
const chatText = chatForm.querySelector('input')
const sendButton = chatForm.querySelector('button')
const geoButton = document.querySelector('#send-location')
const $chatMessage = document.querySelector('#messages')
const $messageTemplate = document.querySelector('#message-template').innerHTML
const $locationTemplate = document.querySelector('#location-template').innerHTML

//Receive message form server
socket.on('seversend',(message)=>{
  const html = Mustache.render($messageTemplate,{
    chatMessage : message.text,
    createdAt : moment(message.createdAt).format('h:mm A')
  })
  $chatMessage.insertAdjacentHTML('beforeend',html)
})

socket.on('locationMessage',(message)=>{
  const html = Mustache.render($locationTemplate,{
    link : message.url,
    createdAt : moment(message.createdAt).format('h:mm A')
  })
  $chatMessage.insertAdjacentHTML('beforeend',html)
})

chatForm.addEventListener('submit',(e)=>{
  e.preventDefault()
  chatForm.setAttribute('disabled','disabled')

  const message = e.target.elements.chattext.value
  socket.emit('clientsend',message,(error)=>{
    chatForm.removeAttribute('disabled')
    chatText.value = ''
    chatText.focus()
    if(error){
      return console.log(error)
    }
  });
})

geoButton.addEventListener('click',()=>{
  if(!navigator.geolocation){
    return alert('Geolocation is not supported.')
  }

  geoButton.setAttribute('disabled','disabled')
  navigator.geolocation.getCurrentPosition(({coords})=>{
    const locationInfor = {
      latitude : coords.latitude,
      longitude : coords.longitude
    }
    socket.emit('sendLocation',locationInfor,(error)=>{
      geoButton.removeAttribute('disabled')
      if(error){
        console.log(error)
      }
      console.log('Location shared!')
    })
  })
})