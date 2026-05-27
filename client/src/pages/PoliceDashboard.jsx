import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const safeIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34],
});
const warningIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34],
});
const sosIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34],
});

const HIGH_RISK_ZONES = [
  { id: 1, name: "Dense Forest Zone", lat: 26.1445, lng: 91.7362, radius: 5000, risk: "high" },
  { id: 2, name: "Cave Trail Area", lat: 25.3176, lng: 82.9739, radius: 3000, risk: "high" },
  { id: 3, name: "Mountain Pass", lat: 34.0837, lng: 74.7973, radius: 4000, risk: "medium" },
  { id: 4, name: "Coastal Cliff Zone", lat: 15.2993, lng: 74.1240, radius: 2000, risk: "medium" },
];

const MapController = ({ center }) => {
  const map = useMap();
  useEffect(() => { map.setView(center, 5); }, [center]);
  return null;
};

export default function PoliceDashboard() {
  const navigate = useNavigate();
  const [officer, setOfficer] = useState(null);
  const [tourists, setTourists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTourist, setSelectedTourist] = useState(null);
  const [filter, setFilter] = useState("all");
  const [mapCenter, setMapCenter] = useState([20.5937, 78.9629]);
  const [showZones, setShowZones] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [stats, setStats] = useState({ total: 0, safe: 0, warning: 0, sos: 0 });
  const [alerts, setAlerts] = useState([]);

  // Police auth check
  useEffect(() => {
    const auth = localStorage.getItem("policeAuth");
    if (!auth) {
      navigate("/police-login");
      return;
    }
    setOfficer(JSON.parse(auth));
  }, []);

  useEffect(() => {
    const fetchTourists = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v2/userdata/allforpolice`);
        const data = await res.json();
        if (data.status) {
          const mapped = data.message.map((u, i) => ({
            id: i + 1,
            name: u.fullname,
            smartID: u.smartID ? u.smartID.slice(0, 10) + "..." : "N/A",
            lat: u.location?.lat || 20.5937 + (Math.random() - 0.5) * 10,
            lng: u.location?.lng || 78.9629 + (Math.random() - 0.5) * 10,
            status: u.status || "safe",
            lastSeen: u.location?.lastUpdated
              ? new Date(u.location.lastUpdated).toLocaleTimeString()
              : "No location yet",
            nationality: u.nationality,
            phone: u.ownphno,
            safetyScore: u.safetyScore || 100
          }));
          setTourists(mapped);
          setStats({
            total: mapped.length,
            safe: mapped.filter(t => t.status === "safe").length,
            warning: mapped.filter(t => t.status === "warning").length,
            sos: mapped.filter(t => t.status === "sos").length,
          });
          const newAlerts = mapped
            .filter(t => t.status !== "safe")
            .map((t, i) => ({
              id: i + 1,
              message: t.status === "sos"
                ? `🚨 SOS Alert: ${t.name} triggered emergency`
                : `⚠️ Warning: ${t.name} in restricted area`,
              time: t.lastSeen,
              type: t.status
            }));
          setAlerts(newAlerts);
        }
      } catch (err) {
        console.log("Failed to fetch tourists:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTourists();
    const interval = setInterval(fetchTourists, 15000);
    return () => clearInterval(interval);
  }, []);

  const filteredTourists = tourists.filter(t => {
    const matchesFilter = filter === "all" || t.status === filter;
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.nationality.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status) => {
    if (status === "safe") return "#22c55e";
    if (status === "warning") return "#f59e0b";
    return "#ef4444";
  };

  const getStatusBg = (status) => {
    if (status === "safe") return "bg-green-900/30 border-green-500/30";
    if (status === "warning") return "bg-yellow-900/30 border-yellow-500/30";
    return "bg-red-900/30 border-red-500/30 animate-pulse";
  };

  const getIcon = (status) => {
    if (status === "safe") return safeIcon;
    if (status === "warning") return warningIcon;
    return sosIcon;
  };

  const focusTourist = (tourist) => {
    setSelectedTourist(tourist);
    setMapCenter([tourist.lat, tourist.lng]);
  };

  const generateFIR = (tourist) => {
    const fir = `
AUTO-GENERATED e-FIR
====================
Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}
Officer: ${officer?.name || "Auto-assigned"}
Officer ID: ${officer?.id || "N/A"}
District: ${officer?.district || "N/A"}

Tourist Name: ${tourist.name}
Smart ID: ${tourist.smartID}
Nationality: ${tourist.nationality}
Last Known Location: ${tourist.lat.toFixed(4)}, ${tourist.lng.toFixed(4)}
Status: ${tourist.status.toUpperCase()}
Contact: ${tourist.phone}
Last Seen: ${tourist.lastSeen}

Incident Type: Tourist Safety Alert
Assigned Officer: ${officer?.name || "Auto-assigned"}
Status: OPEN
    `.trim();
    const blob = new Blob([fir], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `eFIR_${tourist.name.replace(" ", "_")}.txt`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white font-mono">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-xl">🛡️</div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-wider">TOURIST SAFETY COMMAND CENTER</h1>
              <p className="text-xs text-gray-400">Ministry of Tourism — Real-Time Monitoring Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-green-900/40 border border-green-500/30 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-xs">LIVE</span>
            </div>
            {officer && (
              <div className="text-right">
                <p className="text-xs text-white font-bold">{officer.name}</p>
                <p className="text-xs text-gray-400">{officer.rank} — {officer.district}</p>
              </div>
            )}
            <button
              onClick={() => {
                localStorage.removeItem("policeAuth");
                localStorage.setItem("lastLogoutType", "police");
                navigate("/");
              }}
              className="text-xs bg-red-800 hover:bg-red-700 text-white px-3 py-1 rounded transition-all"
            >
              🚪 Logout
            </button>
            <span className="text-gray-400 text-xs">{new Date().toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-4 gap-0 border-b border-gray-700">
        {[
          { label: "TOTAL TOURISTS", value: stats.total, color: "blue", icon: "👥" },
          { label: "SAFE", value: stats.safe, color: "green", icon: "✅" },
          { label: "WARNING ZONES", value: stats.warning, color: "yellow", icon: "⚠️" },
          { label: "SOS ACTIVE", value: stats.sos, color: "red", icon: "🚨" },
        ].map((s, i) => (
          <div key={i} className={`p-4 border-r border-gray-700 bg-gray-900/50 ${s.color === "red" && s.value > 0 ? "animate-pulse" : ""}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 tracking-widest">{s.label}</p>
                <p className={`text-3xl font-bold mt-1 text-${s.color}-400`}>{s.value}</p>
              </div>
              <span className="text-2xl">{s.icon}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex h-[calc(100vh-180px)]">
        {/* Left Panel */}
        <div className="w-80 bg-gray-900 border-r border-gray-700 flex flex-col">
          <div className="p-3 border-b border-gray-700">
            <input
              type="text"
              placeholder="Search tourist..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 mb-2"
            />
            <div className="flex gap-1">
              {["all", "safe", "warning", "sos"].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`flex-1 text-xs py-1 rounded capitalize transition-all ${filter === f
                    ? f === "sos" ? "bg-red-600 text-white"
                      : f === "warning" ? "bg-yellow-600 text-white"
                        : f === "safe" ? "bg-green-600 text-white"
                          : "bg-blue-600 text-white"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                    }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="ml-2 text-gray-400 text-sm">Loading tourists...</span>
              </div>
            ) : filteredTourists.length === 0 ? (
              <div className="p-4 text-center text-gray-500 text-sm">No tourists found</div>
            ) : (
              filteredTourists.map(tourist => (
                <div
                  key={tourist.id}
                  onClick={() => focusTourist(tourist)}
                  className={`p-3 border-b border-gray-800 cursor-pointer hover:bg-gray-800/50 transition-all ${selectedTourist?.id === tourist.id ? "bg-gray-800 border-l-2 border-l-blue-500" : ""} ${getStatusBg(tourist.status)} border`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-sm text-white">{tourist.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${tourist.status === "sos" ? "bg-red-600 text-white animate-pulse"
                      : tourist.status === "warning" ? "bg-yellow-600 text-white"
                        : "bg-green-600 text-white"
                      }`}>
                      {tourist.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400 space-y-0.5">
                    <p>🌍 {tourist.nationality}</p>
                    <p>📍 {tourist.lat.toFixed(3)}, {tourist.lng.toFixed(3)}</p>
                    <p>🕐 {tourist.lastSeen}</p>
                  </div>
                  {tourist.status === "sos" && (
                    <button
                      onClick={(e) => { e.stopPropagation(); generateFIR(tourist); }}
                      className="mt-2 w-full text-xs bg-red-700 hover:bg-red-600 text-white py-1 rounded transition-all"
                    >
                      📋 Generate e-FIR
                    </button>
                  )}
                </div>
              ))
            )}
          </div>

          <div className="border-t border-gray-700 p-3">
            <p className="text-xs text-gray-500 tracking-widest mb-2">RECENT ALERTS</p>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {alerts.length === 0 ? (
                <p className="text-xs text-green-400">✅ All tourists safe</p>
              ) : (
                alerts.map(alert => (
                  <div key={alert.id} className={`text-xs p-2 rounded ${alert.type === "sos" ? "bg-red-900/40 text-red-300" : "bg-yellow-900/40 text-yellow-300"}`}>
                    <p>{alert.message}</p>
                    <p className="text-gray-500 mt-0.5">{alert.time}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="flex-1 relative">
          <div className="absolute top-3 right-3 z-[1000] flex flex-col gap-2">
            <button
              onClick={() => setShowZones(!showZones)}
              className={`px-3 py-2 text-xs rounded font-bold transition-all ${showZones ? "bg-red-700 text-white" : "bg-gray-800 text-gray-300"}`}
            >
              {showZones ? "🔴 HIDE ZONES" : "🔴 SHOW ZONES"}
            </button>
            <button
              onClick={() => setMapCenter([20.5937, 78.9629])}
              className="px-3 py-2 text-xs bg-gray-800 text-gray-300 rounded hover:bg-gray-700"
            >
              🗺️ RESET VIEW
            </button>
          </div>

          <div className="absolute bottom-3 left-3 z-[1000] bg-gray-900/90 border border-gray-700 rounded p-3 text-xs">
            <p className="text-gray-400 font-bold mb-2 tracking-wider">LEGEND</p>
            <div className="space-y-1">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500"></div><span className="text-gray-300">Safe Tourist</span></div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-yellow-500"></div><span className="text-gray-300">Warning Zone</span></div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div><span className="text-gray-300">SOS Active</span></div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500 opacity-30 border border-red-500"></div><span className="text-gray-300">High Risk Zone</span></div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-yellow-500 opacity-30 border border-yellow-500"></div><span className="text-gray-300">Medium Risk Zone</span></div>
            </div>
          </div>

          <MapContainer center={mapCenter} zoom={5} style={{ height: "100%", width: "100%" }} className="z-0">
            <MapController center={mapCenter} />
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OpenStreetMap contributors' />

            {showZones && HIGH_RISK_ZONES.map(zone => (
              <Circle
                key={zone.id}
                center={[zone.lat, zone.lng]}
                radius={zone.radius}
                pathOptions={{
                  color: zone.risk === "high" ? "#ef4444" : "#f59e0b",
                  fillColor: zone.risk === "high" ? "#ef4444" : "#f59e0b",
                  fillOpacity: 0.15, weight: 2, dashArray: "5,5"
                }}
              >
                <Popup>
                  <div className="text-sm">
                    <strong>{zone.name}</strong><br />
                    Risk Level: <span style={{ color: zone.risk === "high" ? "red" : "orange" }}>{zone.risk.toUpperCase()}</span><br />
                    Radius: {(zone.radius / 1000).toFixed(1)} km
                  </div>
                </Popup>
              </Circle>
            ))}

            {filteredTourists.map(tourist => (
              <Marker
                key={tourist.id}
                position={[tourist.lat, tourist.lng]}
                icon={getIcon(tourist.status)}
                eventHandlers={{ click: () => setSelectedTourist(tourist) }}
              >
                <Popup>
                  <div className="text-sm min-w-[180px]">
                    <strong className="text-base">{tourist.name}</strong>
                    <div className="mt-2 space-y-1">
                      <p>🌍 <strong>Nationality:</strong> {tourist.nationality}</p>
                      <p>📱 <strong>Phone:</strong> {tourist.phone}</p>
                      <p>🔑 <strong>Smart ID:</strong> {tourist.smartID}</p>
                      <p>🕐 <strong>Last Seen:</strong> {tourist.lastSeen}</p>
                      <p>📍 <strong>Status:</strong>
                        <span style={{ color: getStatusColor(tourist.status), fontWeight: "bold" }}>
                          {" "}{tourist.status.toUpperCase()}
                        </span>
                      </p>
                    </div>
                    {tourist.status === "sos" && (
                      <button
                        onClick={() => generateFIR(tourist)}
                        style={{ marginTop: "8px", width: "100%", background: "#dc2626", color: "white", border: "none", padding: "6px", borderRadius: "4px", cursor: "pointer", fontSize: "12px" }}
                      >
                        📋 Generate e-FIR
                      </button>
                    )}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Right Panel */}
        {selectedTourist && (
          <div className="w-64 bg-gray-900 border-l border-gray-700 p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white tracking-wider">TOURIST DETAIL</h3>
              <button onClick={() => setSelectedTourist(null)} className="text-gray-500 hover:text-white">✕</button>
            </div>

            <div className={`p-3 rounded border mb-4 ${getStatusBg(selectedTourist.status)}`}>
              <p className="font-bold text-white text-sm">{selectedTourist.name}</p>
              <span className={`text-xs px-2 py-0.5 rounded-full font-bold mt-1 inline-block ${selectedTourist.status === "sos" ? "bg-red-600 text-white"
                : selectedTourist.status === "warning" ? "bg-yellow-600 text-white"
                  : "bg-green-600 text-white"
                }`}>
                {selectedTourist.status.toUpperCase()}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              {[
                { label: "NATIONALITY", value: selectedTourist.nationality, icon: "🌍" },
                { label: "PHONE", value: selectedTourist.phone, icon: "📱" },
                { label: "SMART ID", value: selectedTourist.smartID, icon: "🔑" },
                { label: "LAST SEEN", value: selectedTourist.lastSeen, icon: "🕐" },
                { label: "LATITUDE", value: selectedTourist.lat.toFixed(6), icon: "📍" },
                { label: "LONGITUDE", value: selectedTourist.lng.toFixed(6), icon: "📍" },
                { label: "SAFETY SCORE", value: `${selectedTourist.safetyScore}/100`, icon: "🛡️" },
              ].map((item, i) => (
                <div key={i}>
                  <p className="text-gray-500 tracking-widest">{item.label}</p>
                  <p className="text-white mt-0.5">{item.icon} {item.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 space-y-2">
              <button
                onClick={() => alert(`Dispatching police unit to ${selectedTourist.name}'s location`)}
                className="w-full text-xs bg-blue-700 hover:bg-blue-600 text-white py-2 rounded transition-all"
              >
                🚔 Dispatch Police Unit
              </button>
              <button
                onClick={() => generateFIR(selectedTourist)}
                className="w-full text-xs bg-gray-700 hover:bg-gray-600 text-white py-2 rounded transition-all"
              >
                📋 Generate e-FIR
              </button>
              <button
                onClick={() => alert(`Sending alert to ${selectedTourist.name}`)}
                className="w-full text-xs bg-yellow-700 hover:bg-yellow-600 text-white py-2 rounded transition-all"
              >
                📣 Send Alert to Tourist
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}