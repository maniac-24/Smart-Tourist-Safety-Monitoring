import { useState } from "react";
import { useNavigate } from "react-router-dom";

const POLICE_CREDENTIALS = [
  { id: "OFF001", name: "Inspector Rajesh Kumar", rank: "Inspector", district: "Bengaluru Urban" },
  { id: "OFF002", name: "SI Priya Sharma", rank: "Sub Inspector", district: "Mysuru" },
  { id: "OFF003", name: "DSP Mohan Rao", rank: "DSP", district: "Tumkur" },
];

export default function PoliceLogin() {
  const [officerID, setOfficerID] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      const officer = POLICE_CREDENTIALS.find(o => o.id === officerID.toUpperCase());
      if (officer && password === "police@123") {
        localStorage.setItem("policeAuth", JSON.stringify(officer));
        navigate("/police");
      } else {
        setError("Invalid Officer ID or Password");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 50px, #3b82f6 50px, #3b82f6 51px),
            repeating-linear-gradient(90deg, transparent, transparent 50px, #3b82f6 50px, #3b82f6 51px)`
        }}></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/30">
            <span className="text-4xl">🛡️</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-wider">POLICE PORTAL</h1>
          <p className="text-gray-400 text-sm mt-1">Tourist Safety Command Center</p>
          <p className="text-gray-500 text-xs mt-1">Ministry of Tourism — Law Enforcement Access</p>
        </div>

        {/* Login Card */}
        <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center gap-2 bg-blue-900/30 border border-blue-500/30 rounded-lg p-3 mb-6">
            <span className="text-blue-400">ℹ️</span>
            <div className="text-xs text-blue-300">
              <p className="font-bold">Authorized Personnel Only</p>
              <p className="opacity-70">Use your official Officer ID and password</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs text-gray-400 tracking-widest mb-2">OFFICER ID</label>
              <input
                type="text"
                value={officerID}
                onChange={e => setOfficerID(e.target.value)}
                placeholder="e.g. OFF001"
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 font-mono text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400 tracking-widest mb-2">PASSWORD</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm"
                required
              />
            </div>

            {error && (
              <div className="bg-red-900/30 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">
                ❌ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-bold tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>AUTHENTICATING...</span>
                </>
              ) : (
                <>🔐 LOGIN TO DASHBOARD</>
              )}
            </button>
          </form>

          {/* Demo credentials */}
          <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
            <p className="text-xs text-gray-500 tracking-widest mb-2">DEMO CREDENTIALS</p>
            <div className="space-y-1 text-xs font-mono">
              <p className="text-gray-400">ID: <span className="text-green-400">OFF001</span> | <span className="text-green-400">OFF002</span> | <span className="text-green-400">OFF003</span></p>
              <p className="text-gray-400">Password: <span className="text-green-400">police@123</span></p>
            </div>
          </div>
        </div>

        {/* Back to Tourist App */}
        <div className="text-center mt-6">
          <a href="/" className="text-gray-500 text-sm hover:text-gray-300 transition-all">
            ← Back to Tourist App
          </a>
        </div>
      </div>
    </div>
  );
}