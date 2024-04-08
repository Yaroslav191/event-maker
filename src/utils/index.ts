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
    const response = await axios.get("http://192.168.100.125:8000/markers");

    if (response.status === 200) {
      setMarkers(response.data);
      console.log(response.data[0].coordinate);
    }
  } catch (error) {
    console.log(error);
  } finally {
    // setLoading(false);
  }
};

async function getPlaceId(latitude: number, longitude: number) {
  const apiKey = "AIzaSyAhE5oyGpmj4LnZYc6UgkEHT78kOnu_tTg";
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
  );
  const data = await response.json();
  if (data.results.length > 0) {
    return data.results[0].place_id;
  } else {
    throw new Error("No results found for the provided coordinates.");
  }
}

export async function getPlaceDetails(latitude: number, longitude: number) {
  const apiKey = "AIzaSyAhE5oyGpmj4LnZYc6UgkEHT78kOnu_tTg";
  try {
    const placeId = await getPlaceId(latitude, longitude);
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}&language=ru`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching place details:", error);
    throw error;
  }
}

// getPlaceDetails(latitude, longitude)
//   .then((placeDetails) => {
//     console.log(placeDetails);
//     // Do something with place details
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });
