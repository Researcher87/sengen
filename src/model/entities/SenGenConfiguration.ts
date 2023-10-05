export interface SenGenConfiguration {
    subject: {
        subjectTypes: {
            person: boolean
            object: boolean
        },
        subjectClasses: {
            personalPronoun: boolean,
            possessivePronounAndNoun: boolean
            defArticleAndNoun: boolean
        },
        options: {
            useAdjective: boolean
            combineTwoSubjects: boolean
        }
    },
    sentenceTypes: {
        subjectPhrase: boolean
        subjectVerb: boolean
    }
}

export const initialSenGenConfiguration: SenGenConfiguration = {
    subject: {
        subjectTypes: {
            person: true,
            object: true,
        },
        subjectClasses: {
            personalPronoun: true,
            possessivePronounAndNoun: false,
            defArticleAndNoun: true,
        },
        options: {
            useAdjective: true,
            combineTwoSubjects: false
        }
    },
    sentenceTypes: {
        subjectPhrase: true,
        subjectVerb: false
    }
}