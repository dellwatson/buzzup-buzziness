import { Stack } from "expo-router";

// need to store/cache into storage -> users detail login
const SettingsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitle: "" }} />
      <Stack.Screen name="account" options={{ headerTitle: "" }} />
      <Stack.Screen name="blocked" options={{ headerTitle: "" }} />
      <Stack.Screen name="privacy" options={{ headerTitle: "" }} />
    </Stack>
  );
};

export default SettingsLayout;
