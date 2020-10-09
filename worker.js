


 var ws;
 const broadcastChannel = new BroadcastChannel("WebSocketChannel");
 
 const idToPortMap = {};

 function openSocket(url) {
    

     
     ws = new WebSocket(url);

    

     ws.binaryType = 'arraybuffer'; // default is 'blob'

     ws.onopen = function() {
        broadcastChannel.postMessage({ type: "WSState", state: ws.readyState });
        // sessionStorage.echoServer = url;
     };

     ws.onclose = function() {
        broadcastChannel.postMessage({ type: "WSState", state: ws.readyState });
     };

     ws.onmessage = function(e) {
         if (e.data instanceof Blob) {
             var reader = new FileReader();
             reader.onload = function(e) {
                broadcastChannel.postMessage({data: 'received blob: ' + encodeHexString(new Uint8Array(e.target.result)), type : "message"});
             };
             reader.readAsArrayBuffer(e.data);
         } else if (e.data instanceof ArrayBuffer) {
            broadcastChannel.postMessage({data:'received array buffer: ' + encodeHexString(new Uint8Array(e.data)), type: "message"});
         } else {
            broadcastChannel.postMessage({data: 'received: ' + e.data, type: "message"});
         }
     };

     ws.onerror = function() {
        broadcastChannel.postMessage({data :'error', type: "message"});
     };
 }

 function closeSocket() {
    broadcastChannel.postMessage({ data:'closing', type: "message"});
     ws.close();
 }

 function sendText(message) {
     broadcastChannel.postMessage('sending: ' + message);
     ws.send(message);
 }

 function sendBinary(message) {
     broadcastChannel.postMessage('sending binary: ' + encodeHexString(message));
     ws.send(new Uint8Array(message).buffer);
 }

 function decodeHexString(text) {
     if (text.search(/[^0-9a-f\s]/i) !== -1) {
         alert('Can\'t decode "' + text + '" as hexadecimal...');
     } else {
         text = text.replace(/\s/g, '');
         if (text.length % 2 === 1) {
             text = '0' + text;
         }
         var data = [];
         for (var i = 0, len = text.length; i < len; i += 2) {
             data.push(parseInt(text.substr(i, 2), 16));
         }
         return data;
     }
 }

 function encodeHexString(data) {
     var bytes = [];
     for (var i = 0, len = data.length; i < len; i++) {
         var value = data[i];
         bytes[i] = value.toString(16);
         if (value < 16) {
             bytes[i] = '0' + bytes[i];
         }
     }
     return bytes.join(' ');
 }



 onconnect = e => {
    broadcastChannel.postMessage({data:'opening', type: "message"});
    const port = e.ports[0];
    port.onmessage = function(e) {
        idToPortMap[e.data.from] = port;
        port.postMessage('Msg recived' );
        if(e.data.type=="connect"){
            console.log("establish connection");
            openSocket(e.data.data);

        }else  if(e.data.type=="disconnect"){
            closeSocket();

        }else  if(e.data.type=="txt"){
          
            sendText(e.data.data);
        }else  if(e.data.type=="bin"){
           sendBinary(e.data.data)

        }
    };
  
    
  };

/*
  onconnect = function(e) {
    var port = e.ports[0];
    var workerResult = 'hello ';
    port.postMessage(workerResult);


    port.onmessage = function(e) {
        var workerResult = e.data;
        port.postMessage(workerResult);
     
    }
  
  }*/
 
