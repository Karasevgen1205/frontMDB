import React, {useRef, useState} from 'react';
import {Button, Card} from "antd";
import {PlayCircleFilled, PauseCircleFilled, SearchOutlined} from '@ant-design/icons';
import {URL_AVA} from "../../../DAL/API";


export const TrackItem = (props) => {

    const myRef = useRef();

    const [isPlay, setIsPlay] = useState(false);

    const play = () => {
        if(!isPlay) {
            setIsPlay(true)
            myRef.current.play()
        } else {
            setIsPlay(false)
            myRef.current.pause()
        }
    }

    return (
        <div>
            <Card>
                <Button onClick={play} style={{marginRight: '15px'}} type="primary" shape="circle" icon={isPlay
                    ? <PauseCircleFilled />
                    : <PlayCircleFilled/>
                } />
                <audio ref={myRef} src={URL_AVA + props.fileName}/>
                {props.artist} - {props.trackName}
            </Card>
        </div>
    );
};