import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useContext } from "react";
import { Image, Text, View, StyleSheet, Pressable } from "react-native";
import { useState } from "react";
import MapView, { MapCalloutSubview, Marker } from "react-native-maps";
import { MapType } from "../context/MapContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";

const EventDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const route = useRoute();
  const { testvalue } = route.params;
  const { currentLocation, setCurrentLocation } = useContext(MapType);

  console.log();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* <Stack.Screen options={{ title: "Details" + id }} /> */}
      <View style={{ flex: 1 }}>
        <MapView
          style={{ height: "35%" }}
          initialRegion={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
          // coordinate={marker.latlng}
          // title={marker.title}
          // description={marker.description}
          />
        </MapView>
      </View>
    </GestureHandlerRootView>
  );
};

export default EventDetailsScreen;

const styles = StyleSheet.create({});
