import React from "react";
import { Tabs } from "expo-router";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
// import { useAuth } from '@clerk/clerk-expo';
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
// import { Colors } from "@/constants/Colors";
// import { usePush } from "@/hooks/usePush";
import * as Haptics from "expo-haptics";
import useAuth from "@/hooks/useAuth";
import { useTheme } from "tamagui"; // Import useTheme from Tamagui

const CreateTabIcon = ({ color, size }: { color: string; size: number }) => (
  <View style={styles.createIconContainer}>
    <Ionicons name="add" size={size} color={color} />
  </View>
);

export const unstable_settings = {
  initialRouteName: "feed",
};

const Layout = () => {
  //   const { signOut } = useAuth();
  const router = useRouter();
  //   usePush();
  const theme = useTheme(); // Get the current theme

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#000",
      }}
      // screenOptions={{
      //   tabBarShowLabel: false,
      //   tabBarActiveTintColor: theme.color.val,
      //   tabBarStyle: {
      //     backgroundColor: theme.background.val, // Apply Tamagui theme background
      //     borderTopWidth: 0, // Optional: Removes the border for a cleaner look
      //   },
      // }}
    >
      <Tabs.Screen
        name="feed"
        options={{
          title: "buzzzup⬆️",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
          // headerRight: () => (
          //   <TouchableOpacity onPress={() => {}}>
          //     <Text style={styles.logoutText}>Log out</Text>
          //   </TouchableOpacity>
          // ),
          // headerShown: true,
        }}
      />
      <Tabs.Screen
        name="discovery"
        options={{
          title: "Search",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "search" : "search-outline"}
              size={size}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />

      {/* <Tabs.Screen
        name="posting"
        options={{
          title: "Posting",
          tabBarIcon: ({ color, size }) => (
            <CreateTabIcon color={color} size={size} />
          ),
        }}
        // listeners={{
        //   tabPress: (e) => {
        //     e.preventDefault();
        //     // Haptics.selectionAsync();
        //     // router.push("/create");
        //   },
        // }}
      /> */}

      <Tabs.Screen
        name="leaderboard"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "heart" : "heart-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="user"
        options={{
          title: "User",
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;

const styles = StyleSheet.create({
  logoutText: {
    marginRight: 10,
    color: "blue",
  },
  createIconContainer: {
    // backgroundColor: Colors.itemBackground,
    borderRadius: 8,
    padding: 6,
  },
});
