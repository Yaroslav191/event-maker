import axios from "axios";
import { MarkerInterface } from "../types";
import { getStorage, ref, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "@/firebase/config";
import { LOCALHOST } from "@env";

export const getFirebaseImgUrl = () => {
  // const storage = getStorage();

  // Create a reference under which you want to list
  const listRef = ref(storage);

  // Find all the prefixes and items.
  listAll(listRef)
    .then((res) => {
      // Loop through the list of items
      res.items.forEach(async (itemRef) => {
        try {
          // Get the download URL for each file item
          const url = await getDownloadURL(itemRef);
          console.log("Download URL:", url);
          // Here, you can store or process the download URL as needed
        } catch (error) {
          // Handle errors
          console.error("Error getting download URL:", error);
        }
      });
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
    });

  // getDownloadURL(ref(storage, image))
  //   .then((url) => {
  //     const xhr = new XMLHttpRequest();
  //     xhr.responseType = "blob";
  //     xhr.onload = (event) => {
  //       const blob = xhr.response;
  //     };
  //     xhr.open("GET", url);
  //     xhr.send();
  //     console.log(url);
  //     return url;
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
};

getFirebaseImgUrl();

interface FetchMarkersInterface {
  setMarkers: (merker: MarkerInterface) => void;
}

export const fetchMarkers = async (
  setMarkers: FetchMarkersInterface["setMarkers"]
) => {
  try {
    console.log(LOCALHOST)
    const response = await axios.get(`http://${LOCALHOST}:8000/markers`);

    if (response.status === 200) {
      // setUserId(userId);
      setMarkers(response.data);
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
