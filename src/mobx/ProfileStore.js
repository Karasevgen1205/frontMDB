import {makeAutoObservable} from "mobx";

export default class ProfileStore {
    constructor() {
        this._isAuth = false;
        this._userName = "";
        this._avaUrl = "";
        this._posts = [];

        makeAutoObservable(this)
    }
    setIsAuth(bool) {
        this._isAuth = bool;
    }
    setUserName(userName) {
        this._userName = userName;
    }
    setAvaUrl(avaUrl) {
        this._avaUrl = avaUrl;
    }
    setPosts(posts) {
        this._posts = posts;
    }

    getIsAuth() {
        return this._isAuth
    }
    getUserName() {
        return this._userName
    }
    getAvaUrl() {
        return this._avaUrl
    }
    getPosts() {
        return this._posts
    }

}