// International Tourist Destinations Database
const internationalDestinationsDB = [
    {
        id: 1,
        name: 'Paris',
        country: 'France',
        region: 'Europe',
        airports: ['Charles de Gaulle Airport (CDG)', 'Orly Airport (ORY)'],
        attractions: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame', 'Arc de Triomphe', 'Sacré-Cœur'],
        bestTime: 'April-June, September-October',
        currency: 'EUR (€)',
        flightTimeFromDelhi: '9-10 hours',
        visaRequired: true,
        avgCostPerDay: '$100-150'
    },
    {
        id: 2,
        name: 'Tokyo',
        country: 'Japan',
        region: 'Asia',
        airports: ['Haneda Airport (HND)', 'Narita Airport (NRT)'],
        attractions: ['Senso-ji Temple', 'Tokyo Skytree', 'Shibuya Crossing', 'Meiji Shrine', 'Akihabara'],
        bestTime: 'March-May, September-November',
        currency: 'JPY (¥)',
        flightTimeFromDelhi: '6-7 hours',
        visaRequired: true,
        avgCostPerDay: '$80-120'
    },
    {
        id: 3,
        name: 'New York',
        country: 'United States',
        region: 'North America',
        airports: ['JFK International (JFK)', 'LaGuardia (LGA)', 'Newark (EWR)'],
        attractions: ['Statue of Liberty', 'Central Park', 'Times Square', 'Empire State Building', 'Broadway'],
        bestTime: 'May-September',
        currency: 'USD ($)',
        flightTimeFromDelhi: '15-16 hours',
        visaRequired: true,
        avgCostPerDay: '$150-250'
    },
    {
        id: 4,
        name: 'London',
        country: 'United Kingdom',
        region: 'Europe',
        airports: ['Heathrow (LHR)', 'Gatwick (LGW)', 'Stansted (STN)'],
        attractions: ['Big Ben', 'Buckingham Palace', 'Tower Bridge', 'Westminster Abbey', 'British Museum'],
        bestTime: 'May-September',
        currency: 'GBP (£)',
        flightTimeFromDelhi: '9-10 hours',
        visaRequired: true,
        avgCostPerDay: '$120-180'
    },
    {
        id: 5,
        name: 'Dubai',
        country: 'United Arab Emirates',
        region: 'Middle East',
        airports: ['Dubai International (DXB)', 'Al Maktoum International (DWC)'],
        attractions: ['Burj Khalifa', 'Palm Jumeirah', 'Dubai Mall', 'Gold Souk', 'Dune Bashing'],
        bestTime: 'October-April',
        currency: 'AED (د.إ)',
        flightTimeFromDelhi: '3-4 hours',
        visaRequired: false,
        avgCostPerDay: '$100-150'
    },
    {
        id: 6,
        name: 'Bangkok',
        country: 'Thailand',
        region: 'Asia',
        airports: ['Suvarnabhumi (BKK)', 'Don Mueang (DMK)'],
        attractions: ['Grand Palace', 'Temple of the Emerald Buddha', 'Chao Phraya River', 'Wat Pho', 'Floating Markets'],
        bestTime: 'November-February',
        currency: 'THB (฿)',
        flightTimeFromDelhi: '3-4 hours',
        visaRequired: false,
        avgCostPerDay: '$40-60'
    },
    {
        id: 7,
        name: 'Singapore',
        country: 'Singapore',
        region: 'Asia',
        airports: ['Singapore Changi (SIN)'],
        attractions: ['Marina Bay Sands', 'Gardens by the Bay', 'Sentosa Island', 'Singapore Flyer', 'Chinatown'],
        bestTime: 'February-April, July-August',
        currency: 'SGD (S$)',
        flightTimeFromDelhi: '4-5 hours',
        visaRequired: false,
        avgCostPerDay: '$80-120'
    },
    {
        id: 8,
        name: 'Bali',
        country: 'Indonesia',
        region: 'Asia',
        airports: ['Ngurah Rai International (DPS)'],
        attractions: ['Tanah Lot Temple', 'Ubud Palace', 'Seminyak Beach', 'Tegallalang Rice Terraces', 'Mount Batur'],
        bestTime: 'April-October',
        currency: 'IDR (Rp)',
        flightTimeFromDelhi: '5-6 hours',
        visaRequired: false,
        avgCostPerDay: '$30-50'
    },
    {
        id: 9,
        name: 'Sydney',
        country: 'Australia',
        region: 'Oceania',
        airports: ['Sydney Kingsford Smith (SYD)'],
        attractions: ['Sydney Opera House', 'Harbour Bridge', 'Bondi Beach', 'Blue Mountains', 'Taronga Zoo'],
        bestTime: 'September-November, March-May',
        currency: 'AUD (A$)',
        flightTimeFromDelhi: '14-15 hours',
        visaRequired: true,
        avgCostPerDay: '$100-150'
    },
    {
        id: 10,
        name: 'Barcelona',
        country: 'Spain',
        region: 'Europe',
        airports: ['Josep Tarradellas Barcelona-El Prat (BCN)'],
        attractions: ['Sagrada Familia', 'Park Güell', 'Gothic Quarter', 'La Rambla', 'Casa Batlló'],
        bestTime: 'April-May, September-October',
        currency: 'EUR (€)',
        flightTimeFromDelhi: '10-11 hours',
        visaRequired: true,
        avgCostPerDay: '$80-120'
    },
    {
        id: 11,
        name: 'Rome',
        country: 'Italy',
        region: 'Europe',
        airports: ['Leonardo da Vinci-Fiumicino (FCO)', 'Ciampino (CIA)'],
        attractions: ['Colosseum', 'Roman Forum', 'Vatican City', 'Trevi Fountain', 'Pantheon'],
        bestTime: 'April-June, September-October',
        currency: 'EUR (€)',
        flightTimeFromDelhi: '10-11 hours',
        visaRequired: true,
        avgCostPerDay: '$80-120'
    },
    {
        id: 12,
        name: 'Amsterdam',
        country: 'Netherlands',
        region: 'Europe',
        airports: ['Amsterdam Airport Schiphol (AMS)'],
        attractions: ['Anne Frank House', 'Canal Cruises', 'Van Gogh Museum', 'Dam Square', 'Windmills'],
        bestTime: 'April-May, September-October',
        currency: 'EUR (€)',
        flightTimeFromDelhi: '9-10 hours',
        visaRequired: true,
        avgCostPerDay: '$90-130'
    },
    {
        id: 13,
        name: 'Berlin',
        country: 'Germany',
        region: 'Europe',
        airports: ['Berlin Brandenburg (BER)'],
        attractions: ['Brandenburg Gate', 'Berlin Wall', 'Reichstag', 'Museum Island', 'East Side Gallery'],
        bestTime: 'May-September',
        currency: 'EUR (€)',
        flightTimeFromDelhi: '9-10 hours',
        visaRequired: true,
        avgCostPerDay: '$70-110'
    },
    {
        id: 14,
        name: 'Venice',
        country: 'Italy',
        region: 'Europe',
        airports: ['Marco Polo (VCE)', 'Venice Airport (TSF)'],
        attractions: ['St. Mark\'s Basilica', 'Grand Canal', 'Rialto Bridge', 'Gondola Rides', 'Doge\'s Palace'],
        bestTime: 'April-May, September-October',
        currency: 'EUR (€)',
        flightTimeFromDelhi: '10-11 hours',
        visaRequired: true,
        avgCostPerDay: '$100-150'
    },
    {
        id: 15,
        name: 'Istanbul',
        country: 'Turkey',
        region: 'Europe-Asia',
        airports: ['Istanbul Airport (IST)', 'Sabiha Gökçen (SAW)'],
        attractions: ['Blue Mosque', 'Hagia Sophia', 'Topkapi Palace', 'Grand Bazaar', 'Bosphorus Cruise'],
        bestTime: 'April-May, September-October',
        currency: 'TRY (₺)',
        flightTimeFromDelhi: '6-7 hours',
        visaRequired: false,
        avgCostPerDay: '$50-80'
    },
    {
        id: 16,
        name: 'Prague',
        country: 'Czech Republic',
        region: 'Europe',
        airports: ['Václav Havel Airport Prague (PRG)'],
        attractions: ['Prague Castle', 'Charles Bridge', 'Old Town Square', 'St. Vitus Cathedral', 'Jewish Quarter'],
        bestTime: 'April-May, September-October',
        currency: 'CZK (Kč)',
        flightTimeFromDelhi: '9-10 hours',
        visaRequired: true,
        avgCostPerDay: '$50-80'
    },
    {
        id: 17,
        name: 'Vienna',
        country: 'Austria',
        region: 'Europe',
        airports: ['Vienna International (VIE)'],
        attractions: ['Schönbrunn Palace', 'St. Stephen\'s Cathedral', 'Hofburg Palace', 'Danube River', 'St. Charles Church'],
        bestTime: 'April-May, September-October',
        currency: 'EUR (€)',
        flightTimeFromDelhi: '9-10 hours',
        visaRequired: true,
        avgCostPerDay: '$80-120'
    },
    {
        id: 18,
        name: 'Maldives',
        country: 'Maldives',
        region: 'Asia-Indian Ocean',
        airports: ['Ibrahim Nasir Maldives International (MLE)'],
        attractions: ['Coral Reefs', 'Water Bungalows', 'Snorkeling', 'White Sand Beaches', 'Marine Life'],
        bestTime: 'November-April',
        currency: 'MVR (ރ.))',
        flightTimeFromDelhi: '4-5 hours',
        visaRequired: false,
        avgCostPerDay: '$200-400'
    },
    {
        id: 19,
        name: 'Mauritius',
        country: 'Mauritius',
        region: 'Africa',
        airports: ['Sir Seewoosagur Ramgoolam (MRU)'],
        attractions: ['Black River Gorges', 'Pamplemousses Botanical Garden', 'Chamarel Seven-Colored Earths', 'Port Louis', 'Beaches'],
        bestTime: 'May-December',
        currency: 'MUR (₨)',
        flightTimeFromDelhi: '8-9 hours',
        visaRequired: false,
        avgCostPerDay: '$80-120'
    },
    {
        id: 20,
        name: 'Sri Lanka',
        country: 'Sri Lanka',
        region: 'Asia',
        airports: ['Bandaranaike International (CMB)', 'Mattala Rajapaksa (HRI)'],
        attractions: ['Sigiriya Rock', 'Temple of the Tooth', 'Ella Tea Plantations', 'Galle Fort', 'Beaches'],
        bestTime: 'December-March',
        currency: 'LKR (Rs)',
        flightTimeFromDelhi: '3-4 hours',
        visaRequired: false,
        avgCostPerDay: '$40-60'
    },
    {
        id: 21,
        name: 'Nepal',
        country: 'Nepal',
        region: 'Asia',
        airports: ['Tribhuvan International (KTM)'],
        attractions: ['Mount Everest', 'Kathmandu Durbar Square', 'Boudhanath Stupa', 'Pokhara', 'Annapurna Trekking'],
        bestTime: 'September-November, March-May',
        currency: 'NPR (₨)',
        flightTimeFromDelhi: '1-2 hours',
        visaRequired: false,
        avgCostPerDay: '$30-50'
    },
    {
        id: 22,
        name: 'Bhutan',
        country: 'Bhutan',
        region: 'Asia',
        airports: ['Paro International (PBH)'],
        attractions: ['Tiger\'s Nest Monastery', 'Punakha Dzong', 'Paro Taktsang', 'Thimphu', 'Trekking'],
        bestTime: 'March-May, September-November',
        currency: 'BTN (Nu.)',
        flightTimeFromDelhi: '2-3 hours',
        visaRequired: true,
        avgCostPerDay: '$250-300'
    },
    {
        id: 23,
        name: 'Indonesia',
        country: 'Indonesia',
        region: 'Asia',
        airports: ['Soekarno-Hatta International (CGK)'],
        attractions: ['Borobudur Temple', 'Prambanan Temple', 'Mount Bromo', 'Komodo National Park', 'Beaches'],
        bestTime: 'April-October',
        currency: 'IDR (Rp)',
        flightTimeFromDelhi: '5-6 hours',
        visaRequired: false,
        avgCostPerDay: '$40-60'
    },
    {
        id: 24,
        name: 'Malaysia',
        country: 'Malaysia',
        region: 'Asia',
        airports: ['Kuala Lumpur International (KUL)', 'Penang International (PEN)'],
        attractions: ['Petronas Twin Towers', 'Batu Caves', 'Cameron Highlands', 'Langkawi', 'Rainforests'],
        bestTime: 'May-September',
        currency: 'MYR (RM)',
        flightTimeFromDelhi: '4-5 hours',
        visaRequired: false,
        avgCostPerDay: '$50-80'
    },
    {
        id: 25,
        name: 'Vietnam',
        country: 'Vietnam',
        region: 'Asia',
        airports: ['Tan Son Nhat International (SGN)', 'Noi Bai International (HAN)'],
        attractions: ['Ha Long Bay', 'Mekong Delta', 'Ho Chi Minh City', 'Hanoi Old Quarter', 'Temples'],
        bestTime: 'October-April',
        currency: 'VND (₫)',
        flightTimeFromDelhi: '4-5 hours',
        visaRequired: true,
        avgCostPerDay: '$30-50'
    },
    {
        id: 26,
        name: 'Philippines',
        country: 'Philippines',
        region: 'Asia',
        airports: ['Ninoy Aquino International (MNL)', 'Mactan Cebu (CEB)'],
        attractions: ['Boracay', 'Palawan', 'Chocolate Hills', 'Intramuros', 'Island Hopping'],
        bestTime: 'November-May',
        currency: 'PHP (₱)',
        flightTimeFromDelhi: '5-6 hours',
        visaRequired: false,
        avgCostPerDay: '$40-70'
    },
    {
        id: 27,
        name: 'Swiss Alps',
        country: 'Switzerland',
        region: 'Europe',
        airports: ['Zurich (ZRH)', 'Geneva (GVA)', 'Basel (BSL)'],
        attractions: ['Matterhorn', 'Jungfrau', 'Interlaken', 'Zermatt', 'Alpine Hiking'],
        bestTime: 'June-September, December-March',
        currency: 'CHF (Fr)',
        flightTimeFromDelhi: '10-11 hours',
        visaRequired: true,
        avgCostPerDay: '$150-250'
    },
    {
        id: 28,
        name: 'Greece',
        country: 'Greece',
        region: 'Europe',
        airports: ['Athens International (ATH)', 'Crete (HER)', 'Rhodes (RHO)'],
        attractions: ['Acropolis', 'Santorini', 'Mykonos', 'Delphi', 'Greek Islands'],
        bestTime: 'April-May, September-October',
        currency: 'EUR (€)',
        flightTimeFromDelhi: '9-10 hours',
        visaRequired: true,
        avgCostPerDay: '$70-110'
    },
    {
        id: 29,
        name: 'Egypt',
        country: 'Egypt',
        region: 'Africa',
        airports: ['Cairo International (CAI)', 'Aswan (ASW)', 'Luxor (LXR)'],
        attractions: ['Pyramids of Giza', 'Sphinx', 'Nile River Cruise', 'Egyptian Museum', 'Karnak Temple'],
        bestTime: 'October-April',
        currency: 'EGP (£)',
        flightTimeFromDelhi: '6-7 hours',
        visaRequired: true,
        avgCostPerDay: '$60-100'
    },
    {
        id: 30,
        name: 'Kenya',
        country: 'Kenya',
        region: 'Africa',
        airports: ['Jomo Kenyatta International (NBO)'],
        attractions: ['Masai Mara', 'Mount Kenya', 'Nairobi', 'Safari', 'Wildlife'],
        bestTime: 'June-October, January-February',
        currency: 'KES (KSh)',
        flightTimeFromDelhi: '7-8 hours',
        visaRequired: true,
        avgCostPerDay: '$80-120'
    }
];

