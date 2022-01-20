const sharp = require('sharp');

const rotateImage = () => {
  sharp('/input/abs1.jpg')
  .rotate(250)
  .toFile( '/output/rotate_abs1.jpg')
}

rotateImage()