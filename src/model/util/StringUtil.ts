export function endsWithVowel(string: string) {
    return string.endsWith("a") || string.endsWith("e") || string.endsWith("i") || string.endsWith("o") || string.endsWith("u");
}

export function replaceLastLetterOfString(string: string, replacement: string) {
    return string.substring(0, string.length-1) + replacement;
}