import React from "react";
import styles from "./App.module.css"
import {Header} from "./components/Header";
import {Aside} from "./components/Aside";
import {Content} from "./components/Content";

function App() {
  return (
      <div className={styles.globalWrapper}>
          <Header/>
          <Aside/>
          <Content/>
      </div>

  );
}

export default App;
