// Environment configuration
const config = {
    // Default to production API URL, can be overridden in development
    API_BASE_URL: 'https://sql-poco-dffpbpdncbdmd0f3.centralus-01.azurewebsites.net/' // Replace with your production API URL
};

// For local development, override with localhost if needed
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    config.API_BASE_URL = 'http://localhost:5225';
}

export default config;