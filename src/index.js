import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ProfileStore from "./mobx/ProfileStore";

export const Context = createContext(null);

ReactDOM.render(
    <Context.Provider value={{
        user: new ProfileStore()
    }}>
        <App/>
    </Context.Provider>,
    document.getElementById('root')
);

reportWebVitals();
