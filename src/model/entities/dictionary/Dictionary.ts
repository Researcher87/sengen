/**
 * Representation of the whole dictionary
 */
export interface Dictionary {
    nouns: Array<Noun>
    adjectives: Array<Adjective>
}

/**
 * Abstract structure for a word in the dictionary.
 */
export interface DictionaryWord {
    id: string
    level: number
    weight: number
    categories: Array<string>
}


/**
 * Representation of a noun in the dictionary (abstract noun for all languages).
 */
export interface Noun extends DictionaryWord {
    plural_rate: number   // value between 0 .. 1, indicating the likelihood to be used as plural
    translations: {
        en: NounOfLanguage
        de: NounOfLanguage
        es: NounOfLanguage
        fr?: NounOfLanguage
        zh?: NounOfLanguage
        da?: NounOfLanguage
    },
    context: {
        adjectives: Array<string>
        limits?: Array<string>
    }
}

/**
 * Representation of a noun of a specific language (e.g. English or German).
 */
export interface NounOfLanguage {
    lexeme: string,
    genus?: string,
    plural?: string
    synonyms?: Array<NounOfLanguage>
}

/**
 * Representation of an adjective in the dictionary.
 */
export interface Adjective extends DictionaryWord {
    translations: {
    en: AdjectiveOfLanguage
    de: AdjectiveOfLanguage
    es: AdjectiveOfLanguage
    fr?: AdjectiveOfLanguage
    zh?: AdjectiveOfLanguage
    da?: AdjectiveOfLanguage
}
}

/**
 * Representation of a noun of a specific language (e.g. English or German).
 */
export interface AdjectiveOfLanguage {
    lexeme: string
    nominative?: string
    synonyms?: Array<AdjectiveOfLanguage>
}