const http = require("http");
const socketIO = require("socket.io");
const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();
const server = http.createServer();
const io = socketIO(server, {
	cors: {
		origin: "http://localhost:5173",
		methods: ["GET", "POST"],
		allowedHeaders: ["Content-Type"],
		credentials: true,
	},
});

io.on("connection", (socket) => {
	socket.on("join-chat", async (chatId) => {
		try {
			const chat = await prisma.chat.findUnique({
				where: {
					id: chatId,
				},
				include: {
					Matched: {
						select: {
							RequestedToName: true,
							RequestedByName: true,
							MatchRequestedBy: true,
						},
					},
				},
			});

			if (isArrayEmpty(chat)) {
				socket.emit("chat-messages", "empty");
				return;
			} else {
				socket.join(chatId);
				const messages = await prisma.message.findMany({
					where: {
						chatId,
					},
					include: {
						sender: true,
					},
				});
				socket.emit("chat-messages", { chatMessages: messages, chatName: chat.name, RequestedToName: chat.Matched.RequestedToName, RequestedByName: chat.Matched.RequestedByName });
			}
		} catch (error) {
			console.error("Error joining chat:", error);
		}
	});
	socket.on("send-message", async (messageData) => {
		try {
			const newMessage = await prisma.message.create({
				data: {
					content: messageData.content,
					senderId: messageData.senderId,
					chatId: messageData.chatId,
				},
				include: {
					sender: true,
				},
			});
			io.to(messageData.chatId).emit("new-message", newMessage);
		} catch (error) {
			console.error("Error sending message:", error);
		}
	});

	socket.on("disconnect", () => {
		//	console.log("A user disconnected");
	});
});

server.listen(3000, () => {
	console.log("Socket.IO Chatting server listening on port 3000");
});
function isArrayEmpty(arr) {
	return Array.isArray(arr) && arr.length === 0;
}
