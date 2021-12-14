import React, {useContext, useRef, useState} from 'react';
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {Button, Card, Col, Row} from "antd";

export const Dialogs = observer(() => {

    const {profile} = useContext(Context);

    const [inputVal, setInputVal] = useState("");
    const [msgArr, setMsgArr] = useState([]);
    const socket = useRef();
    const [connected, setConnected] = useState(false);

    function connect() {
        /*socket.current = new WebSocket("ws://localhost:5000");*/
        socket.current = new WebSocket("ws://62.113.99.202:5000");
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
            <div style={{display: "flex", justifyContent: "center"}}>
                <Button onClick={connect} type="primary">enter the chat</Button>
            </div>
        )
    }

    return (
        <Row>
            <Col span={24}>
                <div style={{minHeight: "500px", height: "500px", overflowY:"scroll", display: "flex", flexDirection: "column", justifyContent: "end"}}>
                    {messageSort.map(msg =>
                        <Col style={{minHeight:"50px"}} key={msg.id}>
                            {msg.event === "connection"
                                ? <Card >Пользователь <b> {msg.userName} </b> присоединился</Card>
                                : <Card><b>{msg.userName} : </b>{msg.message}</Card>
                            }
                        </Col>)}
                </div>
                <Row style={{marginTop:"10px"}}>
                    <Col span={20}>
                        <input style={{width:"100%"}} value={inputVal} onChange={e => setInputVal(e.target.value)} type="text"/>
                    </Col>
                    <Col span={4}>
                        <Button style={{width:"100%"}} type="primary" onClick={sendMsg}>send message</Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
});