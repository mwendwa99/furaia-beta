import { View, StyleSheet, FlatList, RefreshControl } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllReservations } from "../../redux/reservation/reservationActions";
import { formatOrderDate } from "../../utils/helper";
import { Text } from "../../components";

export default function MyReservations() {
  const dispatch = useDispatch();
  const { userReservations, loading } = useSelector(
    (state) => state.reservation
  );
  const { token } = useSelector((state) => state.auth);
  const [refreshing, setRefreshing] = useState(false || loading);

  //   console.log(userReservations);

  useEffect(() => {
    dispatch(getAllReservations(token));
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getAllReservations(token));
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      {!userReservations ||
        (userReservations.length === 0 && (
          <Text
            value="You have no reservations"
            color="#002a0c"
            variant="important"
          />
        ))}
      {userReservations && userReservations.length > 0 && (
        <FlatList
          data={userReservations}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text
                  value={`${item.premise.premise_name}`}
                  color={"#002a0c"}
                  variant="important"
                />
                <Text
                  value={formatOrderDate(item.check_in_date)}
                  color={"#002a0c"}
                  variant="important"
                />
              </View>
              <View style={styles.cardContent}>
                <Text
                  value={`${item.description}`}
                  color={"#002a0c"}
                  textStyle={{ marginBottom: 5 }}
                />
                <Text
                  value={`${item.is_accepted ? "Accepted" : "Pending"}`}
                  color={item.is_accepted ? "#002a0c" : "orange"}
                  variant="important"
                />
              </View>
            </View>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  card: {
    backgroundColor: "#fafafa",
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#c3c3c3",
    borderRadius: 10,
  },
  cardHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  cardContent: {
    marginBottom: 10,
  },
});
