const {Transform} = require('stream');
const _ = require('lodash');
const h = require('highland');


const myTransform = new Transform({
    transform(chunk, encoding, callback) {
        //Callback fires in a random amount of time 1-500 ms
        setTimeout(() => callback(null, chunk), _.random(1, 500));
    },
    //Using objectMode to pass-trough Numbers, not strings/buffers
    objectMode: true
});

//I'm using 'highland' here to create a read stream
//The read stream emits numbers from 1 to 100 
h(_.range(1, 100))
    .pipe(myTransform)
    //Simply logging them as they go out of transform stream
    .on('data', chunk => console.log(chunk.toString()));

//The output is:
// 1
// 2
// 3
// 4 ...
//Although the callbacks fire in random order

