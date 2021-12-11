import React, {useContext, useRef, useState} from 'react';
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import styles from "./Dialogs.module.css"

export const Dialogs = observer(() => {

    const {profile} = useContext(Context);

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
                event: "connection",
                userName: profile.userName
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
            id: new Date(),
            userName: profile.userName,
            message: inputVal
        };
        socket.current.send(JSON.stringify(message));
        setInputVal("")
    };

    const messageSort = msgArr.slice().sort(function(a, b) {
        return a.id - b.id;
    });

    if (!connected) {
        return (
            <div>
                <button onClick={connect}>login in chat</button>
            </div>
        )
    }

    return (
        <div className={styles.contentWrapper}>
            <div>
                {messageSort.map(msg =>
                    <div key={msg.id}>
                        {msg.event === "connection"
                            ? <div>Пользователь <b> {msg.userName} </b> присоединился</div>
                            : <div><b>{msg.userName} : </b>{msg.message}</div>
                        }
                    </div>)}
            </div>
            <div>
                <input value={inputVal} onChange={e => setInputVal(e.target.value)} type="text"/>
                <button onClick={sendMsg}>send message</button>
            </div>
        </div>
    );
});