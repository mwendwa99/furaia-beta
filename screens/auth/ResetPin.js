import { useState, useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import { TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";

import { Button, Input, Text } from "../../components";
import { resetPin } from "../../redux/auth/authActions";
import { danger, success, warning } from "../../utils/toast";

const ResetPin = ({ navigation }) => {
  const { otp, error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const onChangeNewPassword = (value) => {
    setNewPassword(value);
  };

  const onChangeConfirmNewPassword = (value) => {
    setConfirmNewPassword(value);
  };

  const handleResetPin = async () => {
    if (confirmNewPassword !== newPassword) {
      console.log(confirmNewPassword, newPassword);
      danger("passwords do not match", 2000);
      return;
    }
    if (confirmNewPassword === "" || newPassword === "") {
      warning("empty passwords", 2000);
      return;
    }
    if (!otp) {
      danger("OTP has expired", 2000);
      navigation.goBack();
      return;
    }
    console.log({
      password: newPassword,
      confirm_password: confirmNewPassword,
      reset_token: otp,
    });
    dispatch(
      resetPin({
        password: newPassword,
        confirm_password: confirmNewPassword,
        reset_token: otp,
      })
    );
    success("Please wait...", 2000);
    // if no error, navigate to login
    setTimeout(() => {
      if (!error) {
        //  set timeout to navigate to login
        success("Pin reset Success", 2000);
        navigation.navigate("Login");
      } else {
        danger("otp expired", 2000);
        console.log("error reset", error);
        navigation.goBack();
      }
    }, 3000);
    //   console.log("error reset problem", error);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/FURAIA.png")}
          style={styles.logo}
        />
      </View>
      <View style={styles.section}>
        <Text value="RESET password" variant="title" />
        <Input
          defaultValue="enter new password"
          onChange={onChangeNewPassword}
        />
        <Input
          defaultValue="confirm new password"
          onChange={onChangeConfirmNewPassword}
        />
        <Button onPress={handleResetPin} theme="light" />
      </View>
    </SafeAreaView>
  );
};

export default ResetPin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "#002a0c",
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    height: 100,
  },
  section: {
    paddingHorizontal: 20,
    flex: 1,
  },
  row: {
    position: "relative",
    flexDirection: "column",
  },
  input: {
    color: "#000000",
  },
});
