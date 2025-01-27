import { Stack } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

// when focused searchbar -> change content
export default function PostingScreen() {
  return (
    <View style={styles.container}>
      <Text>hello</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
});
