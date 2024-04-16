import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Login, Register, ForgotPin, Otp, ResetPin } from "../screens/auth";

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: true,
          headerTintColor: "white",
          headerTitle: "",
          headerStyle: {
            backgroundColor: "#002A0C",
          },
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: true,
          headerTintColor: "white",
          headerTitle: "",
          headerStyle: {
            backgroundColor: "#002A0C",
          },
        }}
      />
      <Stack.Screen
        name="ForgotPin"
        component={ForgotPin}
        options={{
          headerShown: true,
          headerTintColor: "white",
          headerTitle: "",
          headerStyle: {
            backgroundColor: "#002A0C",
          },
        }}
      />
      <Stack.Screen
        name="Otp"
        component={Otp}
        options={{
          headerShown: true,
          headerTintColor: "white",
          headerTitle: "",
          headerStyle: {
            backgroundColor: "#002A0C",
          },
        }}
      />
      <Stack.Screen
        name="ResetPin"
        component={ResetPin}
        options={{
          headerShown: true,
          headerTintColor: "white",
          headerTitle: "",
          headerStyle: {
            backgroundColor: "#002A0C",
          },
        }}
      />
    </Stack.Navigator>
  );
}
