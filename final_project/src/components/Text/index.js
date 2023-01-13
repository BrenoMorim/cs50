import { StyleSheet, Text as ReactNativeText } from 'react-native';

export default function Text({children, color="#222", marginVertical=10, marginHorizontal=8, size=24, weight="500"}) {
    const styles = StyleSheet.create({
        text: {
            color: color,
            marginVertical: marginVertical,
            marginHorizontal: marginHorizontal,
            fontSize: size,
            fontWeight: weight,
            textAlign: "center"
        }
    });
    return (
        <ReactNativeText style={styles.text}>
            {children}
        </ReactNativeText>
    );
}