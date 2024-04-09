import { createContext, useState } from "react";
import { MarkerInterface } from "../types";
import { LatLng } from "react-native-maps";

export interface MapContextType {
  markers: MarkerInterface[];
  setMarkers: (markers: MarkerInterface[]) => void;
  currentLocation: LatLng;
  setCurrentLocation: (currentLocation: LatLng) => void;
}

const MapType = createContext<MapContextType>({
  markers: [],
  setMarkers: () => {},
  currentLocation: {
    latitude: 0,
    longitude: 0,
  },
  setCurrentLocation: () => {},
});

const MapContext: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [markers, setMarkers] = useState<MarkerInterface[]>([]);
  const [currentLocation, setCurrentLocation] = useState<LatLng>({
    latitude: 0,
    longitude: 0,
  });

  return (
    <MapType.Provider
      value={{ markers, setMarkers, currentLocation, setCurrentLocation }}>
      {children}
    </MapType.Provider>
  );
};

export { MapType, MapContext };
