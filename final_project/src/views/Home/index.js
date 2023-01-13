import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/Button";
import Logo from "../../components/Logo";
import DifficultiesMenu from "../../components/SelectionMenu/DifficultiesMenu";
import LanguageMenu from "../../components/SelectionMenu/LanguageMenu";
import ThemesMenu from "../../components/SelectionMenu/ThemesMenu";
import { LanguageContext } from "../../contexts/LanguageContext";
import { ThemesContext } from "../../contexts/ThemesContext";
import { generateSecretWord } from "../../service/generateSecretWord";
import getTexts from "../../service/getTexts";
import * as Animatable from 'react-native-animatable';
import Loading from "../../components/Loading";

export default function Home() {
  
  const navigation = useNavigation();
  const { themes } = useContext(ThemesContext);
  const styles = getStyle(themes);

  const { language } = useContext(LanguageContext);
  const texts = getTexts(language); 

  async function goToGameScreen() {
    setIsLoading(true);
    const secretWord = await generateSecretWord(language);
    setIsLoading(false);
    navigation.navigate("Game", {secretWord: secretWord});
  }

  const [isLoading, setIsLoading] = useState(false);

  return (
    <SafeAreaView style={styles.container}>

      <Logo/>
      <Loading enabled={isLoading} />
      <Animatable.View animation={"wobble"} iterationCount={"infinite"} duration={2500}>
        <Button 
          callback={async () => {await goToGameScreen()}} 
          text={texts.buttonPlay} 
          backgroundColor={themes.textsColor}
          textsColor={themes.orange}
          fontSize={28}
        />
      </Animatable.View>

      <Animatable.View animation={"bounceInRight"} duration={2500}>
        <ThemesMenu/>
      </Animatable.View>

      <Animatable.View animation={"bounceInLeft"} duration={2500}>
        <LanguageMenu />
      </Animatable.View>

      <Animatable.View animation={"bounceInRight"} duration={2500}>
        <DifficultiesMenu />
      </Animatable.View>

    </SafeAreaView>
  );
}

const getStyle = (themes) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: themes.backgroundColor
  }
});