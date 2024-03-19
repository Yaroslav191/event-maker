import { createContext, useState } from "react";
import { MarkerInterface } from "../types";

const MapType = createContext({
   markers: [],
   setMarkers: () => {},
});

const MapContext = ({ children }) => {
   const [markers, setMarkers] = useState<MarkerInterface[]>([]);

   return (
      <MapType.Provider value={{ markers, setMarkers }}>
         {children}
      </MapType.Provider>
   );
};

export { MapType, MapContext };
