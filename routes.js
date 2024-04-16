import { AuthNavigator, AppNavigator } from "./navigation";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { ScannerNavigator } from "./screens/menu";
import { setExpoPushToken } from "./redux/auth/authReducer";
import { useDispatch } from "react-redux";

export default function Routes() {
  const { user, token, isVerified, expoPushToken } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  // get expoPushToken from AsyncStorage
  // const [expoPushToken, setExpoPushToken] = useState("");

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem("expoPushToken");
      dispatch(setExpoPushToken(token));
    })();
  }, []);

  // console.log("as", zaToken);
  console.log("aexpo", expoPushToken);

  // if user  is not null, set the current user

  // console.log("token", token);
  // console.log("isVerified", isVerified);
  // console.log("user", user);

  return user ? <AppNavigator /> : <AuthNavigator />;
  // return token ? <AppNavigator /> : <AuthNavigator />;
  // return <AppNavigator />;
}
