import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import Home from "./Home";
import Account from "./Account";
import Profile from "./Profile";
import Orders from "./Orders";
import AllBills from "./AllBills";
import AllOrders from "./AllOrders";
import Transactions from "./Transactions";
import OrderSlip from "./OrderSlip";
import BillReceipt from "./BillReceipt";

const Stack = createNativeStackNavigator();

export const DashboardNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Dashboard">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Account"
        component={Account}
        options={{ headerShown: true, headerShadowVisible: false }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: true, headerShadowVisible: false }}
      />
      <Stack.Screen
        name="Orders"
        component={Orders}
        options={{ headerShown: true, headerShadowVisible: false }}
      />
      <Stack.Screen
        name="All Bills"
        component={AllBills}
        options={{
          headerShown: true,
          headerShadowVisible: false,
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="All Orders"
        component={AllOrders}
        options={{
          headerShown: true,
          headerShadowVisible: false,
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="Order Slip"
        component={OrderSlip}
        options={{
          headerShown: true,
          headerShadowVisible: false,
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="Total Bill"
        component={BillReceipt}
        options={{
          headerShown: true,
          headerShadowVisible: false,
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="Transactions"
        component={Transactions}
        options={{ headerShown: true, headerShadowVisible: false }}
      />
    </Stack.Navigator>
  );
};
