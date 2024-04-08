import express from "express";
process.loadEnvFile()

const port = process.env.PORT
const app = express();



app.listen(port, () => {
  console.log(`Listening at ${port}`);
});
