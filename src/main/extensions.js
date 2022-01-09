const { ipcMain } = require('electron');
const fs = require('fs').promises;
const path = require('path');

const extensions = {};

// This will load the main extensions folder
// Then attempt to load each extension using the subfolders
async function GetExtensions()
{
    // This try/catch block is mostly for if the main extensions folder can't be found.
    try 
    {
        const extPath = path.join(process.cwd(), 'extensions');
        const files = await fs.readdir(extPath, {withFileTypes: true});
        const folders = files.filter(file => file.isDirectory());

        for (let folder of folders)
            await LoadExtension(path.join(extPath, folder.name));
    }
    catch (error)
    {
        console.log(error);
    }
}

// This attemps to load an extension, given that extension's folder
// We load an extension by reading the "extension" data from the package.json file
// If something goes wrong, the extension couldn't be loaded, so we need to log why
async function LoadExtension(dir)
{
    try 
    {
        const data = await fs.readFile(path.join(dir, 'package.json'), 'utf8');
        const json = await JSON.parse(data);

        if (json.extension === undefined) 
            throw new Error("No extension config found.");

        LoadConfig(dir, json.extension);
    }
    catch (error)
    {
        console.log(`Extension could not be loaded:\n${dir}\n${error}`);
    }
}

function LoadConfig(dir, data)
{
    // An error should be thrown only if required data is missing.
    if (data === undefined) throw Error("No data.");
    if (data.name === undefined) throw Error("No name.");   // The name is needed to display the extension properly.
    if (data.main === undefined) throw Error("No main.");   // A main script is needed to actually load the extension.

    let config = 
    {
        name: data.name,
        main: path.join(dir, data.main),

        author: data.author || 'Unknown',
        version: data.version || '0.0.0',
        description: data.description || 'No description...',
        icon: data.icon || "assets/gui/globe.png",

        category: data.category || '',
    };

    if (data.css)
        config.css = path.join(dir, data.css);

    extensions[config.name] = config;
}

ipcMain.on('get-extensions', async (event) =>
{
    await GetExtensions();
    event.sender.send('get-extensions', extensions);
});
