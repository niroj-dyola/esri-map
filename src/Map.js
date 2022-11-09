import React, { useRef, useEffect } from "react";
import { loadModules } from "esri-loader";

function Map() {
  const MapElement = useRef(null);

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
        center: [-83.159777091528696, 42.235723],
        zoom: 12,
        // ui: {
        //   padding: {
        //     bottom: 15,
        //     right: 0,
        //   },
        // },

        container: MapElement.current,
      });

      const render = {
        /** Simple Marker */
        // type: "simple",
        // field: "arrest_charge",
        // symbol: {
        //   type: "simple-marker",
        //   color: "orange",
        //   outline: {
        //     color: "white",
        //   },
        // },

        /** Picture Marker */
        // type: "simple",
        // field: "arrest_charge",
        // symbol: {
        //   type: "picture-marker", // autocasts as new PictureMarkerSymbol()
        //   url: "https://static.arcgis.com/images/Symbols/Shapes/BlackStarLargeB.png",
        //   width: "16px",
        //   height: "16px",
        // },

        /** web style with hexagon */
        type: "simple",
        field: "arrest_charge",
        size: 1000,
        symbol: {
          type: "web-style",
          name: "hexagon-3",
          styleName: "Esri2DPointSymbolsStyle",
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
        title: "{offense_category} ",
        content: [
          {
            type: "fields",
            fieldInfos: [
              {
                fieldName: "offense_category",
                label: "Offense Category",
                visible: true,
              },
              {
                fieldName: "address",
                label: "Address",
                visible: true,
              },
              {
                fieldName: "state_offense_code",
                label: "Code",
                visible: true,
              },
              {
                fieldName: "arrest_charge",
                label: "Charge",
                visible: true,
              },
            ],
          },
        ],
      };

      const geojsonlayer = new GeoJSONLayer({
        url: "https://raw.githubusercontent.com/adarshvarma15/mygeojson/main/RMS_Crime_Incidents%20edited.geojson",
        renderer: render,
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
  return (
    <>
      <div style={{ height: 800 }} ref={MapElement}></div>
    </>
  );
}

export default Map;
