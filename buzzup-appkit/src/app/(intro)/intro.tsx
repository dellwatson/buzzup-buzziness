// app/(auth)/intro.js
import { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import * as SecureStore from "expo-secure-store"; // Secure storage to track first-time users

export default function IntroScreen({ navigation }) {
  const [isFirstTime, setIsFirstTime] = useState(false);

  useEffect(() => {
    const checkFirstTime = async () => {
      const hasSeenIntro = await SecureStore.getItemAsync("firstInstallation");
      if (hasSeenIntro) {
        navigation.replace("(connect)"); // Navigate to home if already seen
      } else {
        setIsFirstTime(true);
      }
    };
    checkFirstTime();
  }, []);

  const handleFinishIntro = async () => {
    await SecureStore.setItemAsync("firstInstallation", "true");
    navigation.replace("(main)"); // Navigate to the main app after intro
  };

  if (!isFirstTime) return null; // Prevent rendering if it's not the first time

  return (
    <View>
      <Text>Welcome to Buzzup! Your Social App</Text>
      <Button title="Start" onPress={handleFinishIntro} />
    </View>
  );
}
