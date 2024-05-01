import axios from "axios";
import { MarkerInterface } from "../types";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase/config";

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
      // console.log(JSON.parse(response.data[1].coordinate).data.types);
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

export const getFirebaseImage = (imgName: string) => {
  getDownloadURL(ref(storage, imgName))
    .then((url) => {
      // `url` is the download URL for 'images/stars.jpg'

      // This can be downloaded directly:
      const xhr = new XMLHttpRequest();
      xhr.responseType = "blob";
      xhr.onload = (event) => {
        const blob = xhr.response;
      };
      xhr.open("GET", url);
      xhr.send();

      console.log(url);

      // Or inserted into an <img> element
      // const img = document.getElementById('myimg');
      // img.setAttribute('src', url);
    })
    .catch((error) => {
      // Handle any errors
    });
};
