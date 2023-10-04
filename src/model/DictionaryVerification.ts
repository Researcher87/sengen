import {Dictionary, Noun} from "./Dictionary";

export function verifyDictionary(dictionary: Dictionary, categories: Array<String>): Array<String> {
    const resultLog: Array<String> = []

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

    return resultLog;
}


function validateNoun(noun: Noun, categories: Array<String>): string | null {
    let result = null;

    noun.categories.forEach(category => {
        if(!categories.includes(category)) {
            result = `Invalid noun in dictionary: Category '${category}' does not exist.`
        }
    })

    if(noun.level <= 0 || noun.level > 10) {
        result = `Invalid noun in dictionary: Level '${noun.level}' is invalid.`
    }

    if(noun.weight <= 0 || noun.weight > 10) {
        result = `Invalid noun in dictionary: Weight '${noun.weight}' is invalid.`
    }

    if(noun.plural_rate < 0 || noun.plural_rate > 1) {
        result = `Invalid noun in dictionary: Plural rate '${noun.plural_rate}' is invalid.`
    }


    return result;
}



function isValidId(id: string): boolean {
    return id.trim().length === id.length && id.length > 1
}