import { loadModules } from "esri-loader";
import { useEffect } from "react";

export const useCreateMap = (mapRef) => {
  useEffect(() => {
    let view;
    const initializeMap = async (mapRef) => {
      const modules = ["esri/Map", "esri/views/MapView"];
      const [Map, MapView] = await loadModules(modules);
      const map = new Map({ baseMap: "street-relief-vector" });
      view = new MapView({
        map: map,
        zoom: 13,
        // container: mapRef.current,
        center: [51.505, -0.09],
      });
    };
    initializeMap();
    return () => view?.destroy();
  }, [mapRef]);
};
