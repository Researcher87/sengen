import {Form, FormControl} from "react-bootstrap";
import {useContext} from "react";
import {ApplicationContextStore} from "../context/ApplicationContext";

export function SenGenConfigurationContainer() {
    const applicationContext = useContext(ApplicationContextStore)

    if (!applicationContext) {
        return <div>Application Context not available!</div>
    }

    const {configuration} = applicationContext;

    const changeSubjectTypePerson = () => {
        const prevState = configuration.subject.subjectTypes.person
        applicationContext.setConfiguration({
            ...configuration, subject: {
                ...configuration.subject, subjectTypes: {...configuration.subject.subjectTypes, person: !prevState}
            }
        })
    }

    const changeSubjectTypeObject = () => {
        const prevState = configuration.subject.subjectTypes.object
        applicationContext.setConfiguration({
            ...configuration, subject: {
                ...configuration.subject, subjectTypes: {...configuration.subject.subjectTypes, object: !prevState}
            }
        })
    }

    const changeSubjectOptionAdjective = () => {
        const prevState = configuration.subject.options.useAdjective
        applicationContext.setConfiguration({
            ...configuration, subject: {
                ...configuration.subject, options: {...configuration.subject.options, useAdjective: !prevState}
            }
        })
    }

    const changeSubjectOptionCombine = () => {
        const prevState = configuration.subject.options.combineTwoSubjects
        applicationContext.setConfiguration({
            ...configuration, subject: {
                ...configuration.subject, options: {...configuration.subject.options, combineTwoSubjects: !prevState}
            }
        })
    }

    const changeSentenceTypeS = () => {
        const prevState = configuration.sentenceTypes.subjectPhrase
        applicationContext.setConfiguration({
            ...configuration, sentenceTypes: {
                ...configuration.sentenceTypes, subjectPhrase: !prevState
            }
        })
    }

    const changeSentenceTypeSV = () => {
        const prevState = configuration.sentenceTypes.subjectVerb
        applicationContext.setConfiguration({
            ...configuration, sentenceTypes: {
                ...configuration.sentenceTypes, subjectVerb: !prevState
            }
        })
    }

    const changeSubjectClassPersonalPronoun = () => {
        const prevState = configuration.subject.subjectClasses.personalPronoun
        applicationContext.setConfiguration({
            ...configuration, subject: {
                ...configuration.subject, subjectClasses: {
                    ...configuration.subject.subjectClasses,
                    personalPronoun: !prevState
                }
            }
        })
    }

    const changeSubjectClassPossessivePronounAndNoun = () => {
        const prevState = configuration.subject.subjectClasses.possessivePronounAndNoun
        applicationContext.setConfiguration({
            ...configuration, subject: {
                ...configuration.subject, subjectClasses: {
                    ...configuration.subject.subjectClasses,
                    possessivePronounAndNoun: !prevState
                }
            }
        })
    }

    const changeSubjectClassDefArticleAndNoun = () => {
        const prevState = configuration.subject.subjectClasses.defArticleAndNoun
        applicationContext.setConfiguration({
            ...configuration, subject: {
                ...configuration.subject, subjectClasses: {
                    ...configuration.subject.subjectClasses,
                    defArticleAndNoun: !prevState
                }
            }
        })
    }

    return <div className={"sentence-configuration d-flex flex-column justify-content-start"}>
        <div className={"configuration-heading1"}>Settings</div>
        <div className={"configuration-heading2"}>Subject</div>
        <div className={"configuration-heading3"}>Types</div>
        <div style={{marginLeft: "1vw"}}>
            <Form.Check checked={configuration.subject.subjectTypes.person}
                        label={"Person"}
                        onChange={changeSubjectTypePerson}>
            </Form.Check>
            <Form.Check checked={configuration.subject.subjectTypes.object}
                        label={"Object"}
                        onChange={changeSubjectTypeObject}>
            </Form.Check>
        </div>
        <div className={"configuration-heading3"}>Noun classes</div>
        <div style={{marginLeft: "1vw"}}>
            <Form.Check className="form" checked={configuration.subject.subjectClasses.personalPronoun}
                        label={"Personal pronoun"}
                        onChange={changeSubjectClassPersonalPronoun}>
            </Form.Check>
            <Form.Check checked={configuration.subject.subjectClasses.defArticleAndNoun}
                        label={"Noun phrase with def. article"}
                        onChange={changeSubjectClassDefArticleAndNoun}>
            </Form.Check>
            <Form.Check checked={configuration.subject.subjectClasses.possessivePronounAndNoun}
                        label={"Noun phrase with possessive pronoun"}
                        onChange={changeSubjectClassPossessivePronounAndNoun}>
            </Form.Check>
        </div>
        <div className={"configuration-heading3"}>Options</div>
        <div style={{marginLeft: "1vw"}}>
            <Form.Check checked={configuration.subject.options.useAdjective}
                        label={"Use adjective with noun"}
                        onChange={changeSubjectOptionAdjective}>
            </Form.Check>
            <Form.Check checked={configuration.subject.options.combineTwoSubjects}
                        label={"Combine two subjects (and-conjunction)"}
                        onChange={changeSubjectOptionCombine}>
            </Form.Check>
        </div>
        <div className={"configuration-heading2"}>Sentence Types</div>
        <div style={{marginLeft: "1vw"}}>
            <Form.Check checked={configuration.sentenceTypes.subjectPhrase}
                        label={"Subject Phrase (S)"}
                        onChange={changeSentenceTypeS}>
            </Form.Check>
            <Form.Check checked={configuration.sentenceTypes.subjectVerb}
                        label={"Subject and intransitive verb (SV)"}
                        onChange={changeSentenceTypeSV}>
            </Form.Check>
        </div>
    </div>

}