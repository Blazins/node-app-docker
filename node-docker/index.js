const express = require("express");
const mongoose = require("mongoose"); 
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require("./config/config");

const app = express();

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectWithRetry = () => {
  mongoose
  .connect(mongoURL)
  .then(()=> console.log("Successfully connected to our DB"))
  .catch((e) => {
    console.log(e);
    setTimeout(connectWithRetry, 5000)
  });
}



app.get("/" ,(req,res) =>{
  res.send("<h2>Hi There</h2>");
})

const port = process.env.port || 3000

app.listen(port, () =>{
  console.log(`listening on port ${port}`)
}); 

//left 3000 - outside traffic
//right 3000  - port is listening to