// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/:date', function (req, res) {
  const date = req.params.date;
  let dateObj;
  let utc;
  let unix;
  let options = {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: 'GMT',
    timeZoneName: 'short',
  };

  if (date.includes('-')) {
    if (date.split('-').length <= 3) {
      dateObj = new Date(date);
      unix = Math.floor(dateObj.getTime());
    } else {
      res.status(400).json({
        error: 'Invalid date',
      });
    }
  } else {
    unix = Number(date);
    dateObj = new Date(unix * 1000);
  }
  utc = dateObj.toLocaleString('en-GB', options);
  res.status(200).json({
    unix: unix,
    utc,
  });
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
