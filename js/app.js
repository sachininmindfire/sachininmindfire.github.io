import config from './config.js';

// DOM Elements
const sqlInput = document.getElementById('sqlInput');
const languageSelect = document.getElementById('languageSelect');
const convertBtn = document.getElementById('convertBtn');
const outputCode = document.getElementById('outputCode');
const copyBtn = document.getElementById('copyBtn');

// Event Listeners
convertBtn.addEventListener('click', handleConversion);
copyBtn.addEventListener('click', copyToClipboard);
languageSelect.addEventListener('change', () => {
    if (outputCode.textContent) {
        handleConversion();
    }
});

// Initialize syntax highlighting for the input
if (window.Prism) {
    Prism.highlightElement(sqlInput);
}

async function handleConversion() {
    const sql = sqlInput.value.trim();
    if (!sql) {
        alert('Please enter a SQL script');
        return;
    }

    // Add loading state
    convertBtn.classList.add('converting');
    convertBtn.textContent = 'Converting...';
    
    try {
        const response = await fetch(`${config.API_BASE_URL}/api/poco/convert`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sqlScript: sql,
                language: languageSelect.value
            })
        });

        if (!response.ok) {
            let errorMessage = 'Failed to convert SQL';
            try {
                const errorData = await response.json();
                errorMessage = errorData.error || errorMessage;
            } catch {
                errorMessage = response.statusText;
            }
            throw new Error(errorMessage);
        }

        const result = await response.json();
        if (result.success) {
            // Combine all generated code with class separators
            const combinedCode = Object.entries(result.generatedCode)
                .map(([tableName, code]) => {
                    // Add a comment before each class to identify the table
                    return `// Table: ${tableName}\n${code}`;
                })
                .join('\n\n');
            
            displayOutput(combinedCode);
        } else {
            throw new Error(result.error || 'Failed to generate code');
        }
    } catch (error) {
        console.error('Conversion error:', error);
        outputCode.textContent = `// Error: ${error.message}`;
        if (window.Prism) {
            Prism.highlightElement(outputCode);
        }
    } finally {
        // Remove loading state
        convertBtn.classList.remove('converting');
        convertBtn.textContent = 'Generate POCO';
    }
}

// Display the output with syntax highlighting
function displayOutput(code) {
    outputCode.textContent = code;
    outputCode.className = `language-${languageSelect.value}`;
    if (window.Prism) {
        Prism.highlightElement(outputCode);
    }
}

// Copy to clipboard functionality
async function copyToClipboard() {
    try {
        await navigator.clipboard.writeText(outputCode.textContent);
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        copyBtn.style.backgroundColor = 'var(--success-color)';
        
        setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.style.backgroundColor = '';
        }, 2000);
    } catch (err) {
        alert('Failed to copy code');
    }
}