
const app = require('express')();
const { HTTP } = require('cloudevents');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.post('/', (req, res) => {
  try {
    const receivedEvent = HTTP.toEvent({ headers: req.headers, body: req.body });
    console.log('CloudEvent Object received. \n');
    console.log('Version: ', receivedEvent.specversion, ' \n');
    console.log('Type: ', receivedEvent.type, ' \n');
    console.log('Data: ', receivedEvent.data, ' \n');
    res.status(201).send("Event Accepted");

  } catch(err) {
    console.error('Error', err);
    res.status(415)
          .header("Content-Type", "application/json")
          .send(JSON.stringify(err));
  }
});
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('App Version 1.0 listening on: ', port);
});

// const app = require("express")();
// const { HTTP } = require("cloudevents");

// app.post("/", (req, res) => {
//   // body and headers come from an incoming HTTP request, e.g. express.js
//   const receivedEvent = HTTP.toEvent({ headers: req.headers, body: req.body });
//   console.log(receivedEvent);
// });

// const port = process.env.PORT || 8080;
// app.listen(port, () => {
// 	console.log('App version 1.0 listening on: ', port);
// });