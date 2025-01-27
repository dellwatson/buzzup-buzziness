//to profile -> // to publication
import { Stack } from "expo-router";

// need to store/cache into storage -> users detail login
const ProfileLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="[profile]"
        options={{
          headerTitle: "profile-stack",
          headerBackButtonMenuEnabled: true,
          headerBackVisible: true,
        }}
        // options={{ headerShown: false }}
      />
      {/* <Stack.Screen name="[id]" options={{ headerTitle: "id-stack" }} />
      <Stack.Screen name="[id]" options={{ headerTitle: "id-stack" }} />
      <Stack.Screen name="[id]" options={{ headerTitle: "id-stack" }} /> */}
      {/* <Stack.Screen
        name="index"
        options={{ headerTitle: "publication-stack" }}
      /> */}
      {/* <Stack.Screen name="edit" options={{ headerTitle: "User-edit" }} /> */}
      {/* <Stack.Screen name="(menu)" options={{ headerTitle: "menu-root" }} /> */}
    </Stack>
  );
};

export default ProfileLayout;
