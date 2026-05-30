import { useState, useEffect, useRef } from 'react';
import { MapPin, User, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";

const northEastDestinations = [
    {
        id: 9,
        name: "Kaziranga National Park",
        state: "Assam",
        subtitle: "Wildlife Safari",
        description: "Globally known for the endangered one-horned rhinoceros safari experience. UNESCO World Heritage Site.",
        image: "https://nagaon.assam.gov.in/sites/default/files/inline-images/gate.JPG",
        temp: "25°C",
        tags: [
            "Safety: High",
            "Budget per day: ₹4,000 (~$48)"
        ]
    },
    {
        id: 10,
        name: "Cherrapunji",
        state: "Meghalaya",
        subtitle: "Wettest Place",
        description: "Known worldwide for breathtaking waterfalls, caves, living root bridges, and highest rainfall records on Earth.",
        image: "https://media.holidify.com/images/cmsuploads/compressed/DAWKI_20240327084347.jpg",
        temp: "20°C",
        tags: [
            "Safety: High",
            "Budget per day: ₹4,000 (~$48)"
        ]
    },
    {
        id: 11,
        name: "Tawang",
        state: "Arunachal Pradesh",
        subtitle: "Himalayan Paradise",
        description: "Located at 10,000 feet in the Eastern Himalayas, known for snow-covered mountains, Buddhist monasteries, and breathtaking landscapes.",
        image: "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/07/be/fd/1a.jpg",
        temp: "5°C",
        tags: [
            "Safety: High",
            "Budget per day: ₹5,000 (~$60)"
        ]
    },
    {
        id: 12,
        name: "Gangtok",
        state: "Sikkim",
        subtitle: "Mountain Capital",
        description: "Gateway to Sikkim's beautiful lakes, mountain passes, and monasteries. Known for clean environment and breathtaking views of Mount Kanchenjunga.",
        image: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXddDBE9WGwjwEju5YcDLbMdOAeZHqlwv1n0injimENzQhiRdm2d4ZiofNDzU-FS5WDPfFzp7Up0KD30Tc2U0ndqYaFwtN3kiALh9IbqmS8Hax57OoAHJQPjNhW-xgaxl7Co65JZCg?key=icOI8u0ZLxczPTUYDDSMduah",
        temp: "15°C",
        tags: [
            "Safety: Very High",
            "Budget per day: ₹5,000 (~$60)"
        ]
    },
    {
        id: 13,
        name: "Kohima",
        state: "Nagaland",
        subtitle: "Cultural Capital",
        description: "Cultural capital of Nagaland, known for historical significance, traditional Naga villages, and the world-famous Hornbill Festival.",
        image: "https://etimg.etb2bimg.com/photo/91278276.cms",
        temp: "18°C",
        tags: [
            "Safety: High",
            "Budget per day: ₹4,000 (~$48)"
        ]
    },
    {
        id: 14,
        name: "Loktak Lake",
        state: "Manipur",
        subtitle: "Floating Paradise",
        description: "Largest freshwater lake in Northeast India, known for unique floating islands called Phumdis and the world's only floating national park.",
        image: "https://thesologlobetrotter.com/wp-content/uploads/2019/10/loktak-feature.jpg",
        temp: "22°C",
        tags: [
            "Safety: Medium-High",
            "Budget per day: ₹4,000 (~$48)"
        ]
    },
    {
        id: 15,
        name: "Aizawl",
        state: "Mizoram",
        subtitle: "Hilltop Capital",
        description: "Capital city at 4,000 feet altitude, known for beautiful hilltop views, clean environment, rich Mizo culture, and pleasant climate.",
        image: "https://s7ap1.scene7.com/is/image/incredibleindia/1-solomon-temple-aizwal-mizoram-city-hero?qlt=82&ts=1726674760373",
        temp: "20°C",
        tags: [
            "Safety: Very High",
            "Budget per day: ₹4,500 (~$54)"
        ]
    },
    {
        id: 16,
        name: "Agartala",
        state: "Tripura",
        subtitle: "Royal Heritage",
        description: "Capital city known for royal palaces, temples, cultural heritage, and historical attractions. Gateway to all major tourist destinations in Tripura.",
        image: "https://s7ap1.scene7.com/is/image/incredibleindia/rudrasagar-lake-melaghar-2-attr-hero?qlt=82&ts=1726651019295",
        temp: "25°C",
        tags: [
            "Safety: High",
            "Budget per day: ₹4,000 (~$48)"
        ]
    }
];

const NorthEastDestinations = () => {
    const [visibleCards, setVisibleCards] = useState(new Set());
    const cardRefs = useRef([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Scroll to top when page loads
        window.scrollTo(0, 0);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const cardId = parseInt(entry.target.dataset.cardId);
                        setVisibleCards(prev => new Set([...prev, cardId]));
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        cardRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="min-h-screen bg-gray-900">
            <Navbar />

            <section className="py-12 px-6 mx-auto bg-gray-900 mt-20">
                {/* Back Button */}
                <button
                    onClick={() => navigate("/dashboard")}
                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6"
                >
                    <ArrowLeft size={20} />
                    Back to Dashboard
                </button>

                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-white">
                    Discover <span className="text-green-600">North-East India</span>
                </h2>
                <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
                    Explore the hidden gems of North-East India - pristine nature, wildlife, tea gardens, and rich cultural heritage
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {northEastDestinations.map((dest, index) => (
                        <div
                            key={dest.id}
                            ref={el => cardRefs.current[index] = el}
                            data-card-id={dest.id}
                            onClick={() => navigate(`/destination/${dest.id}`)}
                            className={`bg-gray-800 rounded-2xl shadow-md overflow-hidden group hover:shadow-2xl hover:-translate-y-2 transition-all duration-700 transform cursor-pointer ${visibleCards.has(dest.id)
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-8'
                                }`}
                            style={{
                                transitionDelay: visibleCards.has(dest.id) ? `${index * 150}ms` : '0ms'
                            }}
                        >
                            {/* Image & Overlay */}
                            <div className="relative overflow-hidden">
                                <img
                                    src={dest.image}
                                    alt={dest.name}
                                    className="w-full h-56 object-cover transform group-hover:scale-110 transition duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent rounded-t-2xl"></div>
                                <div className="absolute top-3 left-3 flex items-center gap-2 text-white text-sm font-medium bg-black/40 px-3 py-1 rounded-full">
                                    <MapPin size={16} /> {dest.temp}
                                </div>
                                <div className="absolute top-3 right-3 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                                    {dest.state}
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className="p-5">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-semibold text-white group-hover:text-green-600 transition">
                                        {dest.name}
                                    </h3>
                                    <span className="text-gray-400 flex items-center text-sm gap-1">
                                        <User size={16} /> {dest.subtitle}
                                    </span>
                                </div>

                                <p className="mt-2 text-gray-300 text-sm leading-relaxed">
                                    {dest.description}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {dest.tags.map((tag, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 text-xs font-medium bg-green-100 text-green-600 rounded-full hover:bg-green-500 hover:text-white transition"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default NorthEastDestinations;
