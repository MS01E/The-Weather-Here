import express from 'express';
import Datastore from 'nedb';
import fetch from 'node-fetch';
import 'dotenv/config';
import fs from 'fs';


const app = express();
const port = process.env.PORT || 3000;
app.listen(port,() => console.log(`Starting server at ${port}`));
app.use(express.static('public'));
app.use(express.json({limit:'1mb'}));


const database = new Datastore('database.db');
database.loadDatabase();

//sending data to logs
app.get('/api',(request,response) =>{
    database.find({},(err,data) =>{
      if(err){
          response.end();
          return;
      }
       response.json(data)
    });
});


app.post('/api',(request,response) =>{
    const data = request.body;
    const time = new Date();
    data.map_token = process.env.MAP_ACCESS_TOKEN;
    data.timestamp = time.toLocaleString('en-US');

  //comparising objects in database with entering one to update  DB after every search    
    database.find({},(err,db) =>{
        if(err) throw err;
        
        const db_item =  db.find((item) => item.city == data.city);
      
      if(db_item){
       database.remove(db_item,(err,removed) =>{
           if(err) throw err;
          })

          database.insert(data)

        }else{
           database.insert(data);
        }
      });

    response.json(data);

});

//cleaning db by click
app.get('/cleandb',(request,response) =>{

    fs.truncate('database.db',(err) =>{
    if(err) throw err
      database.loadDatabase();
   });
});



app.get('/weather/:city', async (request,response) =>{
const city_name = request.params.city; 
const weather_api_key = process.env.WEATHER_API_KEY;
const weather_url = `http://api.openweathermap.org/data/2.5/weather?q=${city_name}&units=metric&lang=ru&appid=${weather_api_key}`;
const w_fetch = await fetch(weather_url);
const weather_json = await w_fetch.json();


const data = {
    weather:weather_json,
    
}
   response.json(data)
   
 });
