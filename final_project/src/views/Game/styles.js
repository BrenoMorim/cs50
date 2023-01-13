import { StyleSheet } from "react-native"

export const getStyle = (themes) => {
    return StyleSheet.create({
      container: {
        display: 'flex',
        textAlign: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: themes.backgroundColor,
        flex: 1,
        zIndex: 0
      },
      guessContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "baseline"
      },
      progress: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between"
      }
    })
  }