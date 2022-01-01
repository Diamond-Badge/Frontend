import React, {createContext} from 'react';

const UrlContext = createContext({
    url: "http://172.30.16.113:8080",
});

const UrlProvider = ({children}) => {
    
    return (
        <UrlContext.Provider value={url}>
            {children}
        </UrlContext.Provider>
    );
};

export {UrlContext, UrlProvider};