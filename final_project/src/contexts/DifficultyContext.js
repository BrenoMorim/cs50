import { createContext, useState } from "react";
import { Chances, Difficulties } from "../types/Difficulties";

export const DifficultyContext = createContext({});

export function DifficultyProvider({ children }) {
    const [difficulty, setDifficulty] = useState(Difficulties.easy);

    const chances = Chances[difficulty];

    return (
        <DifficultyContext.Provider
            value={{
                difficulty,
                setDifficulty,
                chances,
            }}
        >
            {children}
        </DifficultyContext.Provider>
    );
}