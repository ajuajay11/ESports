module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("⚡ User connected:", socket.id);

    // PLAYER JOINS
    socket.on("join-room", async ({ matchId, userId, username }) => {
      socket.join(matchId);

      // Notify others (NOT the same user)
      socket.to(matchId).emit("userJoined", {
        userId,
        username,
        joinedAt: new Date(),
      });

      console.log(`Player ${username} joined match ${matchId}`);
    });

    // ADMIN OBSERVING (NOT joining)
    socket.on("observe-room", ({ matchId, adminName }) => {
      socket.join(matchId);
      socket.to(matchId).emit("admin-connected", adminName);
      console.log(`Admin connected to match ${matchId}`);
    });

    // PLAYER LEAVES ROOM
    socket.on("leave-room", ({ matchId, userId }) => {
      socket.leave(matchId);
      socket.to(matchId).emit("userLeft", userId);
      console.log(`User ${userId} left match ${matchId}`);
    });

    // DISCONNECT
    socket.on("disconnect", () => {
      console.log("❌ User disconnected:", socket.id);
    });
  });
};
