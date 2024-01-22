import { ReactElement } from 'react';

/**
 * @param {any} defaultValue Value returned by `useContext` outside a `<Provider>`.
 * @returns {{Provider: ({value: any, children: ReactElement[]}) => ReactElement}} An context object that contains a `<Provider>` component.
 */
export function createContext(defaultValue) {
    let currentValue = defaultValue;

    /**
     * @param {{value: any, children: ReactElement[]}} props
     */
    function Provider({ value, children }) {
        return (<>
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
        </>);
    }

    return { Provider, _use: () => currentValue };
}

/**
 * @param {{Provider: ({value: any, children: ReactElement[]}) => ReactElement}} context A function returned by `createContext`.
 */
export function useContext(context) {
    return context._use();
}

