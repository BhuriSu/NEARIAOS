let users = [];

const socketServer = (socket) => {
  const userId = socket.decoded ? socket.decoded.userId : null;
  if (userId) {
    users.push({ userId, socketId: socket.id });

    socket.on("send-message", (recipientUserId, username, content) => {
      const recipient = users.find((user) => user.userId == recipientUserId);
      if (recipient) {
        socket
          .to(recipient.socketId)
          .emit("receive-message", userId, username, content);
      }
    });

    socket.on("disconnect", () => {
      users = users.filter((user) => user.userId != userId);
    });
  } else {
    console.error("Socket connection does not have user information.");
    // Handle the case where userId is not available, such as logging or sending an error response.
  }
};

export default socketServer;