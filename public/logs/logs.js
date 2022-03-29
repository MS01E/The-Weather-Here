 const button = document.getElementById('btn');     
 const map_box = document.getElementById('map');
 const main_section = document.getElementById('main_section');
 
 
   button.addEventListener('click', async () =>{

      location.reload();
      
      const response = await fetch('/cleandb');
   })
  
 
 getData();


      async function getData(){

//getting data from server      
    const response = await fetch('/api');
    const data = await response.json();
    console.log(data);
    
if (data.length == 0) {
   map_box.style.color = 'white';
   map_box.innerHTML  = 'No history detected!';
   map_box.style.fontSize = '25px';
   
} else {

//access token comes from database
    mapboxgl.accessToken = data[0].map_token;
               var map = new mapboxgl.Map({
               attributionControl:true,
               container: 'map',
               style:'mapbox://style/mapbox/streets-v11',
               zoom:1.5,
               center:[68.77,38.55],
               
         });
        
         map.scrollZoom.setWheelZoomRate(1/600);
         map.addControl(new mapboxgl.NavigationControl(),'top-left');
         map.addControl(new mapboxgl.FullscreenControl());

         //creating markers for all received data  
      for (item of data){
      const popup = new mapboxgl.Popup({ offset: 25, closeButton:false,}).setText(
         ` ${item.city}, ${item.description}, температура ${item.temp}°C, влажность ${item.humidity} %. 
           Последний поиск:${item.timestamp}`
        );


         const marker = new mapboxgl.Marker({color:"red",})
         .setLngLat([item.long,item.lat])
         .setPopup(popup)
         .addTo(map);
       }
     }
   }
   //Adding current year to copyright
   const year_span = document.getElementById('year');
   const date = new Date();
   year_span.textContent = date.getFullYear();
       
       
