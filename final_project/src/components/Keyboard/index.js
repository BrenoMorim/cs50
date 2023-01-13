import { FlatList, StyleSheet } from "react-native";
import Key from "./Key";

export default function Keyboard({usedLetters}) {
    const rows = [
        "QWERTYUIOP".split(""),
        "ASDFGHJKL".split(""),
        "ZXCVBNM".split("")
    ];
    return (

        <FlatList
            data={rows}
            style={styles.rowsContainer}
            keyExtractor={() => Math.random()}
            renderItem={(item) => {
                return (
                    <FlatList
                    style={styles.rowContainer}
                    data={item.item}
                    keyExtractor={() => Math.random()}
                    renderItem={(item) => <Key usedLetters={usedLetters} letter={item.item}/>}
                    />
                    );
                }}
            />
    );
}

const styles = StyleSheet.create({
    rowsContainer: {
        flexDirection: "column",
        display: "flex",
        marginVertical: 20
    },
    rowContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
    }
})