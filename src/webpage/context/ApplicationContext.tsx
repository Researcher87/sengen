import {Component, createContext, ReactElement} from "react";
import {Dictionary} from "../../model/Dictionary";
import dictionary from "../../static/dictionary.json";

export interface ApplicationDataContext {
    dictionary: Dictionary
}

export const ApplicationContextStore = createContext<ApplicationDataContext | null>(null)

export default class ApplicationDataContextProvider extends Component<any, ApplicationDataContext> {

    render(): ReactElement {
        const value = {
            dictionary: dictionary
        }

        return (
            <ApplicationContextStore.Provider value={value}>
                {this.props.children}
            </ApplicationContextStore.Provider>
        )
    }

}