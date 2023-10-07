import {Component, createContext, ReactElement} from "react";
import {Dictionary} from "../model/entities/dictionary/Dictionary";
import dictionary from "../static/dictionary.json";
import categories from "../static/categories.json";
import {initialSenGenConfiguration, SenGenConfiguration} from "../model/entities/SenGenConfiguration";

export interface ApplicationDataContext {
    dictionary: Dictionary,
    categories: Array<string>,
    configuration: SenGenConfiguration,
    setConfiguration: (configuration: SenGenConfiguration) => void
}

export const ApplicationContextStore = createContext<ApplicationDataContext | null>(null)

export default class ApplicationDataContextProvider extends Component<any, ApplicationDataContext> {

    setSenGenConfiguration = (configuration: SenGenConfiguration): void => {
        this.setState(prevState => ({...prevState, configuration: configuration}))
    }

    UNSAFE_componentWillMount() {
        this.setState({
            dictionary: dictionary,
            categories: categories,
            configuration: initialSenGenConfiguration,
            setConfiguration: this.setSenGenConfiguration
        })
    }



    render(): ReactElement {
        console.log('RENDER:', this.state)
        const value = this.state

        return (
            <ApplicationContextStore.Provider value={value}>
                {this.props.children}
            </ApplicationContextStore.Provider>
        )
    }

}