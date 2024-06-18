require("dotenv").config();
const mainRouter = require("./src/routes");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const i18n = require("./src/config/i18n");
const passport = require("passport");
const session = require("express-session");
const db = require("./src/db/index");
const { Server } = require("socket.io");
const { createServer } = require("http");
const jwt = require("jsonwebtoken");
const User = require("./src/models/User");
const Message = require("./src/models/Message");
const EscrowRoom = require("./src/models/EscrowRoom");
const cookieParser = require('cookie-parser');

const port = process.env.PORT || 3000;

//test
app.use(cookieParser());

const allowedOrigins = ['http://localhost:3000'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(i18n.init);
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("public"));
db.sync();
app.use("/api", mainRouter);
const httpServer = createServer(app);
const io = new Server(httpServer);

const verifyTokenSocket = (socket, next) => {
  const token = socket.handshake.headers.auth;

  try {
    const userId = jwt.verify(token, process.env.SECRET_KEY);
    socket.userId = userId._id;
    next();
  } catch (err) {
    console.log("Token inválido o expirado");
    socket.disconnect();
  }
};

io.of("/chat")
  .use(verifyTokenSocket)
  .on("connection", async (socket) => {
    const userId = socket.userId;
    const user = await User.findByPk(userId);
    const escrowId = socket.handshake.headers.escrowid;
    socket.join(escrowId);

    const [room, created] = await EscrowRoom.findOrCreate({
      where: { userId, escrowId },
      defaults: { lastReadMessageId: null, unreadMessages: 0 },
    });

    socket.on("disconnect", () => {
      console.log("Usuario desconectado ", user.dataValues.username);
    });

    socket.on("message", async (message) => {
      const newMessage = await Message.create({
        userId,
        escrowId,
        message,
      });

      io.of("/chat").to(escrowId).emit("message", {
        user: user,
        message: message,
        timestamp: newMessage.timestamp,
      });

      socket.to(escrowId).emit("unreadCount", 0);
    });

    socket.on("markAsRead", async () => {
      await room.update({ unreadMessages: 0 });
      console.log(
        `Usuario ${user.dataValues.username} marcó mensajes como leídos`
      );
    });

    socket.on("getUnreadCount", async () => {
      console.log("getUnreadCount");
      socket.emit("unreadCount", 0);
    });
  });

httpServer.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
