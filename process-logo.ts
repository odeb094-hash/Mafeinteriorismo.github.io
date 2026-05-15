import { Jimp, rgbaToInt } from "jimp";

async function run() {
  const filePath = "./src/images/MAFE interiorismo logo.jpeg";
  const image = await Jimp.read(filePath);
  
  const w = image.bitmap.width;
  const h = image.bitmap.height;
  
  // Create transparent black version
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const color = image.getPixelColor(x, y);
      const r = (color >> 24) & 255;
      const g = (color >> 16) & 255;
      const b = (color >> 8)  & 255;
      
      if (r > 200 && g > 200 && b > 200) {
        // White -> Transparent
        image.setPixelColor(rgbaToInt(0, 0, 0, 0), x, y);
      } else {
        // Make non-white fully black
        image.setPixelColor(rgbaToInt(0, 0, 0, 255), x, y);
      }
    }
  }
  
  await image.write("./src/images/MAFE_logo_transparent.png");
  
  // Create transparent white version
  const image2 = await Jimp.read(filePath);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const color = image2.getPixelColor(x, y);
      const r = (color >> 24) & 255;
      const g = (color >> 16) & 255;
      const b = (color >> 8)  & 255;
      
      if (r > 200 && g > 200 && b > 200) {
        // White -> Transparent
        image2.setPixelColor(rgbaToInt(0, 0, 0, 0), x, y);
      } else {
        // Make non-white fully white
        image2.setPixelColor(rgbaToInt(255, 255, 255, 255), x, y);
      }
    }
  }
  await image2.write("./src/images/MAFE_logo_transparent_white.png");
}

run().catch(console.error);
