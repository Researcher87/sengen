/**
 * Representation of the whole dictionary
 */
export interface Dictionary {
    nouns: Array<Noun>
}

/**
 * Representation of a noun in the dictionary (abstract noun container).
 */
export interface Noun {
    id: string,
    categories: Array<String>
    level: number,
    weight: number,
    plural_rate: number,   // value between 0 .. 1, indicating the likelihood to be used as plural
    translations: {
        en: NounOfLanguage,
        de: NounOfLanguage,
        es: NounOfLanguage,
        fr?: NounOfLanguage,
        zh?: NounOfLanguage,
        da?: NounOfLanguage
    },
    context: {
        adjectives: Array<String>,
        limits?: Array<String>
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
