import { useState, useEffect } from "react";
import userStore from "../store/userStore.js";
import { useNavigate } from "react-router-dom";
import tourismLoginImg from "../assets/tourism-login.png";

const POLICE_CREDENTIALS = [
  { id: "OFF001", password: "pass123", name: "Inspector Rajesh Kumar", rank: "Inspector", district: "Bengaluru Urban" },
  { id: "OFF002", password: "pass123", name: "SI Priya Sharma", rank: "Sub Inspector", district: "Mysuru" },
  { id: "OFF003", password: "pass123", name: "DSP Mohan Rao", rank: "DSP", district: "Tumkur" },
];

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState("tourist"); // "tourist" or "police"
  const { logIn, isLoading, error } = userStore();
  const navigate = useNavigate();

  // Tourist login states
  const [fullname, setFullname] = useState("");
  const [smartID, setSmartID] = useState("");

  // Police login states
  const [officerID, setOfficerID] = useState("");
  const [password, setPassword] = useState("");
  const [policeError, setPoliceError] = useState("");
  const [policeLoading, setPoliceLoading] = useState(false);

  // Check if user just logged out and set the appropriate tab
  useEffect(() => {
    const lastLogoutType = localStorage.getItem("lastLogoutType");
    if (lastLogoutType === "police") {
      setActiveTab("police");
      localStorage.removeItem("lastLogoutType"); // Clean up
    } else if (lastLogoutType === "tourist") {
      setActiveTab("tourist");
      localStorage.removeItem("lastLogoutType"); // Clean up
    }
  }, []);

  const handleTouristSubmit = async (event) => {
    event.preventDefault();
    try {
      let TrimesmartID = smartID.replaceAll(' ', '');
      await logIn(TrimesmartID, fullname);
      localStorage.setItem("ID", TrimesmartID);
      navigate("/dashboard");

      const messageBox = document.getElementById("message-box");
      if (messageBox) {
        messageBox.innerText = "Login successful!";
        messageBox.classList.remove("opacity-0");
        setTimeout(() => messageBox.classList.add("opacity-0"), 3000);
      }
    } catch (err) {
      const messageBox = document.getElementById("message-box");
      if (messageBox) {
        messageBox.innerText = error || "Login failed. Please check your details.";
        messageBox.classList.remove("opacity-0");
        setTimeout(() => messageBox.classList.add("opacity-0"), 3000);
      }
    }
  };

  const handlePoliceSubmit = async (event) => {
    event.preventDefault();
    setPoliceLoading(true);
    setPoliceError("");

    // Simulate authentication
    const officer = POLICE_CREDENTIALS.find(
      (cred) => cred.id === officerID && cred.password === password
    );

    setTimeout(() => {
      if (officer) {
        localStorage.setItem("policeAuth", JSON.stringify(officer));
        navigate("/police");

        const messageBox = document.getElementById("message-box");
        if (messageBox) {
          messageBox.innerText = "Police login successful!";
          messageBox.classList.remove("opacity-0");
          setTimeout(() => messageBox.classList.add("opacity-0"), 3000);
        }
      } else {
        setPoliceError("Invalid Officer ID or Password");
      }
      setPoliceLoading(false);
    }, 800);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      <style>{`
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          -webkit-text-fill-color: white !important;
          -webkit-box-shadow: 0 0 0 30px #374151 inset !important;
          transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>
      {/* Main Content */}
      <main className="min-h-screen flex items-center justify-center py-8 px-4">
        <div className="w-full max-w-7xl bg-gray-800 rounded-2xl shadow-2xl overflow-hidden md:grid md:grid-cols-2">
          {/* Column 1: Tourism Image - Enlarged */}
          <div className="hidden md:flex items-center justify-center p-4 bg-gray-800">
            <img
              className="w-full h-auto object-contain"
              src={tourismLoginImg}
              alt="Tourism safety monitoring illustration"
            />
          </div>

          {/* Column 2: Login Form with Tabs */}
          <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">
              Login
            </h1>
            <p className="text-gray-400 mb-8">
              Access your dashboard by signing in.
            </p>

            {/* Tab Navigation */}
            <div className="flex border-b border-gray-700 mb-6">
              <button
                onClick={() => setActiveTab("tourist")}
                className={`flex-1 py-3 text-center font-semibold transition-all duration-200 ${activeTab === "tourist"
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-gray-400 hover:text-gray-300"
                  }`}
              >
                Tourist Login
              </button>
              <button
                onClick={() => setActiveTab("police")}
                className={`flex-1 py-3 text-center font-semibold transition-all duration-200 ${activeTab === "police"
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-gray-400 hover:text-gray-300"
                  }`}
              >
                Department Login
              </button>
            </div>

            {/* Tourist Login Form */}
            {activeTab === "tourist" && (
              <form onSubmit={handleTouristSubmit}>
                <div className="mb-6">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-300"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    className="bg-gray-700 border border-gray-600 text-white text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 transition-shadow duration-200 placeholder-gray-400"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="mb-8">
                  <label
                    htmlFor="appId"
                    className="block mb-2 text-sm font-medium text-gray-300"
                  >
                    Smart ID
                  </label>
                  <input
                    type="text"
                    id="appId"
                    name="appId"
                    value={smartID}
                    onChange={(e) => setSmartID(e.target.value)}
                    className="bg-gray-700 border border-gray-600 text-white text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 transition-shadow duration-200 placeholder-gray-400"
                    placeholder="e.g., 0x892583A6C1589D7EEA90e98ba848bc311A43f672"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-semibold rounded-lg text-lg px-5 py-4 text-center transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </button>

                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-400">
                    Don't have a Smart ID?{" "}
                    <button
                      type="button"
                      onClick={() => navigate("/admin")}
                      className="text-blue-500 hover:text-blue-400 font-semibold underline"
                    >
                      Register here
                    </button>
                  </p>
                </div>
              </form>
            )}

            {/* Police Login Form */}
            {activeTab === "police" && (
              <form onSubmit={handlePoliceSubmit}>
                <div className="mb-6">
                  <label
                    htmlFor="officerId"
                    className="block mb-2 text-sm font-medium text-gray-300"
                  >
                    Officer ID
                  </label>
                  <input
                    type="text"
                    id="officerId"
                    name="officerId"
                    value={officerID}
                    onChange={(e) => setOfficerID(e.target.value)}
                    className="bg-gray-700 border border-gray-600 text-white text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 transition-shadow duration-200 placeholder-gray-400"
                    placeholder="e.g., OFF001"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-300"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-700 border border-gray-600 text-white text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 transition-shadow duration-200 placeholder-gray-400"
                    placeholder="Enter your password"
                    required
                  />
                  <p className="mt-2 text-xs text-gray-500">
                    Demo credentials: OFF001 / pass123
                  </p>
                </div>

                {policeError && (
                  <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-300 text-sm">
                    {policeError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={policeLoading}
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-semibold rounded-lg text-lg px-5 py-4 text-center transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {policeLoading ? "Signing In..." : "Sign In"}
                </button>
              </form>
            )}

            <div className="text-center text-gray-500 mt-8 text-sm">
              &copy; 2025 SecureApp. All Rights Reserved.
            </div>
          </div>
        </div>
      </main>

      {/* Message box for feedback */}
      <div
        id="message-box"
        className="fixed bottom-5 right-5 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg opacity-0 transition-opacity duration-300"
      >
        Message
      </div>
    </div>
  );
}