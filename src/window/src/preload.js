const { contextBridge, ipcRenderer } = require('electron');

// Only the main renderer should have access to these.
if (process.isMainFrame)
{
    let workspaces = {};



    contextBridge.exposeInMainWorld('__window', 
    {
        close:      () => ipcRenderer.send('window-close'),
        maximize:   () => ipcRenderer.send('window-maximize'),
        minimize:   () => ipcRenderer.send('window-minimize'),
        getExtensions: (callback) => 
        {
            ipcRenderer.send('get-extensions');
            ipcRenderer.once('get-extensions', (event, data) => callback(data));
        },
        getWorkspaces: (callback) => 
        {
            ipcRenderer.send('get-workspaces');
            ipcRenderer.once('get-workspaces', (event, data) => 
            {
                callback(data);
                workspaces = data;
            });
        },
        saveWorkspace: (name, panels) =>
        {
            const data = workspaces[name];
            data.extensions = [];

            panels.forEach(p => 
            {
                const panel = {name:p.title, x:p.x, y:p.y, w:p.w, h:p.h, data:{}};
                data.extensions.push(panel);
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