import AsyncStorage from "@react-native-async-storage/async-storage";
import { BarCodeScanner } from "expo-barcode-scanner";
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Pressable } from "react-native";

import { getPremiseCode } from "../../utils/helper";
import { getMenu } from "../../redux/menu/menuActions";
import { useDispatch, useSelector } from "react-redux";
import { success } from "../../utils/toast";

const Scanner = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [storeNumber, setStoreNumber] = useState("");
  const { token, loading: autLoading } = useSelector((state) => state.auth);
  const { menu, loading: menuLoading } = useSelector((state) => state.menu);
  const dispatch = useDispatch();

  // console.log(menu);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    if (autLoading) {
      success("loading", 2000);
    }
  }, []);

  useEffect(() => {
    if (menuLoading) {
      success("loading", 2000);
    }
  }, []);

  // useEffect(() => {
  //   const fetchStoreNumber = async () => {
  //     try {
  //       const storedStoreNumber = await AsyncStorage.getItem("storeNumber");
  //       if (storedStoreNumber !== null) {
  //         setStoreNumber(storedStoreNumber);
  //       } else {
  //         setStoreNumber("1"); // Set default value if storeNumber is not available in AsyncStorage
  //       }
  //     } catch (error) {
  //       console.log("Error retrieving storeNumber:", error);
  //     }
  //   };

  //   fetchStoreNumber();
  // }, []);

  // const handleBarCodeScanned = async ({ type, data }) => {
  //   setScanned(true);

  //   // get premise code from scanned data
  //   const premiseCode = getPremiseCode(data);

  //   // add premiseCode to AsyncStorage and wait for it to finish
  //   await AsyncStorage.setItem("storeNumber", premiseCode);

  //   // set storeNumber state to premiseCode after AsyncStorage operation is fulfilled
  //   setStoreNumber(premiseCode.toString());
  // };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleNavigate = () => {
    let storeNumber = 1;
    // navigation.navigate("Menu");
    dispatch(getMenu({ storeNumber, token }));

    if (menu) {
      // console.log("menu", menu);
      navigation.navigate("Menu");
    }
  };

  // console.log("token", token);
  // console.log("storeNumber", storeNumber);

  return (
    <>
      <View style={styles.container}>
        <BarCodeScanner
          // onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        {/* {scanned && (
          <Button title="Tap to Scan Again" onPress={() => setScanned(false)} />
        )} */}

        <Pressable style={styles.button} onPress={handleNavigate}>
          <Text style={styles.text}>Scan</Text>
        </Pressable>
      </View>
    </>
  );
};

export default Scanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 36, // Adjust this value as needed for spacing
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#002a0c",
    width: 200,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
