const express = require('express')
const get = require('request')
const app = express()

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/ba-sic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html')
});

app.get('/:url', function(request, response) {
  try {
    get({ url: request.params.url, header: request.headers }, function(err, res, body) {
      let merged = {...res.headers, ...{
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'DELETE,GET,PATCH,POST,PUT',
          'Access-Control-Allow-Headers': 'Content-Type,Authorization'
      }};
      response.set(merged)
      response.send(body)
    });
  } catch (err) {
    response.send('500: Guru Meditation Error')
    console.log(err)
  }
});

app.post('/:url', function(request, response) {
  try {
    get({ url: request.params.url, header: request.headers }, function(err, res, body) {
      let merged = {...res.headers, ...{
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'DELETE,GET,PATCH,POST,PUT',
          'Access-Control-Allow-Headers': 'Content-Type,Authorization'
      }};
      response.set(merged)
      response.send(body)
    });
  } catch (err) {
    response.send('500: Guru Meditation Error')
    console.log(err)
  }
});

// CORS header `Access-Control-Allow-Origin` set to accept all
app.get('/allow-cors', function(request, response) {
  response.set('Access-Control-Allow-Origin', '*');
  response.sendFile(__dirname + '/message.json');
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
