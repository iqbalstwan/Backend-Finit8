// .dotenv
require ('dotenv').config()
// =============================
const express = require("express");
const bodyParser = require("body-parser")
const morgan = require("morgan")
const routeNavigation = require("./indexsrc")
const cors = require("cors")

const { response, request } = require("express");
const app = express();

//BODY PARSER
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false}))
app.use(morgan("dev"))

//CORS
app.use((request, response, next)=>{
  response.header("Access-Control-Allow-Origin", "*")
  response.header("Access-Control-Allow-Headers", "Origin,X-Request-Witdh, Content-Type, Accept, Authorization")
  next()
})

app.use("/", routeNavigation)


//GET ERROR
app.get("*",(request,response)=>{
    response.status(404).send("Not found")
});


app.listen(3001, "127.0.0.1", () => {
  console.log("Express app is listening on hots: 127.0.0.1 and port:3001 !");
});
