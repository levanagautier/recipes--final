const express = require("express");
const session = require("express-session");
const cors = require("cors");
require("dotenv").config();

const app = express();

const router = require("./routes/index.js");

const { PORT, HOST } = process.env;
// const PORT = process.env.PORT || 8080;
// const HOST = process.env.HOST || 'localhost';
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.static("public"));

app.use(session({ secret: "Fanfan" }));
app.use(router);

app.listen(PORT, () => {
  console.log(`App running on http://${HOST}:${PORT}`);
});
