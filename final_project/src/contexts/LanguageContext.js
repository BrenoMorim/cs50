import { createContext, useState } from "react";
import { Languages } from "../types/Languages";

export const LanguageContext = createContext({});

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState(Languages.english);
    return (
        <LanguageContext.Provider
            value={{
                language,
                setLanguage,
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
}