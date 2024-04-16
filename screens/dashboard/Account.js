import { View, StyleSheet, Image, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Text, ListItem } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/auth/authActions";
import { success } from "../../utils/toast";
import axios from "axios";
import { prod } from "../../env";

export default function Profile({ navigation }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    success("Logout success");
  };

  return (
    <ScrollView style={styles.container}>
      <Text
        value={`Hello, ${user?.first_name}`}
        variant="subheading"
        color="#002a0c"
        textStyle={{ alignSelf: "flex-start" }}
      />
      <View
        style={{
          alignItems: "center",
          backgroundColor: "#002a0c",
          borderRadius: 10,
          marginBottom: 20,
          padding: 10,
        }}
      >
        <Image
          source={require("../../assets/FURAIA.png")}
          style={{ height: 100, width: 100 }}
        />
      </View>
      <Text value="Account" variant={"subheading"} color="#002a0c" />
      <ListItem
        title="My Information"
        iconLeft={"account"}
        iconRight={"chevron-right"}
        handlePressLink={() => navigation.navigate("Profile")}
      />
      <ListItem
        title="My Orders"
        iconLeft={"cart"}
        iconRight={"chevron-right"}
        handlePressLink={() => navigation.navigate("All Bills")}
      />
      <ListItem
        title="My Notifications"
        iconLeft={"bell"}
        iconRight={"chevron-right"}
        handlePressLink={() => alert("Feature coming soon!")}
      />
      <Text value="Settings" variant={"subheading"} color="#002a0c" />

      <ListItem
        title="Help"
        iconLeft={"help-circle"}
        iconRight={"chevron-right"}
        handlePressLink={() => alert("Feature coming soon!")}
      />
      <ListItem
        title="About"
        iconLeft={"information"}
        iconRight={"chevron-right"}
        handlePressLink={() => alert("Feature coming soon!")}
      />
      <ListItem
        title="Logout"
        iconLeft={"logout"}
        iconRight={"chevron-right"}
        handlePressLink={handleLogout}
      />
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fafafa",
  },

  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
