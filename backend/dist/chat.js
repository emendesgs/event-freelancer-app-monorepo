"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleChat = void 0;
const handleChat = (io) => {
    io.on('connection', (socket) => {
        console.log(`New client connected: ${socket.id}`);
        socket.on('joinRoom', (room) => {
            socket.join(room);
            console.log(`Socket ${socket.id} joined room ${room}`);
        });
        socket.on('leaveRoom', (room) => {
            socket.leave(room);
            console.log(`Socket ${socket.id} left room ${room}`);
        });
        socket.on('sendMessage', (data) => {
            io.to(data.room).emit('receiveMessage', data);
        });
        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
};
exports.handleChat = handleChat;
//# sourceMappingURL=chat.js.map