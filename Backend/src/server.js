import express from "express";
const morgan = require("morgan");
const route = require("./routes");
const cors = require("cors");
require("dotenv").config();
const app = express();
const PORT = 3000;

app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(express.static('../Frontend/dist')); 
app.use(morgan("combined"));


route(app);

app.get('/hello', (req, res) => {
  res.send("ok")
});

app.get('*', (req, res) => {
  res.sendFile('index.html', { root: '../Frontend/dist/btlweb' });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port localhost:${PORT}`);
});