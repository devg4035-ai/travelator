/**
 * Network-Aware API Configuration
 * Automatically detects and adapts to network changes
 */

class APIConfigManager {
    constructor() {
        this.apiBase = null;
        this.defaultPort = '5000';
        this.isOnline = navigator.onLine;
        this.connectionAttempts = 0;
        this.maxRetries = 3;
        this.retryDelay = 1000; // ms
        this.lastKnownGoodUrl = this.getStoredAPIUrl();
        this.listeners = [];
        this.healthCheckInterval = null;

        this.init();
    }

    /**
     * Initialize the API configuration manager
     */
    init() {
        // Detect API base URL based on access context
        this.detectAPIBase();

        // Listen for online/offline events
        window.addEventListener('online', () => this.handleOnline());
        window.addEventListener('offline', () => this.handleOffline());

        // Detect network changes by checking API health periodically
        this.startHealthCheck();

        // Listen for hash/URL changes (in case user navigates between pages)
        window.addEventListener('hashchange', () => this.redetectIfNeeded());
    }

    /**
     * Detect the correct API base URL based on how the page was accessed
     */
    detectAPIBase() {
        this.apiBase = this.getNewAPIBase();
        console.log(`[API Config] API base resolved to: ${this.apiBase || '(same-origin)'}`);
    }

    getConfiguredProdApi() {
        const queryApi = new URLSearchParams(window.location.search).get('apiBase');
        if (queryApi && String(queryApi).trim()) {
            const normalizedQueryApi = String(queryApi).trim().replace(/\/$/, '');
            localStorage.setItem('travelator_api_base', normalizedQueryApi);
            return normalizedQueryApi;
        }

        const fromWindow =
            (typeof window !== 'undefined' && window.TRAVELATOR_API_BASE_URL)
                ? String(window.TRAVELATOR_API_BASE_URL).trim()
                : '';
        const fromStorage = String(localStorage.getItem('travelator_api_base') || '').trim();

        return fromWindow || fromStorage || '';
    }

    /**
     * Get the current API base URL
     */
    getAPIBase() {
        return this.apiBase;
    }

    /**
     * Store the last known good API URL in localStorage
     */
    storeAPIUrl() {
        if (this.apiBase) {
            localStorage.setItem('travelator_api_base', this.apiBase);
        }
    }

    /**
     * Get the last known good API URL from localStorage
     */
    getStoredAPIUrl() {
        return localStorage.getItem('travelator_api_base') || null;
    }

    /**
     * Test if the API is reachable (health check)
     */
    async testAPIHealth() {
        try {
            const testUrl = `${this.apiBase || ''}/`;
            const response = await fetch(testUrl, {
                method: 'GET',
                timeout: 2000,
                signal: AbortSignal.timeout(2000),
            });
            return response.ok;
        } catch (error) {
            return false;
        }
    }

    /**
     * Handle when device comes online
     */
    async handleOnline() {
        console.log('[API Config] Device is online');
        this.isOnline = true;

        // Re-detect API base in case network changed
        this.detectAPIBase();

        // Test if API is reachable
        const isHealthy = await this.testAPIHealth();
        if (isHealthy) {
            this.storeAPIUrl();
            this.notifyListeners('api-healthy');
        } else {
            console.warn('[API Config] API not reachable after coming online');
            this.notifyListeners('api-unhealthy');
        }
    }

    /**
     * Handle when device goes offline
     */
    handleOffline() {
        console.log('[API Config] Device is offline');
        this.isOnline = false;
        this.notifyListeners('offline');
    }

    /**
     * Start periodic health checks (every 30 seconds)
     */
    startHealthCheck() {
        if (this.healthCheckInterval) {
            clearInterval(this.healthCheckInterval);
        }

        this.healthCheckInterval = setInterval(async () => {
            if (!this.isOnline) return;

            const isHealthy = await this.testAPIHealth();
            if (!isHealthy) {
                console.warn('[API Config] API health check failed');
                // Try to re-detect in case network changed
                this.detectAPIBase();
            }
        }, 30000); // 30 second interval
    }

    /**
     * Re-detect API base if needed (called on hash changes)
     */
    redetectIfNeeded() {
        const newBase = this.getNewAPIBase();
        if (newBase !== this.apiBase) {
            console.log(`[API Config] Network/context changed, updating API base from ${this.apiBase} to ${newBase}`);
            this.apiBase = newBase;
            this.notifyListeners('network-changed');
        }
    }

    /**
     * Calculate what the new API base should be
     */
    getNewAPIBase() {
        const protocol = window.location.protocol;
        const hostname = window.location.hostname;
        const port = window.location.port;
        const configuredProdApi = this.getConfiguredProdApi();

        if (configuredProdApi) {
            return configuredProdApi.replace(/\/$/, '');
        }

        // GitHub Pages is static hosting. A Node API cannot run there.
        // In this case, caller should provide TRAVELATOR_API_BASE_URL.
        if (hostname.includes('github.io')) {
            console.warn('[API Config] GitHub Pages detected without TRAVELATOR_API_BASE_URL. Translation API will not be reachable.');
            return '';
        }

        if (protocol === 'file:') {
            return `http://localhost:${this.defaultPort}`;
        }
        if (port === this.defaultPort) {
            return '';
        }
        return `${protocol}//${hostname}:${this.defaultPort}`;
    }

    /**
     * Register a listener for API config changes
     */
    subscribe(callback) {
        this.listeners.push(callback);
        return () => {
            this.listeners = this.listeners.filter(listener => listener !== callback);
        };
    }

    /**
     * Notify all listeners of an event
     */
    notifyListeners(event) {
        this.listeners.forEach(callback => {
            try {
                callback(event);
            } catch (error) {
                console.error('[API Config] Listener error:', error);
            }
        });
    }

    /**
     * Perform a fetch with automatic retry on network changes
     */
    async fetchWithRetry(url, options = {}, retryCount = 0) {
        try {
            const base = this.apiBase || '';
            const fullUrl = url.startsWith('http') ? url : `${base}${url}`;
            const response = await fetch(fullUrl, {
                ...options,
                signal: AbortSignal.timeout(options.timeout || 8000),
            });
            return response;
        } catch (error) {
            // If network error and haven't exceeded retries
            if (retryCount < this.maxRetries && this.isNetworkError(error)) {
                console.warn(`[API Config] Network error, retrying... (attempt ${retryCount + 1})`);
                await this.delay(this.retryDelay * (retryCount + 1));

                // Re-detect API base in case network changed
                this.detectAPIBase();

                return this.fetchWithRetry(url, options, retryCount + 1);
            }

            throw error;
        }
    }

    /**
     * Check if error is a network error
     */
    isNetworkError(error) {
        return (
            error instanceof TypeError &&
            /failed to fetch|networkerror|load failed/i.test(error.message || '')
        );
    }

    /**
     * Delay helper
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Clean up
     */
    destroy() {
        if (this.healthCheckInterval) {
            clearInterval(this.healthCheckInterval);
        }
        window.removeEventListener('online', () => this.handleOnline());
        window.removeEventListener('offline', () => this.handleOffline());
        this.listeners = [];
    }
}

// Create global instance
const apiConfig = new APIConfigManager();
