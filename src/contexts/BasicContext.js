import React, {createContext, useState} from 'react';


const BasicContext = createContext({
    loginSuccess: "id",
    setLoginSuccess: () => {},
});

const BasicProvider = ({children}) => {
    const [loginSuccess, setLoginSuccess] = useState(false);

    const value = {
        loginSuccess, 
        setLoginSuccess,
    };

    return <BasicContext.Provider value={value}>
        {children}
    </BasicContext.Provider>
};

const BasicConsumer = BasicContext.Consumer;

export {BasicConsumer, BasicProvider, BasicContext}; 