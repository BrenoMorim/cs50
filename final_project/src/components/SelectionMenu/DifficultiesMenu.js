import { useContext } from "react";
import { Text, View } from "react-native";
import { DifficultyContext } from "../../contexts/DifficultyContext";
import { LanguageContext } from "../../contexts/LanguageContext";
import { ThemesContext } from "../../contexts/ThemesContext";
import getTexts from "../../service/getTexts";
import { Difficulties } from "../../types/Difficulties";
import Button from "../Button";
import getStyle from "./styles";

export default function DifficultiesMenu() {
    const { difficulty, setDifficulty } = useContext(DifficultyContext);
    const { themes } = useContext(ThemesContext);
    const styles = getStyle(themes);
    const { language } = useContext(LanguageContext);
    const texts = getTexts(language);
    return (
        <View style={styles.container}>

            <Text style={styles.title}>{texts.difficulty}</Text>

            <View style={styles.buttonsContainer}>
                <Button 
                    backgroundColor={themes.textsColor} textsColor={themes.orange} text={texts.easy} fontSize={20}
                    callback={() => setDifficulty(Difficulties.easy)} selected={difficulty == Difficulties.easy}
                />
                <Button 
                    backgroundColor={themes.textsColor} textsColor={themes.orange} text={texts.medium} fontSize={20}
                    callback={() => setDifficulty(Difficulties.medium)} selected={difficulty == Difficulties.medium}
                />
                <Button 
                    backgroundColor={themes.textsColor} textsColor={themes.orange} text={texts.hard} fontSize={20}
                    callback={() => setDifficulty(Difficulties.hard)} selected={difficulty == Difficulties.hard}
                />
            </View>

        </View>
    );
}
