import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { StyleSheet } from "react-native";
import { ThemesContext } from "../../contexts/ThemesContext";
import { LanguageContext } from "../../contexts/LanguageContext";
import { GameStates } from "../../types/GameStates";
import getTexts from "../../service/getTexts";
import Button from "../Button";
import * as Animatable from 'react-native-animatable';
import Text from "../Text";
import Loading from "../Loading";

export default function FinalScreen({secretWord, gameResult, resetGame}) {
    if (gameResult == GameStates.notFinished) return <></>;

    const navigation = useNavigation();
    const { themes } = useContext(ThemesContext);  
    const styles = getStyle(themes);

    const { language } = useContext(LanguageContext);
    const texts = getTexts(language);

    const [isLoading, setIsLoading] = useState(false);

    return (
        <Animatable.View animation={"bounceIn"} duration={1200} style={styles.finalScreen}>
            <Loading enabled={isLoading}/>
            <Text color={themes.backgroundColor} size={48} marginHorizontal={0} marginVertical={16} weight={"bold"}>
                {gameResult == GameStates.won ? texts.messageWon : texts.messageLost}
            </Text>
            {gameResult == GameStates.lost && 
                <Text color={themes.orange} size={28} marginVertical={12} marginHorizontal={0}>
                    {`${texts.revealSecretWord} ${secretWord.join('')}`}
                </Text>
            }
            <Animatable.View animation={"pulse"} duration={500} iterationCount={"infinite"}>
                <Button
                    animation
                    text={texts.buttonPlayAgain} callback={async () => {
                        setIsLoading(true);
                        await resetGame();
                        setIsLoading(false);
                    }}
                    backgroundColor={themes.backgroundColor} textsColor={themes.textsColor}
                />
            </Animatable.View>
            <Button 
                text={texts.buttonHome} callback={() => {navigation.navigate("Home")}}
                backgroundColor={themes.backgroundColor} textsColor={themes.textsColor}
            />
        </Animatable.View>
    );
}

const getStyle = (themes) => StyleSheet.create({
    finalScreen: {
        backgroundColor: themes.textsColor,
        padding: 20,
        zIndex: 2,
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        position: "absolute",
        alignSelf: "center",
        top: "25%",
        borderRadius: 24,
        opacity: 0.9
    }
});