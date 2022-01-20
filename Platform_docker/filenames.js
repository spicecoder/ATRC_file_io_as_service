const fs = require('fs')

const dir = '.'
const files = fs.readdirSync(dir)

for (const file of files) {
  console.log(file)
}