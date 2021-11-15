const fs = require('fs');
const readableStream = fs.createReadStream('lorem-ipsum.txt', 'utf8');
const writableStream = fs.createWriteStream('lorem-ipsum-copy.txt');

readableStream.on('data', () => {
    writableStream.write(chunk);
});

writableStream.end();
