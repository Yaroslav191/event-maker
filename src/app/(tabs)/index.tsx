import { Alert, StyleSheet, ActivityIndicator, Button } from "react-native";
import { Text, View } from "@/src/components/Themed";
import MapView, { Marker, LatLng, PROVIDER_GOOGLE } from "react-native-maps";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as Location from "expo-location";
import { MarkerInterface } from "@/src/types";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { MapType } from "@/src/context/MapContext";
import axios from "axios";

export default function TabOneScreen() {
  const navigation = useNavigation();
  const router = useRouter();
  const params = useLocalSearchParams();

  const { markers, setMarkers } = useContext(MapType);

  const [currentLocation, setCurrentLocation] = useState<LatLng>({
    latitude: 0,
    longitude: 0,
  });

  // const [markers, setMarkers] = useState<MarkerInterface[]>([]);

  const snapPoints = useMemo(() => [75, "50%", "90%"], []);

  const getCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);
    } catch (error) {
      console.error("Error getting location:", error);
    }
  };

  const handleMapPress = (coordinate: LatLng) => {
    const newMarker = {
      coordinate: coordinate,
      key: String(markers.length), // Assign a unique key to the marker
    };
    // setMarkers([...markers, newMarker]);

    router.push({
      pathname: "/modal",
      params: {
        newMarker: JSON.stringify(newMarker),
      },
    });

    // router.push({ pathname: "/modal", params: { test: "LOLOLO" } });
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

  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const response = await axios.get("http://localhost:4545/markers");
        console.log("asda");

        if (response.status === 200) {
          setMarkers(response.data);
        }
      } catch (error) {
        console.log(error);
        // Handle error, e.g., show an error message to the user
      } finally {
        // setLoading(false);
      }
    };

    fetchMarkers();
  }, []); // Empty dependency array for running the effect once

  console.log(markers);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {currentLocation.latitude != 0 ? (
        <View style={{ flex: 1 }}>
          <MapView
            // provider={PROVIDER_GOOGLE}
            style={{ flex: 1 }}
            initialRegion={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onPress={(event) => handleMapPress(event.nativeEvent.coordinate)}>
            {markers.map((marker, index) => (
              <Marker
                key={index}
                draggable
                coordinate={marker.coordinate}
                onDragEnd={(e) =>
                  handleMarkerDrag(index, e.nativeEvent.coordinate)
                }
                onPress={() => handleMarkerPress(marker)}
              />
            ))}
          </MapView>

          <BottomSheet
            index={0}
            snapPoints={snapPoints}
            // ref={bottomSheetRef}
            // onChange={handleSheetChanges}
          >
            <BottomSheetView style={styles.contentContainer}>
              <Text>Awesome 🎉</Text>
            </BottomSheetView>
          </BottomSheet>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}>
          <ActivityIndicator size={"large"} color={"dodgerblue"} />
        </View>
      )}
    </GestureHandlerRootView>
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
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
