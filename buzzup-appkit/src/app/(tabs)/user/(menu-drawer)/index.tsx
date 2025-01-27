import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function NavScreen() {
  return (
    <View style={styles.container}>
      <Text> [Nav screen]</Text>

      <Link href={"/user/(menu)/settings"}>Settings</Link>
      <Link href={"/user/(menu)/transaction"}>Transaction</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
