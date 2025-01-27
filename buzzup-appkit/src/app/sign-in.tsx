import { View, Text, StyleSheet } from "react-native";

// auth system
export default function ConnectScreen() {
  return (
    <View style={styles.container}>
      <Text> [sign in]</Text>
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
