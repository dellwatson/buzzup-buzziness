import { TopTabs, useScrollProps } from "@bacons/expo-router-top-tabs";
import { View, Text, ViewBase } from "react-native";
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import useAuthStore from "@/store/auth-store";

export const unstable_settings = {
  initialRouteName: "(activity-tabs)",
};

export default function Layout() {
  // if no auth try to change the stack?

  return (
    <Stack>
      <Stack.Screen
        name="(activity-tabs)"
        options={{ headerTitle: "activity-tabs" }}
      />
      <Stack.Screen
        name="(menu-drawer)"
        options={{ headerTitle: "menu-root" }}
      />
      <Stack.Screen name="edit" options={{ headerTitle: "User-edit" }} />
      {/* tx-list */}
    </Stack>
  );
}
