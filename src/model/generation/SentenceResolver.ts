import {Sentence} from "../entities/GeneratedSentence";

export function resolveSentence(sentence: Sentence): string {
    let result: Array<string> = [];
    sentence.sentence.forEach(fragment => {
        fragment.words.forEach(word => {
            result.push(word.resolvedWord)
        })
    })

    return result.join(" ");
}