import dotenv from "dotenv";
import express from "express";
import axios from 'axios';
dotenv.config()
const app = express()
const port = process.env.PORT || 3001;
const client_id = process.env.client_id
const bearer = process.env.bearer
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/gamelist', (req, res) => {
  axios({
  url: "https://api.igdb.com/v4/games",
  method: 'POST',
  headers: {
      'Accept': 'application/json',
      'Client-ID': client_id,
      'Authorization': bearer,
  },
  data: "where rating > 85 & platforms = 6; fields name,alternative_names,summary,storyline,url,first_release_date,artworks,cover,screenshots,status; "
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
app.listen(port, () => {console.log(`starting the app on ${port}`)})