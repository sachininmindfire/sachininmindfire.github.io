document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    loadLatestContent();
    setupThemeToggle();
});

// Theme Management
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function setupThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('.theme-toggle i');
    icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// Content Loading
function loadLatestContent() {
    loadArticles();
    loadTips();
    loadTools();
    loadTerms();
}

function loadArticles() {
    const articlesContainer = document.getElementById('latest-articles');
    if (!articlesContainer) return;

    const articles = contentManager.getLatestArticles(3);
    articlesContainer.innerHTML = articles.map(article => `
        <div class="content-card">
            <h4>${article.title}</h4>
            <p>${article.excerpt}</p>
            <div class="card-meta">
                <span class="date">${formatDate(article.date)}</span>
                <span class="category">${article.category}</span>
            </div>
        </div>
    `).join('');
}

function loadTips() {
    const tipsContainer = document.getElementById('latest-tips');
    if (!tipsContainer) return;

    const tips = contentManager.getLatestTips(3);
    tipsContainer.innerHTML = tips.map(tip => `
        <div class="content-card">
            <h4>${tip.title}</h4>
            <p>${tip.content}</p>
            <div class="card-meta">
                <span class="date">${formatDate(tip.date)}</span>
            </div>
        </div>
    `).join('');
}

function loadTools() {
    const toolsContainer = document.getElementById('latest-tools');
    if (!toolsContainer) return;

    const tools = contentManager.getLatestTools(2);
    toolsContainer.innerHTML = tools.map(tool => `
        <div class="content-card">
            <h4>${tool.name}</h4>
            <p>${tool.description}</p>
            <a href="${tool.url}" class="tool-link" target="_blank">
                <i class="fas fa-external-link-alt"></i>
                Try it
            </a>
            <div class="card-meta">
                <span class="date">${formatDate(tool.date)}</span>
            </div>
        </div>
    `).join('');
}

function loadTerms() {
    const termsContainer = document.getElementById('latest-terms');
    if (!termsContainer) return;

    const terms = contentManager.getLatestTerms(3);
    termsContainer.innerHTML = terms.map(term => `
        <div class="content-card">
            <h4>${term.term}</h4>
            <p>${term.definition}</p>
            <div class="card-meta">
                <span class="category">${term.category}</span>
            </div>
        </div>
    `).join('');
}

// Utility Functions
function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Add additional styles for content cards
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    .content-card {
        background: var(--bg-primary);
        padding: 1rem;
        border-radius: 6px;
        box-shadow: var(--card-shadow);
        transition: transform 0.2s ease;
    }

    .content-card:hover {
        transform: translateY(-2px);
    }

    .content-card h4 {
        margin-bottom: 0.5rem;
        color: var(--text-primary);
    }

    .content-card p {
        color: var(--text-secondary);
        font-size: 0.95rem;
        margin-bottom: 1rem;
    }

    .card-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.85rem;
        color: var(--text-secondary);
    }

    .card-meta .date {
        color: var(--accent-color);
    }

    .card-meta .category {
        background: var(--bg-secondary);
        padding: 0.2rem 0.5rem;
        border-radius: 4px;
        font-size: 0.8rem;
    }

    .tool-link {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        text-decoration: none;
        color: var(--accent-color);
        font-size: 0.9rem;
        margin-bottom: 0.5rem;
    }

    .tool-link:hover {
        text-decoration: underline;
    }
`;
document.head.appendChild(styleSheet);