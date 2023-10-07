import {SenGenModel} from "../entities/SenGenModel";
import {Adjective, DictionaryWord, Noun} from "../entities/dictionary/Dictionary";
import {NOUN_CLASS_OBJECT, NOUN_CLASS_PERSON} from "../config/Constants";

export function pickRandomNoun(senGenModel: SenGenModel, nounClasses: Array<string>): Noun | null {
    const {nouns} = senGenModel.dictionary
    const nounsToPick = nouns.filter(noun => {
        const categories = noun.categories;
        let validNoun = false;
        categories.forEach(category => {
            if(category.startsWith("noun.person") && nounClasses.includes(NOUN_CLASS_PERSON)
                || category.startsWith("noun.object") && nounClasses.includes(NOUN_CLASS_OBJECT)) {
                validNoun = true;
                return;
            }
        })
        return validNoun ? noun : undefined
    })

    if(nounsToPick.length === 0) {
        return null;
    }

    return (pickRandomWordFromList(nounsToPick) as Noun)
}


export function pickRandomAdjective(senGenModel: SenGenModel, allowedCategories: Array<string>): Adjective | null {
    const {adjectives} = senGenModel.dictionary
    const adjectivesToPick = adjectives.filter(adjective => {
        const categories = adjective.categories;
        let validAdjective = false;
        categories.forEach(category => {
            if(allowedCategories.length === 0 || allowedCategories.includes(category)) {
                validAdjective = true;
                return;
            }
        })
        return validAdjective ? adjective : undefined
    })

    if(adjectivesToPick.length === 0) {
        return null;
    }

    return (pickRandomWordFromList(adjectivesToPick) as Adjective)
}



export function pickRandomWordFromList(list: Array<DictionaryWord>): DictionaryWord {
    let weightSum = 0;
    list.forEach(dictionaryWord => {
        const weight = dictionaryWord.weight
        weightSum += weight
    })

    const randomWeightValue = weightSum * Math.random()
    let weightValue = 0;
    let correspondingIndex;

    for(correspondingIndex = 0; correspondingIndex < list.length; correspondingIndex++) {
        const weight = list[correspondingIndex].weight;
        weightValue += (weight != 0 ? weight : 1);
        if(weightValue >= randomWeightValue) {
            break;
        }
    }

    return list[correspondingIndex];
}