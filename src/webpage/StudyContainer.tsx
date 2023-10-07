import {Form, FormControl} from "react-bootstrap";
import {ChangeEvent, useContext, useEffect, useState} from "react";
import {SenGenConfigurationContainer} from "./SenGenConfigurationContainer";
import {SenGenModel} from "../model/entities/SenGenModel";
import {ApplicationContextStore} from "../context/ApplicationContext";
import {generateSentence} from "../model/generation/SentenceGenerator";
import {resolveSentence} from "../model/generation/SentenceResolver";
import {LANG_DE, LANG_EN, LANG_ES} from "../model/config/Languages";

export function StudyContainer() {
    const applicationContext = useContext(ApplicationContextStore)

    if (!applicationContext) {
        return <div>No application context.</div>
    }

    const [inputTargetLanguage, setInputTargetLanguage] = useState<string>("");
    const [sourceSentence, setSourceSentence] = useState<string>("");
    const [sourceSentence2, setSourceSentence2] = useState<string>("");
    const [targetLanguageSolution, setTargetLanguageSolution] = useState<string>("");

    const [showSolution, setShowSolution] = useState<boolean>(false);
    const [match, setMatch] = useState<boolean | null>(null);
    const [counterWasUsed, setCounterWasUsed] = useState<boolean>(false);

    const [counterGeneration, setCounterGeneration] = useState<number>(0);
    const [counterRight, setCounterRight] = useState<number>(0);
    const [counterWrong, setCounterWrong] = useState<number>(0);

    const {dictionary, categories, configuration} = applicationContext
    const senGenModel = new SenGenModel(dictionary, categories, configuration)

    const onShowSolution = () => {
        setShowSolution(true)
        setTargetLanguageSolution(targetLanguageSolution)
        setCounterWasUsed(true)
    }

    const onTypeInputField = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (match !== null) {
            setMatch(null)
        }

        setInputTargetLanguage(e.target.value)
    }

    const onCheckInput = () => {
        const inputCorrect = targetLanguageSolution.toLowerCase() === inputTargetLanguage.trim().toLowerCase()
        if (!counterWasUsed) {
            if (inputCorrect) {
                setCounterRight(counterRight + 1)
            } else {
                setCounterWrong(counterWrong + 1)
            }
        }

        setMatch(inputCorrect)
        setShowSolution(true)
        setCounterWasUsed(true)
    }

    const onNewSentence = () => {
        setTargetLanguageSolution("")
        setInputTargetLanguage("")
        setMatch(null)
        setCounterGeneration(counterGeneration + 1)
        setCounterWasUsed(false)

        const generatedSentence = generateSentence(senGenModel)
        if (!generatedSentence || !generatedSentence.generatedSentences) {
            console.error("Could not create sentence.")
            return
        }

        const englishSentence = generatedSentence.generatedSentences.find(sentence => sentence.language === LANG_EN);
        const germanSentence = generatedSentence.generatedSentences.find(sentence => sentence.language === LANG_DE);
        const spanishSentence = generatedSentence.generatedSentences.find(sentence => sentence.language === LANG_ES);

        if (!englishSentence || !germanSentence || !spanishSentence) {
            console.error("Could not create sentence of specific language.")
            return
        }

        const englishResult = resolveSentence(englishSentence);
        setSourceSentence(englishResult);

        const germanResult = resolveSentence(germanSentence);
        setSourceSentence2(germanResult);

        const spanishResult = resolveSentence(spanishSentence);
        setTargetLanguageSolution(spanishResult);

        setShowSolution(false)
    }

    const onGoogleTranslate = () => {
        const sentence = targetLanguageSolution.replace(" ", "%20");
        const queryString = "hl=de&sl=" + "es" + "&tl=en&text=" + sentence + "&op=translate";

        const url = "https://translate.google.com/?" + queryString;
        window.open(url, "_blank");
    }

    const renderSourceSentence = () => {
        return <div>
            <div className="study-area-source">{sourceSentence}</div>
            <div className={"study-area-source2"}>{sourceSentence2}</div>
        </div>
    }

    const renderTargetLanguageInput = () => {
        let bgColor = "#fff"
        if (match !== null) {
            bgColor = match ? "#bfb" : "#fbb"
        }

        return <div>
            <Form.Label className="form-label">Spanish:</Form.Label>
            <FormControl
                type="text"
                value={inputTargetLanguage}
                onChange={onTypeInputField}
                style={{backgroundColor: bgColor}}
            />
            <div className={"study-area-solution"}>
                {showSolution ?
                    <span className={"d-flex flew-row justify-content-center align-items-baseline"}>
                        <span style={{paddingRight: "1ch"}}>
                            {targetLanguageSolution}
                         </span>
                         <button className={"btn btn-link"} onClick={onGoogleTranslate}>Google Translate</button>
                    </span>
                    :
                    <span> </span>
                }
            </div>
        </div>
    }

    const checkButtonDisbled = !inputTargetLanguage.length

    const renderControlButtons = () => {
        return <div className={"flex-row"} style={{paddingTop: "2vh"}}>
            <button className={"btn btn-primary study-area-button"} onClick={onNewSentence}>
                New sentence
            </button>
            <button className={"btn btn-primary study-area-button"} onClick={onCheckInput}
                    disabled={checkButtonDisbled}>
                Check input
            </button>
            <button className={"btn btn-danger study-area-button"} onClick={onShowSolution}>
                Show solution
            </button>
        </div>
    }

    const renderCounterText = () => {
        return <div className={"d-flex flex-row justify-content-start"} style={{paddingTop: "2.5vh"}}>
            <div style={{width: "30ch"}}>
                <span><b>Generated sentences: </b>{counterGeneration}</span>
            </div>
            <div style={{width: "20ch"}}>
                <span><b>Correct: </b></span>{counterRight}
            </div>
            <div style={{width: "20ch"}}>
                <span><b>Wrong: </b></span>{counterWrong}
            </div>
        </div>
    }

    useEffect(() => {
        onNewSentence()
    }, [])

    return <div className={"d-flex flex-row justify-content-center"}>
        <div className={"flex-column justify-content-start"}>
            <SenGenConfigurationContainer/>
        </div>
        <div className={"study-area d-flex flex-column justify-content-center"}>
            {renderSourceSentence()}
            {renderTargetLanguageInput()}
            {renderControlButtons()}
            {renderCounterText()}
        </div>
    </div>

}