// Function to get destination by name
function getDestinationByName(destName) {
    return internationalDestinationsDB.find(dest => 
        dest.name.toLowerCase() === destName.toLowerCase()
    );
}

// Function to get all destinations
function getAllDestinations() {
    return internationalDestinationsDB;
}

// Function to get destinations by region
function getDestinationsByRegion(region) {
    return internationalDestinationsDB.filter(dest => 
        dest.region.toLowerCase() === region.toLowerCase()
    );
}

// Function to get destinations by country
function getDestinationsByCountry(country) {
    return internationalDestinationsDB.filter(dest => 
        dest.country.toLowerCase() === country.toLowerCase()
    );
}

// Get all unique regions
function getAllRegions() {
    const regions = new Set();
    internationalDestinationsDB.forEach(dest => regions.add(dest.region));
    return Array.from(regions).sort();
}

// Get all unique countries
function getAllCountries() {
    const countries = new Set();
    internationalDestinationsDB.forEach(dest => countries.add(dest.country));
    return Array.from(countries).sort();
}

// Filter by visa requirement
function getDestinationsByVisaRequirement(visaRequired) {
    return internationalDestinationsDB.filter(dest => dest.visaRequired === visaRequired);
}

// Export functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        internationalDestinationsDB,
        getDestinationByName,
        getAllDestinations,
        getDestinationsByRegion,
        getDestinationsByCountry,
        getAllRegions,
        getAllCountries,
        getDestinationsByVisaRequirement
    };
}
