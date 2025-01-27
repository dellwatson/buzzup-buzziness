import { Stack } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

// when focused searchbar -> change content
export default function DiscoveryScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Discovery",
          // headerTransparent: true,
          headerSearchBarOptions: {
            placeholder: "Search",
            onChangeText: () => {},
            onSearchButtonPress: () => {},
          },
        }}
      />
      {/* <Text> [Discoveryx]</Text> */}
      {/* {[1, 1, 1, 1, 1].map((item, i) => (
        <View
          style={{ height: 200, width: 200, backgroundColor: "red", margin: 2 }}
        >
          <Text> [{i}]</Text>
        </View>
      ))} */}
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
