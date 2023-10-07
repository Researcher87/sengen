import React from 'react';
import './App.css';
import ApplicationDataContextProvider, {ApplicationContextStore} from "../context/ApplicationContext";
import {WebContainer} from "./WebContainer";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function App() {
    return (
        <div>
            <ApplicationDataContextProvider>
                <WebContainer/>
            </ApplicationDataContextProvider>
        </div>
    );
}

export default App;
