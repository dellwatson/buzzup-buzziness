import { Tabs, XStack, YStack, Icon, Theme, useTheme } from "tamagui";
import { useColorScheme } from "react-native";
import HomeScreen from "@/screens/Main/HomeScreen";
import { EvilIcons, MaterialIcons, AntDesign } from "@expo/vector-icons";
import DiscoveryScreen from "@/screens/Main/DiscoveryScreen";
import NotificationsScreen from "@/screens/Main/NotifScreen";
import LeaderboardScreen from "@/screens/Main/LeaderboardScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomHeader from "./CustomHeader";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  const theme = useColorScheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: {
          // height: 60,
          borderTopWidth: 0,
          backgroundColor: "#121212",
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") iconName = "refresh";
          else if (route.name === "Discovery") iconName = "search";
          else if (route.name === "Notifications") iconName = "bell";
          else if (route.name === "Leaderboard") iconName = "trophy";

          return <EvilIcons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: true,
          header: () => <CustomHeader />,
          headerBlurEffect: "regular",
          headerTransparent: true,
        }}
      />
      <Tab.Screen
        name="Discovery"
        component={DiscoveryScreen}
        options={{
          headerShown: true,
          header: () => <CustomHeader />,
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          headerShown: true,
          header: () => <CustomHeader />,
        }}
      />
      <Tab.Screen
        name="Leaderboard"
        component={LeaderboardScreen}
        options={{
          headerShown: true,
          header: () => <CustomHeader />,
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTabs;
