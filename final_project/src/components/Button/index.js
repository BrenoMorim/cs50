import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function Button({text, callback, textsColor, backgroundColor, fontSize=24, selected=false}) {

  const styles = getStyle(textsColor, backgroundColor, selected, fontSize);

  return (
    <TouchableOpacity style={styles.button} onPress={callback}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
}

const getStyle = (textsColor, backgroundColor, selected, fontSize) => StyleSheet.create({
  button: {
    marginVertical: 24,
    marginHorizontal: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: backgroundColor,
    borderRadius: 12,
    borderColor: textsColor,
    borderWidth: selected ? 4 : 0
},
buttonText: {
    color: textsColor,
    fontSize: fontSize,
    fontWeight: "600",
    textAlign: "center"
},
});