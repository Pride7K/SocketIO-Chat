const express = require("express")

const path = require("path")


const app = express();

const server = require("http").createServer(app)

const { Server } = require("socket.io");

const io = new Server(server)

app.use(express.static(path.join(__dirname, "public")))

app.set("views", path.join(__dirname, "public"))

app.engine("html", require("ejs").renderFile)

app.set("view engine", "html")


app.use("/", (req, resp) => {
    resp.render("index.html")
})

let messages = []

io.on("connection", socket => {
    console.log("Socket conectado " + socket.id)

    socket.emit("previousMessages",messages)

    socket.on("sendMessage",data=>{
        messages.push(data)

        socket.broadcast.emit("receviedMessage",data)
    })


})


server.listen(3000)