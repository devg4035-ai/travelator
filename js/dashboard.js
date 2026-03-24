// Dashboard functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    if (!authManager.isAuthenticated()) {
        window.location.href = 'index.html';
        return;
    }

    // Initialize user info
    initializeUser();
    
    // Initialize navigation
    initializeNavigation();
    
    // Initialize language selector
    initializeLanguage();
    
    // Initialize form handlers
    initializeHotelBooking();
    initializeFlightBooking();
    initializeZoneAlerts();
    initializeTranslator();
    initializeProfile();
    
    // Logout is handled directly in dashboard.html via handleLogout()
});

// Initialize user information
function initializeUser() {
    const user = authManager.getCurrentUser();
    
    if (user) {
        const userNameEl = document.getElementById('userName');
        const fullNameEl = document.getElementById('fullName');
        const profileEmailEl = document.getElementById('profileEmail');

        if (userNameEl) userNameEl.textContent = user.fullName || 'User';
        if (fullNameEl) fullNameEl.value = user.fullName || '';
        if (profileEmailEl) profileEmailEl.textContent = user.email || '';
        
        // Populate phone if exists
        const phoneInput = document.querySelector('input[type="tel"]');
        if (phoneInput && user.phone) {
            phoneInput.value = user.phone;
        }
    }
}

// Initialize navigation
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const sectionId = this.getAttribute('data-section');
            
            // Hide all sections
            sections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Show selected section
            const selectedSection = document.getElementById(sectionId);
            if (selectedSection) {
                selectedSection.classList.add('active');
                this.classList.add('active');
                
                // Update page title
                const titleMap = {
                    'dashboard': 'Welcome to Travelator',
                    'hotels': 'Hotel Booking',
                    'flights': 'Flight Booking',
                    'zones': 'Zone Alerts',
                    'translator': 'Language Translator',
                    'profile': 'My Profile'
                };
                
                document.getElementById('pageTitle').textContent = titleMap[sectionId] || 'Travelator';
            }
        });
    });
}

// Initialize language selector
function initializeLanguage() {
    const languageSelect = document.getElementById('languageSelect');
    
    if (languageSelect) {
        // Load saved language or default to English
        const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
        languageSelect.value = savedLanguage;
        translatePage(savedLanguage);
        
        languageSelect.addEventListener('change', function() {
            const selectedLanguage = this.value;
            localStorage.setItem('selectedLanguage', selectedLanguage);
            translatePage(selectedLanguage);
        });
    }
}

// Initialize hotel booking
function initializeHotelBooking() {
    const hotelSearchBtn = document.querySelector('#hotels .btn-search');
    
    if (hotelSearchBtn) {
        hotelSearchBtn.addEventListener('click', function() {
            const destination = document.getElementById('hotelDestination').value;
            const checkIn = document.getElementById('checkIn').value;
            const checkOut = document.getElementById('checkOut').value;
            
            if (destination && checkIn && checkOut) {
                alert(`Searching for hotels in ${destination} from ${checkIn} to ${checkOut}`);
            } else {
                alert('Please fill in all fields');
            }
        });
    }

    // Book hotel buttons
    const bookHotelBtns = document.querySelectorAll('#hotels .btn-book');
    bookHotelBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const hotelName = this.parentElement.querySelector('h4').textContent;
            alert(`You selected: ${hotelName}. Proceeding to booking...`);
        });
    });
}

// Initialize flight booking
function initializeFlightBooking() {
    const flightSearchBtn = document.querySelector('#flights .btn-search');
    
    if (flightSearchBtn) {
        flightSearchBtn.addEventListener('click', function() {
            const departure = document.getElementById('departure').value;
            const arrival = document.getElementById('arrival').value;
            const departDate = document.getElementById('departDate').value;
            
            if (departure && arrival && departDate) {
                alert(`Searching for flights from ${departure} to ${arrival} on ${departDate}`);
            } else {
                alert('Please fill in all fields');
            }
        });
    }

    // Book flight buttons
    const bookFlightBtns = document.querySelectorAll('#flights .btn-book');
    bookFlightBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const airline = this.parentElement.parentElement.querySelector('.airline').textContent;
            const price = this.parentElement.parentElement.querySelector('.price').textContent;
            alert(`You selected ${airline} flight (${price}). Proceeding to booking...`);
        });
    });
}

// Initialize zone alerts
function initializeZoneAlerts() {
    const addAlertBtn = document.querySelector('#zones .btn-add');
    
    if (addAlertBtn) {
        addAlertBtn.addEventListener('click', function() {
            const zone = document.getElementById('alertZone').value;
            const alertType = document.getElementById('alertType').value;
            
            if (zone) {
                alert(`Alert added for ${zone} - ${alertType} updates`);
                document.getElementById('alertZone').value = '';
            } else {
                alert('Please enter a city or zone');
            }
        });
    }

    // Remove alert buttons
    const removeAlertBtns = document.querySelectorAll('#zones .btn-remove');
    removeAlertBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const alertTitle = this.parentElement.querySelector('h4').textContent;
            this.parentElement.remove();
            alert(`${alertTitle} alert removed`);
        });
    });
}

// Initialize translator
function initializeTranslator() {
    const translateBtn = document.querySelector('#translator .btn-translate');
    const copyBtn = document.querySelector('#translator .btn-copy');
    const phraseBtns = document.querySelectorAll('#translator .phrase-btn');
    
    if (translateBtn) {
        translateBtn.addEventListener('click', function() {
            const sourceText = document.getElementById('sourceText').value;
            const sourceLang = document.getElementById('sourceLang').value;
            const targetLang = document.getElementById('targetLang').value;
            
            if (sourceText) {
                const translated = translatorAPI.translate(sourceText, sourceLang, targetLang);
                document.getElementById('targetText').value = translated;
            } else {
                alert('Please enter text to translate');
            }
        });
    }

    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            const targetText = document.getElementById('targetText');
            if (targetText.value) {
                targetText.select();
                document.execCommand('copy');
                alert('Translation copied to clipboard');
            } else {
                alert('No translation to copy');
            }
        });
    }

    phraseBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const phrase = this.getAttribute('data-phrase');
            document.getElementById('sourceText').value = phrase;
            
            // Auto-translate
            const sourceLang = document.getElementById('sourceLang').value;
            const targetLang = document.getElementById('targetLang').value;
            const translated = translatorAPI.translate(phrase, sourceLang, targetLang);
            document.getElementById('targetText').value = translated;
        });
    });
}

// Initialize profile
function initializeProfile() {
    const profileForm = document.getElementById('profileForm');
    
    if (profileForm) {
        // Load current user data
        const user = authManager.getCurrentUser();
        if (user) {
            const fullNameInput = profileForm.querySelector('input[type="text"]');
            const emailInput = profileForm.querySelector('input[type="email"]');
            const phoneInput = profileForm.querySelector('input[type="tel"]');
            
            if (fullNameInput) fullNameInput.value = user.fullName || '';
            if (emailInput) emailInput.value = user.email || '';
            if (phoneInput) phoneInput.value = user.phone || '';
        }
        
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const fullName = profileForm.querySelector('input[type="text"]').value;
            const phone = profileForm.querySelector('input[type="tel"]').value;
            
            const result = authManager.updateProfile(authManager.currentUser.userId, {
                fullName: fullName,
                phone: phone
            });
            
            if (result.success) {
                alert(result.message);
            } else {
                alert(result.message);
            }
        });
    }
}

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
if (menuToggle) {
    menuToggle.addEventListener('click', function() {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            navMenu.classList.toggle('active');
        }
    });
}
