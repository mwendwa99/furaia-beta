import { CameraView, useCameraPermissions } from "expo-camera";
import { useState, useEffect } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  getPremiseId,
  getPremiseTable,
} from "../../redux/premise/premiseActions";
import { useDispatch, useSelector } from "react-redux";
import { getMenu } from "../../redux/menu/menuActions";

export default function Scanner({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();

  const [displayText, setDisplayText] = useState("");
  const dispatch = useDispatch();
  const { premiseId, tableNumber } = useSelector((state) => state.premise);
  const { token } = useSelector((state) => state.auth);
  const { menu } = useSelector((state) => state.menu);

  // console.log("toto", premiseId, tableNumber);

  useEffect(() => {
    if (displayText) {
      dispatch(getPremiseId(displayText));
      dispatch(getPremiseTable(displayText));
    }
  }, [displayText, dispatch]);

  useEffect(() => {
    if (menu === null && premiseId && token) {
      dispatch(getMenu({ storeNumber: premiseId, token }));
    } else if (menu) {
      navigation.navigate("Menu");
    } else {
      console.log("menu not found");
    }
  }, [menu, premiseId, token, dispatch, navigation]);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const handleBarCodeScanned = (data) => {
    const result = JSON.stringify(data);
    // console.log("ZAZA", result);
    dispatch(getPremiseId(result));
    dispatch(getPremiseTable(result));
  };

  return (
    <View style={styles.container}>
      <CameraView
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={({ data }) => handleBarCodeScanned(data)}
        style={styles.camera}
        facing={"back"}
      ></CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
