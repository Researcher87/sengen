import {Dictionary} from "../entities/dictionary/Dictionary";
import {SenGenConfiguration} from "../entities/SenGenConfiguration";
import {SenGenModel} from "../entities/SenGenModel";
import {createPersonalPronoun} from "./subject/PersonalPronounGenerator";
import {Sentence, SentenceGenerationResult} from "../entities/GeneratedSentence";

export function generateSentence(senGenModel: SenGenModel): SentenceGenerationResult {
    const subjectFragments = createPersonalPronoun()

    if(subjectFragments.length === 0) {
        return {
            statusCode: 0,
            statusMessage: "Sentence could not be created."
        }
    }

    const finalSentence: SentenceGenerationResult = {
        statusCode: 1,
        generatedSentences: new Array<Sentence>()
    }

    subjectFragments.forEach(fragment => {
        finalSentence.generatedSentences?.push({
            language: fragment.language,
            sentence: [fragment]
        })
    })

    return finalSentence
}