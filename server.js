const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
module.exports = app;

const PORT = process.env.PORT || 3000;

//mount envelope router
const envelopeRouter = require('./server/envelopes');
app.use('/', envelopeRouter);


if (!module.parent) { 
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}