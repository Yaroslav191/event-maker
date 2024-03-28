import axios from "axios";
import { MarkerInterface } from "../types";
// import * as Location from "expo-location";

interface FetchMarkersInterface {
  setMarkers: (merker: MarkerInterface) => void;
}

export const fetchMarkers = async (
  setMarkers: FetchMarkersInterface["setMarkers"]
) => {
  try {
    const response = await axios.get("http://192.168.0.108:8000/markers");

    if (response.status === 200) {
      setMarkers(response.data);
    }
  } catch (error) {
    console.log(error);
  } finally {
    // setLoading(false);
  }
};

// export const reverseGeocode = async (longitude, latitude) => {
//   const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
//     longitude,
//     latitude,
//   });

//   console.log("Reverse Geocoded:");
//   console.log(reverseGeocodedAddress);

//   return reverseGeocodedAddress;
// };
