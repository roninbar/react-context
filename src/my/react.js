import { ReactElement } from 'react';

class Context {
    constructor(defaultValue) {
        let currentValue = defaultValue;

        /**
         * @param {{value: any, children: ReactElement[]}} props
         */
        this.Provider = function ({ value, children }) {
            return <>
                {children.map((child, index) => {
                    function Child(props) {
                        currentValue = value;
                        try {
                            return child.type(props);
                        } finally {
                            currentValue = defaultValue;
                        }
                    }
                    return (
                        (<Child {...child.props} key={child.key === null ? index : child.key}>
                            {child.props.children}
                        </Child>)
                    );
                })}
            </>;
        }

        this._use = function () {
            return currentValue;
        };
    }
}

/**
 * @param {any} defaultValue Value returned by `useContext` outside a `<Provider>`.
 * @returns {Context} An context object that contains a `<Provider>` component.
 */
export function createContext(defaultValue) {
    return new Context(defaultValue);
}

/**
 * @param {Context} context An context object returned by `createContext`.
 */
export function useContext(context) {
    return context._use();
}

