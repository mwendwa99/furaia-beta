import { useState, useEffect } from "react";
import { View, StyleSheet, Platform, Image } from "react-native";
import { Checkbox } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Button, Text, Input, Dropdown, DropdownIOS } from "../../components";
import { register } from "../../redux/auth/authActions";
import { danger, warning, success } from "../../utils/toast";

const dropDownItems = [
  {
    label: "Male",
    value: "Male",
  },
  {
    label: "Female",
    value: "Female",
  },
  {
    label: "Other",
    value: "Other",
  },
];

const Register = ({ navigation }) => {
  const [checked, setChecked] = useState(false);
  const [gender, setGender] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const dispatch = useDispatch();
  const { error, user } = useSelector((state) => state.auth);

  //   console.log("user", user);
  //   console.log("error", error);
  //   console.log("gender", gender);

  useEffect(() => {
    // If error is truthy (i.e., not null or undefined), display error message
    if (error) {
      console.log("Error:", error);
      danger(`Error: ${error.message}`, 2000);
    }
  }, [error]);

  const handleSignupButton = async () => {
    if (
      firstName === "" ||
      phone === "" ||
      lastName === "" ||
      password === "" ||
      confirmPassword === "" ||
      email === "" ||
      checked === false ||
      gender === ""
    ) {
      warning("All fields are required!");
      return;
    }

    if (password !== confirmPassword) {
      danger("PINs do not match", 2000);
      return;
    }

    if (phone.length !== 10) {
      danger("Invalid phone number", 2000);
      return;
    }

    const registerData = {
      mobile: phone,
      first_name: firstName,
      last_name: lastName,
      password: password,
      password_confirm: confirmPassword,
      email: email,
      terms_accepted: checked,
      gender,
    };

    dispatch(register(registerData));

    success("Account created successfully", 2000);

    navigation.navigate("Login");
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
        <View style={styles.section}>
          <Text value={"create account"} variant={"title"} color="#000" />
          <View style={styles.row}>
            <Input
              theme={true}
              onChange={setFirstName}
              inputStyle={{ ...styles.input, width: "49%" }}
              defaultValue={"First Name"}
            />
            <Input
              theme={true}
              onChange={setLastName}
              inputStyle={{ ...styles.input, width: "49%" }}
              defaultValue={"Last Name"}
            />
          </View>
          <View style={styles.row}>
            <Input
              theme={true}
              onChange={setEmail}
              inputStyle={{ ...styles.input, width: "100%" }}
              defaultValue={"Email"}
              type="email-address"
            />
          </View>
          <View style={{ marginVertical: 4 }}>
            <DropdownIOS
              items={dropDownItems}
              onChange={setGender}
              selectedValue={gender}
              placeholder={"Select Gender"}
              iconLeft={"transgender"}
            />
          </View>
          <View style={styles.row}>
            <Input
              theme={true}
              onChange={setPhone}
              inputStyle={{ ...styles.input, width: "100%" }}
              defaultValue={"Phone"}
              type={"numeric"}
            />
          </View>
          <View style={styles.row}>
            <Input
              theme={true}
              onChange={(pin) => setPassword(pin)}
              inputStyle={{ ...styles.input, width: "49%" }}
              defaultValue={"password"}
            />
            <Input
              theme={true}
              onChange={(pin) => setConfirmPassword(pin)}
              inputStyle={{ ...styles.input, width: "49%" }}
              defaultValue={"confirm password"}
            />
          </View>
          <View style={styles.row}>
            {Platform.OS === "android" && (
              <View style={styles.row}>
                <Checkbox
                  status={checked ? "checked" : "unchecked"}
                  color="#002a0c"
                  onPress={() => {
                    setChecked(!checked);
                  }}
                />
                <Text
                  value={"Agree to the terms and conditions"}
                  variant={"body"}
                  color="#000"
                />
              </View>
            )}
            {Platform.OS === "ios" && (
              <Checkbox.Item
                status={checked ? "checked" : "unchecked"}
                color="#002a0c"
                label="Agree to the terms and conditions"
                onPress={() => {
                  setChecked(!checked);
                }}
              />
            )}
          </View>

          <Button label="Click Me" onPress={handleSignupButton} theme="dark" />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#002a0c",
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    height: 100,
  },
  section: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    height: "100%",
  },
  row: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    color: "#000000",
  },
});
