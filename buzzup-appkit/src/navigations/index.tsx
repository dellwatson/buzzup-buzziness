// In App.js in a new project

import * as React from "react";
// import { View, Text } from "react-native";
import HomeScreen from "@/screens/Main/HomeScreen";
import ProfileScreen from "@/screens/Profile/ProfileScreen";
import SettingScreen from "@/screens/Settings/SettingScreen";
import { XStack, YStack, Image, IconButton, Button, Theme } from "tamagui";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { EvilIcons, MaterialIcons, AntDesign } from "@expo/vector-icons";
import DiscoveryScreen from "@/screens/Main/DiscoveryScreen";
import NotificationsScreen from "@/screens/Main/NotifScreen";
import LeaderboardScreen from "@/screens/Main/LeaderboardScreen";
import MainTabs from "./MainNav/MainTabs";
import Toast from "react-native-toast-message";

const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

// function MainTabs() {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarShowLabel: false,
//         tabBarStyle: { height: 60 },
//         tabBarIcon: ({ color, size }) => {
//           let iconName;
//           if (route.name === "Home") iconName = "refresh";
//           else if (route.name === "Discovery") iconName = "search";
//           else if (route.name === "Notifications") iconName = "bell";
//           else if (route.name === "Leaderboard") iconName = "trophy";

//           return <EvilIcons name={iconName} size={size} color={color} />;
//         },
//       })}
//     >
//       <Tab.Screen
//         name="Home"
//         component={HomeScreen}
//         options={{
//           headerShown: true,
//           // header: ({ navigation }) => <HomeHeader navigation={navigation} />,
//         }}
//       />
//       <Tab.Screen name="Discovery" component={DiscoveryScreen} />
//       <Tab.Screen name="Notifications" component={NotificationsScreen} />
//       <Tab.Screen name="Leaderboard" component={LeaderboardScreen} />
//       {/* <Tab.Screen name="Setting" component={SettingScreen} /> */}
//     </Tab.Navigator>
//   );
// }

// AuthStack/
// ConnectWallet -> load and wait
// onboarding or preferences

function AppNavigator() {
  // const [isFirstTime, setIsFirstTime] = useState(true); // Change to proper first-time check

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* check firstTime, checkAuthed? */}
        {/* {isFirstTime ? (
          <Stack.Screen name="Intro" component={IntroScreen} />
        ) : (
          <Stack.Screen name="Auth" component={AuthStack} />
        )} */}
        {/*  */}
        <Stack.Screen
          // style={{}}
          name="Main"
          component={MainTabs}
        />
      </Stack.Navigator>

      {/* Floating button */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => {
          /* Handle button press */
          // allert
          Toast.show({
            type: "success",
            text1: "Hello",
            text2: "This is some something 👋",
          });
        }}
      >
        <MaterialIcons name="add" size={30} color="white" />
      </TouchableOpacity>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 50,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  logo: {
    height: 30,
    resizeMode: "contain",
  },
  headerRight: {
    width: 32,
  },
  floatingButton: {
    position: "absolute",
    bottom: 80,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#1DA1F2",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AppNavigator;
