import axios from "axios";
import { MarkerInterface } from "../types";

interface  FetchMarkersInterface {
   setMarkers: (merker: MarkerInterface) => void
}

export const fetchMarkers = async (setMarkers : FetchMarkersInterface['setMarkers'])   => {
   try {
      const response = await axios.get("http://192.168.0.106:8000/markers");

      if (response.status === 200) {
         setMarkers(response.data);
      }
   } catch (error) {
      console.log(error);
   } finally {
      // setLoading(false);
   }
};