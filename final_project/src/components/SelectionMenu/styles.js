import { StyleSheet } from "react-native";

const getStyle = (themes) => StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 6
    },
    title: {
        color: themes.textsColor,
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "center"
    },
    buttonsContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    }
});

export default getStyle;
