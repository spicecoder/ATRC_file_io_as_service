var streams = require('memory-streams');
 
// Initialize with the string
var reader = new streams.ReadableStream('Hello World\n');
 
// Send all output to stdout
reader.pipe(process.stdout); // outputs: "Hello World\n"
 
// Add more data to the stream
reader.append('Hello Universe\n'); // outputs "Hello Universe\n";
