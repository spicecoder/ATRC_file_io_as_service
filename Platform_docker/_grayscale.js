const sharp = require('sharp')

const convertTograyscale = () => {
 sharp('/input/image.jpg')
  //  sharp('VM_INPUT/image.jpg')
  .grayscale() // or .greyscale()
 .toFile('/output/grayscale_image.jpg')
  //  .toFile( 'VM_OUTPUT/grayscale_image.jpg')
}

convertTograyscale()