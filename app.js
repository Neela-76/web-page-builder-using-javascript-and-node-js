const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // Set the content type based on the file extension
    const ext = path.extname(req.url);
    let contentType = 'text/html';

    if (ext === '.js') {
        contentType = 'text/javascript';
    }

    res.setHeader('Content-Type', contentType);

    // Read and serve the requested file
    const filePath = path.join("./", req.url);
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.statusCode = 404;
            res.end('File not found');
        } else {
            res.end(data);
        }
    });
});

const port = 3000; // You can use any port you prefer
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
