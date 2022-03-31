let sock = new WebSocket("ws://127.0.0.1:10101");
console.log(sock);

sock.addEventListener('open', function(event) {
	console.log("Open socketickus");
	subscribe();
});

sock.addEventListener('message', function(event) {
	console.log(event.data);
});

sock.addEventListener('error', function(event) {
	console.log(event);
});

sock.addEventListener('close', function(event) {
	console.log(event);
});

function subscribe() {
	sock.send(JSON.stringify({
		'channel': 'geniebuilder',
		'message': 'subscribe',
		'payload': {}
	}));
}