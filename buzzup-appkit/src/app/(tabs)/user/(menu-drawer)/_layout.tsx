import { Stack } from "expo-router";

// need to store/cache into storage -> users detail login
const UserLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitle: "nav-stack" }} />
      <Stack.Screen name="transaction" options={{ headerTitle: "tx" }} />
    </Stack>
  );
};

export default UserLayout;
