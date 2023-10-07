import {SenGenModel} from "../../entities/SenGenModel";
import {SenGenConfiguration} from "../../entities/SenGenConfiguration";
import {SentenceFragment, SentenceGenerationResult} from "../../entities/GeneratedSentence";
import {SUBJECT_PERSONAL_PRONOUN} from "../../config/FragmentTypes";
import {createPersonalPronoun} from "./PersonalPronounGenerator";
import {createDefArticleNounPhrase} from "./DefArticleNounGenerator";
import {NOUN_CLASS_OBJECT, NOUN_CLASS_PERSON} from "../../config/Constants";

const TYPE_PP = 0
const TYPE_DEF_ARTICLE_NP = 1

export function generateSubject(senGenModel: SenGenModel): Array<SentenceFragment> {
    const subjectTypes = makeAvailableSubjectTypes(senGenModel.configuration)
    const nounClasses = makeAvailableSubjectClasses(senGenModel.configuration);

    if(!subjectTypes || !nounClasses) {
        return []
    }

    const randomSubjectType = Math.floor(Math.random() * subjectTypes.length)
    const randomSubjectClass = Math.floor(Math.random() * nounClasses.length)

    const subjectType = subjectTypes[randomSubjectType]

    if(subjectType === TYPE_PP) {
        return createPersonalPronoun();
    }

    if(subjectType === TYPE_DEF_ARTICLE_NP) {
        return createDefArticleNounPhrase(senGenModel, nounClasses);
    }

    return []
}

function makeAvailableSubjectTypes(configuration: SenGenConfiguration): Array<number> {
    const {subjectClasses} = configuration.subject
    const classesToUse = []

    if(subjectClasses.personalPronoun) {
        classesToUse.push(TYPE_PP)
    }
    if(subjectClasses.defArticleAndNoun) {
        classesToUse.push(TYPE_DEF_ARTICLE_NP)
    }

    return classesToUse
}

function makeAvailableSubjectClasses(configuration: SenGenConfiguration): Array<string> {
    const {subjectTypes} = configuration.subject
    const typesToUse = []

    if(subjectTypes.person) {
        typesToUse.push(NOUN_CLASS_PERSON)
    }
    if(subjectTypes.object) {
        typesToUse.push(NOUN_CLASS_OBJECT)
    }

    return typesToUse
}