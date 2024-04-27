import { View, StyleSheet, Image, Pressable, SafeAreaView } from "react-native";
import { useState } from "react";
import { Text, Input, DropdownIOS, Button } from "../../components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { StatusBar } from "expo-status-bar";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../../redux/auth/authActions";
import { danger, success } from "../../utils/toast";
import { useEffect } from "react";

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

export default function Profile({ navigation }) {
  const [data, setData] = useState({});
  const { user, token, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  console.log(user.age);
  // console.log("error", error);

  useEffect(() => {
    setData(user);
  }, [user]);

  if (error) {
    danger(error, 2000);
  }

  const handleUpdate = () => {
    // console.log({ data, token });
    dispatch(updateProfile({ data, token }));
    success("Profile updated successfully");
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView>
        <View style={styles.section}>
          <Text value={"update profile"} variant={"subheading"} color="#000" />
          <View style={styles.row}>
            <Input
              theme={true}
              onChange={(value) => setData({ ...data, first_name: value })}
              inputStyle={{
                ...styles.input,
                width: "49%",
                backgroundColor: "#fafafa",
              }}
              defaultValue={user?.first_name || "Empty"}
            />
            <Input
              theme={true}
              onChange={(value) => setData({ ...data, last_name: value })}
              inputStyle={{
                ...styles.input,
                width: "49%",
                backgroundColor: "#fafafa",
              }}
              defaultValue={user?.last_name || "Empty"}
            />
          </View>
          <View style={styles.row}>
            <Input
              theme={true}
              onChange={(value) => setData({ ...data, email: value })}
              inputStyle={{
                ...styles.input,
                width: "100%",
                backgroundColor: "#fafafa",
              }}
              defaultValue={user?.email || "Empty"}
              type="email-address"
            />
          </View>
          <View style={{ marginVertical: 4 }}>
            <DropdownIOS
              items={dropDownItems}
              onChange={(value) => setData({ ...data, gender: value })}
              selectedValue={user?.gender || "Other"}
              placeholder={user?.gender || "Empty"}
              iconLeft={"gender-transgender"}
            />
          </View>
          <View style={styles.row}>
            <Input
              theme={true}
              onChange={(value) => setData({ ...data, mobile: value })}
              inputStyle={{
                ...styles.input,
                width: "100%",
                backgroundColor: "#fafafa",
              }}
              defaultValue={user?.mobile || "Empty"}
              type={"numeric"}
            />
          </View>

          <Pressable style={styles.button} onPress={handleUpdate}>
            <Text value={`Update`} variant={"important"} />
          </Pressable>
        </View>
      </KeyboardAwareScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  section: {
    padding: 20,
    height: "100%",
    flex: 1,
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
  button: {
    backgroundColor: "#002a00",
    padding: 10,
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    width: 300,
    alignSelf: "center",
  },
});
