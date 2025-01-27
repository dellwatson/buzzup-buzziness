import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function UserEdit() {
  return (
    <View style={styles.container}>
      <Text> [user edit here]</Text>
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
