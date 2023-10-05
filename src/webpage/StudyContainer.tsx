import {Form, FormControl} from "react-bootstrap";
import {ChangeEvent, useState} from "react";
import {SenGenConfigurationContainer} from "./SenGenConfigurationContainer";

export function StudyContainer() {
    const [inputTargetLanguage, setInputTargetLanguage] = useState<string>("");
    const [sourceSentence, setSourceSentece] = useState<string>("He laughts");
    const [sourceSentence2, setSourceSentece2] = useState<string>("Er lacht");
    const [targetLanguageSolution, setTargetLanguageSolution] = useState<string>("");

    const onShowSolution = () => {
        setTargetLanguageSolution("Él ridere")
    }

    const onNewSentence = () => {
        setTargetLanguageSolution("")
        setInputTargetLanguage("")
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