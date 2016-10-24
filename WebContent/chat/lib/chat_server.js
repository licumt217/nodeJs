/**
 * Created by liqiang on 2016/10/19.
 */
'use strict';
var socketio=require('socket.io');
var io;
var guestNumber=1;
let nickNames={
    
};
let namesUsed=[];
var currentRoom={};
/**
 * 分配昵称
 * @param socket
 * @param guestNumber
 * @param nickNames
 * @param namesUsed
 * @returns {*}
 */
function assignGuestName(socket,guestNumber,nickNames,namesUsed){
    let name='Guest'+guestNumber;
    nickNames[socket.id]=name;
    socket.emit('nameResult',{
        success:true,
        name:name
    });
    namesUsed.push(name);
    return guestNumber+1;
}
function joinRoom(socket,room){
    socket.join(room);
    currentRoom[socket.id]=room;
    socket.emit('joinResult',{
        room:room
    });
    socket.broadcast.to(room).emit('message',{
        text:nickNames[socket.id]+'has joined '+room+'.'
    });
    var usersInRoom=io.sockets.clients(function () {
        return room;
    });
    if(usersInRoom.length>1){
        var usersInRoomSummary='Users currently in '+room +':';
        for(var index in usersInRoom){
            var userSocketId=usersInRoom[index].id;
            if(userSocketId!=socket.id){
                if(index>0){
                    usersInRoomSummary+=',';
                }
                usersInRoomSummary+=nickNames[userSocketId];
            }
        }
        usersInRoomSummary+='.';
        socket.emit('message',{
            text:usersInRoomSummary
        })
    }


}
/**
 * 修改昵称
 * @param socket
 * @param nickNames
 * @param namesUsed
 */
function handleNameChangeAttempts(socket,nickNames,namesUsed){
    socket.on('nameAttempt', function (name) {
        if(name.indexOf('Guest')==0){
            socket.emit('nameResult',{
                success:false,
                message:'names cannot begin with "Guest"'
            })
        }else{
            if(namesUsed.indexOf(name)==-1){
                var previousName=nickNames[socket.id];
                var previousNameIndex=namesUsed.indexOf(previousName);
                namesUsed.push(name);
                nickNames[socket.id]=name;
                delete namesUsed[previousNameIndex];
                socket.emit('nameResult',{
                    success:true,
                    name:name
                });
                socket.broadcast.to(currentRoom[socket.id]).emit('message',{
                    text:previousName+' is now known as '+name+'.'
                })
            }else{
                socket.emit('nameResult',{
                    success:false,
                    message:'that name is already in use.'
                })
            }
        }
    })
}
/**
 * 用户发的消息广播到房间内的别的用户
 * @param socket
 */
function handleMessageBroadcasting(socket){
    socket.on('message', function (message) {
        socket.broadcast.to(message.room).emit('message',{
            text:nickNames[socket.id]+': '+message.text
        })
    })
}
/**
 * 创建房间
 * @param socket
 */
function handleRoomJoining(socket){
    socket.on('join', function (room) {
        socket.leave(currentRoom[socket.id]);
        joinRoom(socket,room.newRoom);
    })
}
/**
 * 用户离开房间
 * @param socket
 * @param nickNames
 * @param namesUsed
 */
function handleClientDisconnection(socket,nickNames,namesUsed){
    socket.on('disconnection', function () {
        var nameIndex=namesUsed.indexOf(nickNames[socket.id]);
        delete namesUsed[nameIndex];
        delete nickNames[socket.id];
    })
}
exports.listen= function (server) {
    io=socketio.listen(server);
    io.sockets.on('connection', function (socket) {
        guestNumber=assignGuestName(socket,guestNumber,nickNames,namesUsed);
        joinRoom(socket,'Lobby');
        handleMessageBroadcasting(socket,nickNames);
        handleNameChangeAttempts(socket,nickNames,namesUsed);
        handleRoomJoining(socket);
        socket.on('rooms', function () {
            socket.emit('rooms',io.sockets.rooms);
        });
        handleClientDisconnection(socket,nickNames,namesUsed);
    })
}

