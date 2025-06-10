import React from "react";
import { Tabs } from "expo-router";
import { Calculator } from "lucide-react-native";

import Colors from "@/constants/colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.primary,
        headerShown: true,
        tabBarStyle: {
          backgroundColor: Colors.light.card,
          borderTopColor: Colors.light.border,
        },
        headerStyle: {
          backgroundColor: Colors.light.card,
        },
        headerTitleStyle: {
          color: Colors.light.text,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Calculator",
          tabBarIcon: ({ color }) => <Calculator size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}