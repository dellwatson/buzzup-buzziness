import { View, Text, StyleSheet } from "react-native";

export default function TransactionScreen() {
  return (
    <View style={styles.container}>
      <Text> [Transaction]</Text>
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
