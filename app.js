const express = require("express");
const cors = require("cors");
// const bodyParser = require("body-parser");
const app = express();

const corsOptions = {
  origin: "*", 
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, 
};


app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static("public"));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));



import userRoute from "./routes/userRoute"

app.use("/api/v1", userRoute);

module.exports = app;
