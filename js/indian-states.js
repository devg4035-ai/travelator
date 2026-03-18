// Indian States Database with Major Cities and Airports
const indianStatesDB = [
    {
        id: 1,
        name: 'Andhra Pradesh',
        capital: 'Amaravati',
        majorCities: ['Hyderabad', 'Visakhapatnam', 'Vijayawada'],
        airports: ['Hyderabad International Airport (HYD)', 'Visakhapatnam Airport (VTZ)'],
        flightTime: '2-3 hours from Delhi'
    },
    {
        id: 2,
        name: 'Arunachal Pradesh',
        capital: 'Itanagar',
        majorCities: ['Pasighat', 'Tezu', 'Changlang'],
        airports: ['Lilabari Airport (IXI)'],
        flightTime: '4-5 hours from Delhi'
    },
    {
        id: 3,
        name: 'Assam',
        capital: 'Dispur',
        majorCities: ['Guwahati', 'Silchar', 'Dibrugarh'],
        airports: ['Indira Gandhi International Airport, Guwahati (GAU)'],
        flightTime: '3-4 hours from Delhi'
    },
    {
        id: 4,
        name: 'Bihar',
        capital: 'Patna',
        majorCities: ['Patna', 'Gaya', 'Muzaffarpur'],
        airports: ['Patna International Airport (PAT)', 'Gaya Airport (GAY)'],
        flightTime: '2.5 hours from Delhi'
    },
    {
        id: 5,
        name: 'Chhattisgarh',
        capital: 'Raipur',
        majorCities: ['Raipur', 'Bilaspur', 'Durg'],
        airports: ['Raipur Airport (RAP)', 'Bilaspur Airport (BPS)'],
        flightTime: '2 hours from Delhi'
    },
    {
        id: 6,
        name: 'Goa',
        capital: 'Panaji',
        majorCities: ['Panaji', 'Margao', 'Vasco da Gama'],
        airports: ['Dabolim Airport (GOI)'],
        flightTime: '2.5 hours from Delhi'
    },
    {
        id: 7,
        name: 'Gujarat',
        capital: 'Gandhinagar',
        majorCities: ['Ahmedabad', 'Surat', 'Vadodara'],
        airports: ['Sardar Vallabhbhai Patel International Airport (AMD)', 'Surat Airport (STV)'],
        flightTime: '1.5-2 hours from Delhi'
    },
    {
        id: 8,
        name: 'Haryana',
        capital: 'Chandigarh',
        majorCities: ['Gurgaon', 'Faridabad', 'Hisar'],
        airports: ['Indira Gandhi International Airport (DEL) - Serves Haryana'],
        flightTime: '0.5 hours from Delhi'
    },
    {
        id: 9,
        name: 'Himachal Pradesh',
        capital: 'Shimla',
        majorCities: ['Shimla', 'Manali', 'Dharamshala'],
        airports: ['Kangra Airport (DHM)', 'Bhuntar Airport (BHP)'],
        flightTime: '2.5 hours from Delhi'
    },
    {
        id: 10,
        name: 'Jharkhand',
        capital: 'Ranchi',
        majorCities: ['Ranchi', 'Jamshedpur', 'Dhanbad'],
        airports: ['Ranchi Airport (RNC)', 'Tatanagar Airport (CCU)'],
        flightTime: '2 hours from Delhi'
    },
    {
        id: 11,
        name: 'Karnataka',
        capital: 'Bengaluru',
        majorCities: ['Bengaluru', 'Mysore', 'Mangalore'],
        airports: ['Kempegowda International Airport (BLR)', 'Mangalore International Airport (IXE)'],
        flightTime: '2.5-3 hours from Delhi'
    },
    {
        id: 12,
        name: 'Kerala',
        capital: 'Thiruvananthapuram',
        majorCities: ['Kochi', 'Thiruvananthapuram', 'Kozhikode'],
        airports: ['Cochin International Airport (COK)', 'Thiruvananthapuram International Airport (TRV)'],
        flightTime: '3-3.5 hours from Delhi'
    },
    {
        id: 13,
        name: 'Madhya Pradesh',
        capital: 'Bhopal',
        majorCities: ['Indore', 'Bhopal', 'Jabalpur'],
        airports: ['Indira Gandhi International Airport (IDR)', 'Bhopal Airport (BHO)'],
        flightTime: '1.5-2 hours from Delhi'
    },
    {
        id: 14,
        name: 'Maharashtra',
        capital: 'Mumbai',
        majorCities: ['Mumbai', 'Pune', 'Nagpur'],
        airports: ['Bombay International Airport (BOM)', 'Pune Airport (PNQ)', 'Nagpur Airport (NAG)'],
        flightTime: '2-2.5 hours from Delhi'
    },
    {
        id: 15,
        name: 'Manipur',
        capital: 'Imphal',
        majorCities: ['Imphal', 'Senapati', 'Ukhrul'],
        airports: ['Imphal International Airport (IMF)'],
        flightTime: '4 hours from Delhi'
    },
    {
        id: 16,
        name: 'Meghalaya',
        capital: 'Shillong',
        majorCities: ['Shillong', 'Tura', 'Cherrapunji'],
        airports: ['Shillong Airport (SHL)'],
        flightTime: '3.5 hours from Delhi'
    },
    {
        id: 17,
        name: 'Mizoram',
        capital: 'Aizawl',
        majorCities: ['Aizawl', 'Lunglei', 'Saiha'],
        airports: ['Aizawl Airport (AIZ)'],
        flightTime: '4-5 hours from Delhi'
    },
    {
        id: 18,
        name: 'Nagaland',
        capital: 'Kohima',
        majorCities: ['Kohima', 'Dimapur', 'Wokha'],
        airports: ['Dimapur Airport (DMU)'],
        flightTime: '3.5-4 hours from Delhi'
    },
    {
        id: 19,
        name: 'Odisha',
        capital: 'Bhubaneswar',
        majorCities: ['Bhubaneswar', 'Cuttack', 'Rourkela'],
        airports: ['Bhubaneswar Airport (BBI)', 'Rourkela Airport (RRK)'],
        flightTime: '2.5 hours from Delhi'
    },
    {
        id: 20,
        name: 'Punjab',
        capital: 'Chandigarh',
        majorCities: ['Amritsar', 'Chandigarh', 'Ludhiana'],
        airports: ['Sri Guru Ram Dass Jee International Airport (ATQ)', 'Chandigarh International Airport (IXC)'],
        flightTime: '1.5 hours from Delhi'
    },
    {
        id: 21,
        name: 'Rajasthan',
        capital: 'Jaipur',
        majorCities: ['Jaipur', 'Jodhpur', 'Udaipur'],
        airports: ['Jaipur International Airport (JAI)', 'Jodhpur Airport (JDH)', 'Udaipur Airport (UDR)'],
        flightTime: '1.5-2 hours from Delhi'
    },
    {
        id: 22,
        name: 'Sikkim',
        capital: 'Gangtok',
        majorCities: ['Gangtok', 'Pelling', 'Lachung'],
        airports: ['Pakyong Airport (PYG)'],
        flightTime: '3 hours from Delhi'
    },
    {
        id: 23,
        name: 'Tamil Nadu',
        capital: 'Chennai',
        majorCities: ['Chennai', 'Madurai', 'Coimbatore'],
        airports: ['Chennai International Airport (MAA)', 'Coimbatore International Airport (CJB)'],
        flightTime: '3 hours from Delhi'
    },
    {
        id: 24,
        name: 'Telangana',
        capital: 'Hyderabad',
        majorCities: ['Hyderabad', 'Secunderabad', 'Warangal'],
        airports: ['Hyderabad International Airport (HYD)'],
        flightTime: '2.5-3 hours from Delhi'
    },
    {
        id: 25,
        name: 'Tripura',
        capital: 'Agartala',
        majorCities: ['Agartala', 'Udaipur', 'Komilla'],
        airports: ['Agartala Airport (IXA)'],
        flightTime: '4 hours from Delhi'
    },
    {
        id: 26,
        name: 'Uttar Pradesh',
        capital: 'Lucknow',
        majorCities: ['Lucknow', 'Agra', 'Varanasi'],
        airports: ['Indira Gandhi International Airport (DEL)', 'Lucknow Airport (LKO)', 'Varanasi Airport (VNS)'],
        flightTime: '1-2 hours from Delhi'
    },
    {
        id: 27,
        name: 'Uttarakhand',
        capital: 'Dehradun',
        majorCities: ['Dehradun', 'Nainital', 'Rishikesh'],
        airports: ['Jolly Grant Airport (DEE)'],
        flightTime: '1 hour from Delhi'
    },
    {
        id: 28,
        name: 'West Bengal',
        capital: 'Kolkata',
        majorCities: ['Kolkata', 'Darjeeling', 'Siliguri'],
        airports: ['Netaji Subhas Chandra Bose International Airport (CCU)', 'Bagdogra Airport (BRR)'],
        flightTime: '2-2.5 hours from Delhi'
    },
    {
        id: 29,
        name: 'Delhi',
        capital: 'New Delhi',
        majorCities: ['New Delhi', 'Old Delhi', 'South Delhi'],
        airports: ['Indira Gandhi International Airport (DEL)'],
        flightTime: '0 hours - Hub'
    },
    {
        id: 30,
        name: 'Puducherry',
        capital: 'Pondicherry',
        majorCities: ['Pondicherry', 'Yanam', 'Mahe'],
        airports: ['Puducherry Airport (PNY)'],
        flightTime: '2.5-3 hours from Delhi'
    }
];

// Function to get state by name
function getStateByName(stateName) {
    return indianStatesDB.find(state => 
        state.name.toLowerCase() === stateName.toLowerCase()
    );
}

// Function to get all states
function getAllStates() {
    return indianStatesDB;
}

// Function to get major cities in a state
function getCitiesByState(stateName) {
    const state = getStateByName(stateName);
    return state ? state.majorCities : [];
}

// Function to get airports in a state
function getAirportsByState(stateName) {
    const state = getStateByName(stateName);
    return state ? state.airports : [];
}

// Export functions (for use in other files)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        indianStatesDB,
        getStateByName,
        getAllStates,
        getCitiesByState,
        getAirportsByState
    };
}
