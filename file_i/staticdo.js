var fs = require('fs'),
    http = require('http');

 
http.createServer(function (req, res) {
  fs.readFile(__dirname + req.url, function (err,data) {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
        'Access-Control-Max-Age': 2592000 // 30 days
    }

    //res.header("Access-Control-Allow-Origin", "*");
    res.writeHead(200,headers);
    res.end(data);
  });
}).listen(8080)


 
 