const emit = require('./srvComManager');
const connection = function(io) {
    io.on('connection', function(socket) {
        emit(socket, io);
    });
};

module.exports = connection;