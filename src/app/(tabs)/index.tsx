import { Alert, StyleSheet } from "react-native";

import EditScreenInfo from "@/src/components/EditScreenInfo";
import { Text, View } from "@/src/components/Themed";
import MapView, { Marker, LatLng, PROVIDER_GOOGLE } from "react-native-maps";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { MarkerInterface } from "@/src/types";
import MapEvent from "react-native-maps";

export default function TabOneScreen() {
   const [currentLocation, setCurrentLocation] = useState<LatLng>({
      latitude: 0,
      longitude: 0,
   });
   const [markerState, setMarkerState] = useState({} as any);
   const [markers, setMarkers] = useState<MarkerInterface[]>([]);

   const getCurrentLocation = async () => {
      try {
         let { status } = await Location.requestForegroundPermissionsAsync();
         if (status !== "granted") {
            console.log("Permission to access location was denied");
            return;
         }

         let location = await Location.getCurrentPositionAsync({});
         setCurrentLocation(location.coords as any);
      } catch (error) {
         console.error("Error getting location:", error);
      }
   };

   const handleMapPress = (coordinate: LatLng) => {
      const newMarker = {
         coordinate: coordinate,
         key: String(markers.length), // Assign a unique key to the marker
      };
      setMarkers([...markers, newMarker]);
   };

   const handleMarkerDrag = (index: number, coordinate: LatLng) => {
      const updatedMarkers = [...markers];
      updatedMarkers[index] = { ...updatedMarkers[index], coordinate };
      setMarkers(updatedMarkers);
   };

   const handleMarkerPress = (marker: MarkerInterface) => {
      Alert.alert(
         "Marker Pressed",
         `Coordinate: ${marker.coordinate.latitude}, ${marker.coordinate.longitude}`
      );
   };

   useEffect(() => {
      getCurrentLocation();
   }, []);

   return (
      <View style={{ flex: 1 }}>
         {currentLocation ? (
            <MapView
               // provider={PROVIDER_GOOGLE}
               style={{ flex: 1 }}
               initialRegion={{
                  latitude: currentLocation.latitude,
                  longitude: currentLocation.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
               }}
               onPress={(event) => handleMapPress(event.nativeEvent.coordinate)}
            >
               {markers.map((marker, index) => (
                  <Marker
                     key={marker.key}
                     draggable
                     coordinate={marker.coordinate}
                     onDragEnd={(e) =>
                        handleMarkerDrag(index, e.nativeEvent.coordinate)
                     }
                     onPress={() => handleMarkerPress(marker)}
                  />
               ))}
            </MapView>
         ) : (
            <View
               style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
               }}
            >
               <Text>Loading...</Text>
            </View>
         )}
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   title: {
      fontSize: 20,
      textAlign: "center",
      padding: 5,
   },
   map: {
      width: "100%",
      height: "40%",
   },
});
