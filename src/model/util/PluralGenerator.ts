import {LANG_DE, LANG_EN, LANG_ES} from "../config/Languages";
import {endsWithVowel, replaceLastLetterOfString} from "./StringUtil";

export function generatePlural(lexeme: string, language: number): string {

    switch(language) {
        case LANG_EN:
            if(lexeme.endsWith("x") || lexeme.endsWith("s") || lexeme.endsWith("ch") || lexeme.endsWith("sh")) {
                return lexeme + "es";
            }
            if(lexeme.endsWith("y")
                && !(lexeme.endsWith("ay") ||  lexeme.endsWith("ey") || lexeme.endsWith("oy") || lexeme.endsWith("uy"))) {
                return replaceLastLetterOfString(lexeme, "ies")
            }
            return lexeme + "s"
        case LANG_DE:
            return lexeme + "s"
        case LANG_ES:
            if(endsWithVowel(lexeme)) {
                return lexeme + "s";
            } else {
                if(lexeme.endsWith("z")) {
                    return replaceLastLetterOfString(lexeme, "ces")
                } else {
                    return lexeme + "es";
                }
            }
        default:
            return "[n/a]"
    }

}