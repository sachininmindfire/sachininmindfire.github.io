const config = {
    siteName: "Sachin's Technical Blog",
    author: "Sachin",
    githubUrl: "https://github.com/sachininmindfire",
    featuredTool: {
        name: "SQL POCO Generator",
        url: "https://sachininmindfire.github.io/sql-poco-app/",
        description: "Generate POCO classes from SQL Server tables with ease!"
    }
};

// Sample content data
const sampleContent = {
    articles: [
        {
            id: 1,
            title: "Getting Started with SQL POCO Generator",
            excerpt: "Learn how to efficiently generate POCO classes from your SQL Server database tables.",
            date: "2024-02-20",
            category: "Tools"
        },
        {
            id: 2,
            title: "Best Practices for C# Development",
            excerpt: "Essential tips and practices for writing clean, maintainable C# code.",
            date: "2024-02-18",
            category: "Development"
        },
        {
            id: 3,
            title: "Understanding Design Patterns",
            excerpt: "A comprehensive guide to common software design patterns.",
            date: "2024-02-15",
            category: "Architecture"
        }
    ],
    tips: [
        {
            id: 1,
            title: "Quick Debugging in VS Code",
            content: "Use F5 to start debugging and F9 to toggle breakpoints.",
            date: "2024-02-19"
        },
        {
            id: 2,
            title: "Git Branch Management",
            content: "Keep your git history clean with interactive rebase.",
            date: "2024-02-17"
        },
        {
            id: 3,
            title: "SQL Query Optimization",
            content: "Use execution plans to identify performance bottlenecks.",
            date: "2024-02-14"
        }
    ],
    tools: [
        {
            id: 1,
            name: "SQL POCO Generator",
            description: "Generate POCO classes from SQL Server tables",
            url: "https://sachininmindfire.github.io/sql-poco-app/",
            date: "2024-02-20"
        },
        {
            id: 2,
            name: "VS Code Extension Pack",
            description: "Essential extensions for .NET development",
            url: "#",
            date: "2024-02-10"
        }
    ],
    terms: [
        {
            id: 1,
            term: "POCO",
            definition: "Plain Old CLR Object - A simple class used for mapping database tables.",
            category: "C#"
        },
        {
            id: 2,
            term: "ORM",
            definition: "Object-Relational Mapping - Technique for converting data between incompatible type systems.",
            category: "Database"
        },
        {
            id: 3,
            term: "API",
            definition: "Application Programming Interface - A set of rules for building software applications.",
            category: "Development"
        }
    ]
};

// Helper functions for content management
const contentManager = {
    getLatestArticles(count = 3) {
        return sampleContent.articles.slice(0, count);
    },
    
    getLatestTips(count = 3) {
        return sampleContent.tips.slice(0, count);
    },
    
    getLatestTools(count = 2) {
        return sampleContent.tools.slice(0, count);
    },
    
    getLatestTerms(count = 3) {
        return sampleContent.terms.slice(0, count);
    },
    
    getAllContent(type) {
        return sampleContent[type] || [];
    },
    
    searchContent(query) {
        query = query.toLowerCase();
        const results = {
            articles: sampleContent.articles.filter(article => 
                article.title.toLowerCase().includes(query) || 
                article.excerpt.toLowerCase().includes(query)
            ),
            tips: sampleContent.tips.filter(tip => 
                tip.title.toLowerCase().includes(query) || 
                tip.content.toLowerCase().includes(query)
            ),
            tools: sampleContent.tools.filter(tool => 
                tool.name.toLowerCase().includes(query) || 
                tool.description.toLowerCase().includes(query)
            ),
            terms: sampleContent.terms.filter(term => 
                term.term.toLowerCase().includes(query) || 
                term.definition.toLowerCase().includes(query)
            )
        };
        return results;
    }
};

// Export for use in other files
window.config = config;
window.contentManager = contentManager;