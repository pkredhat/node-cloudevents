const app = require("express")();
const { HTTP } = require("cloudevents");

app.post("/", (req, res) => {
  // body and headers come from an incoming HTTP request, e.g. express.js
  const receivedEvent = HTTP.toEvent({ headers: req.headers, body: req.body });
  console.log(receivedEvent);
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
	console.log('App version 1.0 listening on: ', port);
});