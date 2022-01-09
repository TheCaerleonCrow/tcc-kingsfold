const { app } = require('electron');
const path = require('path');

// const Sniffer = require('./src/main/sniffer.js');
const SocketClient = require('./src/main/socket.js');
const Window = require('./src/main/window.js');

let window;
let socket;

app.on('ready', () =>
{
    require('./src/main/sniffer.js');
    require('./src/main/extensions.js');
    require('./src/main/workspaces.js');

    socket = new SocketClient();
    window = new Window(
        path.join(__dirname, 'src/window/build/index.html'), 
        path.join(__dirname, 'src/window/src/preload.js')
    );

    socket.on('packet-recieved', (packet) => window.OnPacketRecieved(packet));
    //socket.on('packet-recieved', (packet) => console.log(packet));

    // console.log(app.getPath('userData'));
});
