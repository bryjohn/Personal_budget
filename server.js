const express = require('express');
const app = express();

module.exports = app;

const PORT = process.env.PORT || 3000;


//test endpoint to see if server is functioning
app.get('/', (req,res,next) => {
  res.send("Hello World");
});

if (!module.parent) { 
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}