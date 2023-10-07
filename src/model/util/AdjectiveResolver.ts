import {Adjective} from "../entities/dictionary/Dictionary";
import {endsWithVowel, replaceLastLetterOfString} from "./StringUtil";

export function resolveGermanAdjectiveNominative(adjective: Adjective, isPlural: boolean): string {
    const germanAdjective = adjective.translations.de
    const adjectiveString = germanAdjective.nominative ? germanAdjective.nominative : germanAdjective.lexeme;

    return isPlural ? adjectiveString + "n" : adjectiveString
}

export function resolveSpanishAdjectiveNominative(adjective: Adjective, nounGenus: string, isPlural: boolean): string {
    let spanishAdjective = adjective.translations.es.lexeme

    if(nounGenus === "f") {
        if(spanishAdjective.endsWith("o")) {
            spanishAdjective = replaceLastLetterOfString(spanishAdjective, "a");
        }
        if(spanishAdjective.endsWith("or") || spanishAdjective.endsWith("ol")  ||spanishAdjective.endsWith("´on")
            ||spanishAdjective.endsWith("án")  || spanishAdjective.endsWith("in")  || spanishAdjective.endsWith("és")) {
            spanishAdjective = spanishAdjective + "a"
        }
    }

    if(isPlural) {
        if(endsWithVowel(spanishAdjective)) {
            return spanishAdjective + "s";
        } else if(spanishAdjective !== "gris") {
            return spanishAdjective + "es";
        }
    }

    return spanishAdjective
}