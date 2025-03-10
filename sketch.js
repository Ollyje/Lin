let colors = [];
let offsets = []; // Offsets for animating the colors
let speed = 0.01; // Speed of color movement

function setup() {
createCanvas(800, 800);

// Generate initial random colors for the gradient
generateRandomColors();

// Initialize offsets for animation
for (let i = 0; i < 4; i++) {
  offsets.push(random(1000)); // Random starting points for Perlin noise
}

// Attach functionality to the button defined in HTML
const button = select('#generate-button'); // Select the button by its ID
button.mousePressed(() => {
  generateNewOval(); // Call the function to generate a new oval
});
}

function draw() {
background(255); // Dark background for contrast

// Update colors based on Perlin noise for smooth animation
let animatedColors = animateColors(colors, offsets);

// Draw the gradient oval aura/orb
drawGradientOrb(width / 2, height / 2, 500, 700, animatedColors);
}

function drawGradientOrb(x, y, w, h, gradientColors) {
let steps = 100; // Number of gradient steps

for (let i = steps; i > 0; i--) {
  let inter = map(i, 0, steps, 0, 1);

  // Interpolate between the 4 colors
  let col;
  if (inter < 0.33) {
    col = lerpColor(gradientColors[0], gradientColors[1], inter / 0.33);
  } else if (inter < 0.66) {
    col = lerpColor(gradientColors[1], gradientColors[2], (inter - 0.33) / 0.33);
  } else {
    col = lerpColor(gradientColors[2], gradientColors[3], (inter - 0.66) / 0.34);
  }

  fill(col);
  noStroke();

  // Draw ellipse with decreasing size to create gradient effect
  ellipse(x, y, w * (i / steps), h * (i / steps));
}
}

// Function to generate 4 random colors
function generateRandomColors() {
colors = []; // Clear the previous colors
for (let i = 0; i < 4; i++) {
  colors.push(color(random(255), random(255), random(255)));
}
}

// Function to animate colors using Perlin noise
function animateColors(baseColors, offsets) {
let animatedColors = [];
for (let i = 0; i < baseColors.length; i++) {
  // Extract RGB values from the base color
  let r = red(baseColors[i]);
  let g = green(baseColors[i]);
  let b = blue(baseColors[i]);

  // Modify the RGB values using Perlin noise
  r += map(noise(offsets[i]), 0, 1, -50, 50);
  g += map(noise(offsets[i] + 100), 0, 1, -50, 50);
  b += map(noise(offsets[i] + 200), 0, 1, -50, 50);

  // Constrain the RGB values to valid ranges
  r = constrain(r, 0, 255);
  g = constrain(g, 0, 255);
  b = constrain(b, 0, 255);

  // Create a new color with the modified RGB values
  animatedColors.push(color(r, g, b));

  // Increment the offset for smooth animation
  offsets[i] += speed;
}
return animatedColors;
}

// Function to generate a new oval
function generateNewOval() {
generateRandomColors(); // Generate new random colors
offsets = []; // Reset offsets for animation
for (let i = 0; i < 4; i++) {
  offsets.push(random(1000)); // Generate new random offsets
}
}