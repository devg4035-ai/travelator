# Travelator App - Web Application

A modern, responsive travel booking web application featuring hotel bookings, flight searches, zone alerts, and a multi-language translator.

## Features

✈️ **Hotel Booking** - Search and book hotels with filters for dates, location, and number of rooms
✈️ **Flight Booking** - Find and book flights with options for round trip or one-way journeys
📍 **Zone Alerts** - Get real-time alerts for weather, price changes, and local events in travel destinations
🌐 **Language Translator** - Translate travel phrases between multiple languages with common travel phrases included
👤 **User Profile** - Manage account settings and travel preferences
💳 **Dashboard** - View booking history and travel statistics

## File Structure

```
travelator/
├── index.html           # Login page
├── dashboard.html       # Main application dashboard
├── css/
│   ├── style.css       # Main styles (login & common)
│   └── dashboard.css   # Dashboard specific styles
├── js/
│   ├── login.js        # Login functionality
│   ├── dashboard.js    # Dashboard and app functionality
│   └── translations.js # Language translations
└── README.md           # This file
```

## How to Use

1. **Extract/Download the project** to your desired location
2. **Open `index.html` in your web browser** to access the login page
3. **Enter any email and password** (demo accepts any input)
4. **Click Login** to access the main dashboard

## Login Credentials

For demo purposes, you can use any email and password:
- Email: `demo@example.com`
- Password: `password123`

Or any other valid email format and password combination.

## Features Overview

### Dashboard
- View your booking statistics
- See recent bookings and upcoming trips
- Quick access to all app features

### Hotel Booking
- Search hotels by destination, check-in/out dates
- Filter by number of rooms and guests
- Browse available hotels with ratings and prices
- Book your preferred hotel

### Flight Booking
- Choose between round-trip or one-way flights
- Search by departure/arrival cities and dates
- View available flights with times and prices
- Easy booking process

### Zone Alerts
- Add alerts for specific cities or zones
- Choose alert types: Price Changes, Weather, Security, Events
- Manage active alerts
- Get real-time updates for your travel destinations

### Language Translator
- Translate text between multiple languages
- Support for 10+ languages
- Common travel phrases for quick translation
- Copy translated text to clipboard

Supported Languages:
- English
- Spanish (Español)
- French (Français)
- German (Deutsch)
- Italian (Italiano)
- Portuguese (Português)
- Russian (Русский)
- Hindi (हिन्दी)
- Chinese (中文)
- Japanese (日本語)

### Profile
- Update account information
- Manage travel preferences
- View member status and rewards

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Responsive Design

The application is fully responsive and works on:
- Desktop (1920px and above)
- Tablet (768px - 1024px)
- Mobile (480px - 767px)

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Flexbox and CSS Grid
- **JavaScript (ES6+)** - Interactive functionality
- **LocalStorage** - Session persistence

## Data Storage

The app uses browser's LocalStorage to:
- Keep users logged in
- Remember language preferences
- Store user profile information

## Customization

### Adding More Languages
Edit `js/translations.js` and add new language codes to the `translations` object.

### Changing Colors
Modify the gradient colors in `css/style.css` and `css/dashboard.css`:
- Primary gradient: `#667eea` and `#764ba2`

### Adding More Hotels/Flights
Edit the HTML cards in `dashboard.html` and duplicate the card structures.

## API Integration Notes

The translator currently uses mock data. To integrate a real translation API:
1. Use Google Translate API, Microsoft Translator, or similar
2. Update the `translatorAPI.translate()` function in `js/translations.js`
3. Add proper error handling and loading states

## Development Server

To run a local development server:
```bash
# Using Python (Python 3)
python -m http.server 8000

# Using Python (Python 2)
python -m SimpleHTTPServer 8000

# Using Node.js (if http-server is installed)
http-server

# Using PHP
php -S localhost:8000
```

Then visit: `http://localhost:8000`

## Future Enhancements

- Payment gateway integration (Stripe, PayPal)
- Real hotel and flight database integration
- User reviews and ratings system
- Booking confirmation emails
- Mobile app version
- Real-time price comparison
- Weather API integration
- Map integration for locations

## License

This project is provided as-is for educational and commercial use.

## Support

For issues or questions, please refer to the code comments or contact the development team.

---

Enjoy your travel with **Travelator App**! ✈️🏖️🌍
