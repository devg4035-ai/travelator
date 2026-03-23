(function () {
  const defaultBaseUrl = window.location.port === "3000" ? "" : "http://localhost:3000";
  const apiBaseUrl = window.TRANSLATOR_API_BASE_URL || defaultBaseUrl;

  window.translatorAPI = {
    async translate(text, from, to) {
      if (!text || !text.trim()) {
        return "";
      }

      const response = await fetch(`${apiBaseUrl}/api/translate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text, from, to })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || `Translation failed with status ${response.status}`);
      }

      return data?.translatedText || "";
    }
  };
})();