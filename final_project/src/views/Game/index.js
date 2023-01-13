import { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import GameImage from "../../components/GameImage";
import Logo from "../../components/Logo";
import Keyboard from "../../components/Keyboard";
import FinalScreen from "../../components/FinalScreen";
import { DifficultyContext } from "../../contexts/DifficultyContext";
import { SelectedLetterContext } from "../../contexts/SelectedLetterContext";
import { ThemesContext } from "../../contexts/ThemesContext";
import { LanguageContext } from "../../contexts/LanguageContext";
import { generateSecretWord } from "../../service/generateSecretWord";
import { GameStates } from "../../types/GameStates";
import Button from '../../components/Button';
import { getStyle } from "./styles";
import getTexts from "../../service/getTexts";
import * as Animatable from 'react-native-animatable';
import Text from "../../components/Text";

export default function Game({route}) {

  const [secretWord, setSecretWord] = useState(route.params?.secretWord);
  const { themes } = useContext(ThemesContext);  
  const styles = getStyle(themes);
  const [selectedLetter, selectLetter] = useState("");
  const [usedLetters, setUsedLetters] = useState([]);
  const [errors, setErrors] = useState(0);
  const { chances } = useContext(DifficultyContext);
  const [gameState, setGameState] = useState(GameStates.notFinished);
  const { language } = useContext(LanguageContext);
  const texts = getTexts(language);

  const currentProgress = secretWord.map(letter => {
    const normalizedLetter = letter.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (usedLetters.includes(normalizedLetter)) return letter;
      return "_";
  });

  // After each guess, checks if the player won or lost
  useEffect(() => {
    if (errors >= chances)
      setGameState(GameStates.lost);
    if (!currentProgress.includes("_"))
      setGameState(GameStates.won);
    }, [usedLetters]);
    
  function guess() {
    // Guarantee the letter wasn't chosen before and that the game isn't finished
    if (gameState != GameStates.notFinished || selectedLetter == "") return;
    if (!usedLetters.includes(selectedLetter)) {
      setUsedLetters([...usedLetters, selectedLetter]);
      selectLetter("");
    }
    // Using the normalize function due to the special characters of portuguese alphabet
    const normalizedWord = secretWord.join("").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (!normalizedWord.includes(selectedLetter)) {
      setErrors(errors + 1);
    }
  }

  // Clears all the states and generate a new word
  async function resetGame() {
    const newSecretWord = await generateSecretWord(language);
    setSecretWord(newSecretWord);
    setErrors(0);
    selectLetter("");
    setUsedLetters([]);
    setGameState(GameStates.notFinished);
  }

  return (
    <SelectedLetterContext.Provider value={{selectedLetter, selectLetter}}>
    <SafeAreaView style={styles.container}>

      <FinalScreen secretWord={secretWord} gameResult={gameState} resetGame={resetGame}/>

      <Logo/>

      <Animatable.View animation={"bounceIn"} duration={2000} style={styles.progress}>
        <GameImage errors={errors} width={120} height={200}/>
        <Text color={themes.orange} size={22} weight={"600"} marginHorizontal={16}>
          {currentProgress.join(" ")}
        </Text>
      </Animatable.View>

      <Animatable.View animation={"bounceInLeft"} duration={2000}>
        <Text color={themes.textsColor}>{`${texts.remainingChances} ${chances - errors}`}</Text>
        <Text color={themes.textsColor}>{usedLetters.length > 0 && texts.usedLetters}</Text>
        <Text color={themes.textsColor}>{usedLetters.join(" ")}</Text>
      </Animatable.View>
      
      <Animatable.View animation={"bounceInRight"} duration={2000} style={styles.guessContainer}>
        <Button callback={guess} text={texts.guessButton} backgroundColor={themes.orange} textsColor={themes.textsColor}/>
        <Text color={themes.textsColor}>{selectedLetter == "" ? "_" : selectedLetter}</Text>
      </Animatable.View>

      <Animatable.View animation={"bounceInUp"} duration={2000}>
        <Keyboard usedLetters={usedLetters}/>
      </Animatable.View>
    </SafeAreaView>
    </SelectedLetterContext.Provider>
  );
}
