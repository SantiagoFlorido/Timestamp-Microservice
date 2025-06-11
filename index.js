// index.js
// where your node app starts

const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();

// Habilitar CORS para pruebas FCC
app.use(cors({ optionsSuccessStatus: 200 }));

// Servir archivos estáticos desde /public
app.use(express.static('public'));

// Ruta principal (HTML)
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Ruta de prueba
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

// Documentación Swagger
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Ruta sin parámetro => devolver fecha actual
app.get("/api", function (req, res) {
  const now = new Date();
  res.json({
    unix: now.getTime(),
    utc: now.toUTCString()
  });
});

// Ruta con parámetro => analizar fecha proporcionada
app.get("/api/:date", function (req, res) {
  let { date } = req.params;

  // Si es número, convertirlo (timestamp)
  if (!isNaN(date)) {
    date = parseInt(date);
  }

  const parsedDate = new Date(date);

  if (parsedDate.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString()
  });
});

// Iniciar servidor
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
