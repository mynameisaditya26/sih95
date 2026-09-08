const app = require('./app');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');
const { initSocket } = require('./services/socketService');

dotenv.config();
const PORT = process.env.PORT || 5000;
connectDB();

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: process.env.CLIENT_URL || 'http://localhost:3000', methods: ['GET','POST'] } });
initSocket(io);

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);
  socket.on('disconnect', () => console.log('Client disconnected:', socket.id));
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
process.on('unhandledRejection', (err) => { console.log(err.message); server.close(() => process.exit(1)); });
