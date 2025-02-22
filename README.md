# SQL POCO Generator Frontend

A web-based tool for converting SQL scripts to Plain Old CLR Objects (POCOs) in multiple programming languages.

## Features

- Convert SQL to POCO classes
- Support for multiple programming languages (C#, Java, TypeScript, Python)
- Clean and responsive UI
- Syntax highlighting
- Copy to clipboard functionality

## Deployment Instructions

### Initial Setup

1. Fork this repository
2. Clone your forked repository:
   ```bash
   git clone https://github.com/yourusername/sql-poco-frontend.git
   cd sql-poco-frontend
   ```

### Configure GitHub Pages

1. Go to your repository's Settings tab
2. Navigate to Pages section (under "Code and automation")
3. Under "Source", select "Deploy from a branch"
4. Select the branch (e.g., "main") and folder (root "/")
5. Click Save

### Update Configuration

1. Update the API endpoint in `js/config.js`:
   ```javascript
   const config = {
       API_BASE_URL: 'https://your-api-url.com'
   };
   ```

2. Update social media preview images:
   - Replace `/images/og-image.png` for Facebook/OpenGraph
   - Replace `/images/twitter-image.png` for Twitter

### Local Development

1. To run locally, you can use any static file server
2. Example using Python:
   ```bash
   python -m http.server 8000
   ```
3. Visit `http://localhost:8000` in your browser

### Production Deployment

The site will be automatically deployed to GitHub Pages when you push to the main branch. The live site will be available at:
`https://yourusername.github.io/sql-poco-frontend`

## Development

### Project Structure

```
sql-poco-frontend/
├── index.html          # Main application page
├── 404.html           # Custom 404 error page
├── css/
│   └── styles.css     # Stylesheets
├── js/
│   ├── app.js        # Main application logic
│   └── config.js     # Configuration file
└── images/           # Image assets
    ├── og-image.png
    └── twitter-image.png
```

### Making Changes

1. Create a new branch for your changes
2. Make your modifications
3. Test locally
4. Commit and push your changes
5. Create a pull request

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details