const http = require("http");
const fs = require("fs");
const path = require("path");

const port = 5000;
const distDir = path.join(__dirname, "../dist");

const server = http.createServer((req, res) => {
  res.setHeader("Cache-Control", "no-store");
  
  let filePath = path.join(distDir, req.url === "/" ? "index.html" : req.url);
  
  fs.readFile(filePath, (err, data) => {
    if (err) {
      fs.readFile(path.join(distDir, "index.html"), (err2, data2) => {
        if (err2) {
          res.writeHead(404);
          res.end("Not Found");
        } else {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(data2);
        }
      });
    } else {
      const ext = path.extname(filePath);
      let contentType = "text/html";
      if (ext === ".js") contentType = "application/javascript";
      if (ext === ".css") contentType = "text/css";
      res.writeHead(200, { "Content-Type": contentType });
      res.end(data);
    }
  });
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Servidor SOFTGAN en puerto ${port}`);
});
