   const button = document.getElementById('btn');
    const input = document.getElementById('input');
    const image_label = document.getElementById('img_label');
    const info = document.getElementById('info_table');
    const lang_toggle_btn = document.getElementById('lang_toggle');
    

    //adding a second language for a few elements on main page
    const lang = {
      RU:{
        lang_btn:'RU',
        about:'О нас',
        enter:'Введите название города:',
        search_img_label:'Задайте поиск...',
        history_btn:'История',
        contacts:'Свяжитесь с Нами',
      },
      EN:{
        lang_btn:'EN',
        about:'About',
        enter:'Enter a city name:',
        search_img_label:'Waiting for search...',
        history_btn:'History',
        contacts:'Contact Us',
      }
    }

    lang_toggle_btn.addEventListener('click',() =>{
       switch (lang_toggle_btn.innerHTML) {
         case 'RU':
           lang_toggle_btn.innerHTML = lang.EN.lang_btn;
           document.getElementById('input_label').innerHTML = lang.EN.enter;
           document.getElementById('img_label').innerHTML = lang.EN.search_img_label;
           document.getElementById('history').innerHTML = lang.EN.history_btn;
           document.getElementById('contacts').innerHTML = lang.EN.contacts;
           break;
       case 'EN':
        lang_toggle_btn.innerHTML = lang.RU.lang_btn;
        document.getElementById('input_label').innerHTML = lang.RU.enter;
        input.Placeholder = lang.RU.input_place;
        document.getElementById('img_label').innerHTML = lang.RU.search_img_label;
        document.getElementById('history').innerHTML = lang.RU.history_btn;
        document.getElementById('contacts').innerHTML = lang.RU.contacts;      
           break;
       }      
    })


    //search event
        button.addEventListener('click',async () =>{
     
      if (input.value === '') {
        alert('Заполните поле поиска!')
      }else{
       
      const weather_url = `weather/${input.value}`;
      const response = await fetch(weather_url);
      const json = await response.json();
     
      
    if(json.weather.cod == 404){
        alert('Не нашли такой город!');
        
    }else{
        const city =  json.weather.name;
        const country = json.weather.sys.country;
        const lat = json.weather.coord.lat;
        const long = json.weather.coord.lon;
        const description = json.weather.weather[0].description;
        const temp = Math.ceil(json.weather.main.temp);
        const humidity =  json.weather.main.humidity;
        const main = json.weather.weather[0].main; 

           
//changing dispaly size and img  after click
        const content = document.getElementById('content');
        const image = document.getElementById('main-image');

        info.style.display = 'block';
        image_label.style.display = 'none';
        content.classList.remove('vh-100');
        image.classList.remove('w-25'); 
        image.classList.add('w-55');


          switch (main) {
            case 'Clear':
              image.src = 'img/sunny_day.svg';
              break;
            
            case 'Mist':
              image.src = 'img/mist.svg';
              break;
            
            case 'Snow':
              image.src = 'img/winter.svg';
              break;
            
            case 'Rain':
              image.src = 'img/rain.svg';
              break;  

            default:
              image.src = 'img/clouds.svg'    
              break;
          }


    document.getElementById('city_span').textContent = city;
    document.getElementById('country_span').textContent = country;
    document.getElementById('desc_span').textContent = description;
    document.getElementById('temp_span').textContent = temp;
    document.getElementById('humid_span').textContent = humidity;
      

//sending data to server for saving in database
      const data = {city,country,lat,long,description,temp,humidity};
      const options = {
          method:'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
      }

          const db_response = await fetch('/api',options);
          const db_json = await db_response.json();
          
      }
    }
  });


  const year_span = document.getElementById('year');
  const date = new Date();
  year_span.textContent = date.getFullYear();
   
