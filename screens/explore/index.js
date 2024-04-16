import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Explore from "./Explore";
import Reservation from "./Reservation";
import MyReservations from "./MyReservations";
import StoryYangu from "./StoryYangu";
import SwapPoints from "./SwapPoints";

const ExploreStack = createNativeStackNavigator();

export const ExploreNavigator = () => {
  return (
    <ExploreStack.Navigator>
      <ExploreStack.Screen
        name="Explore"
        options={{
          headerShadowVisible: false,
          title: "Explore",
        }}
        component={Explore}
      />
      <ExploreStack.Screen
        name="Reservation"
        options={{
          headerShadowVisible: false,
          title: "Reservation",
        }}
        component={Reservation}
      />
      <ExploreStack.Screen
        name="My Reservations"
        options={{
          headerShadowVisible: false,
          title: "My Reservations",
        }}
        component={MyReservations}
      />
      <ExploreStack.Screen
        name="SwapPoints"
        options={{
          headerShadowVisible: false,
          title: "Swap Points",
        }}
        component={SwapPoints}
      />
      <ExploreStack.Screen
        name="StoryYangu"
        options={{
          headerShadowVisible: false,
          title: "Story Yangu",
        }}
        component={StoryYangu}
      />
    </ExploreStack.Navigator>
  );
};
