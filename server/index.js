import express from "express"
import { Server } from "socket.io"
import path from "path"
import { fileURLToPath } from "url"

const __fileName = fileURLToPath(import.meta.url)
const __dirName =path.dirname(__fileName)

const app = express()
const port = process.env.PORT || 3500


const httpServer = app.listen(port, () => {
    console.log(`app is running on port :${port}`)
})

app.use(express.static(path.join(__dirName, "public")))

const io = new Server(httpServer, {
    cors: {
        origin: process.env.NODE_ENV === "production" ? false : ["http://localhost:5500", "http://127.0.0.1:5500"]
    }
})

io.on("connection", socket => {
    console.log(`User : ${socket.id} connected`)
    socket.on("message", data => {
        console.log(data)
        io.emit('message', `${socket.id.substring(0, 5)}: ${data}`)
    })
})

