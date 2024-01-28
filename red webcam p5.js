let capture;

function setup() {
  createCanvas(800, 800);
  capture = createCapture(VIDEO);
  capture.size(800, 800);
  capture.hide();
}

function draw() {
  background(220);
  capture.loadPixels();

  let letterSize = 10;
  for (let y = 0; y < capture.height; y += letterSize) {
    for (let x = 0; x < capture.width; x += letterSize) {
      let index = (x + y * capture.width) * 4;
      let brightness = (capture.pixels[index] + capture.pixels[index + 1] + capture.pixels[index + 2]) / 3;
      let textColor = getColorForBrightness(brightness);
      fill(textColor);
      let randomChar = getCharForBrightness(brightness);
      textSize(letterSize); // Set text size based on brightness
      text(randomChar, x, y);
    }
  }
}

function getCharForBrightness(brightness) {
  let characters = " .:-=+*#%@#";
  let index = floor(map(brightness, 0, 255, characters.length - 1, 0)); // Invert the mapping
  return characters.charAt(index);
}

function getColorForBrightness(brightness) {
  // You can customize the colors based on your preference
  let low = color(255, 0, 0); // Red for high brightness
  let high = color(0, 0, 255); // Blue for low brightness
  return lerpColor(low, high, brightness / 255);
}
