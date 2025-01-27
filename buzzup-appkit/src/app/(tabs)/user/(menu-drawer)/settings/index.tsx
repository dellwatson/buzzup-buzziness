import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function MainSetting() {
  return (
    <View style={styles.container}>
      <Text> [Settings screen]</Text>
      <Text> [Nav Settings screen]</Text>

      <Link href={"/user/(menu)/settings/account"}>Account</Link>
      <Link href={"/user/(menu)/settings/account"}>Privacy</Link>
      <Link href={"/user/(menu)/settings/account"}>Blocked</Link>
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
