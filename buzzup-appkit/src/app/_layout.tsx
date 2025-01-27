import {
  Slot,
  useNavigationContainerRef,
  useSegments,
  ErrorBoundary,
  Stack,
} from "expo-router";
import {
  useFonts,
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";

import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
// import { ClerkProvider, ClerkLoaded, useAuth, useUser } from '@clerk/clerk-expo';
import { tokenCache } from "@/utils/cache";
import { LogBox } from "react-native";
import { useRouter } from "expo-router";
// import { ConvexReactClient } from 'convex/react';
// import { ConvexProviderWithClerk } from 'convex/react-clerk';
// import * as Sentry from "@sentry/react-native";
import useAuth from "@/hooks/useAuth";
import NativeProvider from "@/provider/NativeProvider";
// import "react-native-reanimated";

SplashScreen.preventAutoHideAsync();

// // Construct a new instrumentation instance. This is needed to communicate between the integration and React
// const routingInstrumentation = new Sentry.ReactNavigationInstrumentation();

// Sentry.init({
//   dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
//   attachScreenshot: true,
//   debug: false, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
//   tracesSampleRate: 1.0,
//   _experiments: {
//     // Here, we'll capture profiles for 100% of transactions.
//     profilesSampleRate: 1.0,
//     // Session replays
//     replaysSessionSampleRate: 1.0,
//     replaysOnErrorSampleRate: 1.0,
//   },
//   integrations: [
//     new Sentry.ReactNativeTracing({
//       // Pass instrumentation to be used as `routingInstrumentation`
//       routingInstrumentation,
//       enableNativeFramesTracking: true,
//     }),
//     Sentry.mobileReplayIntegration(),
//   ],
// });

// 1. user logged-out, 1st time installation
// 2. user logged-out goes to main, done-intro (intro should pop up again, when logout ->)
// 3. user logged-in goes to main
const InitialLayout = () => {
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });

  //   firstInstallation

  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  console.log(segments, "segments");
  const router = useRouter();
  const isNewInstallation = true;
  //   const user = useUser();

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    // 0. check need intro or not
    // if (isNewInstallation) {
    //   router.replace("/intro");
    // }

    // 1. check loaded user existed or not
    if (!isLoaded) return;
    const inTabsGroup = segments[0] === "(auth)";

    // // 2a.
    // if (isSignedIn && !inTabsGroup) {
    //   router.replace("/(auth)/(tabs)/feed");
    // } else if (!isSignedIn && inTabsGroup) {
    //   router.replace("/(public)");
    // }
  }, [isSignedIn]);

  //   useEffect(() => {
  //     if (user && user.user) {
  //       Sentry.setUser({
  //         email: user.user.emailAddresses[0].emailAddress,
  //         id: user.user.id,
  //       });
  //     } else {
  //       Sentry.setUser(null);
  //     }
  //   }, [user]);

  return <Slot />;
};

const RootLayoutNav = () => {
  //   const ref = useNavigationContainerRef();
  const segments = useSegments();
  console.log(segments, "root-segments");
  //   useEffect(() => {
  //     if (ref) {
  //       routingInstrumentation.registerNavigationContainer(ref);
  //     }
  //   }, [ref]);

  return (
    // ThemeProvider
    // AuthProvider
    // replace with selfProvider with APP-KIT
    // <ClerkProvider publishableKey={publishableKey!} tokenCache={tokenCache}>
    //   <ClerkLoaded>
    //     <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
    // <InitialLayout />
    <NativeProvider>
      <Layout />
    </NativeProvider>

    //     </ConvexProviderWithClerk>
    //   </ClerkLoaded>
    // </ClerkProvider>
  );
};

export default RootLayoutNav;

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

export function Layout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(publication)" />
      <Stack.Screen name="(profile)" />
      <Stack.Screen
        name="sign-in"
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen name="+not-found" />

      {/* ------dynamic here------ CAN FETCH POST/PROFILE from original links*/}
      {/* <Stack.Screen name="(post)" options={{ headerShown: false }} /> */}
      {/* <Stack.Screen name="(profiles)" options={{ headerShown: false }} /> */}
      {/* ------dynamic */}

      {/* material-top-tab for chatt + create post */}
    </Stack>
  );
}

// export default Sentry.wrap(RootLayoutNav);
