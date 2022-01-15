// Grabs links and other data, then joins them together as one Assets object made available to the app.

const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');

const assetDir = path.join(process.cwd(), 'src/renderer/build/assets');
const Assets = {};

const Crawl = async (dir, action) =>
{
    const files = await fs.readdir(dir, {withFileTypes:true});

    for (let file of files)
    {
        const subdir = path.join(dir, file.name);

        if (!file.isDirectory()) 
        {
            action(subdir);
            continue;
        }

        await Crawl(subdir, action);
    }
};

const CrawlImages = async () => 
{
    Assets.images = {};

    await Crawl(assetDir, (file) => 
    {
        if (!file.endsWith('.png')) return;

        file = file.replace(assetDir+'/', '');
        const tags = file.split('/');
        
        tags.reduce((obj, key) =>
        {
            if (!key.endsWith('.png')) 
            {
                if (obj[key] === undefined) obj[key] = {};
            }
            else 
            {
                obj[key.replace('.png','')] = 'assets/' + file;
            }
            
            return obj[key];
        }, Assets.images);
    });
};

const Save = async () =>
{
    const json = JSON.stringify(Assets);
    const file = path.join(process.cwd(), 'src/renderer/src', 'assets.json');

    await fs.writeFile(file, json);
};

(async () => 
{
    await CrawlImages();
    await Save();
})();