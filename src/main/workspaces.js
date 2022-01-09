const { app, ipcMain } = require('electron');
const fs = require('fs').promises;
const path = require('path');

const workspaces = {};

const LoadAllWorkspaces = async () =>
{
    const dirPath = path.join(app.getPath('userData'), 'workspaces');

    try 
    {
        const files = await fs.readdir(dirPath);
        
        for (const file of files)
        {
            // Each workspace should be saved as a json file
            if (!file.endsWith('.json')) return;
            await LoadWorkspace(file);
        }
    }
    catch (error)
    {
        // If the workspace folder doesn't exist, create it
        if (error.code == 'ENOENT')
        {
            await fs.mkdir(dirPath);
        }
    }   
};

const LoadWorkspace = async (fileName) =>
{
    const filePath = path.join(app.getPath('userData'), 'workspaces', fileName);

    try
    {
        const data = await fs.readFile(filePath, 'utf8');
        const json = await JSON.parse(data);

        workspaces[json.name] = json;
    }
    catch(error)
    {
        console.log(error);
    }
};

const SaveWorkspace = async (workspace) =>
{
    const filePath = path.join(app.getPath('userData'), 'workspaces', `${workspace.name}.json`);

    try 
    {
        const data = JSON.stringify(workspace);
        await fs.writeFile(filePath, data);
    }
    catch(error)
    {
        console.log(error);
    }
};

// Loads all the workspaces
// Then sends them back to the renderer
ipcMain.on('get-workspaces', async (event) =>
{
    await LoadAllWorkspaces();
    event.sender.send('get-workspaces', workspaces);
});

// Recieves workspace data from the renderer
// Then saves the workspace
ipcMain.on('save-workspace', async (event, data) =>
{
    await SaveWorkspace(data);
});