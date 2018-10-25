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
const port = process.env.PORT || 3333;
const server = https.createServer(options, app);

server.listen( port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Express server listening on port " + server.address().port);
  }
});

app.use("/viewer", express.static(__dirname + "/viewer"));
app.use("/TheCallOfTheWild", express.static(__dirname + "/TheCallOfTheWild"));

app.get('/', function (req, res) {
  res.header("Content-type", "text/html");
  return res.end("<h1>Webpub-viewer on https</h1>" + 
  "<p><a href='/viewer/?url=https%3A%2F%2Flocalhost%3A3333%2FTheCallOfTheWild%2Fmanifest.json'>Open book with the same origin</a> (should open in Webpub Viewer and register Service Workers if the certificate is trusted)</p>" + 
  "<p><a href='/viewer/?url=https%3A%2F%2Freadium2.herokuapp.com%2Fpub%2FL2FwcC9taXNjL2VwdWJzL2NoaWxkcmVucy1saXRlcmF0dXJlLmVwdWI%3D%2Fmanifest.json'>Open book with a different origin</a> (should fail and throw an error in the browser’s console)</p>");
});