import {SentenceFragment, WordOfSentence} from "../../entities/GeneratedSentence";
import {pickRandomAdjective, pickRandomNoun} from "../../util/RandomWordPicker";
import {SenGenModel} from "../../entities/SenGenModel";
import {Adjective, Noun} from "../../entities/dictionary/Dictionary";
import {ADJECTIVE, DEFINITE_ARTICLE, NOUN, PLURAL, PRONOUN_PERSONAL, SINGULAR} from "../../config/Constants";
import {LANG_DE, LANG_EN, LANG_ES} from "../../config/Languages";
import {
    getDefiniteArticleEnglish,
    getDefiniteArticleGerman,
    getDefiniteArticleSpanish
} from "../../util/DefiniteArticleBuilder";
import {resolveGermanAdjectiveNominative, resolveSpanishAdjectiveNominative} from "../../util/AdjectiveResolver";
import {generatePlural} from "../../util/PluralGenerator";
import {SUBJECT_DEF_ARTICLE_NP} from "../../config/FragmentTypes";

export function createDefArticleNounPhrase(senGenModel: SenGenModel, nounClasses: Array<string>): Array<SentenceFragment> {
    const randomNoun = pickRandomNoun(senGenModel, nounClasses);
    if (!randomNoun) {
        return []
    }

    const usePlural = Math.random() < randomNoun.plural_rate

    const randomAdjective = senGenModel.configuration.subject.options.useAdjective
        ? pickRandomAdjective(senGenModel, randomNoun.context.adjectives)
        : undefined

    const germanFragment = makeGermanAndEnglishFragment(LANG_DE, randomNoun, usePlural, randomAdjective ?? undefined)
    const englishFragment = makeGermanAndEnglishFragment(LANG_EN, randomNoun, usePlural, randomAdjective ?? undefined)
    const spanishFragment = makeSpanishFragment(randomNoun, usePlural, randomAdjective ?? undefined)

    const fragments = [germanFragment, englishFragment, spanishFragment]
    return fragments
}


function makeGermanAndEnglishFragment(language: number, randomNoun: Noun, usePlural: boolean, randomAdjective?: Adjective): SentenceFragment {
    const wordList = new Array<WordOfSentence>()

    // I. Make and add definite article

    let defArticle;
    switch (language) {
        case LANG_EN:
            defArticle = getDefiniteArticleEnglish()
            break
        case LANG_DE:
            defArticle = getDefiniteArticleGerman(randomNoun, usePlural)
            break
        default:
            defArticle = "[n/a]"
    }

    wordList.push({
        category: DEFINITE_ARTICLE,
        resolvedWord: defArticle
    })


    // II. Possibly, make adjective

    if (randomAdjective) {
        const resolvedAdjective = language == LANG_EN
            ? randomAdjective.translations.en.lexeme
            : resolveGermanAdjectiveNominative(randomAdjective, usePlural)

        wordList.push({
            category: ADJECTIVE,
            resolvedWord: resolvedAdjective
        })
    }


    // III. Add noun

    let resolvedNoun;
    const translation = language == LANG_EN ? randomNoun.translations.en : randomNoun.translations.de
    if (!usePlural) {
        resolvedNoun = translation.lexeme
    } else {
        resolvedNoun = translation.plural ? translation.plural : generatePlural(translation.lexeme, language)
    }

    wordList.push({
        category: NOUN,
        resolvedWord: resolvedNoun
    })


    // IV. Build final object

    const sentenceFragment: SentenceFragment = {
        type: SUBJECT_DEF_ARTICLE_NP,
        person: 3,
        grammaticalNumber: usePlural ? PLURAL : SINGULAR,
        language: language,
        words: wordList
    }

    return sentenceFragment
}

function makeSpanishFragment(randomNoun: Noun, usePlural: boolean, randomAdjective?: Adjective): SentenceFragment {
    const wordList = new Array<WordOfSentence>()

    // I. Make and add definite article

    let defArticle = getDefiniteArticleSpanish(randomNoun, usePlural)

    wordList.push({
        category: DEFINITE_ARTICLE,
        resolvedWord: defArticle
    })


    // II. Add noun

    let resolvedNoun;
    const translation = randomNoun.translations.es
    if (!usePlural) {
        resolvedNoun = translation.lexeme
    } else {
        resolvedNoun = translation.plural ? translation.plural : generatePlural(translation.lexeme, LANG_ES)
    }

    wordList.push({
        category: NOUN,
        resolvedWord: resolvedNoun
    })


    // III. Possibly, make adjective

    if (randomAdjective) {
        const resolvedAdjective = resolveSpanishAdjectiveNominative(randomAdjective, randomNoun.translations.es.genus ?? '', usePlural)
        wordList.push({
            category: ADJECTIVE,
            resolvedWord: resolvedAdjective
        })
    }


    // IV. Build final object

    const sentenceFragment: SentenceFragment = {
        type: SUBJECT_DEF_ARTICLE_NP,
        person: 3,
        grammaticalNumber: usePlural ? PLURAL : SINGULAR,
        language: LANG_ES,
        words: wordList
    }

    return sentenceFragment
}