import React, { useRef, useEffect } from "react";
import { loadModules } from "esri-loader";

function Map() {
  const MapElement = useRef(null);
  const generateContent = (f) => {
    console.log("feature", f);
    // if (f.properties) {
    //   for (var key in f.properties) {
    //     out.push(key + ": " + f.properties[key]);
    //   }

    //   l.bindPopup(out.join("<br />"));
    // }
  };

  useEffect(() => {
    let view;

    loadModules(
      ["esri/views/MapView", "esri/WebMap", "esri/layers/GeoJSONLayer"],
      {
        css: true,
      }
    ).then(([MapView, WebMap, GeoJSONLayer]) => {
      const webmap = new WebMap({
        basemap: "topo-vector",
      });
      view = new MapView({
        map: webmap,
        center: [-83, 42],
        zoom: 8,
        container: MapElement.current,
      });
      const render = {
        type: "simple",
        field: "arrest_charge",
        symbol: {
          type: "simple-marker",
          color: "orange",
          outline: {
            color: "white",
          },
        },
        visualVariables: [
          {
            type: "color",
            field: "arrest_charge",
            stops: [
              {
                value: "12000",
                color: "#b03060",
              },
              {
                value: "20000",
                color: "#6096fd",
              },
              {
                value: "26003",
                color: "#56887d",
              },
            ],
          },
        ],
      };
      const template = {
        title: "Crime Information",
        content: generateContent(),
      };
      const geojsonlayer = new GeoJSONLayer({
        url: "https://raw.githubusercontent.com/adarshvarma15/mygeojson/main/RMS_Crime_Incidents%20edited.geojson",
        rendered: render,
        popupTemplate: template,
      });
      webmap.add(geojsonlayer);
    });
    return () => {
      if (!!view) {
        view.destroy();
        view = null;
      }
    };
  });
  return <div style={{ height: 800 }} ref={MapElement}></div>;
}

export default Map;
