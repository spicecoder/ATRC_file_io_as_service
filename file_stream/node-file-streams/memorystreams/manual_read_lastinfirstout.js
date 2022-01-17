var streams = require('memory-streams');
 
// Initialize with the string
var reader = new streams.ReadableStream('Hello World\n');
 
// Add more data to the stream
reader.append('Hello Universe\n'); // outputs "Hello Universe\n";
reader.append('just a thought ,after'); 
// Read the data out
console.log(reader.read().toString()); // outputs: "Hello World\nHello Universe\n"
