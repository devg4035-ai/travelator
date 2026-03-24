(function () {
  // Use current host for API calls so translation works from any device
  const defaultBaseUrl = `${window.location.protocol}//${window.location.hostname}:3000`;
  const apiBaseUrl = window.TRANSLATOR_API_BASE_URL || defaultBaseUrl;

  // Fallback translation dictionary (7 languages)
  const phrasesDictionary = {
    en: {
      hello: { hi: "नमस्कार", es: "hola", fr: "bonjour", de: "hallo", it: "ciao", ru: "привет" },
      goodbye: { hi: "अलविदा", es: "adiós", fr: "au revoir", de: "auf wiedersehen", it: "arrivederci", ru: "до свидания" },
      thank: { hi: "धन्यवाद", es: "gracias", fr: "merci", de: "danke", it: "grazie", ru: "спасибо" },
      yes: { hi: "हाँ", es: "sí", fr: "oui", de: "ja", it: "sì", ru: "да" },
      no: { hi: "नहीं", es: "no", fr: "non", de: "nein", it: "no", ru: "нет" },
      please: { hi: "कृपया", es: "por favor", fr: "s'il vous plaît", de: "bitte", it: "per favore", ru: "пожалуйста" },
      sorry: { hi: "क्षमा करें", es: "lo siento", fr: "excusez-moi", de: "entschuldigung", it: "mi scusi", ru: "извините" }
    }
  };

  // Try API translation with timeout
  async function tryApiTranslation(text, from, to) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000); // 8-second timeout

      const response = await fetch(`${apiBaseUrl}/api/translate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text, from, to }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      return data.success ? data.translatedText : null;
    } catch (error) {
      return null;
    }
  }

  // Fallback translation from dictionary
  function fallbackTranslate(text, from, to) {
    const cleanText = text.trim().toLowerCase();

    // If translating TO English from another language, reverse lookup
    if (to === 'en' && from !== 'en') {
      for (const [key, translations] of Object.entries(phrasesDictionary.en)) {
        if (translations[from] && translations[from].toLowerCase() === cleanText) {
          return key;
        }
      }
      return `[${to.toUpperCase()}] ${text}`;
    }

    // If translating FROM English
    if (from === 'en' && phrasesDictionary.en[cleanText]) {
      const translated = phrasesDictionary.en[cleanText][to];
      return translated || `[${to.toUpperCase()}] ${text}`;
    }

    // Fallback format
    return `[${to.toUpperCase()}] ${text}`;
  }

  window.translatorAPI = {
    async translate(text, from, to) {
      if (!text || !text.trim()) {
        return "";
      }

      try {
        const apiResult = await tryApiTranslation(text, from, to);
        if (apiResult && apiResult.trim()) {
          return apiResult;
        }
      } catch (error) {
        // Fall back to local translation when API is down
      }

      return fallbackTranslate(text, from, to);
    }
  };
})();