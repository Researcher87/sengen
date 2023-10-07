import {Dictionary} from "./dictionary/Dictionary";
import {SenGenConfiguration} from "./SenGenConfiguration";

export class SenGenModel {
    dictionary: Dictionary
    categories: Array<string>
    configuration: SenGenConfiguration

    constructor(dictionary: Dictionary, categories: Array<string>, configuration: SenGenConfiguration) {
        this.dictionary = dictionary
        this.categories = categories
        this.configuration = configuration
    }
}