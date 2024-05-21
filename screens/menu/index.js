import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import Menu from "./Menu";
import Scanner from "./Scanner";
import ExpoScanner from "./ExpoScanner";
import Camera from "./Camera";
import Checkout from "./Checkout";

const Stack = createNativeStackNavigator();

export const ScannerNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Scan">
      <Stack.Screen
        name="Scan"
        // component={ExpoScanner}
        component={Camera}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Menu"
        component={Menu}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Checkout"
        component={Checkout}
        options={{ headerShown: true, headerShadowVisible: false }}
      />
    </Stack.Navigator>
  );
};
