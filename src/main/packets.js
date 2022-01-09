
exports.PacketType = 
{
    0 : {name:'event', op:'event', prefix:'ev'},
    1 : {name:'request', op:'operation', prefix:'req'},
    2 : {name:'response', op:'operation', prefix:'res'},
};

exports.PacketName =
{
    'event' : 
    {
        63 : 'chat-message',
        71 : 'update-money',
        256 : 'grabbed-loot',
    },

    'operation' :
    {
        237 : 'gold-buy-order-price',
    },
};