import React from "react";
import { useState, useEffect, useRef } from "react";
import LedOn from './img/led-on-1-64.png';
import LedOff from './img/led-off-1-64.png';
import {io} from 'socket.io-client';
const socket = io("http://localhost:4444")
export default function Arduino() {
    const [led, setLed] = useState(false)
    const image = useRef(null)

    useEffect(()=>{
        socket.on('led', isOn=>{
            setLed(isOn);
            isOn ? image.current.setAttribute('src', LedOn) : image.current.setAttribute('src', LedOff);
        })
    }, [])

    const handleLed = () => {
        led ? socket.emit('ledOff') : socket.emit('ledOn')
    }
    return (
        <div className="app">
            <img className="led-switch" onClick={handleLed} ref={image} alt="img" src={LedOff} />
        </div>
    )
}


 