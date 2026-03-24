(function () {
  const defaultBaseUrl = window.location.port === "3000" ? "" : "http://localhost:3000";
  const apiBaseUrl = window.TRANSLATOR_API_BASE_URL || defaultBaseUrl;

  const phraseDictionary = {
    en: {
      hi: {
        "hello": "नमस्ते",
        "thank you": "धन्यवाद",
        "where is the airport": "हवाई अड्डा कहाँ है",
        "how much": "कितना",
        "i need help": "मुझे मदद चाहिए",
        "good morning": "शुभ प्रभात",
        "good night": "शुभ रात्रि"
      },
      es: {
        "hello": "hola",
        "thank you": "gracias",
        "where is the airport": "dónde está el aeropuerto",
        "how much": "cuánto cuesta",
        "i need help": "necesito ayuda",
        "good morning": "buenos días",
        "good night": "buenas noches"
      },
      fr: {
        "hello": "bonjour",
        "thank you": "merci",
        "where is the airport": "où est l'aéroport",
        "how much": "combien",
        "i need help": "j'ai besoin d'aide",
        "good morning": "bonjour",
        "good night": "bonne nuit"
      },
      de: {
        "hello": "hallo",
        "thank you": "danke",
        "where is the airport": "wo ist der flughafen",
        "how much": "wie viel",
        "i need help": "ich brauche hilfe",
        "good morning": "guten morgen",
        "good night": "gute nacht"
      },
      it: {
        "hello": "ciao",
        "thank you": "grazie",
        "where is the airport": "dov'è l'aeroporto",
        "how much": "quanto costa",
        "i need help": "ho bisogno di aiuto",
        "good morning": "buongiorno",
        "good night": "buona notte"
      },
      ru: {
        "hello": "привет",
        "thank you": "спасибо",
        "where is the airport": "где аэропорт",
        "how much": "сколько стоит",
        "i need help": "мне нужна помощь",
        "good morning": "доброе утро",
        "good night": "спокойной ночи"
      }
    },
    hi: {
      en: {
        "नमस्ते": "hello",
        "धन्यवाद": "thank you",
        "हवाई अड्डा कहाँ है": "where is the airport",
        "कितना": "how much",
        "मुझे मदद चाहिए": "i need help"
      }
    }
  };

  function fallbackTranslate(text, from, to) {
    if (!text || !text.trim()) return "";
    if (from === to) return text;

    const normalized = text.trim().toLowerCase();
    const directMap = phraseDictionary?.[from]?.[to] || null;

    if (directMap && directMap[normalized]) {
      return directMap[normalized];
    }

    const reverseFromEnglish = phraseDictionary?.en?.[to] || null;
    if (from === "en" && reverseFromEnglish && reverseFromEnglish[normalized]) {
      return reverseFromEnglish[normalized];
    }

    return `[${to.toUpperCase()}] ${text}`;
  }

  async function tryApiTranslation(text, from, to) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    try {
      const response = await fetch(`${apiBaseUrl}/api/translate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text, from, to }),
        signal: controller.signal
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || `Translation failed with status ${response.status}`);
      }

      return data?.translatedText || "";
    } finally {
      clearTimeout(timeoutId);
    }
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
        // Fall back to local translation when API is down/not configured/network blocked.
      }

      return fallbackTranslate(text, from, to);
    }
  };
})();