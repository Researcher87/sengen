import {Noun} from "../entities/dictionary/Dictionary";

export function getDefiniteArticleEnglish() {
    return "the"
}

export function getDefiniteArticleGerman(noun: Noun, usePlural: boolean): string {
    if(usePlural) {
        return "die";
    }

    const germanNoun = noun.translations.de;
    switch(germanNoun.genus) {
        case "m":
            return "der"
        case "f":
            return "die"
        case "n":
            return "das"
        default:
            return "[n/a]"
    }
}

export function getDefiniteArticleSpanish(noun: Noun, usePlural: boolean): string {
    const spanishNounw = noun.translations.es;
    switch(spanishNounw.genus) {
        case "m":
            return usePlural ? "los" : "el"
        case "f":
            return usePlural ? "las" : "la"
        default:
            return "[n/a]"
    }
}