// Language translations
const translations = {
    en: {
        welcome: "Welcome Back!",
        subtitle: "Explore amazing travel experiences",
        hotelBooking: "Hotel Booking",
        flightBooking: "Flight Booking",
        zoneAlerts: "Zone Alerts",
        translator: "Language Translator",
        searchHotels: "Search Hotels",
        searchFlights: "Search Flights"
    },
    es: {
        welcome: "¡Bienvenido de nuevo!",
        subtitle: "Explora experiencias de viaje increíbles",
        hotelBooking: "Reserva de Hotel",
        flightBooking: "Reserva de Vuelo",
        zoneAlerts: "Alertas de Zona",
        translator: "Traductor de Idiomas",
        searchHotels: "Buscar Hoteles",
        searchFlights: "Buscar Vuelos"
    },
    fr: {
        welcome: "Bienvenue!",
        subtitle: "Explorez des expériences de voyage incroyables",
        hotelBooking: "Réservation d'Hôtel",
        flightBooking: "Réservation de Vol",
        zoneAlerts: "Alertes de Zone",
        translator: "Traducteur de Langue",
        searchHotels: "Rechercher des Hôtels",
        searchFlights: "Rechercher des Vols"
    },
    de: {
        welcome: "Willkommen zurück!",
        subtitle: "Erkunden Sie erstaunliche Reiseerlebnisse",
        hotelBooking: "Hotelbuchung",
        flightBooking: "Flugbuchung",
        zoneAlerts: "Zonenalarme",
        translator: "Sprachübersetzer",
        searchHotels: "Hotels suchen",
        searchFlights: "Flüge suchen"
    },
    hi: {
        welcome: "वापस स्वागत है!",
        subtitle: "अद्भुत यात्रा अनुभव का पता लगाएं",
        hotelBooking: "होटल बुकिंग",
        flightBooking: "फ्लाइट बुकिंग",
        zoneAlerts: "क्षेत्र सतर्क",
        translator: "भाषा अनुवादक",
        searchHotels: "होटल खोजें",
        searchFlights: "उड़ानें खोजें"
    },
    zh: {
        welcome: "欢迎回来!",
        subtitle: "探索神奇的旅行体验",
        hotelBooking: "酒店预订",
        flightBooking: "航班预订",
        zoneAlerts: "地区警报",
        translator: "语言翻译器",
        searchHotels: "搜索酒店",
        searchFlights: "搜索航班"
    }
};

// Simple translation function
function translatePage(language) {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[language] && translations[language][key]) {
            element.textContent = translations[language][key];
        }
    });
}

// Mock translation API for translator
const translatorAPI = {
    translate: function(text, from, to) {
        // Mock translation - in production, you'd use Google Translate API or similar
        const mockTranslations = {
            'en-es': {
                'Where is the airport?': '¿Dónde está el aeropuerto?',
                'How much does it cost?': '¿Cuánto cuesta?',
                'Where is the hotel?': '¿Dónde está el hotel?',
                'Do you speak English?': '¿Hablas inglés?',
                'Help, I need assistance!': '¡Ayuda, necesito ayuda!',
                'Thank you very much': 'Muchas gracias'
            },
            'en-fr': {
                'Where is the airport?': 'Où est l\'aéroport?',
                'How much does it cost?': 'Combien ça coûte?',
                'Where is the hotel?': 'Où est l\'hôtel?',
                'Do you speak English?': 'Parlez-vous anglais?',
                'Help, I need assistance!': 'Aide, j\'ai besoin d\'aide!',
                'Thank you very much': 'Merci beaucoup'
            },
            'en-de': {
                'Where is the airport?': 'Wo ist der Flughafen?',
                'How much does it cost?': 'Wie viel kostet das?',
                'Where is the hotel?': 'Wo ist das Hotel?',
                'Do you speak English?': 'Sprichst du Englisch?',
                'Help, I need assistance!': 'Hilfe, ich brauche Hilfe!',
                'Thank you very much': 'Vielen Dank'
            },
            'hi-en': {
                'हवाई अड्डा कहाँ है?': 'Where is the airport?',
                'यह कितने का है?': 'How much does it cost?',
                'होटल कहाँ है?': 'Where is the hotel?',
                'क्या आप अंग्रेजी बोलते हैं?': 'Do you speak English?',
                'मदद कीजिए, मुझे सहायता चाहिए!': 'Help, I need assistance!',
                'बहुत बहुत धन्यवाद': 'Thank you very much'
            },
            'hi-es': {
                'हवाई अड्डा कहाँ है?': '¿Dónde está el aeropuerto?',
                'यह कितने का है?': '¿Cuánto cuesta?',
                'होटल कहाँ है?': '¿Dónde está el hotel?',
                'क्या आप अंग्रेजी बोलते हैं?': '¿Hablas inglés?',
                'मदद कीजिए, मुझे सहायता चाहिए!': '¡Ayuda, necesito ayuda!',
                'बहुत बहुत धन्यवाद': 'Muchas gracias'
            },
            'hi-fr': {
                'हवाई अड्डा कहाँ है?': 'Où est l\'aéroport?',
                'यह कितने का है?': 'Combien ça coûte?',
                'होटल कहाँ है?': 'Où est l\'hôtel?',
                'क्या आप अंग्रेजी बोलते हैं?': 'Parlez-vous anglais?',
                'मदद कीजिए, मुझे सहायता चाहिए!': 'Aide, j\'ai besoin d\'aide!',
                'बहुत बहुत धन्यवाद': 'Merci beaucoup'
            }
        };

        const key = `${from}-${to}`;
        
        if (key in mockTranslations && text in mockTranslations[key]) {
            return mockTranslations[key][text];
        }
        
        // Fallback for unmapped translations
        return `[Translation from ${from} to ${to}: ${text}]`;
    }
};
