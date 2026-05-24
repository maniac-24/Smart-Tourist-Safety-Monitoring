const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

let trackingInterval = null;

// High risk zones - same as police dashboard
const HIGH_RISK_ZONES = [
  { id: 1, name: "Dense Forest Zone", lat: 26.1445, lng: 91.7362, radius: 0.05, risk: "high" },
  { id: 2, name: "Cave Trail Area", lat: 25.3176, lng: 82.9739, radius: 0.03, risk: "high" },
  { id: 3, name: "Mountain Pass", lat: 34.0837, lng: 74.7973, radius: 0.04, risk: "medium" },
  { id: 4, name: "Coastal Cliff Zone", lat: 15.2993, lng: 74.1240, radius: 0.02, risk: "medium" },
];

const checkGeofence = (lat, lng) => {
  for (const zone of HIGH_RISK_ZONES) {
    const dist = Math.sqrt(
      Math.pow(lat - zone.lat, 2) + Math.pow(lng - zone.lng, 2)
    );
    if (dist < zone.radius) {
      return zone;
    }
  }
  return null;
};

const updateLocation = async (lat, lng) => {
  try {
    await fetch(`${BACKEND_URL}/api/v2/userdata/updatelocation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "accessToken": localStorage.getItem("accessToken")
      },
      body: JSON.stringify({ lat, lng })
    });

    // Update safety score after each location update
    const scoreRes = await fetch(`${BACKEND_URL}/api/v2/userdata/updatesafetyscore`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "accessToken": localStorage.getItem("accessToken")
      },
      body: JSON.stringify({})
    });
    const scoreData = await scoreRes.json();
    if (scoreData.status) {
      localStorage.setItem("safetyScore", scoreData.safetyScore);
      localStorage.setItem("touristStatus", scoreData.touristStatus);
    }

    // Check geofence
    const zone = checkGeofence(lat, lng);
    if (zone) {
      localStorage.setItem("geofenceAlert", JSON.stringify({
        zone: zone.name,
        risk: zone.risk,
        time: new Date().toLocaleTimeString()
      }));
    } else {
      localStorage.removeItem("geofenceAlert");
    }

  } catch (err) {
    console.log("Location update failed:", err);
  }
};

export const startTracking = () => {
  if (!navigator.geolocation) return;

  navigator.geolocation.getCurrentPosition(pos => {
    updateLocation(pos.coords.latitude, pos.coords.longitude);
  });

  trackingInterval = setInterval(() => {
    navigator.geolocation.getCurrentPosition(pos => {
      updateLocation(pos.coords.latitude, pos.coords.longitude);
    });
  }, 30000);
};

export const stopTracking = () => {
  if (trackingInterval) {
    clearInterval(trackingInterval);
    trackingInterval = null;
  }
};