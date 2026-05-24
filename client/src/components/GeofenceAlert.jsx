import { useState, useEffect } from "react";

export default function GeofenceAlert() {
  const [alert, setAlert] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const checkAlert = () => {
      const stored = localStorage.getItem("geofenceAlert");
      if (stored) {
        const data = JSON.parse(stored);
        setAlert(data);
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    checkAlert();
    const interval = setInterval(checkAlert, 10000);
    return () => clearInterval(interval);
  }, []);

  if (!visible || !alert) return null;

  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[9999] animate-bounce">
      <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border-2 ${
        alert.risk === "high"
          ? "bg-red-900/95 border-red-500 text-white"
          : "bg-yellow-900/95 border-yellow-500 text-white"
      }`}>
        <span className="text-3xl">{alert.risk === "high" ? "🚨" : "⚠️"}</span>
        <div>
          <p className="font-bold text-lg">
            {alert.risk === "high" ? "HIGH RISK ZONE DETECTED!" : "WARNING ZONE DETECTED!"}
          </p>
          <p className="text-sm opacity-90">You are entering: <strong>{alert.zone}</strong></p>
          <p className="text-xs opacity-70 mt-1">Please proceed with caution • {alert.time}</p>
        </div>
        <button
          onClick={() => { setVisible(false); localStorage.removeItem("geofenceAlert"); }}
          className="ml-4 text-white/70 hover:text-white text-xl font-bold"
        >
          ✕
        </button>
      </div>
    </div>
  );
}