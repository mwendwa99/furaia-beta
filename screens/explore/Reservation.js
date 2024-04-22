import { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { Calendar, DropdownIOS, Text, Input, ListItem } from "../../components";
import { formatOrderDate } from "../../utils/helper";
import { Button } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { createReservation } from "../../redux/reservation/reservationActions";

const premises = [
  {
    label: "Vanguard",
    value: 1,
  },
  {
    label: "Java",
    value: 2,
  },
  {
    label: "Kukito",
    value: 3,
  },
];

const Reservation = ({ navigation }) => {
  const [premise, setPremise] = useState(null);
  const [date, setDate] = useState(null);
  const [description, setDescription] = useState("");
  const { user, token } = useSelector((state) => state.auth);
  const { reservation, error, loading } = useSelector(
    (state) => state.reservation
  );
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (reservation && !error && !loading) {
  //     alert("Reservation created successfully");
  //   }
  // }, [reservation, error, loading]);

  useEffect(() => {
    if ((error && !loading) || reservation?.errorMessage) {
      // Check if the error message contains the date format error
      alert("Error creating reservation");
    }
  }, [error, loading]);

  console.log("ERROR:", error);
  console.log("RESERVATION:", reservation);

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const handleCrearteReservation = () => {
    if (!premise || !date || !description) {
      alert("Please fill all fields");
      return;
    }
    const formattedDate = date ? formatOrderDate(date) : "";
    const data = {
      user: user?.id,
      check_in_date: date,
      premise,
      description,
    };
    // console.log("DATA:", data);
    dispatch(createReservation({ token, data }));
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {loading && (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
        <View style={styles.column}>
          <ListItem
            title="View your reservations"
            iconLeft="calendar"
            iconRight="chevron-right"
            handlePressLink={() => navigation.navigate("My Reservations")}
          />
        </View>
        <View style={styles.column}>
          <Text
            value="I would like to make a reservation for:"
            variant="important"
            color="#002a0c"
            textStyle={{ marginBottom: 10 }}
          />
          <DropdownIOS
            items={premises}
            onChange={setPremise}
            selectedValue={premise}
            placeholder={"Select Premise"}
            iconLeft={"restaurant"}
          />
        </View>
        <View style={styles.column}>
          <Text value="Select a date" variant="important" color="#002a0c" />
          <Calendar selectDate={setDate} />
        </View>
        <View style={styles.column}>
          <Text value="Description" variant="important" color="#002a0c" />
          <Input
            placeholder="Description"
            iconLeft="text"
            multiline
            numberOfLines={4}
            onChange={handleDescriptionChange}
          />
          <Button
            mode="contained-tonal"
            onPress={handleCrearteReservation}
            style={styles.button}
          >
            Reserve
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};
export default Reservation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 10,
  },
  column: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    margin: 10,
  },
  button: {
    margin: 10,
    backgroundColor: "#aef1af",
    color: "#fafafa",
  },
});
