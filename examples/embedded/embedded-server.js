const https = require("https");
const fs = require("fs");
const express = require("express");

const options = {
    key: fs.readFileSync("webpubViewer.pem"),
    cert: fs.readFileSync("webpubViewer.pem"),
    requestCert: false,
    rejectUnauthorized: false
};

const app = express();
const port = process.env.PORT || 1865;
const server = https.createServer(options, app);

server.listen( port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Express server listening on port " + server.address().port);
  }
});

app.use("/", express.static(__dirname + "/alice"));