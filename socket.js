module.exports = (io) => {
 io.on("connection",(socket)=>{
    console.log("A user connected", socket.id);
    socket.on("joinroom", ({matchId, userId, username})=>{
        socket.join(matchId);
        io.to(matchId).emit("userJoined",{
            userId,joinedAt:new Date(), username
        })
    })

    socket.on("disconnect", ()=>{
        console.log("disconnecred", socket.id)
    })
 })
};
