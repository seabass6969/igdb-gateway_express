import dotenv from "dotenv";
import express from "express";
import axios from 'axios';
import cors from 'cors';
dotenv.config()
const app = express()
const port = process.env.PORT || 3001;
const client_id = process.env.client_id
const bearer = process.env.bearer
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))
app.get('/', (req, res) => {
  res.send(`<h1>gamelist:</h1><br/><h2>/gamelist/{platform}/{rating}/{amount}</h2>`)
})
app.get('/gamelist/:platforms/:rating/:amount', (req, res) => {
  if(req.params.amount == null || req.params.platforms == null || req.params.platforms == null)res.send("{error}")
  axios({
  url: "https://api.igdb.com/v4/games",
  method: 'POST',
  headers: {
      'Accept': 'application/json',
      'Client-ID': client_id,
      'Authorization': bearer,
  },
  data: "where rating > "+req.params.rating+" & platforms = "+req.params.platforms+" & category = 1; fields name,alternative_names.*,summary,storyline,url,first_release_date,artworks.url,cover.url,screenshots.*,status; where rating > 85 & platforms = 6; fields name,alternative_names.*,summary,storyline,url,first_release_date,artworks.url,cover,screenshots.url,status; limit "+req.params.amount+";"
  // 85 6 10
})
  .then(response => {
      let result = response.data;
      res.send(result)
  })
  .catch(err => {
      console.error(err);
      let result = err
      res.send(result)
  });
})
app.get('/*', (req, res) => {
  res.send('error')
})

app.listen(port, () => {console.log(`starting the app on ${port}`)})
