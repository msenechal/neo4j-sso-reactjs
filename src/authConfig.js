import { LogLevel } from "@azure/msal-browser";


export const msalConfig = {
    auth: {
        clientId: "00f3a7d3-d855-4849-9e3c-57d7b6e12794",
        authority: "https://login.microsoftonline.com/da501982-4ca7-420c-8926-1e65b5bf565f/",
        redirectUri: "http://localhost:3000/"
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false,
    },
    system: {	
        loggerOptions: {	
            loggerCallback: (level, message, containsPii) => {	
                if (containsPii) {		
                    return;		
                }		
                switch (level) {		
                    case LogLevel.Error:		
                        console.error(message);		
                        return;		
                    case LogLevel.Info:		
                        console.info(message);		
                        return;		
                    case LogLevel.Verbose:		
                        console.debug(message);		
                        return;		
                    case LogLevel.Warning:		
                        console.warn(message);		
                        return;		
                }	
            }	
        }	
    }
};

export const loginRequest = {
    scopes: ["User.Read"]
};
