import { Jimp } from "jimp";

async function processImage() {
  try {
    const image = await Jimp.read("/Diseños/MAFE interiorismo logo.jpeg");
    
    // Find background color from top-left pixel
    const bgColor = image.getPixelColor(0, 0);
    const bgR = (bgColor >> 24) & 255;
    const bgG = (bgColor >> 16) & 255;
    const bgB = (bgColor >> 8) & 255;
    
    console.log(`Background color: RGB(${bgR}, ${bgG}, ${bgB})`);
    
    // Determine if background is bright (white-ish) or dark (black-ish)
    // If it's a white background, we want to keep dark pixels
    // If it's a black background, we want to keep bright pixels
    const brightness = (bgR + bgG + bgB) / 3;
    const isBgBright = brightness > 128;
    
    // Tolerance for background removal
    const tolerance = 60;
    let minX = image.bitmap.width, minY = image.bitmap.height, maxX = 0, maxY = 0;
    
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
      const r = this.bitmap.data[idx + 0];
      const g = this.bitmap.data[idx + 1];
      const b = this.bitmap.data[idx + 2];
      
      const rDiff = Math.abs(r - bgR);
      const gDiff = Math.abs(g - bgG);
      const bDiff = Math.abs(b - bgB);
      
      // If the pixel is similar to the background
      if (rDiff < tolerance && gDiff < tolerance && bDiff < tolerance) {
        // Set alpha to 0 (transparent)
        this.bitmap.data[idx + 3] = 0;
      } else {
        // If it's text (not background), calculate bounding box
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
        
        // Also let's make the text cleanly pure depending on the need?
        // Let's just keep original color but fully opaque.
        this.bitmap.data[idx + 3] = 255; 
      }
    });

    console.log(`Cropping to bounding box: X:${minX}, Y:${minY}, W:${maxX - minX + 1}, H:${maxY - minY + 1}`);
    // Crop the image to the bounding box of the text
    image.crop({ x: minX, y: minY, w: maxX - minX + 1, h: maxY - minY + 1 });
    
    await image.write("/Diseños/MAFE_logo_transparent.png");
    console.log("Successfully created transparent logo.");
  } catch (err) {
    console.error("Error processing image:", err);
  }
}

processImage();
