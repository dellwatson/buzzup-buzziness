import { View, Text, StyleSheet } from "react-native";

export default function SettingBlocked() {
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
