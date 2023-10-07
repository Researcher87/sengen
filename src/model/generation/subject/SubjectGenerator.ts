import {SenGenModel} from "../../entities/SenGenModel";
import {SenGenConfiguration} from "../../entities/SenGenConfiguration";
import {SentenceFragment, SentenceGenerationResult} from "../../entities/GeneratedSentence";
import {SUBJECT_PERSONAL_PRONOUN} from "../../config/FragmentTypes";
import {createPersonalPronoun} from "./PersonalPronounGenerator";

const TYPE_S = 0
const TYPE_SV = 1

const CLASS_PERSON = 0
const CLASS_OBJECT = 1

export function generateSubject(senGenModel: SenGenModel): Array<SentenceFragment> {
    const subjectTypes = makeAvailableSubjectTypes(senGenModel.configuration)
    const subjectClasses = makeAvailableSubjectClasses(senGenModel.configuration);

    if(!subjectTypes || !subjectClasses) {
        return []
    }

    const randomSubjectType = Math.random() * subjectTypes.length
    const randomSubjectClass = Math.random() * subjectClasses.length

    const subjectType = subjectTypes[randomSubjectType]

    if(subjectType === TYPE_S) {
        return createPersonalPronoun();
    }

    return []
}

function makeAvailableSubjectTypes(configuration: SenGenConfiguration): Array<number> {
    const {subjectClasses} = configuration.subject
    const classesToUse = []

    if(subjectClasses.personalPronoun) {
        classesToUse.push(TYPE_S)
    }
    if(subjectClasses.possessivePronounAndNoun) {
        classesToUse.push(TYPE_SV)
    }

    return classesToUse
}

function makeAvailableSubjectClasses(configuration: SenGenConfiguration): Array<number> {
    const {subjectTypes} = configuration.subject
    const typesToUse = []

    if(subjectTypes.person) {
        typesToUse.push(CLASS_PERSON)
    }
    if(subjectTypes.object) {
        typesToUse.push(CLASS_OBJECT)
    }

    return typesToUse
}