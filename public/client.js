
            if('geolocation' in navigator) {  
    console.log('geolocation available ');
    navigator.geolocation.getCurrentPosition( async position => {
    try {

    const lat = position.coords.latitude.toFixed(2);
        document.getElementById('lat').textContent = lat;
    const long = position.coords.longitude.toFixed(2);
        document.getElementById('long').textContent = long;

      const api_url = `weather/${lat},${long}`;
      const response = await fetch(api_url);
      const json = await response.json();
      const name = json.weather.name;
      const weather = json.weather.weather[0].main;
      const temp = json.weather.main.temp.toFixed(0);
      const air_quality = json.air_quality.list[0].components;
      document.getElementById('main').textContent = weather;
      document.getElementById('temperature').textContent = temp;
      document.getElementById('pm25').textContent = air_quality.pm2_5;
      document.getElementById('ozone').textContent = air_quality.o3;
      document.getElementById('nitrogen').textContent = air_quality.no2;


      
      const data = {lat,long, weather,air_quality,temp,name};
      const options = {
          method:'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
      }

          const db_response = await fetch('/api',options);
          const db_json = await db_response.json();
          console.log(db_json);
       
    } catch(error){

    console.log(error);
    }

    
      
          
        })
      } else {
          console.log('geolocation not available');
   }