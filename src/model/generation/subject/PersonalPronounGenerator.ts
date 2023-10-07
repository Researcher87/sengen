import {FEMALE, MALE, PLURAL, PRONOUN_PERSONAL, SINGULAR} from "../../config/Constants";
import {
    SentenceFragment,
    SentenceGenerationResult,
    WordOfSentence
} from "../../entities/GeneratedSentence";
import {LANG_DE, LANG_EN, LANG_ES} from "../../config/Languages";
import {SUBJECT_PERSONAL_PRONOUN} from "../../config/FragmentTypes";

export function createPersonalPronoun(): Array<SentenceFragment> {
    const makeFragment = (wordOfSentence: WordOfSentence, language: number): SentenceFragment => {
        const wordList = new Array<WordOfSentence>()
        wordList.push(wordOfSentence)
        return {
            type: SUBJECT_PERSONAL_PRONOUN,
            person: person,
            grammaticalNumber: grammaticalNumber,
            gender: gender,
            language: language,
            words: wordList
        }
    }

    const person = getRandomPerson();
    const grammaticalNumber = getRandomNumerus();
    const gender = getRandomGender();

    const pronounEn = getPersonalPronoun(person, grammaticalNumber, gender, LANG_EN)
    const pronounDe = getPersonalPronoun(person, grammaticalNumber, gender, LANG_DE)
    const pronounEs = getPersonalPronoun(person, grammaticalNumber, gender, LANG_ES)

    if(!(pronounEn && pronounDe && pronounEs)) {
        return []
    }

    const fragmentEn = makeFragment(pronounEn, LANG_EN)
    const fragmentDe = makeFragment(pronounDe, LANG_DE)
    const fragmentEs = makeFragment(pronounEs, LANG_ES)

    const generatedFragments = new Array<SentenceFragment>();
    generatedFragments.push(fragmentEn)
    generatedFragments.push(fragmentDe)
    generatedFragments.push(fragmentEs)

    return generatedFragments
}

function getRandomPerson(): number {
    const rand = Math.random();
    if (rand < 0.3) {
        return 1;
    } else if (rand < 0.55) {
        return 2;
    } else {
        return 3;
    }
}

function getRandomNumerus(): number {
    const rand = Math.random();
    return rand < 0.5 ? SINGULAR : PLURAL
}


function getRandomGender(): number {
    const rand = Math.random();
    return rand < 0.5 ? MALE : FEMALE
}

function getPersonalPronoun(person: number, grammaticalNumber: number, gender: number, language: number): WordOfSentence | null {
    switch (language) {
        case LANG_EN:
            return {
                category: PRONOUN_PERSONAL,
                word: {word: getEnglishPersonalPronoun(person, grammaticalNumber, gender)}
            }
        case LANG_DE:
            return {
                category: PRONOUN_PERSONAL,
                word: {word: getGermanPersonalPronoun(person, grammaticalNumber, gender)}
            }
        case LANG_ES:
            return {
                category: PRONOUN_PERSONAL,
                word: {word: getSpanishPersonalPronoun(person, grammaticalNumber, gender)}
            }
    }

    return null;
}

function getEnglishPersonalPronoun(person: number, grammaticalNumber: number, gender: number): string {
    switch (person) {
        case 1:
            return grammaticalNumber === SINGULAR ? "I" : "we"
        case 2:
            return "you"
        case 3:
            if (grammaticalNumber === PLURAL) {
                return "they"
            }
            switch (gender) {
                case MALE:
                    return "he"
                case FEMALE:
                    return "she"
            }
    }

    return ""
}

function getGermanPersonalPronoun(person: number, grammaticalNumber: number, gender: number): string {
    switch (person) {
        case 1:
            return grammaticalNumber === SINGULAR ? "ich" : "wir"
        case 2:
            return grammaticalNumber === SINGULAR ? "du" : "ihr"
        case 3:
            if (grammaticalNumber === PLURAL) {
                return "sie"
            }
            switch (gender) {
                case MALE:
                    return "er"
                case FEMALE:
                    return "sie"
            }
    }

    return ""
}

function getSpanishPersonalPronoun(person: number, grammaticalNumber: number, gender: number): string {
    switch (person) {
        case 1:
            return grammaticalNumber === SINGULAR ? "yo" : "vosotros"
        case 2:
            return grammaticalNumber === SINGULAR ? "tú" : "nosotros"
        case 3:
            if (grammaticalNumber === SINGULAR) {
                switch (gender) {
                    case MALE:
                        return "él"
                    case FEMALE:
                        return "ella"
                }
            } else {
                switch (gender) {
                    case MALE:
                        return "ellos"
                    case FEMALE:
                        return "ellas"
                }
            }
    }

    return ""
}