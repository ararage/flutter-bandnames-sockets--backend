const { io } = require('../index');
const Bands = require('../models/bands');
const Band = require('../models/band');

const bands = new Bands();
console.log('init-server');
bands.addBand(new Band('KISS'));
bands.addBand(new Band('Queen'));
bands.addBand(new Band('Back On'));
bands.addBand(new Band('31 Minutos'));

console.log(bands);


// Socket Messages
io.on('connection', client => {
    // client.on('event', data => { /* … */ });
    console.log("Cliente conectado");
    
    // INITIAL EMIT, EMIT ALL BANDS TO ALL CLIENTS
    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => { console.log("Cliente Desconectado") });
    client.on('mensaje', ( payload ) =>{
        console.log(payload);
        io.emit('mensaje', {admin: 'Nuevo Mensaje'});
    });
    /*client.on('emitir-mensaje', ( payload ) => {
        console.log(payload);
        // io.emit('nuevo-mensaje', payload);
        client.broadcast.emit('emitir-mensaje', payload); // Emite a todos menos al que lo emitio
    });*/
    // VOTE BANDS EVENT AND UPDATE ALL THE CONTENT TO ALL SUBSCRIBERS
    client.on('vote-band', (payload) => {
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });
    // ADD BAND EVENT AND UPDATE ALL THE CONTENT TO ALL SUBSCRIBERS
    client.on('add-band', (payload) => {
        bands.addBand(new Band(payload['name']));
        io.emit('active-bands', bands.getBands());
    });
    // DELETE BAND EVENT AND UPDATE ALL THE CONTENT TO ALL SUBSCRIBERS
    client.on('remove-band', (payload) => {
        // bands.addBand(new Band(payload['name']));
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });
});