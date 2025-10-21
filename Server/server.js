const http = require("http"); // importing this to create a server
const fs = require("fs"); // to handle file systems
const path = require("path"); // to get path of any particular file

const port = 3000;

const server = http.createServer((request, response) => {

  // 1. Grabbing everything which is required.
  // Accessing the path
  const filePath = path.join(__dirname, request.url === "/" ? "index.html" : request.url)

  // Accessing the extension of file
  const extName = String(path.extname(filePath)).toLowerCase()

  // Declaring which file types will our server support
  const mimeTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/js",
    ".png": "image/png"
  }

  // Deciding content types
  const contentType = mimeTypes[extName] || "application/octet-stream";


  // 2. Reading the file and serving

  fs.readFile(filePath, (err, content) => {
    if(err){
      if(err.code === "ENOENT") {
        response.writeHead(404, { "Content-Type": "text/html"});
        response.end("404: File Not Found BRoooooooo")
      }
    }else{
      response.writeHead(200, { "Content-Type": contentType })
      response.end(content, "utf-8");;
    }
  })


});

server.listen(port, () => {
  console.log("Server is listening");
});


// We can access the website on  =>  http://localhost:3000/
