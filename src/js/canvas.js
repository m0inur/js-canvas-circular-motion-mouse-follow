var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

// Variables
var mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}



var colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];

// Event Listeners
addEventListener('mousemove', function (event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener('resize', function () {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

// Utility Functions
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomCol(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

// Objects
function Particle(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.radians = Math.random() * Math.PI * 2;
  this.velocity = 0.06;
  this.distanceFromCenter = randomInt(50, 120)
  this.lastMouse = {
    x: x,
    y: y
  }
  this.update = () => {
    const lastPoint = {
      x: this.x,
      y: this.y
    };

    // Drag Effect 
    this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
    this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;

    this.radians += this.velocity;
    this.x = mouse.x + Math.cos(this.radians) * this.distanceFromCenter;
    this.y = mouse.y + Math.sin(this.radians) * this.distanceFromCenter;
    this.draw(lastPoint);
  };


  this.draw = function (lastPoint) {
    c.beginPath();
    c.strokeStyle = this.color;
    c.lineWidth = this.radius;
    c.moveTo(lastPoint.x, lastPoint.y);
    c.lineTo(this.x, this.y);
    c.stroke()
    c.closePath();
  };
}

let particles;


function init() {
  particles = []

  const radius = (Math.random() * 2) + 1;


  for (let i = 0; i < 150; i++) {
    const randomColors = randomCol(colors);

    particles.push(new Particle(0, 0, 5, randomColors))
  }
}


// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.beginPath()
  c.fillStyle = 'rgba(0, 0, 0, 0.030'
  c.fillRect(0, 0, canvas.width, canvas.height)


  particles.forEach(particle => {
    particle.update()
  })
}

init()
animate()