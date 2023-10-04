import {Component, createContext, ReactElement} from "react";
import {Dictionary} from "../model/Dictionary";
import dictionary from "../static/dictionary.json";
import categories from "../static/categories.json";

export interface ApplicationDataContext {
    dictionary: Dictionary,
    categories: Array<String>
}

export const ApplicationContextStore = createContext<ApplicationDataContext | null>(null)

export default class ApplicationDataContextProvider extends Component<any, ApplicationDataContext> {

    render(): ReactElement {
        const value = {
            dictionary: dictionary,
            categories: categories
        }

        return (
            <ApplicationContextStore.Provider value={value}>
                {this.props.children}
            </ApplicationContextStore.Provider>
        )
    }

}