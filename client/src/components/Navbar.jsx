import React, { useEffect, useRef, useState } from 'react'
import { MdExitToApp } from 'react-icons/md';
import userStore from "../store/userStore.js"
import { Link, useNavigate } from 'react-router-dom';
import { useUserName } from '../contexts/usenamcontext.jsx';

const ShieldVirusIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        <path d="m14.5 10.5-5 5"></path>
        <path d="m9.5 10.5 5 5"></path>
        <path d="M12 7v.01"></path>
        <path d="M12 17v.01"></path>
        <path d="m16 13-.01 0"></path>
        <path d="m8 13-.01 0"></path>
    </svg>
);

const UserShieldIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        <circle cx="12" cy="9" r="3"></circle>
        <path d="M17 17a5 5 0 0 0-10 0"></path>
    </svg>
);

const ExitToAppIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5a2 2 0 0 0-2 2v4h2V5h14v14H5v-4H3v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"></path>
    </svg>
);

const SafetyScoreBadge = ({ score, status }) => {
    const getColor = () => {
        if (score >= 70) return { bg: "bg-green-500/20", border: "border-green-500/50", text: "text-green-400", ring: "#22c55e" };
        if (score >= 40) return { bg: "bg-yellow-500/20", border: "border-yellow-500/50", text: "text-yellow-400", ring: "#f59e0b" };
        return { bg: "bg-red-500/20", border: "border-red-500/50", text: "text-red-400 animate-pulse", ring: "#ef4444" };
    };
    const colors = getColor();
    const getEmoji = () => {
        if (score >= 70) return "🛡️";
        if (score >= 40) return "⚠️";
        return "🚨";
    };

    return (
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${colors.bg} ${colors.border}`}>
            <span className="text-sm">{getEmoji()}</span>
            <div className="flex flex-col">
                <span className={`text-xs font-bold ${colors.text}`}>
                    Safety: {score}/100
                </span>
                <span className={`text-xs capitalize ${colors.text}`}>
                    {status}
                </span>
            </div>
        </div>
    );
};

const Navbar = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef(null);
    const [userdetils, setuserdetils] = useState({});
    const { isLoading, error, message, logOut } = userStore();
    const navigate = useNavigate();
    const [UserName, setUserName] = useUserName();
    const [safetyScore, setSafetyScore] = useState(100);
    const [touristStatus, setTouristStatus] = useState("safe");

    const logout = async () => {
        await logOut();
        navigate("/");
    }

    useEffect(() => {
        const fecthdata = async () => {
            const url = `${import.meta.env.VITE_BACKEND_URL}/api/v2/userdata/fethalldata`
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'accessToken': localStorage.getItem('accessToken')
                },
            })
            const data = await res.json()
            console.log(data)
            setuserdetils(data.message)
            setUserName(data.message.fullname)
            if (data.message.safetyScore !== undefined) {
                setSafetyScore(data.message.safetyScore);
            }
            if (data.message.status) {
                setTouristStatus(data.message.status);
            }
        }

        fecthdata();

        // Check safety score from localStorage every 30 seconds
        const scoreInterval = setInterval(() => {
            const score = localStorage.getItem("safetyScore");
            const status = localStorage.getItem("touristStatus");
            if (score) setSafetyScore(parseInt(score));
            if (status) setTouristStatus(status);
        }, 30000);

        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            clearInterval(scoreInterval);
        };
    }, []);

    return (
        <div className="h-16 w-[95%] top-4 fixed rounded-2xl left-1/2 -translate-x-1/2 bg-gray-800/80 backdrop-blur-sm text-white flex items-center justify-between px-6 border border-gray-700 z-50">
            {/* Left side - Logo */}
            <div className="flex items-center gap-4">
                <div className='flex items-center justify-center text-4xl text-cyan-400'>
                    <ShieldVirusIcon />
                </div>
            </div>

            {/* Center - Nav Links */}
            <div className='flex gap-4'>
                <Link to="/"><div>Home</div></Link>
                <Link to="/feedback"><div>Feedback</div></Link>
                <Link to="/conversion"><div>Post</div></Link>
            </div>

            {/* Right side - Safety Score + Profile */}
            <div className="flex items-center gap-3">
                {/* Safety Score Badge */}
                <SafetyScoreBadge score={safetyScore} status={touristStatus} />

                {/* Profile Dropdown */}
                <div className='relative' ref={profileRef}>
                    <div
                        className="flex items-center justify-center text-3xl cursor-pointer p-2 rounded-full hover:bg-gray-700 transition-colors"
                        onClick={() => setIsProfileOpen(prev => !prev)}
                    >
                        <UserShieldIcon />
                    </div>

                    {isProfileOpen && (
                        <div
                            className="absolute top-[120%] right-0 w-72 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl z-50 overflow-hidden"
                            style={{ animation: 'dropdown-fade-in 0.3s ease-out forwards' }}
                        >
                            <div className="p-4">
                                <div className="absolute -top-2 right-5 w-4 h-4 bg-gray-800 transform rotate-45 border-l border-t border-gray-700"></div>

                                {/* User Info */}
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center border border-gray-600">
                                        <UserShieldIcon className="text-2xl text-cyan-400" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-white">{userdetils.fullname}</p>
                                        <p className="text-sm text-gray-400">{userdetils.email}</p>
                                    </div>
                                </div>

                                <hr className="border-gray-600 my-3" />

                                {/* Safety Score in Dropdown */}
                                <div className="mb-3 p-3 bg-gray-700/50 rounded-lg">
                                    <p className="text-xs text-gray-400 mb-2 tracking-wider">SAFETY SCORE</p>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className={`text-lg font-bold ${safetyScore >= 70 ? "text-green-400" : safetyScore >= 40 ? "text-yellow-400" : "text-red-400"}`}>
                                            {safetyScore}/100
                                        </span>
                                        <span className={`text-xs px-2 py-0.5 rounded-full capitalize font-bold ${safetyScore >= 70 ? "bg-green-600 text-white" : safetyScore >= 40 ? "bg-yellow-600 text-white" : "bg-red-600 text-white animate-pulse"}`}>
                                            {touristStatus}
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-600 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full transition-all duration-500 ${safetyScore >= 70 ? "bg-green-500" : safetyScore >= 40 ? "bg-yellow-500" : "bg-red-500"}`}
                                            style={{ width: `${safetyScore}%` }}
                                        ></div>
                                    </div>
                                </div>

                                {/* Trip Info */}
                                <div className="mb-3 p-3 bg-gray-700/50 rounded-lg text-xs text-gray-300 space-y-1">
                                    <p>🌍 <span className="text-white">{userdetils.nationality}</span></p>
                                    <p>📅 Trip: <span className="text-white">{userdetils.tripst} → {userdetils.trioend}</span></p>
                                    <p>🔑 ID: <span className="text-white font-mono text-xs">{userdetils.smartID?.slice(0, 16)}...</span></p>
                                </div>

                                <hr className="border-gray-600 my-3" />

                                {/* Logout Button */}
                                <button
                                    className="w-full flex items-center gap-3 px-3 py-2 text-left text-sm text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-400 rounded-md transition-colors duration-200"
                                    onClick={logout}
                                >
                                    <ExitToAppIcon className="text-xl" />
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                @keyframes dropdown-fade-in {
                    from { opacity: 0; transform: translateY(-10px) scale(0.95); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
            `}</style>
        </div>
    )
}

export default Navbar