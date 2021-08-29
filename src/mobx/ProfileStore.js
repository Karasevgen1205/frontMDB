import {makeAutoObservable} from "mobx";

export default class ProfileStore {
    constructor() {
        this._isAuth = false;
        this._isReg = false;
        this._preload = false;
        this._userName = "";
        this._avaUrl = "";
        this._posts = [];
        this._users = [];

        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool;
    }

    setIsReg(bool) {
        this._isReg = bool;
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

    setPreload(bool) {
        this._preload = bool;
    }
    setUsers(users) {
        this._users = users;
    }

    get isAuth() {
        return this._isAuth
    }

    get isReg() {
        return this._isReg
    }

    get userName() {
        return this._userName
    }

    get avaUrl() {
        return this._avaUrl
    }

    get posts() {
        return this._posts
    }

    get preload() {
        return this._preload
    }
    get users() {
        return this._users
    }
}