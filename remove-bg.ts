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
    
    console.log(`Background color: RGB(${bgR}, ${bgG}, ${bgB})`);
    
    let minX = image.bitmap.width, minY = image.bitmap.height, maxX = 0, maxY = 0;
    
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
      const r = this.bitmap.data[idx + 0];
      const g = this.bitmap.data[idx + 1];
      const b = this.bitmap.data[idx + 2];
      
      const rDiff = bgR - r;
      const gDiff = bgG - g;
      const bDiff = bgB - b;
      
      const maxDiff = Math.max(Math.abs(rDiff), Math.abs(gDiff), Math.abs(bDiff));
      
      let alpha = maxDiff > 20 ? Math.min(255, maxDiff * 3) : 0;
      
      this.bitmap.data[idx + 3] = alpha; 
      
      if (alpha > 50) { 
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
        
        if (alpha < 255 && alpha > 0) {
             const factor = 255 / alpha;
             this.bitmap.data[idx+0] = Math.max(0, Math.min(255, bgR - (bgR - r) * factor));
             this.bitmap.data[idx+1] = Math.max(0, Math.min(255, bgG - (bgG - g) * factor));
             this.bitmap.data[idx+2] = Math.max(0, Math.min(255, bgB - (bgB - b) * factor));
        }
      }
    });

    const pad = 10;
    minX = Math.max(0, minX - pad);
    minY = Math.max(0, minY - pad);
    maxX = Math.min(image.bitmap.width - 1, maxX + pad);
    maxY = Math.min(image.bitmap.height - 1, maxY + pad);

    console.log(`Cropping to bounding box: X:${minX}, Y:${minY}, W:${maxX - minX + 1}, H:${maxY - minY + 1}`);
    image.crop({ x: minX, y: minY, w: maxX - minX + 1, h: maxY - minY + 1 });
    
    await image.write("./src/assets/images/MAFE_logo_transparent.png");
    console.log("Successfully created transparent logo.");
  } catch (err) {
    console.error("Error processing image:", err);
  }
}

processImage();
