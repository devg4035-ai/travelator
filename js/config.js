// Travelator App Configuration
const config = {
    // App Information
    appName: "Travelator",
    appVersion: "1.0.0",
    
    // Color Scheme
    colors: {
        primary: "#667eea",
        secondary: "#764ba2",
        success: "#28a745",
        warning: "#ffc107",
        danger: "#dc3545",
        info: "#17a2b8",
        light: "#f8f9fa",
        dark: "#2c3e50"
    },
    
    // Hotel Categories
    hotels: [
        {
            name: "Luxury Grand Hotel",
            rating: 4.8,
            reviews: 250,
            price: 150,
            image: "https://via.placeholder.com/300x200?text=Luxury+Hotel"
        },
        {
            name: "Comfort Inn Downtown",
            rating: 4.5,
            reviews: 180,
            price: 85,
            image: "https://via.placeholder.com/300x200?text=Comfort+Inn"
        },
        {
            name: "Budget Traveler Inn",
            rating: 4.2,
            reviews: 95,
            price: 45,
            image: "https://via.placeholder.com/300x200?text=Budget+Inn"
        }
    ],
    
    // Airlines
    airlines: [
        {
            name: "American Airlines",
            departure: "08:00",
            arrival: "14:30",
            duration: "5h 30m",
            stops: "Direct",
            price: 280,
            from: "NYC (JFK)",
            to: "LAX"
        },
        {
            name: "Delta Airlines",
            departure: "10:15",
            arrival: "16:45",
            duration: "5h 30m",
            stops: "Direct",
            price: 320,
            from: "NYC (LGA)",
            to: "LAX"
        },
        {
            name: "Southwest Airlines",
            departure: "06:00",
            arrival: "13:20",
            duration: "5h 20m",
            stops: "1 Stop",
            price: 195,
            from: "NYC (EWR)",
            to: "LAX"
        }
    ],
    
    // Supported Languages
    languages: [
        { code: "en", name: "English" },
        { code: "es", name: "Español" },
        { code: "fr", name: "Français" },
        { code: "de", name: "Deutsch" },
        { code: "it", name: "Italiano" },
        { code: "pt", name: "Português" },
        { code: "ru", name: "Русский" },
        { code: "hi", name: "हिन्दी" },
        { code: "zh", name: "中文" },
        { code: "ja", name: "日本語" }
    ],
    
    // Alert Types
    alertTypes: [
        { value: "price", label: "Price Changes" },
        { value: "weather", label: "Weather Updates" },
        { value: "security", label: "Security Alerts" },
        { value: "event", label: "Events & Activities" }
    ],
    
    // Common Travel Phrases
    travelPhrases: [
        "Where is the airport?",
        "How much does it cost?",
        "Where is the hotel?",
        "Do you speak English?",
        "Help, I need assistance!",
        "Thank you very much"
    ],
    
    // API Endpoints (for future integration)
    api: {
        hotelSearch: "/api/hotels/search",
        flightSearch: "/api/flights/search",
        translate: "/api/translate",
        zones: "/api/zones",
        user: "/api/user"
    },
    
    // App Settings
    settings: {
        sessionTimeout: 3600000, // 1 hour in milliseconds
        maxBookings: 10,
        currency: "USD",
        timeFormat: "12h" // or "24h"
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = config;
}
