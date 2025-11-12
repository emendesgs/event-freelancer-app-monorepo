import { Server, Socket } from 'socket.io';

export const handleChat = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log(`New client connected: ${socket.id}`);

    socket.on('joinRoom', (room: string) => {
      socket.join(room);
      console.log(`Socket ${socket.id} joined room ${room}`);
    });

    socket.on('leaveRoom', (room: string) => {
      socket.leave(room);
      console.log(`Socket ${socket.id} left room ${room}`);
    });

    socket.on('sendMessage', (data: { room: string; message: string; sender: string }) => {
      // Here you would save the message to the database
      // For now, just broadcast it to the room
      io.to(data.room).emit('receiveMessage', data);
    });

    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
};