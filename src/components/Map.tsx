"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Badge } from "@/components/ui/badge";
import { PolresData } from "@/app/types";

const pinIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white">
  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
  <circle cx="12" cy="10" r="3"/>
</svg>`;

const customIcon = L.divIcon({
  className: "custom-marker",
  html: `<div class="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg hover:bg-yellow-600 transition-colors">
    ${pinIconSvg}
  </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

interface MapComponentProps {
  data: PolresData[];
  onPolresSelect: (polres: PolresData) => void;
}

const MapComponent = ({ data, onPolresSelect }: MapComponentProps) => {
  return (
    <MapContainer 
      center={[0.5070677, 101.5401725]}
      zoom={8}
      className="w-full h-full z-0"
      zoomControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='<a href="https://www.openstreetmap.org/copyright"></a>'
      />
      {data.map((polres) => (
        <Marker
          key={polres.id}
          position={polres.coordinates}
          icon={customIcon}
          eventHandlers={{
            click: () => onPolresSelect(polres),
          }}
        >
          <Popup className="rounded-xl shadow-xl bg-white">
            <div className="p-4">
              <h3 className="font-bold text-lg mb-3 text-gray-800 hover:text-blue-600 transition-colors">
                {polres.nama}
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className="px-3 py-1 bg-blue-100 text-blue-700 hover:bg-blue-200"
                  >
                    {polres.companies.length} Perusahaan
                  </Badge>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 p-2.5 rounded-lg border border-gray-200">
                  <span className="text-sm text-gray-600">
                    Luas Lahan:
                  </span>
                  <span className="font-bold text-gray-900">
                    {polres.totalArea} Ha
                  </span>
                </div>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;