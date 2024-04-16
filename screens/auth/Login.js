import { View, StyleSheet, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input, Text, Button } from "../../components";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { danger, success } from "../../utils/toast";
import { login, getUser } from "../../redux/auth/authActions";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Login = ({ navigation }) => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isVerified, token, error, otp, loading } = useSelector(
    (state) => state.auth
  );

  // console.log("OTP:", otp);
  // console.log("isVerified:", isVerified);
  // console.log("Token:", token);
  // console.log("error:", error);

  // notify when is loading
  if (loading) {
    success("loading", 2000);
  }

  useEffect(() => {
    if (isVerified) {
      dispatch(getUser(token));
    }
  }, [isVerified]);

  useEffect(() => {
    if (!isVerified && token) {
      success("Enter OTP", 2000);
      navigation.navigate("Otp", { mobile: phone, navigateTo: "Login" });
    }
  }, [isVerified, token]);

  if (error) {
    danger("error", 2000);
    console.log("error", error);
  }

  // if user is verified and user has a token, get user data
  useEffect(() => {
    // if (isVerified && token) {
    //   dispatch(getUser(token));
    // }
    if (token) {
      dispatch(getUser(token));
    }
  }, [isVerified, token]);

  const handlePhoneChange = (value) => {
    setPhone(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const handleLogin = () => {
    if (phone === "" || phone.length !== 10) {
      danger("invalid phone number", 2000);
      console.log("invalid phone number");
      return;
    }

    dispatch(
      login({
        mobile: phone,
        password,
      })
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/FURAIA.png")}
            style={styles.logo}
          />
        </View>
        <Text value="Login" variant="title" />
        <View style={styles.section}>
          <View style={styles.row}>
            <Text value="phone" variant="input" />
            <Input
              defaultValue="0712345678"
              type="numeric"
              onChange={handlePhoneChange}
            />
          </View>
          <View style={styles.row}>
            <Text value="password" variant="input" />
            <Input
              defaultValue="****"
              onChange={handlePasswordChange}
              type="default"
            />
          </View>
          <View style={{ ...styles.row, flexDirection: "row" }}>
            <Pressable onPress={() => navigation.navigate("ForgotPin")}>
              <Text value="Forgot password" variant="body" />
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Register")}>
              <Text value="Create account" variant="body" />
            </Pressable>
          </View>
        </View>
        <Button theme="light" onPress={handleLogin} />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#002a0c",
    padding: 20,
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    height: 100,
  },
  section: {
    flex: 1,
  },
  row: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginVertical: 4,
  },
});
