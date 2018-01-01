// Version: 0.1.0 - Cleanup of initial Version

module.exports = function (sio) {
  var config = require('./../configurations/config');
  var log = require('tracer').colorConsole(config.loggingConfig);
  var io = sio.of('/netplayers');
  var inspect = require('util').inspect;

  io.on('connection', function(socket){
    var token = socket.client.request.decoded_token;
    var username = token.name;
    var id = socket.id;
    var currentRoom = '0'; //Room names are based off Map ID
    log.info('token='+inspect(token));
    socket.emit('MyID', {id: id, room: currentRoom, name: username,lv:token.lv});

    //Gather XY Position and broadcast to all other players
    socket.on('DestinationXY', function(data){
      socket.broadcast.to(currentRoom).emit('NetworkPlayersXY', data);
    });

    socket.on('changeRoom', function(data){
      socket.broadcast.to(currentRoom).emit('removePlayer',{id: id, room: currentRoom});
      socket.leave(currentRoom);
      currentRoom = data;
      socket.join(data);
      socket.emit('changeRoomVar', data);
    });

    socket.on('disconnect', function(socket){
      io.in(currentRoom).emit('removePlayer',{id: id, room: currentRoom});
    });
  });
};
