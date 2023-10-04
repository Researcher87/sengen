import React from 'react';
import './App.css';
import ApplicationDataContextProvider, {ApplicationContextStore} from "./context/ApplicationContext";
import {WebContainer} from "./WebContainer";

function App() {
    return (
        <div className="App">
            <ApplicationDataContextProvider>
                <WebContainer/>
            </ApplicationDataContextProvider>
        </div>
    );
}

export default App;
