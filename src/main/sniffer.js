const { spawn } = require('child_process');
const path = require('path');

// class Sniffer
// {
//     constructor()
//     {
//         this.process = spawn(
//             path.join(process.cwd(), 'sniffer.exe'),
//             [],
//             {
//                 windowsHide: true,
//             }
//         );

//         process.on('exit', () => 
//         {
//             this.process.kill();
//         });
//     }
// }

// module.exports = Sniffer;


const sniffer = spawn(
    path.join(process.cwd(), 'sniffer.exe'),
    [],
    {
        windowsHide: true,
    }
);

process.on('exit', () => 
{
    sniffer.kill();
});