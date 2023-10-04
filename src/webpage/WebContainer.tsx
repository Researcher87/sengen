import {ApplicationContextStore} from "./context/ApplicationContext";
import {useContext} from "react";

export function WebContainer() {
    const applicationContext = useContext(ApplicationContextStore)

    if(!applicationContext) {
        return <div>No dictionary data!</div>
    }

    console.log('DICTIONARY', applicationContext.dictionary);

    return <div>My Container</div>
}