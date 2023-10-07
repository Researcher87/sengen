import {DictionaryWord} from "./dictionary/Dictionary";

export interface SentenceGenerationResult {
    statusCode: number,
    statusMessage?: string,
    generatedSentences?: Array<Sentence>
}

export interface Sentence {
    language: number;
    sentence: Array<SentenceFragment>
}

export interface SentenceFragment {
    type: number
    person?: number
    grammaticalNumber?: number
    gender?: number
    language: number;
    words: Array<WordOfSentence>
}

export interface WordOfSentence {
    category: number,
    resolvedWord: string,
    word?: DictionaryWord
}

export interface ResolvedWord {
    word: string
}