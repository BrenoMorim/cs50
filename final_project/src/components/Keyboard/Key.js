import { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { SelectedLetterContext } from "../../contexts/SelectedLetterContext";
import { ThemesContext } from "../../contexts/ThemesContext";

export default function Key({usedLetters, letter}) {

    const {
        themes,
    } = useContext(ThemesContext);

    const wasUsed = usedLetters.includes(letter);
    const styles = getStyle(themes, wasUsed);
    const {selectLetter} = useContext(SelectedLetterContext);

    return (
        <TouchableOpacity style={styles.key} disabled={wasUsed} onPress={() => {selectLetter(letter)}}>
            <Text style={styles.keyLetter}>{letter}</Text>
        </TouchableOpacity>
    );
}

const getStyle = (themes, wasUsed) => StyleSheet.create({
    key: {
        paddingVertical: 2,
        paddingHorizontal: 4,
        borderColor: wasUsed ? themes.grey : themes.orange,
        borderWidth: 1,
        margin: 3,
        borderRadius: 5,
    },
    keyLetter: {
        fontSize: 25,
        fontWeight: "bold",
        color: wasUsed ? themes.grey : themes.orange,
    }
});