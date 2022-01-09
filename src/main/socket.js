const net = require('net');
const event = require('events');

class SocketClient 
{
    constructor()
    {
        this.buffer = '';
        this.events = new event.EventEmitter();

        this.Connect();
    }

    Connect()
    {
        this.socket = net.connect(9999, '127.0.0.1');
        
        this.socket.once('connect', () => 
        {
            this.socket.setEncoding('utf8');

            this.socket.once('close', () => this.Reconnect());
            this.socket.once('end', () => this.Reconnect());
            
            this.socket.on('data', (data) => 
            {
                this.buffer += data;

                const index = this.buffer.indexOf('\n');
                if (index == -1) return;

                const jsonString = this.buffer.slice(0, index + 1);
                this.buffer = this.buffer.replace(jsonString, '');

                const jsonObject = JSON.parse(jsonString);
                this.events.emit('packet-recieved', jsonObject);
            });
        });
        
        this.socket.on('error', (error) => 
        {
            if (error.code == 'ECONNREFUSED')
                return this.Reconnect();

            console.error(error)
        });
    }

    Reconnect()
    {
        setTimeout(() =>
        {
            delete this.socket;
            this.Connect();
        }, 1000);
    }

    on(event, callback)
    {
        this.events.on(event, callback);
    }

    once(event, callback)
    {
        this.events.once(event, callback);
    }
}

module.exports = SocketClient;