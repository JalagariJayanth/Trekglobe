const express = require("express");
const { body, validationResult } = require("express-validator");
const Router = express.Router();

const jwt = require("jsonwebtoken");

const fetchuser = (req, res, next) => {
  const token = req.header("authtoken");
  if (!token) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
    return; // Terminate the function if no token is provided.
  }
  try {
    const data = jwt.verify(token, "userlogin");
    console.log(data);
    req.user = data.user;
    next(); // Call next() to pass control to the next middleware or route handler.
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};

Router.post("/transport", fetchuser, async (req, res) => {
  try {
    const { mode, From, To, Date } = req.body;
    if (mode === "Train") {
      //console.log("OK it's going");
      const url = "https://trains.p.rapidapi.com/";
      const options = {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key":
            "39f3fe457emshcf4783b95a7cfe3p160e47jsn5b4ca312079f",
          "X-RapidAPI-Host": "trains.p.rapidapi.com",
        },
        body: JSON.stringify({ search: From }),
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        res.json({ success: true, data: result });
      } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
      }
    }else{
       try {
            const apiKey = '784e9d22fe96fcce68b78fd3ff58f1b3';
            const fromIata = From;
           const toIata = To;
           const flightDate = '2023-09-04';
           const apiUrl = `http://api.aviationstack.com/v1/flights?access_key=${apiKey}&dep_iata=${fromIata}&arr_iata=${toIata}`;
            const options = {
             method:"GET"
          }
            //console.log("Flight running")
            const response = await fetch(apiUrl,options);
            const apiResponse = await response.json(); 
            //console.log(apiResponse) 
            const length = apiResponse.data.length
            //console.log(length)
            if (length > 0){
              res.send({ success: true, data:apiResponse.data });
              
            }else{
              res.send({success:true,data:"No Flights are scheduled"})
            }
               
          } catch (error) {
            res.send({success:false,data:"Internal Transport Server Error"});
         }
    }
  } catch (error) {
    res.status(500).send("Internal Transport Server Error");
  }
});

module.exports = Router;
