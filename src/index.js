import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ProfileStore from "./mobx/ProfileStore";
import UserStore from "./mobx/UserStore";
import MusicStore from "./mobx/MusicStore";

export const Context = createContext(null);

ReactDOM.render(
    <Context.Provider value={{
        profile: new ProfileStore(),
        users: new UserStore(),
        music: new MusicStore()
    }}>
        <App/>
    </Context.Provider>,
    document.getElementById('root')
);

reportWebVitals();
