const sharp = require('sharp');
const path = require('node:path');
(async () => {
  const input = path.join(__dirname, 'meme.svg');
  for (const [name, size] of [['gta6-legal-route.png',1200],['judge-preview-480.png',480]]) {
    const result = await sharp(input).resize(size,size).flatten({background:'#10111c'}).removeAlpha().png({compressionLevel:9}).toFile(path.join(__dirname,name));
    console.log(`${name}: ${result.width}x${result.height}, ${result.size} bytes`);
  }
})().catch(error => {console.error(error.message);process.exitCode=1;});
