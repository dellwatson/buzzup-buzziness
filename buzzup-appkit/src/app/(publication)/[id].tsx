import { View, Text } from "react-native";
import { Link, Stack, useGlobalSearchParams } from "expo-router";

// buzzup-profile
const PubDetailId = () => {
  const { id } = useGlobalSearchParams();
  // gonna restructure to show connected accounts

  return (
    <View>
      <Stack.Screen options={{ headerTitle: `pub-buzzup #${id}` }} />
      <Link href={"/(profile)/theras0x"}>to profile theras</Link>
      <Link href={"/(profile)/popo"}>to profile popo</Link>
      <Link href={"/(profile)/random"}>to profile random</Link>
    </View>
  );
};

export default PubDetailId;
