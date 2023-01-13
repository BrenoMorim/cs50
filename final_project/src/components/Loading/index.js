import { useContext } from "react";
import { StyleSheet, Text } from "react-native";
import { ThemesContext } from "../../contexts/ThemesContext";
import * as Animatable from 'react-native-animatable';
import { LanguageContext } from "../../contexts/LanguageContext";
import getTexts from "../../service/getTexts";

export default function Loading({enabled}) {

    const { themes } = useContext(ThemesContext);
    const styles = getStyle(themes, enabled);
    const { language } = useContext(LanguageContext);
    const texts = getTexts(language); 

    return (
        <Animatable.View 
            animation={"swing"} 
            iterationCount={"infinite"} 
            duration={500}
            style={styles.loading}
        >
            <Text style={styles.loadingText}>{texts.loading}</Text>
        </Animatable.View>
    )
}

const getStyle = (themes, enabled) => {
    
    return StyleSheet.create({
        loading: {
            display: enabled ? "flex" : "none",
            backgroundColor: themes.orange,
            padding: 16,
            borderRadius: 24,
            zIndex: 5,
            textAlign: "center",
            alignItems: "center",
            position: "absolute",
            alignSelf: "center",
            borderColor: themes.textsColor,
            borderWidth: 5,
            opacity: enabled ? 1 : 0,
            top: "50%"
        },
        loadingText: {
            color: themes.textsColor,
            fontSize: 45,
            fontWeight: "700"
        }
    });
}