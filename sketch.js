let myvideo;
let vScale; // global video scaling variable
let img; //
let sort = false;
let lasttouch = 0;

function setup() {
  createCanvas(windowWidth, windowHeight); // larger canvas to draw to

  if (width < height) {
    vScale = floor(width / 150); // vScale tied to window width so it can work on phone and computer
    console.log("by width");
  } else {
    vScale = floor(height / 150);
    console.log("by height");
  }
  pixelDensity(1);
  myvideo = createCapture(VIDEO);
  myvideo.size(width / vScale, height / vScale);
  myvideo.hide();
  // video dom element , the source, will be smaller by vScale which is 40 by 30 to improve performance
  frameRate(15);
  noSmooth();
}

function draw() {
  background(255);

  //to flip the image  then use - width in the
  scale(-1, 1);
  if (!sort) {
    // just show the video
    image(myvideo, 0, 0, -width, height);
  } else {
    // do the sorting

    img.loadPixels();

    // Loop many times
    for (let i = 0; i < 56000; i++) {
      //sortPixelsPaTB();
      //you can sort different ways
      //sortPixelsPaLR();  // left right
      sortPixelsPaTB(); //  check right neighbor and switch with with one below
    }

    img.updatePixels();

    image(img, 0, 0, -width, height);
  }
}

function touchStarted() {
  const currenttime = millis();
  const timesincelasttouch = currenttime - lasttouch;

  if (timesincelasttouch > 500) {
    /// toggle mix
    if (!sort) {
      img = myvideo.get();
      sort = true;
    } else {
      sort = false;
    }
  }

  lasttouch = currenttime;
}

function mouseClicked() {
  touchStarted();
}

function sortPixelsPaTB() {
  // Get a random pixel.
  const x = floor(random(img.width)); // so not out of range
  const y = floor(random(img.height - 1));

  // Get the position in the pixel array
  let pos = 4 * (y * img.width + x);
  let nei = 4 * ((y + 1) * img.width + x);
  //let pos2 = 4*((y+1)*img.width+(x))

  // Get the position of target and neighbor in the pixel array

  // Get the total R+G+B of both colors.
  let totalOne = img.pixels[pos] + img.pixels[pos + 1] + img.pixels[pos + 2];
  let totalTwo = img.pixels[nei] + img.pixels[nei + 1] + img.pixels[nei + 2];
  let temp = [];

  temp[0] = img.pixels[pos];
  temp[1] = img.pixels[pos + 1];
  temp[2] = img.pixels[pos + 2];

  // If the first total is less than the second total, swap the pixels.
  // This causes darker colors to fall to the bottom,
  // and light pixels to rise to the top.
  if (totalOne < totalTwo) {
    img.pixels[pos] = img.pixels[nei];
    img.pixels[pos + 1] = img.pixels[nei + 1];
    img.pixels[pos + 2] = img.pixels[nei + 2];
    //img.set(x, y + 1, colorOne);
    img.pixels[nei] = temp[0];
    img.pixels[nei + 1] = temp[1];
    img.pixels[nei + 2] = temp[2];
  }
}

function sortPixelsPaLR() {
  // Get a random pixel.
  const x = floor(random(img.width - 1)); // so not out of range
  const y = floor(random(img.height));

  // Get the position of target and neighbor in the pixel array
  let pos = 4 * (y * img.width + x);
  let nei = 4 * (y * img.width + (x + 1));
  //let pos2 = 4*((y+1)*img.width+(x))

  // Get the total R+G+B of both colors.
  let totalOne = img.pixels[pos] + img.pixels[pos + 1] + img.pixels[pos + 2];
  let totalTwo = img.pixels[nei] + img.pixels[nei + 1] + img.pixels[nei + 2];
  let temp = []; // a temp for switing

  temp[0] = img.pixels[pos];
  temp[1] = img.pixels[pos + 1];
  temp[2] = img.pixels[pos + 2];

  // If the first total is less than the second total, swap the pixels.
  //
  // dark to the the right
  if (totalOne < totalTwo) {
    img.pixels[pos] = img.pixels[nei];
    img.pixels[pos + 1] = img.pixels[nei + 1];
    img.pixels[pos + 2] = img.pixels[nei + 2];
    //img.set(x, y + 1, colorOne);
    img.pixels[nei] = temp[0];
    img.pixels[nei + 1] = temp[1];
    img.pixels[nei + 2] = temp[2];
  }
}
