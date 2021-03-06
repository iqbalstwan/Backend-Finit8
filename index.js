// .dotenv
require("dotenv").config();
// =============================
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routeNavigation = require("./indexsrc");
const cors = require("cors");

const { response, request } = require("express");
const app = express();

//BODY PARSER
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(express.static("uploads"));

//CORS
app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Request-Witdh, Content-Type, Accept, Authorization"
  );
  next();
});

app.use("/", routeNavigation);

//GET ERROR
app.get("*", (request, response) => {
  response.status(404).send("Not found");
});

app.listen(process.env.PORT, process.env.IP, () => {
  console.log(
    `Express app is listening on hots: ${process.env.IP} and port:${process.env.PORT} !`
  );
});
