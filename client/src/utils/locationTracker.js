const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

let trackingInterval = null;

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
      // Store in localStorage so dashboard can read it
      localStorage.setItem("safetyScore", scoreData.safetyScore);
      localStorage.setItem("touristStatus", scoreData.touristStatus);
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