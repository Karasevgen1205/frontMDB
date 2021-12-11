import {makeAutoObservable} from "mobx";

export default class MusicStore {
    constructor() {
        this._tracks = [];

        makeAutoObservable(this)
    }

    setTracks(tracks) {
        this._tracks = tracks;
    }

    get tracks() {
        return this._tracks
    }
}