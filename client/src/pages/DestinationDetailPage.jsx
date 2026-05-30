import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, Shield, Hotel, Clock, AlertTriangle } from "lucide-react";

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
    },
    2: {
        name: "Kerala Backwaters",
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/f3/1b/4a/alleppey-backwater-cruise.jpg?w=900&h=500&s=1",
        description: "Kerala Backwaters are considered one of the safest and most peaceful tourist destinations in India. Tourist areas like Alleppey (Alappuzha), Kumarakom, and Kollam are well-developed for tourism with police support, licensed houseboats, and good hospitality.",
        safetyRating: {
            daytime: 9,
            nighttime: 8,
            overall: 8.8
        },
        warnings: [
            "Choose licensed houseboats only",
            "Avoid isolated boat rides late night",
            "Keep valuables safe during crowded festivals",
            "Book resorts and boats from trusted websites/hotels"
        ],
        budgetTable: [
            { style: "Budget Traveller", min: "₹3,000 – ₹8,000", max: "₹12,000" },
            { style: "Normal Tourist", min: "₹15,000 – ₹40,000", max: "₹60,000" },
            { style: "Luxury Tourist", min: "₹80,000", max: "₹4,00,000+" }
        ],
        budgetIncludes: [
            "Houseboat stay",
            "Hotel/resort stay",
            "Food",
            "Local transport",
            "Sightseeing",
            "Water activities"
        ],
        hotels: {
            budget: [
                "Zostel Alleppey — backpacker-friendly hostel",
                "Venice Castle — budget stay near canals",
                "Pagoda Resorts — affordable resort feel",
                "Trium Resorts — peaceful budget stay",
                "Hotel Sea Pearl — economical hotel"
            ],
            midRange: [
                "Lemon Tree Vembanad Lake Resort",
                "Ramada by Wyndham Alleppey",
                "The Zuri Kumarakom Kerala Resort & Spa",
                "Coconut Lagoon",
                "Fragrant Nature Backwater Resort & Ayurveda Spa"
            ],
            luxury: [
                "Kumarakom Lake Resort — world-famous luxury backwater resort",
                "Taj Kumarakom Resort & Spa Kerala — premium Taj property",
                "CGH Earth Coconut Lagoon — heritage luxury experience",
                "Punnamada Resort — luxury lakeside stay"
            ]
        },
        bestTime: "October to March → best climate and boating season. August → famous Nehru Trophy Boat Race. Monsoon season (June–September) is beautiful but rainy.",
        quickTips: [
            "Sunrise and sunset cruises are best",
            "Try Kerala seafood and traditional sadya meals",
            "Carry mosquito repellent for night stays",
            "Book houseboats early during holidays and festivals",
            "Kumarakom is better for luxury; Alleppey is better for sightseeing"
        ],
        extraInfo: {
            title: "Houseboat Costs",
            items: [
                "Shared Budget Houseboat: ₹1,000 – ₹3,000",
                "Private 1 Bedroom Boat: ₹6,000 – ₹15,000",
                "Premium Luxury Houseboat: ₹20,000 – ₹1,00,000+"
            ]
        },
        activities: [
            "Houseboat cruise",
            "Canoe village tours",
            "Kathakali performances",
            "Ayurvedic spa treatments",
            "Bird watching",
            "Sunset lake photography"
        ]
    },
    3: {
        name: "Goa Beaches",
        image: "https://imagedelivery.net/y9EHf1toWJTBqJVsQzJU4g/www.indianholiday.com/2025/06/Palolem-Beach1-1.png/w=650,h=353",
        description: "Goa is one of India's most famous beach tourism destinations. It is generally safe for tourists, especially in popular areas like North Goa and South Goa. Tourist police, beach lifeguards, nightlife security, and active tourism departments help maintain safety.",
        safetyRating: {
            daytime: 9,
            nighttime: 7.5,
            overall: 8.3
        },
        warnings: [
            "Avoid isolated beaches late night",
            "Be careful with water sports operators",
            "Watch for pickpocketing in crowded nightlife areas",
            "Avoid drunk driving and illegal party zones",
            "Use licensed taxis or rental services"
        ],
        budgetTable: [
            { style: "Budget Traveller", min: "₹4,000 – ₹10,000", max: "₹15,000" },
            { style: "Normal Tourist", min: "₹20,000 – ₹60,000", max: "₹1,00,000" },
            { style: "Luxury Tourist", min: "₹1,50,000", max: "₹8,00,000+" }
        ],
        budgetIncludes: [
            "Hotel/resort stay",
            "Beach activities",
            "Food & nightlife",
            "Water sports",
            "Local transport",
            "Shopping"
        ],
        hotels: {
            budget: [
                "Zostel Goa — backpacker hostel",
                "The Funky Monkey Hostel — budget party stay",
                "Hotel Bonanza — economical family stay",
                "Sea View Resort — affordable beachside stay",
                "Cupid's Heaven — budget South Goa stay"
            ],
            midRange: [
                "Fairfield by Marriott Goa Anjuna",
                "Novotel Goa Resort & Spa",
                "Hyatt Centric Candolim Goa",
                "The LaLiT Golf & Spa Resort Goa",
                "Holiday Inn Resort Goa"
            ],
            luxury: [
                "Taj Exotica Resort & Spa Goa — ultra luxury beachfront resort",
                "W Goa — famous luxury party resort",
                "The St. Regis Goa Resort — premium luxury stay",
                "ITC Grand Goa Resort & Spa — large luxury beachfront property",
                "Alila Diwa Goa — luxury peaceful retreat"
            ]
        },
        bestTime: "November to February → best weather and nightlife season. December → Christmas & New Year celebrations. June to September → monsoon beauty but limited beach activities.",
        quickTips: [
            "South Goa is safer and quieter than North Goa",
            "Rent scooters carefully and wear helmets",
            "Keep digital payment options ready",
            "Book hotels early during December and New Year season",
            "Avoid swimming during red flag warnings",
            "Morning beaches are cleaner and less crowded"
        ],
        extraInfo: {
            title: "Water Sports Costs",
            items: [
                "Parasailing: ₹800 – ₹2,500",
                "Jet Ski: ₹500 – ₹1,500",
                "Scuba Diving: ₹3,000 – ₹8,000",
                "Banana Ride: ₹400 – ₹1,000",
                "Dolphin Trip: ₹300 – ₹1,500",
                "Yacht Cruise: ₹5,000 – ₹1,00,000+"
            ]
        },
        activities: [
            "Beach hopping",
            "Nightlife & beach clubs",
            "Water sports",
            "Sunset cruises",
            "Portuguese heritage sightseeing",
            "Seafood dining",
            "Casino cruises"
        ]
    },
    4: {
        name: "Rajasthan Palaces",
        image: "https://cdn.tajhotels.com/images/ocl5w36p/prod5/02d5266ba2e7a05097c8aa5c6f5533095f8b50fc-3840x1860.jpg",
        description: "Rajasthan is world-famous for its royal palaces, luxury heritage hotels, and king-style architecture. Many palaces are now museums or luxury hotels where tourists can stay and experience royal lifestyle.",
        safetyRating: {
            daytime: 9,
            nighttime: 8,
            overall: 8.7
        },
        warnings: [
            "Book palace hotels early during winter",
            "Carry light cotton clothes in daytime",
            "Luxury palace hotels often require advance reservation",
            "Avoid May–June due to extreme heat"
        ],
        budgetTable: [
            { style: "Budget Tourist", min: "₹8,000 – ₹20,000", max: "₹40,000" },
            { style: "Mid-Range Tourist", min: "₹50,000 – ₹2,00,000", max: "₹4,00,000" },
            { style: "Luxury Royal Experience", min: "₹5,00,000", max: "₹50,00,000+" }
        ],
        budgetIncludes: [
            "Palace hotel stays",
            "Heritage experiences",
            "Royal dining",
            "Cultural shows",
            "Local transport",
            "Palace entry tickets"
        ],
        hotels: {
            budget: [
                "Hotel Pearl Palace Jaipur — budget heritage stay",
                "Zostel Jaipur — backpacker hostel",
                "Hotel Meghniwas Jaipur — economical palace-style hotel",
                "Moustache Hostel Udaipur — budget lakeside stay",
                "Krishna Palace Jodhpur — affordable heritage feel"
            ],
            midRange: [
                "Samode Haveli Jaipur — heritage haveli hotel",
                "Alsisar Haveli Jaipur — traditional Rajasthani stay",
                "Hotel Lakend Udaipur — lake view hotel",
                "RAAS Jodhpur — boutique heritage hotel",
                "Narayan Niwas Palace Jaisalmer — mid-range palace hotel"
            ],
            luxury: [
                "Rambagh Palace Jaipur — Taj luxury palace hotel (₹30,000 – ₹6,00,000+)",
                "Taj Lake Palace Udaipur — floating palace hotel (₹40,000 – ₹4,00,000+)",
                "Umaid Bhawan Palace Jodhpur — world's largest private residence (₹35,000 – ₹8,00,000+)",
                "The Oberoi Udaivilas — luxury lakeside palace resort",
                "Fairmont Jaipur — modern luxury palace experience"
            ]
        },
        bestTime: "October to March → best weather. December & January → peak tourism season. Avoid May–June due to extreme heat.",
        quickTips: [
            "Sunrise/sunset gives best palace photos",
            "Udaipur is best for romantic palace experience",
            "Jaipur is best for historical palace tours",
            "Jodhpur is best for royal luxury stays",
            "Book palace hotels months in advance for peak season",
            "Try traditional Rajasthani thali meals",
            "Hire local guides for detailed palace history"
        ],
        extraInfo: {
            title: "Famous Palaces to Visit",
            items: [
                "City Palace Jaipur — Royal museum with Maharaja collections (₹300 – ₹3,500)",
                "Lake Palace Udaipur — Floating white marble palace (Stay: ₹40,000+)",
                "Umaid Bhawan Palace Jodhpur — Vintage car collection (Stay: ₹35,000+)",
                "Hawa Mahal Jaipur — Iconic pink palace with 953 windows (₹50 – ₹200)",
                "City Palace Udaipur — Largest palace complex with crystal gallery (₹300 – ₹2,500)",
                "Jal Mahal Jaipur — Beautiful water palace with sunset views"
            ]
        },
        activities: [
            "Royal dining",
            "Camel safari",
            "Cultural dance shows",
            "Lake boat rides",
            "Palace photography",
            "Heritage walks",
            "Vintage car tours"
        ]
    },
    5: {
        name: "Varanasi Ghats",
        image: "https://images.unsplash.com/photo-1627938823193-fd13c1c867dd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Varanasi Ghats are among the oldest and most spiritual tourist destinations in the world. Located on the banks of the Ganga River, these ghats attract millions of tourists, pilgrims, photographers, and international visitors every year.",
        safetyRating: {
            daytime: 8.5,
            nighttime: 7.5,
            overall: 8
        },
        warnings: [
            "Avoid isolated narrow lanes late night",
            "Beware of fake priests/guides asking for money",
            "Keep valuables safe in crowded ghats",
            "Use registered boats only",
            "Be careful during monsoon season due to rising river water"
        ],
        budgetTable: [
            { style: "Budget Traveller", min: "₹2,000 – ₹7,000", max: "₹12,000" },
            { style: "Normal Tourist", min: "₹15,000 – ₹40,000", max: "₹70,000" },
            { style: "Luxury Tourist", min: "₹1,00,000", max: "₹8,00,000+" }
        ],
        budgetIncludes: [
            "Hotel stay",
            "Boat rides",
            "Temple visits",
            "Food",
            "Local transport",
            "Spiritual experiences"
        ],
        hotels: {
            budget: [
                "Zostel Varanasi — backpacker hostel",
                "Moustache Hostel Varanasi — budget social stay",
                "Hotel Alka — economical ghat-side hotel",
                "Shiv Ganga Guest House — budget spiritual stay",
                "Ganpati Guest House — affordable river view"
            ],
            midRange: [
                "Hotel Ganges Grand — comfortable stay near ghats",
                "Ramada Plaza by Wyndham JHV Varanasi",
                "Hotel Madin — modern amenities",
                "Rivatas by Ideal — boutique hotel",
                "Palace on Ganges — heritage hotel"
            ],
            luxury: [
                "Taj Ganges Varanasi — premium Taj property",
                "BrijRama Palace — heritage luxury palace on the ghats",
                "Tree of Life Resort & Spa Varanasi — luxury wellness resort",
                "Suryauday Haveli — luxury heritage haveli",
                "Ganges View Hotel — upscale ghat-side stay"
            ]
        },
        bestTime: "October to March → best climate. Dev Deepawali festival → magical lighting across ghats. Early morning sunrise → best boat ride experience.",
        quickTips: [
            "Sunrise boat ride is highly recommended",
            "Wear simple/modest clothing near temples",
            "Keep cash for small shops and boats",
            "Narrow lanes can be crowded, so walk carefully",
            "Respect local spiritual customs",
            "Winter mornings may be foggy but beautiful",
            "Evening Ganga Aarti at Dashashwamedh Ghat is a must-see"
        ],
        extraInfo: {
            title: "Boat Ride Costs",
            items: [
                "Shared Boat Ride: ₹100 – ₹500",
                "Private Boat Ride: ₹800 – ₹5,000",
                "Luxury Cruise: ₹5,000 – ₹50,000+"
            ]
        },
        activities: [
            "Ganga Aarti ceremony",
            "Sunrise boat rides",
            "Street food tours",
            "Temple visits",
            "Spiritual meditation",
            "Silk shopping",
            "Classical music performances"
        ]
    },
    6: {
        name: "Himalayas, Himachal Pradesh",
        image: "https://www.himalayanecotourism.com/wp-content/uploads/2023/06/hampta-pass-1.jpg",
        description: "The Himalayan region of Himachal Pradesh is one of India's safest and most beautiful mountain tourism destinations. Famous for snow mountains, valleys, adventure sports, monasteries, trekking, and hill stations, it attracts both Indian and international tourists throughout the year.",
        safetyRating: {
            daytime: 9,
            nighttime: 8,
            overall: 8.7
        },
        warnings: [
            "Avoid risky trekking during bad weather",
            "Check snowfall and landslide alerts during monsoon/winter",
            "Carry warm clothes even in summer",
            "Use experienced guides for trekking/adventure sports",
            "Mobile networks may be weak in remote valleys"
        ],
        budgetTable: [
            { style: "Budget Traveller", min: "₹5,000 – ₹15,000", max: "₹25,000" },
            { style: "Normal Tourist", min: "₹30,000 – ₹1,00,000", max: "₹2,50,000" },
            { style: "Luxury Tourist", min: "₹3,00,000", max: "₹20,00,000+" }
        ],
        budgetIncludes: [
            "Hotel/resort stay",
            "Adventure activities",
            "Food",
            "Local transport",
            "Trekking packages",
            "Camping"
        ],
        hotels: {
            budget: [
                "Zostel Manali — backpacker hostel",
                "The Hosteller Manali — social hostel",
                "YMCA Tourist Hostel Shimla — budget stay",
                "Zostel Dharamkot — mountain hostel",
                "Whoopers Hostel Kasol — riverside budget stay"
            ],
            midRange: [
                "Apple Country Resort Manali — comfortable mountain stay",
                "Hotel Combermere Shimla — heritage hotel",
                "Fortune Park Dalhousie — mid-range resort",
                "The Himalayan Village Kasol — nature resort",
                "Hotel White Mist Manali — valley view hotel"
            ],
            luxury: [
                "The Himalayan Manali — luxury mountain resort",
                "Span Resort and Spa Manali — premium spa resort",
                "Wildflower Hall Shimla — Oberoi luxury property",
                "The Oberoi Cecil Shimla — colonial luxury hotel",
                "Hyatt Regency Dharamshala Resort — luxury mountain resort"
            ]
        },
        bestTime: "March – June → Pleasant weather & sightseeing. October – February → Snowfall & winter tourism. July – September → Green valleys but landslide risk.",
        quickTips: [
            "Carry winter jackets year-round",
            "Book hotels early during snowfall season",
            "Drink plenty of water at high altitude",
            "Avoid night driving in mountain roads",
            "Manali and Shimla are best for first-time visitors",
            "Spiti is best for adventure travelers",
            "Check weather forecasts before trekking"
        ],
        extraInfo: {
            title: "Adventure Activity Costs",
            items: [
                "Paragliding: ₹1,500 – ₹5,000",
                "River Rafting: ₹800 – ₹3,000",
                "Skiing: ₹2,000 – ₹10,000",
                "Snowmobile Ride: ₹500 – ₹5,000",
                "Trekking Packages: ₹2,000 – ₹50,000+",
                "Camping: ₹1,000 – ₹20,000"
            ]
        },
        activities: [
            "Snowfall watching",
            "Himalayan trekking",
            "Camping",
            "River rafting",
            "Monastery visits",
            "Mountain photography",
            "Café hopping",
            "Toy train rides"
        ]
    },
    7: {
        name: "Amritsar Golden Temple",
        image: "https://s7ap1.scene7.com/is/image/incredibleindia/1-sri-harmandir-sahib-(golden-temple)-amritsar-punjab-attr-hero?qlt=82&ts=1726662069037",
        description: "The Golden Temple, also called Harmandir Sahib, is one of the safest, cleanest, and most spiritually peaceful tourist destinations in India. Managed by the Sikh community and SGPC, the temple welcomes millions of visitors from all religions every year.",
        safetyRating: {
            daytime: 9.5,
            nighttime: 9,
            overall: 9.3
        },
        warnings: [
            "Remove shoes before entering",
            "Cover your head inside temple premises",
            "Avoid carrying large luggage during crowded festivals",
            "Respect religious customs and photography restrictions in certain areas"
        ],
        budgetTable: [
            { style: "Budget Traveller", min: "₹2,000 – ₹8,000", max: "₹12,000" },
            { style: "Normal Tourist", min: "₹15,000 – ₹50,000", max: "₹80,000" },
            { style: "Luxury Tourist", min: "₹1,00,000", max: "₹6,00,000+" }
        ],
        budgetIncludes: [
            "Hotel stay",
            "Food (Langar is free)",
            "Local transport",
            "Wagah Border visit",
            "Sightseeing",
            "Cultural experiences"
        ],
        hotels: {
            budget: [
                "Zostel Amritsar — backpacker hostel",
                "Hotel City Park — budget stay near temple",
                "Hotel CJ International — economical hotel",
                "GoStops Amritsar — social hostel",
                "Hotel Sawera Grand — affordable family stay"
            ],
            midRange: [
                "Ramada by Wyndham Amritsar — comfortable stay",
                "Hyatt Regency Amritsar — modern hotel",
                "Fairfield by Marriott Amritsar — quality stay",
                "Holiday Inn Amritsar Ranjit Avenue",
                "Radisson Blu Hotel Amritsar"
            ],
            luxury: [
                "Taj Swarna Amritsar — premium Taj property",
                "Welcomhotel by ITC Hotels Raja Sansi — luxury ITC hotel",
                "Ranjit's SVAASA — luxury wellness resort",
                "The Fern Residency Amritsar — upscale hotel"
            ]
        },
        bestTime: "October to March → best weather. Night visit → beautiful golden reflection in water. Gurpurab festivals → spiritual celebrations and lighting.",
        quickTips: [
            "Wear modest clothing",
            "Head covering is compulsory (scarves available at entrance)",
            "Early morning and late night are most peaceful",
            "Free drinking water and food available at Langar",
            "Avoid peak crowd hours during festivals if you prefer calm",
            "Try Amritsari kulcha and Punjabi lassi near temple area",
            "Visit Wagah Border ceremony in the evening"
        ],
        extraInfo: {
            title: "Main Attractions",
            items: [
                "Golden Temple — Free entry, 24/7 open",
                "Langar Hall — World's largest free community kitchen",
                "Akal Takht — Important Sikh religious authority building",
                "Jallianwala Bagh — Historic memorial (Tourist Safety: 9/10)",
                "Wagah Border — India-Pakistan border ceremony (30 km away)"
            ]
        },
        activities: [
            "Listening to live Gurbani",
            "Langar service participation",
            "Night photography",
            "Walking around Sarovar",
            "Punjabi food tours",
            "Wagah Border ceremony"
        ]
    },
    8: {
        name: "Mumbai Gateway of India",
        image: "https://s7ap1.scene7.com/is/image/incredibleindia/gateway-of-india-mumbai-maharashtra-2-attr-hero?qlt=82&ts=1742162842869",
        description: "The Gateway of India is one of the most famous tourist landmarks in India, located beside the Arabian Sea in South Mumbai. It is a highly visited tourist area with strong police presence, luxury hotels nearby, ferry rides, and vibrant nightlife.",
        safetyRating: {
            daytime: 8.8,
            nighttime: 8,
            overall: 8.4
        },
        warnings: [
            "Beware of pickpockets in crowded areas",
            "Avoid unauthorized boat operators",
            "Watch for overpricing by local vendors/taxis",
            "Keep valuables safe during busy evenings",
            "Avoid monsoon sea rides during rough weather"
        ],
        budgetTable: [
            { style: "Budget Traveller", min: "₹3,000 – ₹10,000", max: "₹20,000" },
            { style: "Normal Tourist", min: "₹25,000 – ₹80,000", max: "₹1,50,000" },
            { style: "Luxury Tourist", min: "₹2,00,000", max: "₹20,00,000+" }
        ],
        budgetIncludes: [
            "Hotel stay",
            "Ferry rides",
            "Food & dining",
            "Local transport",
            "Shopping",
            "Sightseeing"
        ],
        hotels: {
            budget: [
                "Backpacker Panda Colaba — budget hostel",
                "Hotel Causeway — economical stay",
                "YWCA International House — budget accommodation",
                "Sea Green Hotel — affordable sea-facing hotel",
                "Hotel Suba Palace — budget-friendly"
            ],
            midRange: [
                "President Mumbai - IHCL SeleQtions — heritage hotel",
                "Trident Nariman Point — business hotel",
                "The Gordon House Hotel — boutique stay",
                "Hotel Marine Plaza — sea-facing hotel",
                "Fariyas Hotel Mumbai — comfortable stay"
            ],
            luxury: [
                "The Taj Mahal Palace — iconic luxury heritage hotel (₹20,000 – ₹5,00,000+)",
                "The Oberoi Mumbai — premium luxury property",
                "Four Seasons Hotel Mumbai — modern luxury",
                "St. Regis Mumbai — ultra-luxury hotel",
                "JW Marriott Mumbai Sahar — luxury business hotel"
            ]
        },
        bestTime: "November to February → pleasant weather. Evening and night → best lighting and sea views. Monsoon season → beautiful sea atmosphere but heavy rains possible.",
        quickTips: [
            "Visit during sunset for best views",
            "Keep mobile and wallet secure in crowds",
            "Use Uber/Ola or prepaid taxis",
            "Early mornings are less crowded",
            "Try Mumbai street foods like vada pav and pav bhaji",
            "Book Elephanta Caves ferry tickets in advance during weekends"
        ],
        extraInfo: {
            title: "Main Attractions",
            items: [
                "Gateway of India — Free entry, historic sea-facing monument",
                "Taj Mahal Palace Hotel — Iconic luxury hotel opposite Gateway",
                "Elephanta Caves — UNESCO World Heritage Site (Ferry: ₹200 – ₹2,000)",
                "Marine Drive — Famous Queen's Necklace night view",
                "Colaba Causeway — Popular shopping and café street"
            ]
        },
        activities: [
            "Ferry ride to Elephanta Caves",
            "Sunset photography",
            "Luxury dining at Taj Hotel",
            "Marine Drive night walk",
            "Mumbai street food tours",
            "Arabian Sea boat rides"
        ]
    },
    9: {
        name: "Kaziranga National Park",
        image: "https://nagaon.assam.gov.in/sites/default/files/inline-images/gate.JPG",
        description: "Kaziranga National Park is the most famous tourist destination in Assam and is globally known for the endangered one-horned rhinoceros safari experience. It is also a UNESCO World Heritage Site and one of India's best wildlife tourism locations.",
        safetyRating: {
            daytime: 8.8,
            nighttime: 8.5,
            overall: 8.6
        },
        warnings: [
            "Follow forest department safari rules",
            "Avoid getting close to wild animals",
            "Carry mosquito protection during evening safaris",
            "Book government-approved safari rides",
            "Park remains closed during monsoon season"
        ],
        budgetTable: [
            { style: "Budget Traveller", min: "₹4,000 – ₹10,000", max: "₹15,000" },
            { style: "Normal Tourist", min: "₹20,000 – ₹60,000", max: "₹1,20,000" },
            { style: "Luxury Tourist", min: "₹2,00,000", max: "₹10,00,000+" }
        ],
        budgetIncludes: [
            "Safari rides",
            "Hotel/resort stay",
            "Food",
            "Local transport",
            "Sightseeing",
            "Wildlife photography"
        ],
        hotels: {
            budget: [
                "Nature Hunt Eco Camp — budget eco-friendly stay",
                "Kaziranga Eco Village — affordable nature resort",
                "Wild Grass Lodge — budget wildlife lodge",
                "Bonhabi Resort — economical stay",
                "Kaziranga Florican Lodge — budget safari lodge"
            ],
            midRange: [
                "Infinity Resort Kaziranga — comfortable resort",
                "Summit Green Lake Tea Resort — tea garden resort",
                "IORA - The Retreat — nature retreat",
                "United 21 Grassland Resort — mid-range comfort",
                "Borgos Resort & Spa — spa resort"
            ],
            luxury: [
                "Diphlu River Lodge — luxury wildlife lodge",
                "Borgos Resort — premium luxury property",
                "Kaziranga Golf Resort — luxury golf resort",
                "Jupuri Ghar Resort — upscale nature resort"
            ]
        },
        bestTime: "November to April → best safari season. Park usually remains closed during monsoon season.",
        quickTips: [
            "Book safari rides in advance during peak season",
            "Early morning safaris offer best wildlife sightings",
            "Carry binoculars for bird watching",
            "Wear neutral-colored clothing for safaris",
            "Follow guide instructions strictly",
            "Visit nearby tea gardens for complete experience",
            "Respect wildlife and maintain safe distance"
        ],
        extraInfo: {
            title: "Safari Costs",
            items: [
                "Jeep Safari: ₹1,500 – ₹5,000",
                "Elephant Safari: ₹1,000 – ₹3,500",
                "Private Luxury Safari: ₹10,000 – ₹50,000+"
            ]
        },
        activities: [
            "Rhino safari",
            "Elephant safari",
            "Bird watching",
            "Tea garden visits",
            "Assamese food experience",
            "Nature photography"
        ]
    },
    10: {
        name: "Cherrapunji",
        image: "https://media.holidify.com/images/cmsuploads/compressed/DAWKI_20240327084347.jpg",
        description: "Cherrapunji (Sohra) is the most famous tourist destination in Meghalaya. It is known worldwide for its breathtaking waterfalls, caves, living root bridges, lush green valleys, and one of the highest rainfall records on Earth.",
        safetyRating: {
            daytime: 9,
            nighttime: 8,
            overall: 8.8
        },
        warnings: [
            "Roads can be slippery during heavy rain",
            "Carry rain protection throughout the year",
            "Follow local guides when visiting caves and root bridges",
            "Wear trekking shoes for nature trails"
        ],
        budgetTable: [
            { style: "Budget Traveller", min: "₹4,000 – ₹10,000", max: "₹15,000" },
            { style: "Normal Tourist", min: "₹15,000 – ₹50,000", max: "₹1,00,000" },
            { style: "Luxury Tourist", min: "₹1,50,000", max: "₹8,00,000+" }
        ],
        budgetIncludes: [
            "Hotel stay",
            "Food",
            "Local transport",
            "Sightseeing",
            "Trekking activities",
            "Entry fees"
        ],
        hotels: {
            budget: [
                "By The Way Hostel & Cafe — backpacker-friendly",
                "La Kupar Inn — budget stay",
                "Coniferous Resort — affordable nature resort",
                "Cherrapunjee Holiday Resort — economical stay",
                "Polo Orchid Resort — budget-friendly"
            ],
            midRange: [
                "Polo Orchid Resort — comfortable resort",
                "Jiva Resort — nature resort",
                "Smoky Falls MaeFi Resort — scenic stay",
                "Kutmadan Resort — mid-range comfort",
                "Sa-I-Mika Resort — valley view resort"
            ],
            luxury: [
                "Courtyard by Marriott Shillong — luxury property",
                "Ri Kynjai Resort — premium lakeside resort",
                "The Heritage Club Tripura Castle — heritage luxury",
                "Vivanta Meghalaya — upscale resort"
            ]
        },
        bestTime: "October to April → Best weather and sightseeing. June to September → Spectacular waterfalls but heavy rainfall.",
        quickTips: [
            "Carry raincoat and umbrella year-round",
            "Book local guides for root bridge treks",
            "Wear comfortable trekking shoes",
            "Start treks early in the morning",
            "Keep camera protected from rain",
            "Try local Khasi cuisine",
            "Recommended trip: 2-3 days for Cherrapunji, 5-7 days for complete Meghalaya"
        ],
        extraInfo: {
            title: "Entry & Activity Costs",
            items: [
                "Living Root Bridge Trek: ₹50 – ₹500",
                "Cave Exploration: ₹20 – ₹200",
                "Local Guide: ₹500 – ₹3,000",
                "Taxi Sightseeing: ₹2,000 – ₹8,000"
            ]
        },
        activities: [
            "Waterfall photography",
            "Cave exploration",
            "Living Root Bridge trekking",
            "Nature walks",
            "Village tourism",
            "Sunrise and sunset viewpoints"
        ]
    },
    11: {
        name: "Tawang",
        image: "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/07/be/fd/1a.jpg",
        description: "Tawang is the most famous tourist destination in Arunachal Pradesh. Located at an altitude of about 10,000 feet in the Eastern Himalayas, it is known for its snow-covered mountains, Buddhist culture, monasteries, lakes, and breathtaking landscapes.",
        safetyRating: {
            daytime: 9,
            nighttime: 7.5,
            overall: 8.5
        },
        warnings: [
            "Carry warm clothes throughout the year",
            "Be prepared for altitude-related issues",
            "Check weather conditions before mountain travel",
            "Roads may be affected by snowfall during winter"
        ],
        budgetTable: [
            { style: "Budget Traveller", min: "₹6,000 – ₹15,000", max: "₹25,000" },
            { style: "Normal Tourist", min: "₹25,000 – ₹80,000", max: "₹1,50,000" },
            { style: "Luxury Tourist", min: "₹2,00,000", max: "₹10,00,000+" }
        ],
        budgetIncludes: [
            "Hotel stay",
            "Food",
            "Local transport",
            "Sightseeing",
            "Permit expenses"
        ],
        hotels: {
            budget: [
                "Hotel Mon Valley — budget-friendly stay",
                "Hotel Tawang Heights — affordable accommodation",
                "Yangzom Hotel — economical option"
            ],
            midRange: [
                "Hotel Gakyi Khang Zhang — comfortable mid-range",
                "Dolma Khangsar Guest House — traditional hospitality",
                "Hotel Tawang Holiday — good value stay"
            ],
            luxury: [
                "Vivanta Arunachal Pradesh Tawang — premium luxury",
                "The Oak Retreat — upscale mountain resort"
            ]
        },
        bestTime: "March to June → Pleasant weather and sightseeing. October to November → Clear mountain views. December to February → Snowfall season.",
        quickTips: [
            "Obtain Inner Line Permit (ILP) before travel",
            "Acclimatize properly to high altitude",
            "Carry sufficient warm clothing",
            "Book accommodations in advance during peak season",
            "Hire local guides for monastery visits",
            "Keep medicines for altitude sickness",
            "Recommended trip: 3-4 days for Tawang, 7-10 days for complete Arunachal Pradesh"
        ],
        extraInfo: {
            title: "Sightseeing & Activity Costs",
            items: [
                "Local Sightseeing Taxi: ₹2,000 – ₹8,000",
                "Tawang Tour Package: ₹10,000 – ₹50,000",
                "Guide Charges: ₹500 – ₹3,000",
                "Adventure Activities: ₹1,000 – ₹10,000"
            ]
        },
        activities: [
            "Snow mountain sightseeing",
            "Monastery visits",
            "Himalayan road trips",
            "Photography",
            "Local Monpa culture experience",
            "High-altitude lake visits"
        ],
        morePlaces: [
            "Tawang Monastery — Largest monastery in India",
            "Sela Pass — Snow-covered mountain pass",
            "Ziro Valley — Famous for scenic landscapes and Apatani culture",
            "Bomdila — Himalayan hill station",
            "Namdapha National Park — Rich biodiversity and wildlife",
            "Dirang — Valley views and hot springs",
            "Roing — Gateway to Eastern Arunachal"
        ]
    },
    12: {
        name: "Gangtok",
        image: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXddDBE9WGwjwEju5YcDLbMdOAeZHqlwv1n0injimENzQhiRdm2d4ZiofNDzU-FS5WDPfFzp7Up0KD30Tc2U0ndqYaFwtN3kiALh9IbqmS8Hax57OoAHJQPjNhW-xgaxl7Co65JZCg?key=icOI8u0ZLxczPTUYDDSMduah",
        description: "Gangtok is the most famous tourist destination in Sikkim. Located in the Eastern Himalayas, it serves as the gateway to Sikkim's beautiful lakes, mountain passes, monasteries, and valleys. It is known for its clean environment, breathtaking views of Mount Kanchenjunga, Buddhist culture, and modern tourist facilities.",
        safetyRating: {
            daytime: 9.5,
            nighttime: 8.5,
            overall: 9.2
        },
        warnings: [
            "Carry warm clothes, especially during winter",
            "Follow altitude guidelines while visiting high-altitude locations",
            "Keep permits ready for restricted areas",
            "Check weather forecasts before mountain travel",
            "Avoid unnecessary travel during heavy rainfall and landslides"
        ],
        budgetTable: [
            { style: "Budget Traveller", min: "₹5,000 – ₹15,000", max: "₹25,000" },
            { style: "Normal Tourist", min: "₹20,000 – ₹80,000", max: "₹1,50,000" },
            { style: "Luxury Tourist", min: "₹2,00,000", max: "₹10,00,000+" }
        ],
        budgetIncludes: [
            "Hotel stay",
            "Food",
            "Local transport",
            "Sightseeing",
            "Permit expenses"
        ],
        hotels: {
            budget: [
                "Hotel Tashi Delek — budget-friendly stay",
                "The Griffon's Nest — backpacker-friendly",
                "Hotel Sonam Delek — affordable accommodation",
                "Hotel Kasturi — economical option",
                "Hotel Renam — budget stay"
            ],
            midRange: [
                "Summit Golden Crescent Resort — comfortable resort",
                "Lemon Tree Hotel Gangtok — modern amenities",
                "Jain Group Hotel Royal Residency — good value",
                "Netuk House — traditional hospitality",
                "Muscatel Grand Silk Route — scenic location"
            ],
            luxury: [
                "Mayfair Spa Resort & Casino — premium luxury with spa",
                "The Elgin Nor-Khill — heritage luxury property",
                "Vivanta Sikkim Pakyong — upscale mountain resort",
                "Taj Guras Kutir Resort & Spa — world-class luxury",
                "Sterling Gangtok Orange Village — premium resort"
            ]
        },
        bestTime: "March to June → Pleasant weather and sightseeing. October to December → Clear Himalayan mountain views. January to February → Snowfall tourism. July to September → Monsoon season with lush greenery.",
        quickTips: [
            "Obtain Protected Area Permit (PAP) for restricted areas",
            "Book Nathula Pass permits in advance (limited daily entries)",
            "Try the ropeway for panoramic city views",
            "Visit MG Marg for shopping and local cuisine",
            "Acclimatize before visiting high-altitude lakes",
            "Carry valid ID proof for permit verification",
            "Recommended trip: 3-4 days for Gangtok, 7-10 days for complete Sikkim"
        ],
        extraInfo: {
            title: "Sightseeing & Activity Costs",
            items: [
                "Local Sightseeing Taxi: ₹2,000 – ₹8,000",
                "Tsomgo Lake Tour: ₹1,500 – ₹5,000",
                "Nathula Pass Tour: ₹3,000 – ₹8,000",
                "Ropeway Ride: ₹150 – ₹500",
                "Guide Charges: ₹500 – ₹3,000",
                "Adventure Activities: ₹1,000 – ₹15,000"
            ]
        },
        activities: [
            "Kanchenjunga mountain views",
            "Monastery visits",
            "Ropeway rides",
            "Snow tourism",
            "Yak rides",
            "Adventure road trips",
            "Photography",
            "Local Sikkimese culture and cuisine"
        ],
        morePlaces: [
            "Tsomgo Lake — Glacial lake at 12,300 feet with yak rides",
            "Nathula Pass — Historic India-China border pass",
            "Yumthang Valley — Valley of Flowers with colorful blooms",
            "Gurudongmar Lake — One of the highest lakes at 17,800 feet",
            "Pelling — Famous for Kanchenjunga views and Skywalk",
            "Ravangla — Peaceful hill station with Buddha Park",
            "Rumtek Monastery — Largest monastery in Sikkim"
        ]
    },
    13: {
        name: "Kohima",
        image: "https://etimg.etb2bimg.com/photo/91278276.cms",
        description: "Kohima is the most famous tourist destination in Nagaland and serves as the cultural capital of the state. Surrounded by green hills and rich tribal heritage, Kohima is known for its historical significance, beautiful landscapes, traditional Naga villages, and the world-famous Hornbill Festival.",
        safetyRating: {
            daytime: 8.5,
            nighttime: 7.5,
            overall: 8
        },
        warnings: [
            "Carry valid ID proof during travel",
            "Avoid traveling on isolated roads late at night",
            "Follow local customs and traditions",
            "Book accommodations in advance during the Hornbill Festival",
            "Check weather conditions before trekking"
        ],
        budgetTable: [
            { style: "Budget Traveller", min: "₹4,000 – ₹12,000", max: "₹20,000" },
            { style: "Normal Tourist", min: "₹15,000 – ₹60,000", max: "₹1,20,000" },
            { style: "Luxury Tourist", min: "₹1,00,000", max: "₹5,00,000+" }
        ],
        budgetIncludes: [
            "Hotel stay",
            "Food",
            "Local transport",
            "Sightseeing",
            "Cultural activities"
        ],
        hotels: {
            budget: [
                "Hotel Ariel — budget-friendly stay",
                "Razhu Pru — affordable accommodation",
                "Hotel Japfu — economical option",
                "Hotel Eastgate — budget stay",
                "Mechüki Backpackers Hostel — backpacker-friendly"
            ],
            midRange: [
                "Hotel Vivor — comfortable mid-range",
                "Cedar Homestay — traditional hospitality",
                "Hotel De Oriental Dream — good value",
                "Maple Homestay — cozy stay",
                "La Colline Resort — scenic location"
            ],
            luxury: [
                "Niraamaya Retreats Aradura Kohima — premium luxury",
                "Vivor Hotel — upscale comfort",
                "Zone Niathu by The Park — modern luxury",
                "De Oriental Grand — grand experience",
                "Noune Resort — luxury resort"
            ]
        },
        bestTime: "October to May → Pleasant weather and sightseeing. December → Best time for the Hornbill Festival. June to September → Monsoon season with lush green landscapes.",
        quickTips: [
            "Visit during December for the Hornbill Festival experience",
            "Respect local Naga customs and traditions",
            "Try authentic Naga cuisine",
            "Book guides for village visits",
            "Carry warm clothes for evening temperatures",
            "Visit Kohima War Cemetery for historical significance",
            "Recommended trip: 2-3 days for Kohima, 5-7 days for complete Nagaland"
        ],
        extraInfo: {
            title: "Sightseeing & Activity Costs",
            items: [
                "Local Sightseeing Taxi: ₹1,500 – ₹6,000",
                "Dzukou Valley Trek: ₹500 – ₹5,000",
                "Local Guide Charges: ₹500 – ₹3,000",
                "Hornbill Festival Entry: ₹100 – ₹1,000",
                "Adventure Activities: ₹1,000 – ₹10,000"
            ]
        },
        activities: [
            "Naga tribal culture exploration",
            "Hornbill Festival celebrations",
            "Mountain trekking",
            "Traditional village visits",
            "Photography",
            "Local Naga cuisine",
            "Historical tourism",
            "Nature camping"
        ],
        morePlaces: [
            "Dimapur — Largest city and gateway to Nagaland",
            "Hornbill Festival — Festival of Festivals showcasing Naga culture",
            "Dzukou Valley — One of India's most beautiful trekking destinations",
            "Japfu Peak — Second-highest mountain in Nagaland",
            "Kohima War Cemetery — WWII memorial site",
            "Khonoma Village — India's first green village",
            "Shilloi Lake — Scenic lake near India-Myanmar border"
        ]
    },
    14: {
        name: "Loktak Lake",
        image: "https://thesologlobetrotter.com/wp-content/uploads/2019/10/loktak-feature.jpg",
        description: "Loktak Lake is the most famous tourist destination in Manipur and the largest freshwater lake in Northeast India. It is globally known for its unique floating islands called Phumdis and its breathtaking natural beauty. The lake is also home to the world's only floating national park, Keibul Lamjao National Park.",
        safetyRating: {
            daytime: 7.5,
            nighttime: 6.5,
            overall: 7
        },
        warnings: [
            "Follow local travel advisories",
            "Avoid isolated areas after dark",
            "Travel with local guides for remote destinations",
            "Keep identity documents handy",
            "Check weather and road conditions before travel"
        ],
        budgetTable: [
            { style: "Budget Traveller", min: "₹4,000 – ₹10,000", max: "₹15,000" },
            { style: "Normal Tourist", min: "₹15,000 – ₹50,000", max: "₹1,00,000" },
            { style: "Luxury Tourist", min: "₹80,000", max: "₹5,00,000+" }
        ],
        budgetIncludes: [
            "Hotel stay",
            "Food",
            "Local transport",
            "Sightseeing",
            "Boating activities"
        ],
        hotels: {
            budget: [
                "Hotel Nirmala — budget-friendly stay",
                "Hotel Imphal — affordable accommodation",
                "Sangai Lodge — economical option",
                "Classic Inn — budget stay",
                "Hotel White Palace — affordable hotel"
            ],
            midRange: [
                "Hotel Classic Grande — comfortable mid-range",
                "Hotel Daani Continental — good value",
                "Hotel Bheigo — modern amenities",
                "Hotel Yaiphaba — traditional hospitality",
                "The Classic Hotel — quality stay"
            ],
            luxury: [
                "Classic Grande Imphal — premium luxury",
                "Sangai Continental — upscale comfort",
                "The Classic Hotel Premium Wing — luxury wing",
                "Aurika Resort — premium resort",
                "Imphal Resort & Convention Centre — luxury resort"
            ]
        },
        bestTime: "October to March → Pleasant weather and sightseeing. November to February → Best photography and lake views. April to June → Moderate climate and outdoor activities. July to September → Monsoon season with lush greenery.",
        quickTips: [
            "Take a boat ride to explore the floating islands (Phumdis)",
            "Visit Keibul Lamjao National Park to see Sangai Deer",
            "Best photography during sunrise and sunset",
            "Try traditional Manipuri cuisine in Imphal",
            "Hire local guides for better lake exploration",
            "Carry binoculars for bird watching",
            "Recommended trip: 2-3 days for Loktak Lake, 5-7 days for complete Manipur"
        ],
        extraInfo: {
            title: "Sightseeing & Activity Costs",
            items: [
                "Boat Ride: ₹300 – ₹3,000",
                "Local Sightseeing Taxi: ₹1,500 – ₹6,000",
                "Guide Charges: ₹500 – ₹2,500",
                "Photography Tours: ₹1,000 – ₹5,000",
                "Adventure Activities: ₹1,000 – ₹8,000"
            ]
        },
        activities: [
            "Loktak Lake boating",
            "Floating island exploration",
            "Bird watching",
            "Nature photography",
            "Cultural tourism",
            "Traditional Manipuri cuisine",
            "Sunset lake views",
            "Village tourism"
        ],
        morePlaces: [
            "Imphal — Capital city with markets and museums",
            "Keibul Lamjao National Park — World's only floating national park",
            "Kangla Fort — Historic royal palace of Manipur Kingdom",
            "Shree Govindajee Temple — Sacred Hindu temple",
            "Ukhrul — Scenic hill station with Shirui Lily",
            "INA Memorial — Historic site where INA flag was first hoisted"
        ]
    },
    15: {
        name: "Aizawl",
        image: "https://s7ap1.scene7.com/is/image/incredibleindia/1-solomon-temple-aizwal-mizoram-city-hero?qlt=82&ts=1726674760373",
        description: "Aizawl is the most famous tourist destination in Mizoram and the capital city of the state. Located at an altitude of about 4,000 feet above sea level, Aizawl is known for its beautiful hilltop views, clean environment, rich Mizo culture, churches, and pleasant climate. It serves as the gateway to most tourist attractions in Mizoram.",
        safetyRating: {
            daytime: 9,
            nighttime: 8.5,
            overall: 8.8
        },
        warnings: [
            "Carry light woolen clothes during winter",
            "Follow local customs and traditions",
            "Keep cash available in remote areas",
            "Avoid traveling on hilly roads during heavy rainfall",
            "Check weather forecasts before long-distance travel"
        ],
        budgetTable: [
            { style: "Budget Traveller", min: "₹5,000 – ₹12,000", max: "₹20,000" },
            { style: "Normal Tourist", min: "₹15,000 – ₹60,000", max: "₹1,20,000" },
            { style: "Luxury Tourist", min: "₹1,00,000", max: "₹5,00,000+" }
        ],
        budgetIncludes: [
            "Hotel stay",
            "Food",
            "Local transport",
            "Sightseeing",
            "Cultural activities"
        ],
        hotels: {
            budget: [
                "Hotel Regency — budget-friendly stay",
                "Hotel Floria Budget Wing — affordable accommodation",
                "Hotel Millennium Centre — economical option",
                "Chawlhna Hotel — budget stay",
                "Tourist Lodge Aizawl — government lodge"
            ],
            midRange: [
                "Hotel Floria — comfortable mid-range",
                "Aizawl Hotel — good value",
                "Hotel Sangchia — modern amenities",
                "Royale Lalawi Hotel — quality stay",
                "Regency Hotel — traditional hospitality"
            ],
            luxury: [
                "Hotel Floria Premium Suites — premium luxury",
                "Royale Lalawi Hotel Premium Wing — upscale comfort",
                "Aizawl Resort — luxury resort",
                "Tourist Heritage Resort — heritage property",
                "Grand Mizoram Resort — grand experience"
            ]
        },
        bestTime: "October to April → Best weather and sightseeing. November to February → Cool climate and mountain views. May to September → Monsoon season with lush green landscapes.",
        quickTips: [
            "Visit Solomon's Temple for panoramic city views",
            "Explore local markets for traditional Mizo handicrafts",
            "Try authentic Mizo cuisine like Bai and Vawksa",
            "Respect local customs and church timings",
            "Hire local guides for village tourism",
            "Best photography during sunrise and sunset",
            "Recommended trip: 2-3 days for Aizawl, 5-7 days for complete Mizoram"
        ],
        extraInfo: {
            title: "Sightseeing & Activity Costs",
            items: [
                "Local Sightseeing Taxi: ₹1,500 – ₹6,000",
                "Guided Tour: ₹500 – ₹3,000",
                "Nature Trekking: ₹500 – ₹5,000",
                "Photography Tours: ₹1,000 – ₹5,000",
                "Adventure Activities: ₹1,000 – ₹10,000"
            ]
        },
        activities: [
            "Hilltop sightseeing",
            "Cultural tourism",
            "Nature photography",
            "Village tourism",
            "Trekking",
            "Local Mizo cuisine",
            "Sunrise and sunset viewpoints",
            "Shopping for traditional handicrafts"
        ],
        morePlaces: [
            "Reiek — Popular mountain village for trekking",
            "Vantawng Falls — Highest waterfall in Mizoram",
            "Phawngpui Hills — Highest peak in Mizoram (Blue Mountain)",
            "Tam Dil Lake — Beautiful natural freshwater lake",
            "Murlen National Park — Amazon of the East",
            "Champhai — Rice Bowl of Mizoram with Myanmar border views"
        ]
    },
    16: {
        name: "Agartala",
        image: "https://s7ap1.scene7.com/is/image/incredibleindia/rudrasagar-lake-melaghar-2-attr-hero?qlt=82&ts=1726651019295",
        description: "Agartala is the most famous tourist destination in Tripura and the capital city of the state. It is known for its royal palaces, temples, cultural heritage, gardens, and historical attractions. Agartala serves as the gateway to all major tourist destinations in Tripura.",
        safetyRating: {
            daytime: 8.8,
            nighttime: 8,
            overall: 8.4
        },
        warnings: [
            "Carry valid ID proof while traveling",
            "Follow local guidelines at religious sites",
            "Keep cash available for remote tourist spots",
            "Avoid isolated areas late at night",
            "Check weather conditions during monsoon season"
        ],
        budgetTable: [
            { style: "Budget Traveller", min: "₹4,000 – ₹10,000", max: "₹15,000" },
            { style: "Normal Tourist", min: "₹15,000 – ₹50,000", max: "₹1,00,000" },
            { style: "Luxury Tourist", min: "₹80,000", max: "₹5,00,000+" }
        ],
        budgetIncludes: [
            "Hotel stay",
            "Food",
            "Local transport",
            "Sightseeing",
            "Entry fees"
        ],
        hotels: {
            budget: [
                "Hotel Sonar Tori — budget-friendly stay",
                "Hotel Welcome Palace — affordable accommodation",
                "Hotel Himalaya — economical option",
                "Hotel Palace Inn — budget stay",
                "Hotel City Centre — affordable hotel"
            ],
            midRange: [
                "Ginger Hotel Agartala — comfortable mid-range",
                "Polo Towers Agartala — good value",
                "Hotel Woodland Park — modern amenities",
                "Hotel Royal Inn — quality stay",
                "Hotel City Centre Premium — premium comfort"
            ],
            luxury: [
                "Polo Towers Agartala Premium Suites — premium luxury",
                "Ginger Hotel Executive Suites — upscale comfort",
                "Royal Heritage Resort — heritage property",
                "Grand Tripura Resort — grand experience",
                "Heritage Palace Resort — luxury resort"
            ]
        },
        bestTime: "October to March → Best weather and sightseeing. November to February → Pleasant climate and outdoor activities. April to June → Warm weather but suitable for tourism. July to September → Monsoon season with lush greenery.",
        quickTips: [
            "Visit Ujjayanta Palace for royal heritage experience",
            "Take a boat ride at Neermahal water palace",
            "Explore Tripura Sundari Temple (Matabari)",
            "Visit Unakoti for ancient rock-cut sculptures",
            "Try traditional Tripuri cuisine",
            "Best time for wildlife safari at Sepahijala",
            "Recommended trip: 2-3 days for Agartala, 5-7 days for complete Tripura"
        ],
        extraInfo: {
            title: "Sightseeing & Activity Costs",
            items: [
                "Local Sightseeing Taxi: ₹1,500 – ₹5,000",
                "Guided Tour: ₹500 – ₹3,000",
                "Wildlife Safari: ₹200 – ₹2,000",
                "Boating at Neermahal: ₹100 – ₹1,000",
                "Photography Tours: ₹500 – ₹5,000"
            ]
        },
        activities: [
            "Palace tours",
            "Temple visits",
            "Wildlife tourism",
            "Lake boating",
            "Cultural tourism",
            "Nature photography",
            "Hill station sightseeing",
            "Traditional Tripuri cuisine"
        ],
        morePlaces: [
            "Ujjayanta Palace — Former royal palace, now state museum",
            "Neermahal — India's largest water palace in Eastern India",
            "Tripura Sundari Temple — One of the 51 Shakti Peethas",
            "Unakoti — Ancient rock-cut sculptures (Angkor Wat of Northeast)",
            "Sepahijala Wildlife Sanctuary — Famous for clouded leopards",
            "Jampui Hills — Highest hill range with orange orchards"
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
        // Scroll to top when destination changes
        window.scrollTo(0, 0);
    }, [id]);

    // Determine back navigation based on destination ID
    const handleBackClick = () => {
        // IDs 9+ are North-East destinations
        if (parseInt(id) >= 9) {
            navigate("/northeast-destinations");
        } else {
            navigate("/dashboard");
        }
    };

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
                    onClick={handleBackClick}
                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6"
                >
                    <ArrowLeft size={20} />
                    Back
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
                    <h2 className="text-2xl font-bold mb-4">
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

                {/* Extra Info (e.g., Houseboat Costs for Kerala) */}
                {destination.extraInfo && (
                    <div className="bg-gray-800 rounded-xl p-6 mb-6">
                        <h2 className="text-2xl font-bold mb-4 text-cyan-400">{destination.extraInfo.title}</h2>
                        <ul className="space-y-2">
                            {destination.extraInfo.items.map((item, index) => (
                                <li key={index} className="text-gray-300 pl-4 border-l-2 border-cyan-400">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Activities (for destinations like Kerala) */}
                {destination.activities && (
                    <div className="bg-gray-800 rounded-xl p-6 mb-6">
                        <h2 className="text-2xl font-bold mb-4 text-green-400">Best Tourist Activities</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {destination.activities.map((activity, index) => (
                                <div key={index} className="bg-gray-700 px-4 py-2 rounded-lg text-center text-gray-300">
                                    {activity}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Quick Tips */}
                <div className="bg-blue-900/20 border border-blue-700 rounded-xl p-6 mb-6">
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

                {/* More Places to Visit (Only for North-East destinations) */}
                {parseInt(id) === 9 && (
                    <div className="bg-gray-800 rounded-xl p-6">
                        <h2 className="text-2xl font-bold mb-4 text-green-400">More Places You Can Visit in Assam</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div className="bg-gray-700 p-4 rounded-lg text-center hover:bg-gray-600 transition">
                                <span className="text-3xl mb-2 block">🏔️</span>
                                <p className="text-white font-semibold">Guwahati</p>
                                <p className="text-gray-400 text-sm">Temples & Brahmaputra</p>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg text-center hover:bg-gray-600 transition">
                                <span className="text-3xl mb-2 block">🏝️</span>
                                <p className="text-white font-semibold">Majuli Island</p>
                                <p className="text-gray-400 text-sm">Largest river island</p>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg text-center hover:bg-gray-600 transition">
                                <span className="text-3xl mb-2 block">🌿</span>
                                <p className="text-white font-semibold">Manas National Park</p>
                                <p className="text-gray-400 text-sm">Wildlife sanctuary</p>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg text-center hover:bg-gray-600 transition">
                                <span className="text-3xl mb-2 block">🏛️</span>
                                <p className="text-white font-semibold">Sivasagar</p>
                                <p className="text-gray-400 text-sm">Ahom dynasty monuments</p>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg text-center hover:bg-gray-600 transition">
                                <span className="text-3xl mb-2 block">🍵</span>
                                <p className="text-white font-semibold">Tea Gardens</p>
                                <p className="text-gray-400 text-sm">Assam tea estates</p>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg text-center hover:bg-gray-600 transition">
                                <span className="text-3xl mb-2 block">🛕</span>
                                <p className="text-white font-semibold">Kamakhya Temple</p>
                                <p className="text-gray-400 text-sm">Sacred Hindu temple</p>
                            </div>
                        </div>
                    </div>
                )}
                {parseInt(id) === 10 && (
                    <div className="bg-gray-800 rounded-xl p-6">
                        <h2 className="text-2xl font-bold mb-4 text-green-400">More Places You Can Visit in Meghalaya</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div className="bg-gray-700 p-4 rounded-lg text-center hover:bg-gray-600 transition">
                                <span className="text-3xl mb-2 block">🏔️</span>
                                <p className="text-white font-semibold">Shillong</p>
                                <p className="text-gray-400 text-sm">Scotland of the East</p>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg text-center hover:bg-gray-600 transition">
                                <span className="text-3xl mb-2 block">🚣</span>
                                <p className="text-white font-semibold">Dawki River</p>
                                <p className="text-gray-400 text-sm">Crystal-clear boating</p>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg text-center hover:bg-gray-600 transition">
                                <span className="text-3xl mb-2 block">🌉</span>
                                <p className="text-white font-semibold">Living Root Bridges</p>
                                <p className="text-gray-400 text-sm">Natural wonders</p>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg text-center hover:bg-gray-600 transition">
                                <span className="text-3xl mb-2 block">💧</span>
                                <p className="text-white font-semibold">Nohkalikai Falls</p>
                                <p className="text-gray-400 text-sm">Tallest plunge waterfall</p>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg text-center hover:bg-gray-600 transition">
                                <span className="text-3xl mb-2 block">🕳️</span>
                                <p className="text-white font-semibold">Mawsmai Cave</p>
                                <p className="text-gray-400 text-sm">Limestone caves</p>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg text-center hover:bg-gray-600 transition">
                                <span className="text-3xl mb-2 block">🏞️</span>
                                <p className="text-white font-semibold">Laitlum Canyons</p>
                                <p className="text-gray-400 text-sm">Scenic viewpoints</p>
                            </div>
                        </div>
                    </div>
                )}
                {parseInt(id) === 11 && (
                    <div className="bg-gray-800 rounded-xl p-6">
                        <h2 className="text-2xl font-bold mb-4 text-green-400">More Places You Can Visit in Arunachal Pradesh</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div className="bg-gray-700 p-4 rounded-lg text-center hover:bg-gray-600 transition">
                                <span className="text-3xl mb-2 block">🛕</span>
                                <p className="text-white font-semibold">Tawang Monastery</p>
                                <p className="text-gray-400 text-sm">Largest in India</p>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg text-center hover:bg-gray-600 transition">
                                <span className="text-3xl mb-2 block">🏔️</span>
                                <p className="text-white font-semibold">Sela Pass</p>
                                <p className="text-gray-400 text-sm">Snow-covered pass</p>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg text-center hover:bg-gray-600 transition">
                                <span className="text-3xl mb-2 block">🌾</span>
                                <p className="text-white font-semibold">Ziro Valley</p>
                                <p className="text-gray-400 text-sm">Apatani culture</p>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg text-center hover:bg-gray-600 transition">
                                <span className="text-3xl mb-2 block">🏞️</span>
                                <p className="text-white font-semibold">Bomdila</p>
                                <p className="text-gray-400 text-sm">Himalayan hill station</p>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg text-center hover:bg-gray-600 transition">
                                <span className="text-3xl mb-2 block">🐅</span>
                                <p className="text-white font-semibold">Namdapha National Park</p>
                                <p className="text-gray-400 text-sm">Rich biodiversity</p>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg text-center hover:bg-gray-600 transition">
                                <span className="text-3xl mb-2 block">♨️</span>
                                <p className="text-white font-semibold">Dirang</p>
                                <p className="text-gray-400 text-sm">Hot springs & valleys</p>
                            </div>
                        </div>
                    </div>
                )}
                {parseInt(id) === 12 && (
                    <div className="bg-gray-800 rounded-xl p-6">
                        <h2 className="text-2xl font-bold mb-4 text-green-400">More Places You Can Visit in Sikkim</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div className="bg-gray-700 p-4 rounded-lg text-center hover:bg-gray-600 transition">
                                <span className="text-3xl mb-2 block">🏔️</span>
                                <p className="text-white font-semibold">Tsomgo Lake</p>
                                <p className="text-gray-400 text-sm">Glacial lake at 12,300 ft</p>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg text-center hover:bg-gray-600 transition">
                                <span className="text-3xl mb-2 block">🛂</span>
                                <p className="text-white font-semibold">Nathula Pass</p>
                                <p className="text-gray-400 text-sm">India-China border</p>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg text-center hover:bg-gray-600 transition">
                                <span className="text-3xl mb-2 block">🌸</span>
                                <p className="text-white font-semibold">Yumthang Valley</p>
                                <p className="text-gray-400 text-sm">Valley of Flowers</p>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg text-center hover:bg-gray-600 transition">
                                <span className="text-3xl mb-2 block">💧</span>
                                <p className="text-white font-semibold">Gurudongmar Lake</p>
                                <p className="text-gray-400 text-sm">17,800 ft altitude</p>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg text-center hover:bg-gray-600 transition">
                                <span className="text-3xl mb-2 block">🌉</span>
                                <p className="text-white font-semibold">Pelling</p>
                                <p className="text-gray-400 text-sm">Skywalk & views</p>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg text-center hover:bg-gray-600 transition">
                                <span className="text-3xl mb-2 block">🛕</span>
                                <p className="text-white font-semibold">Rumtek Monastery</p>
                                <p className="text-gray-400 text-sm">Largest in Sikkim</p>
                            </div>
                        </div>
                    </div>
                )}
                {parseInt(id) === 13 && (
                    <div className="bg-gray-800 rounded-xl p-6">
                        <h2 className="text-2xl font-bold mb-4 text-green-400">More Places You Can Visit in Nagaland</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div className="bg-gray-700 p-4 rounded-lg text-center hover:bg-gray-600 transition">
                                <span className="text-3xl mb-2 block">🏙️</span>
                                <p className="text-white font-semibold">Dimapur</p>
                                <p className="text-gray-400 text-sm">Gateway to Nagaland</p>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg text-center hover:bg-gray-600 transition">
                                <span className="text-3xl mb-2 block">🎭</span>
                                <p className="text-white font-semibold">Hornbill Festival</p>
                                <p className="text-gray-400 text-sm">Festival of Festivals</p>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg text-center hover:bg-gray-600 transition">
                                <span className="text-3xl mb-2 block">🌸</span>
                                <p className="text-white font-semibold">Dzukou Valley</p>
                                <p className="text-gray-400 text-sm">Beautiful trekking</p>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg text-center hover:bg-gray-600 transition">
                                <span className="text-3xl mb-2 block">⛰️</span>
                                <p className="text-white font-semibold">Japfu Peak</p>
                                <p className="text-gray-400 text-sm">Second-highest peak</p>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg text-center hover:bg-gray-600 transition">
                                <span className="text-3xl mb-2 block">🪖</span>
                                <p className="text-white font-semibold">Kohima War Cemetery</p>
                                <p className="text-gray-400 text-sm">WWII memorial</p>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg text-center hover:bg-gray-600 transition">
                                <span className="text-3xl mb-2 block">🌿</span>
                                <p className="text-white font-semibold">Khonoma Village</p>
                                <p className="text-gray-400 text-sm">First green village</p>
                            </div>
                        </div>
                    </div>
                )}
                {parseInt(id) === 14 && (
                    <div className="bg-gray-800 rounded-xl p-6">
                        <h2 className="text-2xl font-bold mb-4 text-green-400">More Places You Can Visit in Manipur</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div className="bg-gray-700 p-4 rounded-lg text-center hover:bg-gray-600 transition">
                                <span className="text-3xl mb-2 block">🏙️</span>
                                <p className="text-white font-semibold">Imphal</p>
                                <p className="text-gray-400 text-sm">Capital city</p>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg text-center hover:bg-gray-600 transition">
                                <span className="text-3xl mb-2 block">🦌</span>
                                <p className="text-white font-semibold">Keibul Lamjao Park</p>
                                <p className="text-gray-400 text-sm">Floating national park</p>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg text-center hover:bg-gray-600 transition">
                                <span className="text-3xl mb-2 block">🏰</span>
                                <p className="text-white font-semibold">Kangla Fort</p>
                                <p className="text-gray-400 text-sm">Historic royal palace</p>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg text-center hover:bg-gray-600 transition">
                                <span className="text-3xl mb-2 block">🛕</span>
                                <p className="text-white font-semibold">Govindajee Temple</p>
                                <p className="text-gray-400 text-sm">Sacred Hindu temple</p>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg text-center hover:bg-gray-600 transition">
                                <span className="text-3xl mb-2 block">🌺</span>
                                <p className="text-white font-semibold">Ukhrul</p>
                                <p className="text-gray-400 text-sm">Shirui Lily hill station</p>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg text-center hover:bg-gray-600 transition">
                                <span className="text-3xl mb-2 block">🪖</span>
                                <p className="text-white font-semibold">INA Memorial</p>
                                <p className="text-gray-400 text-sm">Historic INA site</p>
                            </div>
                        </div>
                    </div>
                )}
                {parseInt(id) === 15 && (
                    <div className="bg-gray-800 rounded-xl p-6">
                        <h2 className="text-2xl font-bold mb-4 text-green-400">More Places You Can Visit in Mizoram</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div className="bg-gray-700 p-4 rounded-lg text-center hover:bg-gray-600 transition">
                                <span className="text-3xl mb-2 block">⛰️</span>
                                <p className="text-white font-semibold">Reiek</p>
                                <p className="text-gray-400 text-sm">Mountain village</p>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg text-center hover:bg-gray-600 transition">
                                <span className="text-3xl mb-2 block">💧</span>
                                <p className="text-white font-semibold">Vantawng Falls</p>
                                <p className="text-gray-400 text-sm">Highest waterfall</p>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg text-center hover:bg-gray-600 transition">
                                <span className="text-3xl mb-2 block">🏔️</span>
                                <p className="text-white font-semibold">Phawngpui Hills</p>
                                <p className="text-gray-400 text-sm">Blue Mountain peak</p>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg text-center hover:bg-gray-600 transition">
                                <span className="text-3xl mb-2 block">🏞️</span>
                                <p className="text-white font-semibold">Tam Dil Lake</p>
                                <p className="text-gray-400 text-sm">Freshwater lake</p>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg text-center hover:bg-gray-600 transition">
                                <span className="text-3xl mb-2 block">🌿</span>
                                <p className="text-white font-semibold">Murlen National Park</p>
                                <p className="text-gray-400 text-sm">Amazon of the East</p>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg text-center hover:bg-gray-600 transition">
                                <span className="text-3xl mb-2 block">🌾</span>
                                <p className="text-white font-semibold">Champhai</p>
                                <p className="text-gray-400 text-sm">Rice Bowl of Mizoram</p>
                            </div>
                        </div>
                    </div>
                )}
                {parseInt(id) === 16 && (
                    <div className="bg-gray-800 rounded-xl p-6">
                        <h2 className="text-2xl font-bold mb-4 text-green-400">More Places You Can Visit in Tripura</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div className="bg-gray-700 p-4 rounded-lg text-center hover:bg-gray-600 transition">
                                <span className="text-3xl mb-2 block">🏛️</span>
                                <p className="text-white font-semibold">Ujjayanta Palace</p>
                                <p className="text-gray-400 text-sm">Royal palace museum</p>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg text-center hover:bg-gray-600 transition">
                                <span className="text-3xl mb-2 block">🏰</span>
                                <p className="text-white font-semibold">Neermahal</p>
                                <p className="text-gray-400 text-sm">Water palace</p>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg text-center hover:bg-gray-600 transition">
                                <span className="text-3xl mb-2 block">🛕</span>
                                <p className="text-white font-semibold">Tripura Sundari Temple</p>
                                <p className="text-gray-400 text-sm">Shakti Peetha</p>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg text-center hover:bg-gray-600 transition">
                                <span className="text-3xl mb-2 block">🗿</span>
                                <p className="text-white font-semibold">Unakoti</p>
                                <p className="text-gray-400 text-sm">Rock-cut sculptures</p>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg text-center hover:bg-gray-600 transition">
                                <span className="text-3xl mb-2 block">🐆</span>
                                <p className="text-white font-semibold">Sepahijala Sanctuary</p>
                                <p className="text-gray-400 text-sm">Clouded leopards</p>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg text-center hover:bg-gray-600 transition">
                                <span className="text-3xl mb-2 block">🏔️</span>
                                <p className="text-white font-semibold">Jampui Hills</p>
                                <p className="text-gray-400 text-sm">Orange orchards</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
