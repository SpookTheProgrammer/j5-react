import http from 'http'
import five from 'johnny-five'
import {Server} from 'socket.io'

const PORT = 4444;
const server = http.createServer()
const io = new Server(server, {cors: { origin: '*'} });
const board = new five.Board({port: "COM3", repl: false})

let isOn = false
io.on("connection", (socket)=> {
    console.log("User connect");
    io.emit('led', isOn)

    if(board.isReady) {
        const led = new five.Led(4)

        socket.on('ledOn', ()=> {
            isOn = true;
            led.on()
            led.blink()
            io.emit('led', isOn)

        })
        
        socket.on('ledOff', ()=> {
            isOn = false;
            led.off()
            io.emit('led', isOn)
        })
    }
})

server.listen(PORT, ()=> {
    console.log('Listening on port ${PORT}');
})