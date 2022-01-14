// Run commands for all the built-in extensions- in bulk, so we don't have to manually do some action on all them.

const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');

const extDir = path.join(process.cwd(), 'extensions');
const buildArg = '--build';
const installArg = '--install';

const ExtensionCommand = (cmd) =>
{
    fs.readdir(extDir, {withFileTypes:true}).then(async dir => 
    {
        for (let ent of dir)
        {
            if (!ent.isDirectory()) continue;
            
            exec(
                cmd,
                {
                    cwd: path.join(extDir, ent.name),
                    windowsHide: true,
                },
                (error, stdout, stderr) => 
                {
                    if (error) return console.log(error);
                    console.log(stdout);
                }
            );
        }
    });
};

if (process.argv.findIndex(e => e==buildArg) >= 0)
{
    ExtensionCommand('npm run build');
}

if (process.argv.findIndex(e => e==installArg) >= 0)
{
    ExtensionCommand('npm i');
}