import React, {useRef, useState} from 'react';

export const Dialogs = () => {

    const [inputVal, setInputVal] = useState("");
    const [msgArr, setMsgArr] = useState([]);
    const socket = useRef();
    const [connected, setConnected] = useState(false);

    function connect() {
        socket.current = new WebSocket("ws://localhost:5000");
        socket.current.onopen = () => {
            console.log("socket connected");
            setConnected(true);
            const message = {
                event: "connection"
            };
            socket.current.send(JSON.stringify(message))
        };
        socket.current.onmessage = (event) => {
            const message = JSON.parse(event.data);
            setMsgArr(prev => [message, ...prev])
        };
        socket.current.onclose = () => {
            console.log("Socket closed")
        };
        socket.current.onerror = () => {
            console.log("Error")
        }
    }
    
    const sendMsg = async () => {
        const message = {
            event: "message",
            message: inputVal
        }
        socket.current.send(JSON.stringify(message))
    };

    if(!connected) {
        return (
            <div>
                <button onClick={connect}>login in chat</button>
            </div>
        )
    }

    return (
        <div>
            <div>
                {msgArr.map(msg => <div key={msg.message}>{msg.message}</div>)}
            </div>
            <div>
                <input value={inputVal} onChange={e => setInputVal(e.target.value)} type="text"/>
                <button onClick={sendMsg}>send message</button>
            </div>
        </div>
    );
};