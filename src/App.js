import "./App.css";
// import "leaflet/dist/leaflet.css";

// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Map, Scene, WebMap, WebScene } from "@esri/react-arcgis";
import Leaflet from "./Leaflet";

function App() {
  // const position = [51.505, -0.09];
  const mapProps = { basemap: "topo" };
  const viewProps = {
    center: [-122.4443, 47.2529],
    zoom: 6,
  };
  return (
    // <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
    //   <TileLayer
    //     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    //     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    //   />
    //   <Marker position={position} alt="Marker" title="Marker">
    //     <Popup>
    //       A pretty CSS3 popup. <br /> Easily customizable.
    //     </Popup>
    //   </Marker>
    // </MapContainer>
    // <div style={{ width: "100%", height: "100vh" }}>
    //   <Map
    //     // id="eb54b44c65b846cca12914b87b315169"
    //     mapProperties={mapProps}
    //     viewProperties={viewProps}
    //   />
    // </div>
    <Leaflet />
  );
}

export default App;
