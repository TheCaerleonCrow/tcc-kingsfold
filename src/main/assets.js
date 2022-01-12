const { ipcMain } = require('electron');
const path = require('path');
const fs = require('fs').promises;

let assetpath = '';
const assets = {};
assets.images = {};
assets.images.avatars = {};



const LoadAvatars = async () => 
{
    try 
    {
        const avatarPath = path.join(assetpath, 'avatars');
        const files = await fs.readdir(avatarPath);

        for (const file of files)
        {
            if (!file.endsWith('.png')) continue;
            assets.images.avatars[file.replace('.png','')] = path.join(avatarPath, file);
        }
    }
    catch(error)
    {
        console.log(error);
    }
};


ipcMain.handle('assets.get-avatars', async (event) =>
{
    return assets.images.avatars;
});

module.exports = async ($assetpath) =>
{
    assetpath = $assetpath;
    await LoadAvatars();
};