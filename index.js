import express from "express";
import dbConnect from "./config/dbConfig.js"
process.loadEnvFile()

const port = process.env.PORT

dbConnect()

const app = express();


app.listen(port, () => {
  console.log(`Listening at ${port}`);
});
