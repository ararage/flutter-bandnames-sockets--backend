const { io } = require('../index');

// Socket Messages
io.on('connection', client => {
    // client.on('event', data => { /* … */ });
    console.log("Cliente conectado");
    client.on('disconnect', () => { console.log("Cliente Desconectado") });
    client.on('mensaje', ( payload ) =>{
        console.log(payload);
        io.emit('mensaje', {
            admin: 'Nuevo Mensaje'
        });
    });
});