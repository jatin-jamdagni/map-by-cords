"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Timeline from "@/components/Timeline";
import { locations } from "@/lib/Locations";
import { useState } from "react";

Icon.Default.imagePath =
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/";

const Map = () => {
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);

  const pathPositions: [number, number][] = locations.map((location) => [
    location.latitude,
    location.longitude,
  ]);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] mb-4">
          <MapContainer
            center={[selectedLocation.latitude, selectedLocation.longitude]}
            zoom={15}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {locations.map((location) => (
              <Marker
                key={location.id}
                position={[location.latitude, location.longitude]}
                icon={
                  new Icon({
                    iconUrl:
                      location.id === selectedLocation.id
                        ? "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png"
                        : "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                  })
                }
              >
                <Popup>{location.address}</Popup>
              </Marker>
            ))}
            <Polyline
              positions={pathPositions}
              color="blue"
              weight={3}
              opacity={0.7}
            />
          </MapContainer>
        </div>
        <Timeline
          locations={locations}
          onSelectLocation={setSelectedLocation}
        />
      </CardContent>
    </Card>
  );
};

export default Map;
