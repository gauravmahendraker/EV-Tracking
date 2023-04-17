const io = require("socket.io")();
const socketapi = {
    io: io
};

// Add your socket.io logic here!
io.on("connection", function (socket) {
    console.log("A user connected");

    socket.on("message", (data) => {
        console.log("message from client", data);
        // broadcast received message to all other clients
        socket.broadcast.emit("message", {message: "Hello from server: " + data.message})
    });

    socket.on("end", () => {
        console.log("user left");
    })
});
// end of socket.io logic


module.exports = socketapi;