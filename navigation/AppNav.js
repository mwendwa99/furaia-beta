import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavigation } from "react-native-paper";
import { CommonActions } from "@react-navigation/native";

import { ScannerNavigator } from "../screens/menu";
import { DashboardNavigator } from "../screens/dashboard";
// import { ShoppingCartProvider } from "../context/cartContext";
import { CartProvider } from "../context/cart";
import { ExploreNavigator } from "../screens/explore";

const BottomTab = createBottomTabNavigator();

export default function HomeNavigator() {
  return (
    <CartProvider>
      <BottomTab.Navigator
        screenOptions={{ headerShown: false }}
        tabBar={({ navigation, state, descriptors, insets }) => (
          <BottomNavigation.Bar
            version={3}
            style={{
              backgroundColor: "#fafafa",
            }}
            activeIndicatorStyle={{
              backgroundColor: "#AFE1AF",
              borderRadius: 3,
            }}
            shifting={false}
            keyboardHidesNavigationBar={true}
            navigationState={state}
            safeAreaInsets={insets}
            onTabPress={({ route, preventDefault }) => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (event.defaultPrevented) {
                preventDefault();
              } else {
                navigation.dispatch({
                  ...CommonActions.navigate(route.name, route.params),
                  target: state.key,
                });
              }
            }}
            renderIcon={({ route, focused, color }) => {
              const { options } = descriptors[route.key];
              if (options.tabBarIcon) {
                return options.tabBarIcon({ focused, color, size: 24 });
              }

              return null;
            }}
            getLabelText={({ route }) => {
              const { options } = descriptors[route.key];
              const label =
                options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                  ? options.title
                  : route.title;

              return label;
            }}
          />
        )}
      >
        <BottomTab.Screen
          name="Dashboard"
          component={DashboardNavigator}
          options={{
            title: "Dashboard",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="view-dashboard"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <BottomTab.Screen
          name="Scanner"
          component={ScannerNavigator}
          options={{
            title: "Scan",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="qrcode-scan"
                color={color}
                size={size}
              />
            ),
            tabBarLabelPosition: "beside-icon",
          }}
        />

        <BottomTab.Screen
          name="ExploreNav"
          component={ExploreNavigator}
          options={{
            title: "Explore",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="compass"
                color={color}
                size={size}
              />
            ),
            tabBarLabelPosition: "beside-icon",
          }}
        />
      </BottomTab.Navigator>
    </CartProvider>
  );
}
