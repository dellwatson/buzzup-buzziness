import Feeds from "@/components/Home/Feeds";
import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Feeds />
      {/* <Text> [Home: FEED]</Text>

      <Link href={"/(publication)/twitter/1232"}>
        to publication twitter id
      </Link>
      <Link href={"/(publication)/youtube/1232"}>
        to publication youtube id
      </Link>

      <Link href={"/(publication)/321"}>to pub-buzzup 3232</Link>
      <Link href={"/(profile)/dale"}>to profile dale</Link> */}
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
