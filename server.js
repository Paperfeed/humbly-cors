const express = require('express')
const get = require('request')
const app = express()

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

app.get('/:url', function(request, response) {
  try {
  
    get({ url: request.params.url, header: request.headers }, function(err, res, body) {
      const headers = res ? res.headers : []
      let merged = {...headers, ...{
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
    if (request && request.headers) {
    get({ url: request.params.url, header: request.headers }, function(err, res, body) {
      let merged = {...res.headers, ...{
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'DELETE,GET,PATCH,POST,PUT',
          'Access-Control-Allow-Headers': 'Content-Type,Authorization'
      }};
      response.set(merged)
      response.send(body)
      console.log('Sent body', body)
    });
    } else {
      response.send('No request header')
    }
  } catch (err) {
    response.send('500: Guru Meditation Error')
    console.log(err)
  }
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
