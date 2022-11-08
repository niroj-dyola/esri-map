import { useRef } from "react";
import { useCreateMap } from "./hooks/useCreateMap";
// import { useCreateMap } from "./hooks";
const Map = () => {
  const mapRef = useRef(null);
  useCreateMap(mapRef);

  return <div className="map-view" ref={mapRef}></div>;
};

export default Map;
