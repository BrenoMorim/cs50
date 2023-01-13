import { useContext } from "react";
import { StyleSheet, Text } from "react-native"
import { ThemesContext } from "../../contexts/ThemesContext";
import * as Animatable from 'react-native-animatable';

export default function Logo() {

    const {
        themes,
      } = useContext(ThemesContext);
      const styles = getStyle(themes);

    return (
        <Animatable.View animation={"bounceInDown"} duration={1500} style={styles.titleContainer}>
            <Text style={styles.titleBold}>Hang</Text><Text style={styles.title}>Man</Text>
        </Animatable.View>
    );
}

const getStyle = (themes) => {
    return StyleSheet.create({
      titleContainer: {
        display: "flex",
        flexDirection: "row",
        borderBottomWidth: 5,
        borderColor: themes.black,
        marginVertical: 24
      },
      title: {
        color: themes.textsColor,
        fontSize: 56,
        fontWeight: "bold"
      },
      titleBold: {
        color: themes.orange,
        fontWeight: "bold",
        fontSize: 56
      }
    })
  }