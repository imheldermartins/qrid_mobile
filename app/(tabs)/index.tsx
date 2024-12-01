import { ThemedText } from "@/components/ThemedText";
import { StyleSheet, View, Text, ScrollView } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Olá Helder!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "600",
    fontSize: 46,
    color: "#fff",
  },
});
