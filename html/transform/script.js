const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;


function animate() {
  context.clearRect(0,0,width,height);
  requestAnimationFrame(animate);
  context.fillRect(100,100,200,300);
  context.setTransform(1, 0, 0, 1, 300, 0);


}

animate()
