// import * as url from "url";
// const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const companion = require("@uppy/companion");
const cors = require("cors");

const GOOGLE_DRIVE_KEY = process.env.GOOGLE_DRIVE_KEY;
const GOOGLE_DRIVE_SECRET = process.env.GOOGLE_DRIVE_SECRET;
const PORT = process.env.PORT;
const FILE_PATH = path.join(__dirname, "output");

const companionOptions = {
  providerOptions: {
    drive: {
      key: GOOGLE_DRIVE_KEY,
      secret: GOOGLE_DRIVE_SECRET,
    },
  },
  server: {
    host: `localhost:${PORT}`,
    protocol: "http",
  },
  filePath: FILE_PATH,
  debug: true,
  secret: "realsecret",
  uploadUrls: `http://localhost:${PORT}`,
};

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  next();
});
app.use(bodyParser.json());
app.use(
  session({
    secret: "realsecret",
    resave: true,
    saveUninitialized: true,
  })
);
const { app: companionApp } = companion.app(companionOptions);
app.use(companionApp);

const server = app.listen(PORT, () => {
  console.log(`listening to port: ${PORT}`);
});
companion.socket(server);
