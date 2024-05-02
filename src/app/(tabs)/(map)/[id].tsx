import { useLocalSearchParams } from "expo-router";
import React, { useContext, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { MapType } from "../../../context/MapContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";

const EventDetailsScreen = () => {
  const params = useLocalSearchParams();
  const { id, title, description, time, coordinate } = params;

  const coord = JSON.parse(coordinate as string).coordinate;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <MapView
          style={{ height: "35%" }}
          initialRegion={{
            latitude: coord.latitude,
            longitude: coord.longitude,
            latitudeDelta: 0.0059, // Adjust the desired zoom level as needed
            longitudeDelta: 0.0059,
          }}>
          <Marker
            coordinate={typeof coordinate == "string" ? coord : coordinate}
            title={title as string}
            description={description as string}
          />
        </MapView>
      </View>
    </GestureHandlerRootView>
  );
};

export default EventDetailsScreen;

const styles = StyleSheet.create({});
