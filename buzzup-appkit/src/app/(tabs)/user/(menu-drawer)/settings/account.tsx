import { View, Text, StyleSheet } from "react-native";

export default function SettingAccount() {
  return (
    <View style={styles.container}>
      <Text> [Settings screen]</Text>
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
