import { useContext } from "react";
import { Text, View } from "react-native";
import { LanguageContext } from "../../contexts/LanguageContext";
import { ThemesContext } from "../../contexts/ThemesContext";
import getTexts from "../../service/getTexts";
import { Languages } from "../../types/Languages";
import Button from "../Button";
import getStyle from "./styles";

export default function LanguageMenu() {
    const { language, setLanguage } = useContext(LanguageContext);
    const { themes } = useContext(ThemesContext);
    const styles = getStyle(themes);
    const texts = getTexts(language);
    return (
        <View style={styles.container}>

            <Text style={styles.title}>{texts.language}</Text>

            <View style={styles.buttonsContainer}>

                <Button 
                    backgroundColor={themes.textsColor} textsColor={themes.orange} text={texts.portuguese}
                    callback={() => setLanguage(Languages.portuguese)} selected={language == Languages.portuguese} fontSize={20}
                />
                <Button 
                    backgroundColor={themes.textsColor} textsColor={themes.orange} text={texts.english}
                    callback={() => setLanguage(Languages.english)} selected={language == Languages.english} fontSize={20}
                />
                <Button 
                    backgroundColor={themes.textsColor} textsColor={themes.orange} text={texts.spanish}
                    callback={() => setLanguage(Languages.spanish)} selected={language == Languages.spanish} fontSize={20}
                />
            </View>

        </View>
    );
}
