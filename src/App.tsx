import { LatLng } from "leaflet";
import { useState } from "react";
import {
  FeatureGroup,
  LayerGroup,
  LayersControl,
  MapContainer,
  Marker,
  Polygon,
  Popup,
  TileLayer,
} from "react-leaflet";
import { useMapEvent } from "react-leaflet/hooks";

const MapActionComponent = () => {
  const [markers, setMarkers] = useState<LatLng[]>([]);

  const map = useMapEvent("click", (event) => {
    map.setView(event.latlng, map.getZoom());
  });

  useMapEvent("dblclick", (event) =>
    setMarkers((prev) => [...prev, event.latlng])
  );

  return markers.map((marker) => (
    <Marker position={marker} key={marker.lat + "-" + marker.lng}>
      <Popup>
        Lat: {marker.lat}
        <br />
        Long: {marker.lng}
        {marker.alt && <br />}
        {marker.alt && `Alt: ${marker.alt}`}
      </Popup>
    </Marker>
  ));
};

function App() {
  return (
    <div className="w-full h-screen">
      <MapContainer
        className="h-full w-full"
        center={[-6.2186488, 106.7991978]}
        zoom={13}
      >
        <MapActionComponent />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          eventHandlers={{ click: (event) => console.log(event) }}
        />

        <LayersControl position="topright">
          <LayersControl.Overlay name="Gelora Bung Karno Marker">
            <LayerGroup>
              <Marker position={[-6.2186488, 106.7991978]}>
                <Popup>Gelora Bung Karno</Popup>
              </Marker>
              <Polygon
                positions={[
                  [-6.214669526319127, 106.79833505435423],
                  [-6.220507037077649, 106.79841995392937],
                  [-6.222547271055484, 106.80306614213157],
                  [-6.2246618297727885, 106.8047785879743],
                  [-6.222034333328526, 106.80875203008532],
                  [-6.22131910805266, 106.80825739936898],
                  [-6.215825428896476, 106.80827214898527],
                  [-6.215686292605482, 106.80610816639332],
                  [-6.212924964757694, 106.80610816639332],
                ]}
              />
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name="Layer group with circles">
            <FeatureGroup
              eventHandlers={{ click: () => alert("click feature group") }}
            >
              <Marker position={[-6.2186488, 106.7991978]}>
                <Popup>Gelora Bung Karno</Popup>
              </Marker>
              <Polygon
                positions={[
                  [-6.214669526319127, 106.79833505435423],
                  [-6.220507037077649, 106.79841995392937],
                  [-6.222547271055484, 106.80306614213157],
                  [-6.2246618297727885, 106.8047785879743],
                  [-6.222034333328526, 106.80875203008532],
                  [-6.22131910805266, 106.80825739936898],
                  [-6.215825428896476, 106.80827214898527],
                  [-6.215686292605482, 106.80610816639332],
                  [-6.212924964757694, 106.80610816639332],
                ]}
              />
            </FeatureGroup>
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    </div>
  );
}

export default App;
