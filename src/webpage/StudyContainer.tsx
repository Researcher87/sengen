import {Form, FormControl} from "react-bootstrap";
import {ChangeEvent, useContext, useState} from "react";
import {SenGenConfigurationContainer} from "./SenGenConfigurationContainer";
import {SenGenModel} from "../model/entities/SenGenModel";
import {ApplicationContextStore} from "../context/ApplicationContext";
import {generateSentence} from "../model/generation/SentenceGenerator";

export function StudyContainer() {
    const applicationContext = useContext(ApplicationContextStore)

    if(!applicationContext) {
        return <div>No application context.</div>
    }

    const [inputTargetLanguage, setInputTargetLanguage] = useState<string>("");
    const [sourceSentence, setSourceSentence] = useState<string>("He laughts");
    const [sourceSentence2, setSourceSentence2] = useState<string>("Er lacht");
    const [targetLanguageSolution, setTargetLanguageSolution] = useState<string>("");

    const {dictionary, categories, configuration} = applicationContext
    const senGenModel = new SenGenModel(dictionary, categories, configuration)

    const onShowSolution = () => {
        setTargetLanguageSolution("Él ridere")
    }

    const onNewSentence = () => {
        setTargetLanguageSolution("")
        setInputTargetLanguage("")

        const generatedSentece = generateSentence(senGenModel)
        console.log('SENTENCE:', generatedSentece)
    }

    const renderSourceSentence = () => {
        return <div>
            <p>{sourceSentence}</p>
            <p className={"study-area-source2"}>{sourceSentence2}</p>
        </div>
    }

    const renderTargetLanguageInput = () => {
        return <div>
            <Form.Label className="form-label">Spanish:</Form.Label>
            <FormControl
                type="text"
                value={inputTargetLanguage}
                onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setInputTargetLanguage(e.target.value)}
            />
            <div className={"study-area-solution"}>{targetLanguageSolution}</div>
        </div>
    }

    const renderControlButtons = () => {
        return <div className={"flex-row"}>
            <button className={"btn btn-primary app-button"} onClick={onNewSentence}>
                New sentence
            </button>
            <button className={"btn btn-primary app-button"} onClick={onShowSolution}>
                Show solution
            </button>
        </div>
    }

    return <div className={"d-flex flex-row justify-content-center"}>
        <div className={"d-flex"}>
            <SenGenConfigurationContainer/>
        </div>
        <div className={"study-area d-flex flex-column justify-content-center"}>
            {renderSourceSentence()}
            {renderTargetLanguageInput()}
            {renderControlButtons()}
        </div>
    </div>

}