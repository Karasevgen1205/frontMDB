import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._users = [];

        makeAutoObservable(this)
    }

    setUsers(users) {
        this._users = users;
    }

    get users() {
        return this._users
    }
}