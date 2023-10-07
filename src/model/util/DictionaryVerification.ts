import {Dictionary, Noun, Adjective} from "../entities/dictionary/Dictionary";

export function verifyDictionary(dictionary: Dictionary, categories: Array<string>): Array<string> {
    const resultLog: Array<string> = []

    // I. Check nouns

    const nouns: Array<Noun> = dictionary.nouns;
    const nounsList: Array<string> = [];
    nouns.forEach(noun => {
        if(!isValidId(noun.id)) {
            resultLog.push(`Invalid noun in dictionary: ID is not valid (id = <${noun.id}>)`);
            return
        }

        if(nounsList.includes(noun.id)) {
            resultLog.push(`Invalid noun in dictionary: Noun has duplicate id (id = '${noun.id}')`);
            return;
        }

        nounsList.push(noun.id)

        const result = validateNoun(noun, categories)
        if(result) {
            resultLog.push(result)
        }
    })

    // II. Check adjectives

    const adjectives: Array<Adjective> = dictionary.adjectives;
    const adjectivesList: Array<string> = [];
    nouns.forEach(adjective => {
        if(!isValidId(adjective.id)) {
            resultLog.push(`Invalid adjective in dictionary: ID is not valid (id = <${adjective.id}>)`);
            return
        }

        if(adjectivesList.includes(adjective.id)) {
            resultLog.push(`Invalid adjective in dictionary: Adjective has duplicate id (id = '${adjective.id}')`);
            return;
        }

        adjectivesList.push(adjective.id)

        const result = validateNoun(adjective, categories)
        if(result) {
            resultLog.push(result)
        }
    })

    return resultLog;
}


function validateNoun(noun: Noun, categories: Array<string>): string | null {
    let result = null;

    noun.categories.forEach(category => {
        if(!categories.includes(category)) {
            result = `Invalid noun in dictionary: Category '${category}' does not exist.`
        }
    })

    if(!isValidLevel(noun.level)) {
        result = `Invalid noun in dictionary: Level '${noun.level}' is invalid.`
    }

    if(!isValidLevel(noun.weight)) {
        result = `Invalid noun in dictionary: Weight '${noun.weight}' is invalid.`
    }

    if(noun.plural_rate < 0 || noun.plural_rate > 1) {
        result = `Invalid noun in dictionary: Plural rate '${noun.plural_rate}' is invalid.`
    }

    noun.context.adjectives.forEach(adjCat => {
        if(!categories.includes(adjCat)) {
            result = `Invalid adjective category referenced in noun '${noun.id}' dictionary: Category '${adjCat}' does not exist.`
        }
    })

    return result;
}

function validateAdjective(adjective: Adjective, categories: Array<string>): string | null {
    let result = null;

    adjective.categories.forEach(category => {
        if(!categories.includes(category)) {
            result = `Invalid adjective in dictionary: Category '${category}' does not exist.`
        }
    })

    if(!isValidLevel(adjective.level)) {
        result = `Invalid noun in dictionary: Level '${adjective.level}' is invalid.`
    }

    if(!isValidWeight(adjective.level)) {
        result = `Invalid noun in dictionary: Weight '${adjective.weight}' is invalid.`
    }

    return result;
}

function isValidId(id: string): boolean {
    return id.trim().length === id.length && id.length > 1
}

function isValidWeight(weight: number): boolean {
    return weight > 0 && weight <= 10;
}

function isValidLevel(level: number): boolean {
    return level > 0 && level <= 10;
}