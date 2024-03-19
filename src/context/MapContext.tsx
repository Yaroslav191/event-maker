import { createContext, useState } from "react";
import { MarkerInterface } from "../types";

interface MapContextType {
  markers: MarkerInterface[];
  setMarkers: (markers: MarkerInterface[]) => void;
}

const MapType = createContext<MapContextType>({
  markers: [],
  setMarkers: () => {},
});

const MapContext: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [markers, setMarkers] = useState<MarkerInterface[]>([]);

  return (
    <MapType.Provider value={{ markers, setMarkers }}>
      {children}
    </MapType.Provider>
  );
};

export { MapType, MapContext };
