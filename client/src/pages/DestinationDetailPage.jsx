import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, Shield, DollarSign, Hotel, Clock, AlertTriangle } from "lucide-react";

const destinationDetails = {
    1: {
        name: "Taj Mahal, Agra",
        image: "https://s7ap1.scene7.com/is/image/incredibleindia/taj-mahal-agra-uttar-pradesh-1-attr-hero?qlt=82&ts=1726650384852",
        description: "The Taj Mahal is one of the safest and most visited tourist destinations in India because it has heavy tourist police presence, CISF security checks, CCTV surveillance, and controlled entry gates. Most tourists visit without problems.",
        safetyRating: {
            daytime: 8.5,
            nighttime: 7,
            overall: 8
        },
        warnings: [
            "Fake tour guides",
            "Fake online ticket websites",
            "Overpriced taxi/rickshaw scams",
            "Fake marble shops near the monument"
        ],
        budgetTable: [
            { style: "Budget Traveller", min: "₹2,000 – ₹5,000", max: "₹8,000" },
            { style: "Normal Tourist", min: "₹8,000 – ₹20,000", max: "₹30,000" },
            { style: "Luxury Tourist", min: "₹40,000", max: "₹2,00,000+" }
        ],
        budgetIncludes: [
            "Hotel stay",
            "Food",
            "Local transport",
            "Taj Mahal entry tickets",
            "Shopping/basic sightseeing"
        ],
        hotels: {
            budget: [
                "Hotel Sidhartha Agra — walking distance from Taj Mahal",
                "Sia Taj Hotel Nearest Taj Mahal — affordable and clean",
                "Treebo The Empire Near Taj Mahal — budget-friendly modern rooms",
                "Hotel Taj Venture Agra — economical stay near tourist area",
                "Maya Hotel & Restaurant — popular among budget tourists"
            ],
            midRange: [
                "Hotel Taj Resorts — rooftop Taj Mahal view",
                "Hotel Atulyaa Taj — good food and rooftop view",
                "Holiday Inn Agra Mg Road, an IHG Hotel — family-friendly",
                "Tajview, Agra - IHCL SeleQtions — premium comfort",
                "Radisson Hotel Agra — highly rated luxury comfort",
                "DoubleTree by Hilton Hotel Agra — excellent hospitality"
            ],
            luxury: [
                "The Oberoi Amarvilas, Agra — most luxurious with direct monument views",
                "ITC Mughal, a Luxury Collection Resort & Spa — Mughal-style luxury",
                "Jaypee Palace Hotel & Convention Centre — palace-style luxury"
            ]
        },
        bestTime: "October to March → best weather. Sunrise visit → best photography and less crowd. Avoid Fridays (closed for general tourists).",
        quickTips: [
            "Book tickets only from official government portals",
            "Prefer sunrise visit",
            "Use hotel pickup or Ola/Uber instead of random autos",
            "Keep water bottle and light clothing during summer",
            "East Gate is usually less crowded than West Gate"
        ]
    }
};

