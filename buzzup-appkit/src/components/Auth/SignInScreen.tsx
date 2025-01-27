import React from "react";
import { StyleSheet, View, useColorScheme } from "react-native";

import { YStack, XStack, Avatar, Text, Paragraph, H2 } from "tamagui";
import { SocialLogin } from "./Socials/SocialLogin";
import {
  AppKit,
  AppKitButton,
  NetworkButton,
  createAppKit,
  defaultWagmiConfig,
} from "@reown/appkit-wagmi-react-native";

export default function SignInScreen() {
  // just connect
  return (
    <>
      <YStack gap="$3" mb="$4">
        <H2 $sm={{ size: "$8" }}>Welcome Back</H2>
        <Paragraph theme="light">Sign in to your account</Paragraph>
      </YStack>
      <AppKitButton
        connectStyle={styles.button}
        accountStyle={styles.button}
        label="Connect"
        loadingLabel="Connecting..."
        balance="show"
      />
      {/* <NetworkButton /> */}
      <AppKit />
      <YStack mt="$4">
        <SocialLogin />
      </YStack>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  dark: {
    backgroundColor: "#141414",
  },
  text: {
    marginBottom: 20,
  },
  button: {
    marginVertical: 6,
  },
});
