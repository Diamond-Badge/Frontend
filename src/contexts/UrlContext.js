import React, {createContext} from 'react';

const UrlContext = createContext({
    url: "http://192.168.219.101:8080",
});

const UrlProvider = ({children}) => {
    
    return (
        <UrlContext.Provider value={url}>
            {children}
        </UrlContext.Provider>
    );
};

export {UrlContext, UrlProvider};