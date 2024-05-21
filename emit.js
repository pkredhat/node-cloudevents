const axios = require("axios").default;
const { emitterFor, Mode, CloudEvent } = require("cloudevents");

function sendWithAxios(message) {
  // Do what you need with the message headers
  // and body in this function, then send the
  // event
  axios({
    method: "post",
    url: "http://localhost:8080",
    data: message.body,
    headers: message.headers,
  });
}

const emit = emitterFor(sendWithAxios, { mode: Mode.BINARY });
emit(new CloudEvent({ type, source, data }));