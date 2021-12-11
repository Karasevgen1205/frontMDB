import React, {useContext, useEffect} from 'react';
import {TrackItem} from "./TrackItem";
import {Context} from "../../../index";
import {musicAPI} from "../../../DAL/API";
import {observer} from "mobx-react-lite";

export const Music = observer( () => {

    const {music} = useContext(Context);

    musicAPI.getMusic().then(res => {
        console.log(res.data.data);
    })

    useEffect(() => {
        musicAPI.getMusic().then(res => {
            music.setTracks(res.data.data);
        }).finally(() => {
            return;
        })
    }, []);

    return (
        <div>
            Music

            {music.tracks.map(u => <TrackItem
                key={u.track_id}
                artist={u.artist}
                trackName={u.track_name}
                fileName={u.file_name}
            />)
            }
        </div>
    );
});