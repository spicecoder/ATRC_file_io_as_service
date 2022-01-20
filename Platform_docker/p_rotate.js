const sharp = require(process.env.libv);
const args = process.argv;
 
const angle = args[2].split("=")[1]
const rotateImage = () => {
   sharp('/input/image.jpg')    //we follow this standard ?
 // sharp('VM_INPUT/image.jpg')
  .rotate(parseInt(angle))
   .toFile( '/output/protate_image.jpg') //we follow this standard ?
 // .toFile( 'VM_OUTPUT/protate_image.jpg')
}

rotateImage()