// server.js
// where your node app starts

// init project
const express = require('express');
const bent = require('bent');
const app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/ba-sic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/:url', function(request, response) {
  try {
    const get = bent('GET')
  get({ url: request.params.url, header: request.headers }, function(err, res, body) {
    let merged = {...res.headers, ...{
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'DELETE,GET,PATCH,POST,PUT',
        'Access-Control-Allow-Headers': 'Content-Type,Authorization'
    }};
    response.set(merged);
    response.send(body);    
  });
  } catch (err) {
    response.send('500: Guru Meditation Error'); 
  }
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
