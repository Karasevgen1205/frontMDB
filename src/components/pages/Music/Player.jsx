import React, {useState} from 'react';
import {Card, Slider} from "antd";
import styles from "./Player.module.css"
import {PauseCircleFilled, PlayCircleFilled} from '@ant-design/icons';

export const Player = () => {
    const [isPlay, setIsPlay] = useState(false);

    function onChange(value) {
        console.log('onChange: ', value);
    }

    function onAfterChange(value) {
        console.log('onAfterChange: ', value);
    }

    return (
        <div>
            <Card className={styles.player}>
                {isPlay
                    ? <PauseCircleFilled style={{fontSize: '36px', cursor: 'pointer', marginRight: "15px"}}/>
                    : <PlayCircleFilled style={{fontSize: '36px', cursor: 'pointer', marginRight: "15px"}}/>
                }
                <Slider style={{display: 'inline-block', width: '90%'}} defaultValue={30} onChange={onChange} onAfterChange={onAfterChange} />
            </Card>
        </div>
    );
};