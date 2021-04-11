 var http = require('http');
var fs = require('fs');

http.createServer(function(req, res) {
  // This opens up the writeable stream to `output`
  aurl = req.url ;
  if (aurl == '') { aurl = 'output'}
  var writeStream = fs.createWriteStream('./' +aurl);

  // This pipes the POST data to the file
  req.pipe(writeStream);

  // After all the data is saved, respond with a simple html form so they can post more data
  req.on('end', function () {
    res.writeHead(200, {"content-type":"text/html"});
    res.end('file written :'+ aurl);
  });

  // This is here incase any errors occur
  writeStream.on('error', function (err) {
    console.log(err);
  });
}).listen(8093);
