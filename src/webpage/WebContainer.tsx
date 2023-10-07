import {ApplicationContextStore} from "../context/ApplicationContext";
import {useContext} from "react";
import {verifyDictionary} from "../model/util/DictionaryVerification";
import {StudyContainer} from "./StudyContainer";

export function WebContainer() {
    const applicationContext = useContext(ApplicationContextStore)

    if(!applicationContext) {
        return <div>No dictionary data!</div>
    }

    const dictionary = applicationContext.dictionary;
    const categories = applicationContext.categories;

    console.log('DICTIONARY', dictionary);
    console.log('CATEGORIES', categories);

    const result = verifyDictionary(dictionary, categories)
    console.log('VERIFICATION RESULT', result)

    return <div>
        <StudyContainer/>
    </div>
}