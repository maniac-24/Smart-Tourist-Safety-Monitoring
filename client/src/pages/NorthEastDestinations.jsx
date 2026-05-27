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
  }
];

const NorthEastDestinations = () => {
  const [visibleCards, setVisibleCards] = useState(new Set());
  const cardRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
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
              className={`bg-gray-800 rounded-2xl shadow-md overflow-hidden group hover:shadow-2xl hover:-translate-y-2 transition-all duration-700 transform cursor-pointer ${
                visibleCards.has(dest.id) 
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

        {/* Coming Soon Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">More North-East Destinations Coming Soon!</h3>
          <div className="flex flex-wrap justify-center gap-4 text-gray-400">
            <span className="bg-gray-800 px-4 py-2 rounded-lg">🏔️ Guwahati</span>
            <span className="bg-gray-800 px-4 py-2 rounded-lg">🏝️ Majuli Island</span>
            <span className="bg-gray-800 px-4 py-2 rounded-lg">🌿 Manas National Park</span>
            <span className="bg-gray-800 px-4 py-2 rounded-lg">🏛️ Sivasagar</span>
            <span className="bg-gray-800 px-4 py-2 rounded-lg">🍵 Tea Gardens</span>
            <span className="bg-gray-800 px-4 py-2 rounded-lg">🛕 Kamakhya Temple</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NorthEastDestinations;
