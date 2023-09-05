const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();
const link = process.env.db_link;

mongoose.connect(link)
  .then(function(db){
      console.log("db connected");
  })
  .catch(function(err) {
      console.log(err);
  });

app.use(cors());
app.use(express.json());

app.get("/",(req,res) => {
    res.send("Hello world");
});
app.use("/user",require("./Routes/userRouter"));
app.use("/ticket",require("./Routes/ticketRouter"))

app.listen(port , () => {
    console.log("Server running on 5000");
});
