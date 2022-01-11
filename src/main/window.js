const { BrowserWindow, ipcMain } = require("electron");
const { PacketType, PacketName } = require('./packets.js');

class Window extends BrowserWindow
{
    constructor(htmlPath, preloadPath)
    {
        super(
        {
            width: 800,
            height: 600,
            show: false,
            frame: false,
            webPreferences:
            {
                nodeIntegration: false,
                nodeIntegrationInSubFrames: true,
                preload: preloadPath,
            },
        });

        // Only show the window when it has fully loaded.
        this.once('ready-to-show', () =>
        {
            this.show();
        });

        // Register IPC commands.
        ipcMain.on('window-close', () => 
        {
            this.close();
        });

        ipcMain.on('window-minimize', () =>
        {
            this.minimize();
        });

        ipcMain.on('window-maximize', () =>
        {
            if (this.isMaximized()) 
                return this.unmaximize();

            this.maximize();
        });

        ipcMain.on('open-dev-tools', () =>
        {
            this.webContents.openDevTools({mode:'right'});
        });

        // Load the html file.
        this.loadFile(htmlPath); 
    }

    // When we recieve a packet, lets send it to the renderer.
    OnPacketRecieved(packet)
    {
        let type = packet.Type;
        let code = packet.Code;

        let packetType = PacketType[type];
        let packetName = PacketName[packetType.op][code];

        packet.Type = packetType.name;

        this.webContents.mainFrame.frames.forEach(frame =>
        {
            this.webContents.sendToFrame(
                frame.routingId,
                'packet-recieved', 
                `${packetType.prefix}-${packetName}`, 
                packet
            );
        });
    }
}

module.exports = Window;