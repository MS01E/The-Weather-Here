import express from 'express';
import { request, response, json } from 'express';
import Datastore from 'nedb';
import fetch from 'node-fetch';
import 'dotenv/config';

console.log(process.env);
const app = express();
app.listen(3000,() => console.log('Listening at 3000'));
app.use(express.static('public'));
app.use(express.json({limit:'1mb'}));

const database = new Datastore('database.db');
database.loadDatabase();

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
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    console.log('I got a request!');
    response.json(data
        // status:'success',
        // timestamp:timestamp,
        // mood:data.mood,
        // latitude:data.lat,
        // longitude:data.long,
    );
});

app.get('/weather/:latlon', async (request,response) =>{
    console.log(request.params);
const latlon = request.params.latlon.split(',');
 console.log(latlon);
const lat = latlon[0];
const long = latlon[1];
 
const api_key = process.env.API_KEY;
const weather_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api_key}&units=metric`;
const w_fetch = await fetch(weather_url);
const weather_json = await w_fetch.json();


const  aq_url =`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${long}&appid=82e8e70dfa7ba1c730b9a8c9ff6940cf`;
const aq_fetch = await fetch(aq_url);
const aq_json = await aq_fetch.json();

const data = {
    weather:weather_json,
    air_quality:aq_json,
}
response.json(data)
 });