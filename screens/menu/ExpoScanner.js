import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from "expo-camera";
import { View, StyleSheet, Text, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  getPremiseId,
  getPremiseTable,
} from "../../redux/premise/premiseActions";

export default function Scanner() {
  const [displayText, setDisplayText] = useState("");
  const [hasPermission, setHasPermission] = useState(null);
  const dispatch = useDispatch();
  const { premiseId, tableNumber } = useSelector((state) => state.premise);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    if (displayText) {
      dispatch(getPremiseId(displayText));
      dispatch(getPremiseTable(displayText));
    }
  }, [displayText, dispatch]);

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  // console.log(premiseId, tableNumber);

  return (
    <View style={styles.container}>
      <Camera
        style={{ flex: 1 }}
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
        }}
        onBarCodeScanned={(...args) => {
          const data = args[0].data;
          let result = JSON.stringify(data);
          setDisplayText(result);
        }}
      />

      <View style={styles.scanBoxContainer}>
        <View style={styles.scanBox}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  boxContainer: {
    position: "absolute",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    height: "100%",
    width: "100%",
    zIndex: 1,
  },
  scanBoxContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    zIndex: 0,
  },
  scanBox: {
    width: 300,
    height: 300,
    borderWidth: 1,
    borderColor: "white",
  },
});
