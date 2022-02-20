getData();
async function getData(){

   mapboxgl.accessToken = 'pk.eyJ1IjoiaW11c2VyIiwiYSI6ImNremp0eG94MzF5YXMydW55ZGQ2bXY1OXoifQ.6jsZXJvpXn6vmsuDeLThOQ';
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11',
zoom:1.5,
center:[68.75,38.57],
});



    const response = await fetch('/api');
    const data = await response.json();
    console.log(data);


 for (item of data){
  const p = document.createElement('p');
 p.innerHTML =`Weather here in ${item.name} is ${item.weather} with temperature of ${item.temp} &deg; C`  
  
   const marker = new mapboxgl.Marker({color:"black",})
   .setLngLat([item.long,item.lat])
   .setPopup(new mapboxgl.Popup({closeButton:false, color: "cornflowerblue",}).setDOMContent(p))
   .addTo(map);



   // marker.on('click',() =>{
   //    console.log("PopoUp clicked");
   // })

    
   

//    const divContainer = document.createElement('div');
//        divContainer.classList.add('mainDiv');
//   //  const mood = document.createElement('p');
//    const geo = document.createElement('p');
//    const time = document.createElement('p');

// const getDate = new Date (item.timestamp).toLocaleString();
// const weather = document.createElement('p').textContent = item.weather;
//  geo.textContent = `${item.lat} , ${item.long}`
// //  mood.textContent = `mood: ${item.mood}`
//  time.textContent = getDate;

//  divContainer.append(geo,time,weather);
//  document.body.append(divContainer);

 }
}