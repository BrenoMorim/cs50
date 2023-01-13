import { useContext } from "react";
import { Text, View } from "react-native";
import { LanguageContext } from "../../contexts/LanguageContext";
import Button from "../Button";
import getStyle from "./styles";
import getTexts from "../../service/getTexts";
import { ThemesContext } from "../../contexts/ThemesContext";

export default function ThemesMenu() {

    const { selectedTheme, themes, selectTheme } = useContext(ThemesContext);
    const styles = getStyle(themes);

    const { language } = useContext(LanguageContext);
    const texts = getTexts(language);

    return (
        <View style={styles.container}>

            <Text style={styles.title}>{texts.theme}</Text>

            <View style={styles.buttonsContainer}>
                <Button 
                    backgroundColor={themes.textsColor} textsColor={themes.orange} text={texts.light}
                    callback={() => selectTheme("light")} selected={selectedTheme == 'light'} fontSize={20}
                />
                <Button 
                    backgroundColor={themes.textsColor} textsColor={themes.orange} text={texts.dark}
                    callback={() => selectTheme("dark")} selected={selectedTheme == 'dark'} fontSize={20}
                />
            </View>

        </View>
    );
}
