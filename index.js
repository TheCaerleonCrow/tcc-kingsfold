const { app } = require('electron');
const path = require('path');

const SocketClient = require('./src/main/socket.js');
const Window = require('./src/main/window.js');

let window;
let socket;

app.on('ready', async () =>
{
    require('./src/main/sniffer.js');
    require('./src/main/extensions.js');
    require('./src/main/workspaces.js');

    socket = new SocketClient();
    window = new Window(
        path.join(__dirname, 'src/renderer/build/index.html'), 
        path.join(__dirname, 'src/renderer/preload.js')
    );

    socket.on('packet-recieved', (packet) => window.OnPacketRecieved(packet));

    // Uncomment for debugging packets.
    // socket.on('packet-recieved', (packet) => console.log(packet));
});