export default function DestinationDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [destination, setDestination] = useState(null);

    useEffect(() => {
        const detail = destinationDetails[id];
        if (detail) {
            setDestination(detail);
        }
    }, [id]);

    if (!destination) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
                <p>Destination not found</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <div className="container mx-auto px-4 py-8">
                {/* Back Button */}
                <button
                    onClick={() => navigate("/dashboard")}
                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6"
                >
                    <ArrowLeft size={20} />
                    Back to Dashboard
                </button>

                {/* Hero Image - Full Taj Mahal Visible */}
                <div className="relative h-[400px] rounded-2xl overflow-hidden mb-8 shadow-2xl">
                    <img
                        src={destination.image}
                        alt={destination.name}
                        className="w-full h-full object-contain bg-gray-800"
                    />
                    {/* Minimal gradient only at bottom for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent via-60% to-transparent pointer-events-none"></div>
                    <h1 className="absolute bottom-6 left-6 text-4xl font-bold drop-shadow-2xl text-white">
                        {destination.name}
                    </h1>
                </div>

                {/* Description */}
                <div className="bg-gray-800 rounded-xl p-6 mb-6">
                    <p className="text-gray-300 text-lg leading-relaxed">{destination.description}</p>
                </div>

                {/* Safety Rating */}
                <div className="bg-gray-800 rounded-xl p-6 mb-6">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <Shield className="text-green-400" />
                        Safety Rating
                    </h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-gray-700 p-4 rounded-lg">
                            <p className="text-gray-400 text-sm">Daytime Safety</p>
                            <p className="text-3xl font-bold text-green-400">{destination.safetyRating.daytime}/10</p>
                        </div>
                        <div className="bg-gray-700 p-4 rounded-lg">
                            <p className="text-gray-400 text-sm">Night Safety</p>
                            <p className="text-3xl font-bold text-yellow-400">{destination.safetyRating.nighttime}/10</p>
                        </div>
                        <div className="bg-gray-700 p-4 rounded-lg">
                            <p className="text-gray-400 text-sm">Overall Safety</p>
                            <p className="text-3xl font-bold text-green-400">{destination.safetyRating.overall}/10</p>
                        </div>
                    </div>
                </div>

                {/* Warnings */}
                <div className="bg-red-900/20 border border-red-700 rounded-xl p-6 mb-6">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-red-400">
                        <AlertTriangle />
                        Things to be Careful About
                    </h2>
                    <ul className="space-y-2">
                        {destination.warnings.map((warning, index) => (
                            <li key={index} className="flex items-start gap-2 text-gray-300">
                                <span className="text-red-400 mt-1">⚠️</span>
                                {warning}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Budget Table */}
                <div className="bg-gray-800 rounded-xl p-6 mb-6">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <DollarSign className="text-blue-400" />
                        Approximate Budget
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-700">
                                    <th className="text-left py-3 px-4">Travel Style</th>
                                    <th className="text-left py-3 px-4">Minimum Budget</th>
                                    <th className="text-left py-3 px-4">Maximum Budget</th>
                                </tr>
                            </thead>
                            <tbody>
                                {destination.budgetTable.map((row, index) => (
                                    <tr key={index} className="border-b border-gray-700">
                                        <td className="py-3 px-4 font-semibold">{row.style}</td>
                                        <td className="py-3 px-4 text-green-400">{row.min}</td>
                                        <td className="py-3 px-4 text-blue-400">{row.max}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-4">
                        <p className="text-sm text-gray-400 mb-2">Budget includes:</p>
                        <div className="flex flex-wrap gap-2">
                            {destination.budgetIncludes.map((item, index) => (
                                <span key={index} className="bg-gray-700 px-3 py-1 rounded-full text-sm">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Hotels */}
                <div className="bg-gray-800 rounded-xl p-6 mb-6">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <Hotel className="text-purple-400" />
                        Recommended Hotels
                    </h2>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xl font-semibold mb-3 text-green-400">Budget Hotels (1★–3★)</h3>
                            <ul className="space-y-2">
                                {destination.hotels.budget.map((hotel, index) => (
                                    <li key={index} className="text-gray-300 pl-4 border-l-2 border-green-400">
                                        {hotel}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-3 text-blue-400">Mid-Range Hotels (3★–5★)</h3>
                            <ul className="space-y-2">
                                {destination.hotels.midRange.map((hotel, index) => (
                                    <li key={index} className="text-gray-300 pl-4 border-l-2 border-blue-400">
                                        {hotel}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-3 text-purple-400">Luxury Hotels (5★+)</h3>
                            <ul className="space-y-2">
                                {destination.hotels.luxury.map((hotel, index) => (
                                    <li key={index} className="text-gray-300 pl-4 border-l-2 border-purple-400">
                                        {hotel}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Best Time to Visit */}
                <div className="bg-gray-800 rounded-xl p-6 mb-6">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <Clock className="text-orange-400" />
                        Best Time to Visit
                    </h2>
                    <p className="text-gray-300 text-lg">{destination.bestTime}</p>
                </div>

                {/* Quick Tips */}
                <div className="bg-blue-900/20 border border-blue-700 rounded-xl p-6">
                    <h2 className="text-2xl font-bold mb-4 text-blue-400">Quick Tourist Tips</h2>
                    <ul className="space-y-2">
                        {destination.quickTips.map((tip, index) => (
                            <li key={index} className="flex items-start gap-2 text-gray-300">
                                <span className="text-blue-400 mt-1">💡</span>
                                {tip}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
