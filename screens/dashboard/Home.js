import * as Device from "expo-device";
import {
  Ionicons,
  FontAwesome5,
  MaterialIcons,
  Fontisto,
} from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import {
  View,
  Text as RNText,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
  Pressable,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useSelector, useDispatch } from "react-redux";
import { Avatar, Text } from "../../components";
import { getOrders } from "../../redux/order/orderActions";
import { CreateFCMDevice } from "../../services/notification.service";

const backgroundImage = require("../../assets/Nairobi_Night.jpg");
const logo = require("../../assets/FURAIA.png");

const Home = ({ navigation }) => {
  const { user, token, expoPushToken } = useSelector((state) => state.auth);
  const { orders, loading } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  const premiseNameMapping = {
    1: "Vanguard",
    2: "Java",
    3: "Kukito",
  };

  // Function to get the premise name based on premise ID
  const getPremiseName = (premiseId) => {
    return premiseNameMapping[premiseId] || "Unknown Premise";
  };

  const createFCMDevice = async () => {
    const userData = {
      fcmToken: expoPushToken,
      name: user.first_name,
      mobile: user.mobile,
      device_type: Device.brand,
    };
    await CreateFCMDevice(userData);
  };
  // create FCM device
  useEffect(() => {
    createFCMDevice();
  }, []);

  useEffect(() => {
    dispatch(getOrders(token));
  }, [dispatch, token]);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={backgroundImage}
        style={styles.background}
        imageStyle={{ opacity: 0.7 }}
      >
        <View style={styles.row}>
          <Image source={logo} style={styles.image} />
          <Pressable onPress={() => navigation.navigate("Account")}>
            <Avatar icon="account-circle" size={50} bgColor="#002a0c" />
          </Pressable>
        </View>

        <View style={styles.textContainer}>
          <RNText style={styles.text}>Karibu, {user?.first_name}</RNText>
        </View>
      </ImageBackground>

      <View style={styles.scanButton}>
        <Pressable onPress={() => navigation.navigate("Scanner")}>
          <View style={styles.circleButtonTextContainer}>
            <MaterialIcons name="qr-code-2" color="#002a0c" size={70} />
            <RNText style={styles.scanButtonText}> Scan To Order</RNText>
          </View>
        </Pressable>
      </View>

      <View style={{ backgroundColor: "#f0f6f4", flex: 2 / 3, zIndex: 0 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 40,
            marginTop: 30,
            marginBottom: 45,
            height: Platform.OS === "ios" ? 70 : "",
          }}
        >
          <Pressable
            onPress={() => alert("Coming Soon!")}
            style={{
              width: 40,
              height: 40,
              borderRadius: 30,
              backgroundColor: "#fff",
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#002a0c",
            }}
          >
            <Ionicons name="share-social" color="#002a0c" size={20} />
          </Pressable>

          <Pressable
            onPress={() => alert("Coming Soon!")}
            style={{
              width: 40,
              height: 40,
              borderRadius: 30,
              backgroundColor: "#fff",
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#002a0c",
            }}
          >
            <Ionicons name="trending-up-sharp" color="#002a0c" size={20} />
          </Pressable>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Pressable
            style={styles.Redeem}
            onPress={() => alert("Coming Soon!")}
          >
            <FontAwesome5 name="funnel-dollar" color="#002a0c" size={20} />
            <RNText style={styles.RedeemText}>Redeem Points</RNText>
          </Pressable>
          <Pressable onPress={() => navigation.navigate("All Bills")}>
            <View style={styles.orderHistory}>
              <Fontisto name="history" color="#002a0c" size={20} />
              <RNText style={styles.orderHistoryText}>Order History</RNText>
            </View>
          </Pressable>
        </View>
        <ScrollView nestedScrollEnabled={true}>
          <View style={styles.TransactionsText}>
            <RNText style={styles.transcText}>Latest Transactions</RNText>
            <RNText style={styles.transcText}></RNText>
            <Pressable onPress={() => navigation.navigate("Transactions")}>
              <RNText
                style={{
                  ...styles.transcText,
                  textDecorationLine: "underline",
                }}
              >
                see all
              </RNText>
            </Pressable>
          </View>
          <View style={{ height: 150, marginBottom: 4 }}>
            {orders ? (
              [...orders]
                .reverse()
                .slice(0, 3)
                .map((item, index) => (
                  <Pressable
                    style={styles.Transactions}
                    key={index}
                    onPress={() => navigation.navigate("Order Slip", { item })}
                  >
                    <Text
                      style={styles.transcDeetText}
                      value={`${index + 1}. ${item.order_number}`}
                      variant="important"
                      color="#002a0c"
                    />

                    <Text
                      value={getPremiseName(item.premise_id)}
                      variant="important"
                      color="#002a0c"
                    />
                    <Text
                      value={item.total}
                      variant="important"
                      color="#002a0c"
                    />
                  </Pressable>
                ))
            ) : (
              <ActivityIndicator size="large" color="#002a0c" />
            )}
          </View>
          <View style={styles.videoContainer}>
            <RNText style={styles.transcText}>Demo Video</RNText>
            {loading ? (
              <ActivityIndicator size="large" color="#002a0c" />
            ) : (
              <View style={styles.video}></View>
            )}
          </View>
        </ScrollView>
      </View>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    position: "relative",
  },

  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
  },

  textContainer: {
    opacity: 0.9,
    backgroundColor: "#002a0c",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginHorizontal: 10,
    marginBottom: 10,
    height: "70%",
  },

  text: {
    alignSelf: "center",
    marginTop: 30,
    color: "#fafafa",
    fontSize: 24,
    fontWeight: "bold",
  },

  image: {
    height: 30,
    width: 100,
    marginHorizontal: 10,
    marginTop: 30,
    marginBottom: 20,
  },
  background: {
    flex: 1 / 3,
  },

  scanButton: {
    height: Dimensions.get("window").width / 3 + 50,
    width: Dimensions.get("window").width / 3 + 50,
    borderRadius: 150,
    position: "absolute",
    backgroundColor: "#fff",
    marginVertical: 180,
    marginHorizontal: Dimensions.get("window").width / 3 - 25,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  circleButtonTextContainer: {
    height: 180,
    width: 180,
    borderColor: "#195837",
    borderRadius: 150,
    borderWidth: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  TransactionsText: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    marginTop: 4,
    marginBottom: 2,
    alignItems: "baseline",
  },
  transcText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#bdc1c0",
  },
  orderHistory: {
    height: 50,
    width: 80,
    backgroundColor: "#fff",
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  Redeem: {
    height: 50,
    width: 80,
    backgroundColor: "#fff",
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  RedeemText: {
    fontSize: 10,
    marginTop: 6,
    color: "#bdc1c0",
    fontWeight: "bold",
  },
  orderHistoryText: {
    fontSize: 10,
    marginTop: 6,
    color: "#bdc1c0",
    fontWeight: "bold",
  },
  scanButtonText: {
    marginTop: 6,
    fontWeight: "bold",
  },
  Transactions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "#fff",
    margin: 12,
    padding: 10,
    marginTop: 6,
    borderRadius: 7,
  },
  TransactionsImage: {
    height: 30,
    width: 60,
    marginHorizontal: 10,
  },
  transcDeetText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#161616",
  },
  transcDeetTextksh: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4a4a4a",
  },
  videoContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 12,
    marginTop: 6,
  },
  video: {
    height: 200,
    backgroundColor: "#c3c3c3",
    marginTop: 4,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});
