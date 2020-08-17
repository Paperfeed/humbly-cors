const express = require("express");
const get = require("request");
const app = express();

function forwardRequest(request, response) {
  try {
    get({ url: request.params.url, header: request.headers }, function(
      err,
      res,
      body
    ) {
      const headers = res ? res.headers : [];
      let merged = {
        ...headers,
        ...{
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "DELETE,GET,PATCH,POST,PUT",
          "Access-Control-Allow-Headers": "Content-Type,Authorization"
        }
      };
      console.log("[Body]", body);
      console.log("[Headers]", headers, request.headers);
      response.set(merged);
      response.send(body);
    });
  } catch (err) {
    response.send("500: Guru Meditation Error");
    console.log(err);
  }
}

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

app.get("/:url", function(request, response) {
  forwardRequest(request, response);
});

app.post("/:url", function(request, response) {
  forwardRequest(request, response);
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
