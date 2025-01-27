import { View, Text } from "react-native";
import { Link, Stack, useGlobalSearchParams } from "expo-router";

// buzzup-profile
const ProfileDetail = () => {
  const { profile } = useGlobalSearchParams();
  // gonna restructure to show connected accounts

  return (
    <View>
      <Stack.Screen options={{ headerTitle: `profile #${profile}` }} />

      <Text>profilex: </Text>
      <Text>twitter: </Text>
      <Text>youtube: </Text>

      <Link href={"/(publication)/1232"}>to publication id</Link>
    </View>
  );
};

export default ProfileDetail;
