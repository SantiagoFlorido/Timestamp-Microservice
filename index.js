// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// serve static files
app.use(express.static('public'));

// basic routing for homepage
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// test endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

// timestamp microservice endpoint
app.get("/api/:date?", function (req, res) {
  let { date } = req.params;

  // 1) Sin parámetro => fecha actual
  if (!date) {
    const now = new Date();
    return res.json({
      unix: now.getTime(),
      utc: now.toUTCString()
    });
  }

  // 2) Si la fecha es un número (timestamp en ms), convertir a Number
  if (!isNaN(date)) {
    date = parseInt(date);
  }

  // 3) Intentar parsear con Date()
  const parsedDate = new Date(date);

  // 4) Si inválida, devolver error
  if (parsedDate.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // 5) Responder con unix y utc
  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString()
  });
});

// listen for requests
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
