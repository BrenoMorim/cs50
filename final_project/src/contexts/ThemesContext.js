import { createContext, useState } from "react";
import { dark, light } from "../globalStyle";

export const ThemesContext = createContext({});

export function ThemesProvider({ children }) {
    const [selectedTheme, selectTheme] = useState("light");

    const themes = {
        'dark': dark,
        'light': light
    }

    return (
        <ThemesContext.Provider
            value={{
                selectedTheme,
                themes: themes[selectedTheme],
                selectTheme,
            }}
        >
            {children}
        </ThemesContext.Provider>
    );
}