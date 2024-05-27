const express = require("express");
const { CloudEvent, HTTP } = require("cloudevents");
const app = express();

app.use((req, res, next) => {
  let data = "";

  req.setEncoding("utf8");
  req.on("data", function (chunk) {
    data += chunk;
  });

  req.on("end", function () {
    req.body = data;
    next();
  });
});

app.post("/", (req, res) => {
  console.log("HEADERS", req.headers);
  console.log("BODY", req.body);

  try {
    const event = HTTP.toEvent({ headers: req.headers, body: req.body });
    // respond as an event
    const responseEventMessage = new CloudEvent({
      source: '/',
      type: 'event:response',
      ...event,
      data: {
        message: 'success'
      }
    });

    // const message = HTTP.binary(responseEventMessage)
    const message = HTTP.structured(responseEventMessage)
    res.set(message.headers)
    res.send(message.body)

  } catch (err) {
    console.error(err);
    res.status(415).header("Content-Type", "application/json").send(JSON.stringify(err));
  }
});

app.listen(8080, () => {
  console.log("Cloud Event Listener - listening on Port 8080");
});


// curl localhost:3000 -v \
//   -X POST \
//   -H "Content-Type: application/cloudevents+json" \
//   -d '{
//         "specversion": "1.0",
//         "type": "com.mycompany.myapp.myservice.myevent",
//         "source": "myservice/mysource",
//         "id": "1234-5678",
//         "time": "2023-01-02T12:34:56.789Z",
//         "subject": "my-important-subject",
//         "datacontenttype": "application/json",
//         "extensionattr1" : "value",
//         "extensionattr2" : 5,
//         "data": {
//           "foo1": "bar1",
//           "foo2": "bar2"
//         }
//       }'