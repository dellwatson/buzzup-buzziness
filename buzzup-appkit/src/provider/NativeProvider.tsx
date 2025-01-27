import { StyleSheet, View, useColorScheme } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as Clipboard from "expo-clipboard";
import "@walletconnect/react-native-compat";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import {
  AppKit,
  AppKitButton,
  NetworkButton,
  createAppKit,
  defaultWagmiConfig,
} from "@reown/appkit-wagmi-react-native";

import { authConnector } from "@reown/appkit-auth-wagmi-react-native";

import { siweConfig } from "@/utils/SiweUtils";

// import { AccountView } from "@/views/AccountView";
// import { ActionsView } from "@/views/ActionsView";
import { getCustomWallets } from "@/utils/misc";
import { chains } from "@/utils/WagmiUtils";

import { createTamagui, TamaguiProvider } from "tamagui";
import defaultConfig from "@tamagui/config/v3";
// import { StacksDemo } from "@/components/StacksDemo";
// import AppNavigator from "@/navigations";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import AuthProvider from "./AuthProvider";
const config = createTamagui(defaultConfig);

const projectId = "dfbba1a25e2c31cac6e4fad8041c713d";
// const projectId = process.env.EXPO_PUBLIC_PROJECT_ID ?? "";

const metadata = {
  name: "AppKit RN",
  description: "AppKit RN by Reown",
  url: "https://reown.com/appkit",
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
  redirect: {
    native: "redirect://",
    universal: "https://appkit-lab.reown.com/rn_appkit",
    linkMode: true,
  },
};

const clipboardClient = {
  setString: async (value: string) => {
    await Clipboard.setStringAsync(value);
  },
};

const auth = authConnector({ projectId, metadata });

const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  extraConnectors: [auth],
});

const queryClient = new QueryClient();

const customWallets = getCustomWallets();

createAppKit({
  projectId,
  wagmiConfig,
  siweConfig,
  clipboardClient,
  customWallets,
  enableAnalytics: true,
  metadata,
});

export default function NativeProvider({ children }) {
  // const isDarkMode = useColorScheme() === "dark";
  return (
    <TamaguiProvider defaultTheme="light" config={config}>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              {/* <AppNavigator /> */}
              {children}
            </GestureHandlerRootView>
            <Toast />
          </AuthProvider>
          {/* stack navigator */}

          {/*  */}
          {/* <View style={[styles.container, isDarkMode && styles.dark]}>
            <StatusBar style="auto" />
            <AppKitButton
              connectStyle={styles.button}
              accountStyle={styles.button}
              label="Connect"
              loadingLabel="Connecting..."
              balance="show"
            />
            <NetworkButton />
            <AccountView />
            <ActionsView />
            <StacksDemo />
            <AppKit />
          </View> */}
        </QueryClientProvider>
      </WagmiProvider>
    </TamaguiProvider>
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
