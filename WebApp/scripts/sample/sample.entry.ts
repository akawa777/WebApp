import html from './sample.html'
var mainEl = document.getElementById('main') as Element

declare class Hello {
    say():void
}

(async function () {   
    mainEl.innerHTML = html

    var hello = new Hello();
    hello.say();

    // var connectionForm = document.getElementById("connectionForm")
    // var connectionUrl = document.getElementById("connectionUrl") as HTMLInputElement;
    // var connectButton = document.getElementById("connectButton") as HTMLButtonElement;
    // var stateLabel = document.getElementById("stateLabel") as HTMLElement;
    // var sendMessage = document.getElementById("sendMessage") as HTMLInputElement;
    // var sendButton = document.getElementById("sendButton") as HTMLButtonElement;
    // var sendForm = document.getElementById("sendForm");
    // var commsLog = document.getElementById("commsLog") as HTMLElement;
    // var closeButton = document.getElementById("closeButton") as HTMLButtonElement;
    // var socket: WebSocket;
    // var scheme = document.location.protocol == "https:" ? "wss" : "ws";
    // var port = document.location.port ? (":" + document.location.port) : "";
    // connectionUrl.value = scheme + "://" + document.location.hostname + port + "/ws" ;
    // function updateState() {
    //     function disable() {
    //         sendMessage.disabled = true;
    //         sendButton.disabled = true;
    //         closeButton.disabled = true;
    //     }
    //     function enable() {
    //         sendMessage.disabled = false;
    //         sendButton.disabled = false;
    //         closeButton.disabled = false;
    //     }
    //     connectionUrl.disabled = true;
    //     connectButton.disabled = true;
    //     if (!socket) {
    //         disable();
    //     } else {
    //         switch (socket.readyState) {
    //             case WebSocket.CLOSED:
    //                 stateLabel.innerHTML = "Closed";
    //                 disable();
    //                 connectionUrl.disabled = false;
    //                 connectButton.disabled = false;
    //                 break;
    //             case WebSocket.CLOSING:
    //                 stateLabel.innerHTML = "Closing...";
    //                 disable();
    //                 break;
    //             case WebSocket.CONNECTING:
    //                 stateLabel.innerHTML = "Connecting...";
    //                 disable();
    //                 break;
    //             case WebSocket.OPEN:
    //                 stateLabel.innerHTML = "Open";
    //                 enable();
    //                 break;
    //             default:
    //                 stateLabel.innerHTML = "Unknown WebSocket State: " + htmlEscape(socket.readyState.toString());
    //                 disable();
    //                 break;
    //         }
    //     }
    // }
    // closeButton.onclick = function () {
    //     if (!socket || socket.readyState != WebSocket.OPEN) {
    //         alert("socket not connected");
    //     }
    //     socket.close(1000, "Closing from client");
    // }
    // sendButton.onclick = function () {
    //     if (!socket || socket.readyState != WebSocket.OPEN) {
    //         alert("socket not connected");
    //     }
    //     var data = sendMessage.value;
    //     socket.send(data);
    //     commsLog.innerHTML += '<tr>' +
    //         '<td class="commslog-client">Client</td>' +
    //         '<td class="commslog-server">Server</td>' +
    //         '<td class="commslog-data">' + htmlEscape(data) + '</td>'
    //     '</tr>';
    // }
    // connectButton.onclick = function() {
    //     stateLabel.innerHTML = "Connecting";
    //     socket = new WebSocket(connectionUrl.value);
    //     socket.onopen = function (event) {
    //         updateState();
    //         commsLog.innerHTML += '<tr>' +
    //             '<td colspan="3" class="commslog-data">Connection opened</td>' +
    //         '</tr>';
    //     };
    //     socket.onclose = function (event) {
    //         updateState();
    //         commsLog.innerHTML += '<tr>' +
    //             '<td colspan="3" class="commslog-data">Connection closed. Code: ' + htmlEscape(event.code.toString()) + '. Reason: ' + htmlEscape(event.reason) + '</td>' +
    //         '</tr>';
    //     };
    //     socket.onerror = updateState;
    //     socket.onmessage = function (event) {
    //         commsLog.innerHTML += '<tr>' +
    //             '<td class="commslog-server">Server</td>' +
    //             '<td class="commslog-client">Client</td>' +
    //             '<td class="commslog-data">' + htmlEscape(event.data) + '</td>'
    //         '</tr>';

    //         location.reload();
    //     };
    // };
    // function htmlEscape(str: string) {
    //     return str
    //         .replace(/&/g, '&amp;')
    //         .replace(/"/g, '&quot;')
    //         .replace(/'/g, '&#39;')
    //         .replace(/</g, '&lt;')
    //         .replace(/>/g, '&gt;');
    // }

    // connectButton.click();
})()