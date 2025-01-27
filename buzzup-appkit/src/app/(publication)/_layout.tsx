//to profile -> // to publication
import { Stack } from "expo-router";

// need to store/cache into storage -> users detail login
const PublicationLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        // options={{ headerShown: false }}
      />
    </Stack>
  );
};

export default PublicationLayout;
