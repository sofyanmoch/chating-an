const express = require('express')
const http = require('http')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

//socket io
io.on('connection',(socket) => {
    console.log('user connected')

    //username bergabung
    socket.on('notification', (username) => {
        io.emit('get-notification', `${username} sudah bergabung`)
    })

    //kita terima pesan dari emit(pemancar) front end
    socket.on('send-message', (payload) => {
        io.emit('get-message',`${payload.username} : ${payload.message}`)
    })

    socket.on('disconnect', () => {
        console.log('user disconnect')
    })
})

const PORT = 3000
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})