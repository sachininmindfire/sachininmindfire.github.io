import http.server
import socketserver

PORT = 8000

Handler = http.server.SimpleHTTPRequestHandler
Handler.extensions_map.update({
    '.js': 'application/javascript',
    '.css': 'text/css',
})

print(f"Starting server at http://localhost:{PORT}")
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print("Press Ctrl+C to stop the server")
    httpd.serve_forever()