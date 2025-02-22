class Router {
    constructor() {
        this.routes = {};
        this.init();
    }

    init() {
        // Handle initial page load
        this.handleRoute(window.location.pathname);

        // Handle browser navigation
        window.addEventListener('popstate', () => {
            this.handleRoute(window.location.pathname);
        });

        // Handle navigation links
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link && link.href.startsWith(window.location.origin)) {
                e.preventDefault();
                const path = link.pathname;
                this.navigateTo(path);
            }
        });
    }

    addRoute(path, callback) {
        this.routes[path] = callback;
    }

    async handleRoute(path) {
        // Default to home page if path is just '/'
        if (path === '/') {
            // Show main content
            document.querySelector('.main-content').style.display = 'block';
            return;
        }

        // Hide main content for other routes
        document.querySelector('.main-content').style.display = 'none';

        const route = this.routes[path];
        if (route) {
            try {
                await route();
            } catch (error) {
                console.error('Error handling route:', error);
                this.showError();
            }
        } else {
            this.show404();
        }
    }

    navigateTo(path) {
        window.history.pushState({}, '', path);
        this.handleRoute(path);
    }

    showError() {
        const mainContent = document.querySelector('.main-content');
        mainContent.style.display = 'block';
        mainContent.innerHTML = `
            <div class="error-container">
                <h2>Oops! Something went wrong</h2>
                <p>Please try again later or return to the <a href="/">home page</a>.</p>
            </div>
        `;
    }

    show404() {
        const mainContent = document.querySelector('.main-content');
        mainContent.style.display = 'block';
        mainContent.innerHTML = `
            <div class="error-container">
                <h2>404 - Page Not Found</h2>
                <p>The page you're looking for doesn't exist. Return to the <a href="/">home page</a>.</p>
            </div>
        `;
    }
}

// Initialize router
const router = new Router();

// Add routes
router.addRoute('/articles', async () => {
    const mainContent = document.querySelector('.main-content');
    mainContent.innerHTML = '<h2>Articles</h2><div id="articles-list"></div>';
    // Load articles content
});

router.addRoute('/tips', async () => {
    const mainContent = document.querySelector('.main-content');
    mainContent.innerHTML = '<h2>Tips</h2><div id="tips-list"></div>';
    // Load tips content
});

router.addRoute('/tools', async () => {
    const mainContent = document.querySelector('.main-content');
    mainContent.innerHTML = '<h2>Tools</h2><div id="tools-list"></div>';
    // Load tools content
});

router.addRoute('/terms', async () => {
    const mainContent = document.querySelector('.main-content');
    mainContent.innerHTML = '<h2>Terms</h2><div id="terms-list"></div>';
    // Load terms content
});