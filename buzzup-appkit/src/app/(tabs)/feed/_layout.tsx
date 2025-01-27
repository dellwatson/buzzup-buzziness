import { Stack } from "expo-router";

export default function FeedHomeLayout() {
  return (
    <Stack
    // screenOptions={{
    //   tabBarShowLabel: false,
    //   tabBarActiveTintColor: "#000",
    // }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
