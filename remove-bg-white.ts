import { Jimp } from "jimp";

async function processImage() {
  try {
    const filePath = "./src/assets/images/MAFE interiorismo logo.jpeg";
    const image = await Jimp.read(filePath);
    
    // Find background color from top-left pixel
    const bgColor = image.getPixelColor(0, 0);
    const bgR = (bgColor >> 24) & 255;
    const bgG = (bgColor >> 16) & 255;
    const bgB = (bgColor >> 8) & 255;
    
    let minX = image.bitmap.width, minY = image.bitmap.height, maxX = 0, maxY = 0;
    
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
      const r = this.bitmap.data[idx + 0];
      const g = this.bitmap.data[idx + 1];
      const b = this.bitmap.data[idx + 2];
      
      const rDiff = bgR - r;
      const gDiff = bgG - g;
      const bDiff = bgB - b;
      
      const maxDiff = Math.max(Math.abs(rDiff), Math.abs(gDiff), Math.abs(bDiff));
      let alpha = maxDiff > 30 ? Math.min(255, maxDiff * 4) : 0;
      
      this.bitmap.data[idx + 3] = alpha; 
      
      if (alpha > 50) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
        
        // Turn it white
        this.bitmap.data[idx+0] = 255;
        this.bitmap.data[idx+1] = 255;
        this.bitmap.data[idx+2] = 255;
      }
    });

    const pad = 10;
    minX = Math.max(0, minX - pad);
    minY = Math.max(0, minY - pad);
    maxX = Math.min(image.bitmap.width - 1, maxX + pad);
    maxY = Math.min(image.bitmap.height - 1, maxY + pad);
    
    image.crop({ x: minX, y: minY, w: maxX - minX + 1, h: maxY - minY + 1 });
    
    await image.write("./src/assets/images/MAFE_logo_transparent_white.png");
    console.log("Successfully created white transparent logo.");
  } catch (err) {
    console.error("Error processing image:", err);
  }
}

processImage();
