
try {
  const worker = new SharedWorker("worker.js");
  const id = uuid.v4();
console.log(worker);
} catch (error) {
  console.log("error creating Sharedworker");
  var worker;
}
const id = uuid.v4();


if (typeof(SharedWorker) !== "undefined") {
  //great, your browser supports web workers
  console.log("great, your browser supports web workers");
} else {
  //not supported
  console.log("not supported");
}

/**worker.port.onmessage = function(e) {
    view(e.data.data);
    console.log('Message received from worker');
    console.log(e.data);
  }**/
// Set initial state
let webSocketState = WebSocket.CONNECTING;

console.log("Initializing the web worker for user: ${id}");
worker.port.start();
worker.port.onmessage = event => {
  switch (event.data.type) {
    case "WSState":
      webSocketState = event.data.state;
      console.log(webSocketState);
      view(webSocketState);
      break;
    case "message":
      handleMessageFromPort(event.data.data);
      break;
  }
};

const broadcastChannel = new BroadcastChannel("WebSocketChannel");
broadcastChannel.addEventListener("message", event => {
  switch (event.data.type) {
    case "WSState":
      webSocketState = event.data.state;
      console.log(webSocketState);
      view(webSocketState);
      break;
    case "message":
      handleBroadcast(event.data.data);
      break;
  }
});

// Listen to broadcasts from server
function handleBroadcast(data) {
    console.log("This message is meant for everyone!");
    console.log(data);
    view(data);
  }
  
  function handleMessageFromPort(data) {
    console.log(`This message is meant only for user with id: ${id}`);
    console.log(data);
    view(data);
  }

function view(message) {
var li = document.createElement('li');
li.innerHTML = message;
document.getElementById('messages').appendChild(li);
}

function postMessageToWSServer(input, inputType) {
    /*if (webSocketState === WebSocket.CONNECTING) {
      console.log("Still connecting to the server, try again later!");
    } else if (
      webSocketState === WebSocket.CLOSING ||
      webSocketState === WebSocket.CLOSED
    ) {
      console.log("Connection Closed!");
    } else {*/
      worker.port.postMessage({
        // Include the sender information as a uuid to get back the response
        from: id,
        type: inputType,
        data: input
      });
    //}
  }

  function manageConnection(input, inputType){
      console.log(inputType +" : " +input);
    worker.port.postMessage({
        // Include the sender information as a uuid to get back the response
        from: id,
        type: inputType,
        data: input
      });
  }

 