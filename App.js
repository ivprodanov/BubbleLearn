import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import GameScreen from "./screens/GameScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Butterfly+Kids&family=Comic+Relief:wght@400;700&family=Josefin+Sans:ital,wght@0,100..700;1,100..700&family=Press+Start+2P&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap"
        rel="stylesheet"
      ></link>

      <GameScreen />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
