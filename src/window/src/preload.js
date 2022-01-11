const { contextBridge, ipcRenderer } = require('electron');

// Only the main renderer should have access to these.
if (process.isMainFrame)
{
    contextBridge.exposeInMainWorld('__window', 
    {
        close:      () => ipcRenderer.send('window-close'),
        maximize:   () => ipcRenderer.send('window-maximize'),
        minimize:   () => ipcRenderer.send('window-minimize'),
        openDevTools: () => ipcRenderer.send('open-dev-tools'),
        getExtensions: (callback) => 
        {
            ipcRenderer.send('get-extensions');
            ipcRenderer.once('get-extensions', (event, data) => callback(data));
        },
        LoadWorkspaces: (callback) => 
        {
            ipcRenderer.send('get-workspaces');
            ipcRenderer.once('get-workspaces', (event, data) => 
            {
                callback(data);
            });
        },
        SaveWorkspace: (name, icon, panels) =>
        {
            const data = {name,icon};
            data.panels = [];

            panels.forEach(p => 
            {
                const panel = {name:p.name, x:p.x, y:p.y, w:p.w, h:p.h, data:{}};
                data.panels.push(panel);
            });

            ipcRenderer.send('save-workspace', data);
        },
    });
}

contextBridge.exposeInMainWorld('__ext', 
{
    on: (eventName, callback) =>
    {
        ipcRenderer.on('packet-recieved', (event, packetName, packetData) => 
        {
            if (packetName != eventName) return;
            callback(packetData);
        });
    },

    boop: () => console.log('boop'),
});