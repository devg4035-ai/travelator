# Travelator App - Getting Started Guide

## Quick Start

### Option 1: Open in Browser (Easiest)
1. Navigate to the project folder
2. Double-click on `index.html` file
3. The login page will open in your default browser
4. Enter any email and password to proceed
5. Start exploring the Travelator App!

### Option 2: Local Development Server

If you encounter issues with the direct browser method, use a local server:

#### Using Python (Recommended)
```bash
# Navigate to project folder
cd path/to/travelator

# For Python 3.x
python -m http.server 8000

# For Python 2.x
python -m SimpleHTTPServer 8000
```

Then visit: `http://localhost:8000`

#### Using Node.js
```bash
# Install http-server globally (one time only)
npm install -g http-server

# Navigate to project folder and run
cd path/to/travelator
http-server
```

Then visit: `http://localhost:8080`

#### Using PHP
```bash
cd path/to/travelator
php -S localhost:8000
```

Then visit: `http://localhost:8000`

## First Steps

### Login Page
- **Email**: Enter any email (e.g., user@example.com)
- **Password**: Enter any password
- **Remember Me**: Optional checkbox
- Click **Login** or use social login buttons

### Main Dashboard
After login, you'll see:
- Dashboard with booking statistics
- Sidebar navigation menu
- Language selector (top right)
- User profile section

## Navigation Guide

### 📊 Dashboard
- View booking summary
- See recent bookings
- Quick stats overview

### 🏨 Hotel Booking
1. Enter destination city
2. Select check-in and check-out dates
3. Choose number of rooms and guests
4. Click "Search Hotels"
5. Browse available options
6. Click "Book Now" to proceed

### ✈️ Flight Booking
1. Choose round-trip or one-way
2. Enter departure and arrival cities
3. Select departure date (and return if round-trip)
4. Enter number of passengers
5. Click "Search Flights"
6. Select a flight and click "Book"

### 📍 Zone Alerts
1. Enter a city or zone name
2. Select alert type (Price, Weather, Security, Events)
3. Click "Add Alert"
4. Manage active alerts
5. Remove alerts by clicking the X button

### 🌐 Language Translator
1. Select source language
2. Enter or select a common phrase
3. Select target language
4. Click "Translate"
5. Copy result with "Copy Translation" button

### 👤 Profile
- Update account information
- Manage travel preferences
- View membership status

## Features Explained

### Hotel Booking Features
- ⭐ Star ratings from customer reviews
- 💰 Price per night display
- 📷 Hotel images
- ✅ Easy booking process

### Flight Booking Features
- 🕐 Departure and arrival times
- 💰 Price per passenger
- 🛫 Direct/connection flight info
- ✈️ Duration and stops information

### Zone Alerts Features
- 🔔 Real-time notifications
- ⚠️ Multiple alert types
- 📍 Location-based alerts
- ❌ Easy alert management

### Translator Features
- 🌍 10+ language support
- 📝 Real-time translation
- 🎯 Common travel phrases
- 📋 Copy to clipboard

## Supported Languages

- 🇺🇸 English
- 🇪🇸 Spanish (Español)
- 🇫🇷 French (Français)
- 🇩🇪 German (Deutsch)
- 🇮🇹 Italian (Italiano)
- 🇵🇹 Portuguese (Português)
- 🇷🇺 Russian (Русский)
- 🇮🇳 Hindi (हिन्दी)
- 🇨🇳 Chinese (中文)
- 🇯🇵 Japanese (日本語)

## Customization

### Change App Colors
Edit `css/style.css` and `css/dashboard.css`:
```css
/* Change primary gradient */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Add Your Own Hotels/Flights
Edit `dashboard.html` in the hotels or flights section and duplicate/modify the cards.

### Modify Languages
Edit `js/translations.js` to add or modify language translations.

### Change App Name
Update the following files:
- `index.html` - Page title and logo
- `dashboard.html` - Logo and branding
- `js/config.js` - appName variable

## Troubleshooting

### Issue: Page shows blank or gives 404 error
**Solution**: Use a local development server (see Local Development Server section)

### Issue: Styles not loading
**Solution**: Check that CSS files are in the `css/` folder with correct names

### Issue: JavaScript not working
**Solution**: Ensure you're using a modern browser (Chrome, Firefox, Safari, Edge)

### Issue: Login not working
**Solution**: Make sure JavaScript is enabled in your browser

### Issue: Cross-origin errors
**Solution**: Use a local development server instead of opening files directly

## Data Persistence

The app uses browser **LocalStorage** to save:
- ✅ Login information
- ✅ Selected language
- ✅ User profile data
- ✅ Session data

**Note**: This data is local to your browser. Clearing browser cache will reset it.

## Browser Requirements

- **Minimum**: Modern browser (2019 or newer)
- **Recommended**: Latest versions of:
  - Chrome
  - Firefox
  - Safari
  - Edge

### Mobile Browsers
- iOS Safari 12+
- Android Chrome 80+

## File Organization

```
travelator/
├── index.html              # Login page
├── dashboard.html          # Main app
├── README.md              # Documentation
├── SETUP.md               # This file
├── css/
│   ├── style.css          # Common styles
│   └── dashboard.css      # Dashboard styles
└── js/
    ├── config.js          # Configuration
    ├── login.js           # Login logic
    ├── dashboard.js       # App logic
    └── translations.js    # Language support
```

## Tips & Tricks

💡 **Tip 1**: Use Tab key to navigate through form fields
💡 **Tip 2**: Click on sidebar menu items to navigate
💡 **Tip 3**: Use language selector to change app language
💡 **Tip 4**: Click user name to go to profile section
💡 **Tip 5**: Zoom browser (Ctrl/Cmd + Plus) for larger text

## Demo Accounts

You can use ANY email and password for testing:
- user@example.com / password
- demo@travel.com / 12345
- test@mail.com / test123

## Future Enhancements

The app is ready for these additions:
- ✨ Payment gateway integration
- ✨ Real hotel/flight database
- ✨ Email confirmations
- ✨ User reviews system
- ✨ Advanced search filters
- ✨ Mobile app version
- ✨ Real-time chat support
- ✨ Booking management system

## Support

For questions or issues:
1. Check the README.md file
2. Review the code comments in JavaScript files
3. Ensure all files are in correct folders
4. Clear browser cache and try again

## License

This application is provided as-is for personal and commercial use.

---

**Happy Travels with Travelator! 🌍✈️🏨**

Start booking your next adventure now!
