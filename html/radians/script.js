const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let wheel = {};
wheel.radius = 70;
wheel.segments = 20;
wheel.position = new Vector2d(0,0);
wheel.angle = 0;

wheel.draw = function() {
  context.save();
  context.translate(200,200);
  context.rotate(this.angle);

  context.beginPath();
  context.lineWidth = "5";
  context.fillStyle = "rgba(255,255,0,0.2)";
  context.arc(0,0,this.radius,0,Math.PI*2);
  context.closePath();
  context.stroke();

  context.beginPath();
  context.lineWidth = "1";
  context.moveTo(0,0);
  let sAngle = 0;
  for(let i=0; i<wheel.segments;i++){
    context.lineTo(this.radius * Math.cos(sAngle),this.radius * Math.sin(sAngle));
    context.moveTo(0,0);
    sAngle += (Math.PI*2)/wheel.segments;
  }

  context.closePath();
  context.fill();

  context.stroke();
  context.restore();
}

function animate() {
  context.clearRect(0,0,width,height);
  requestAnimationFrame(animate);
  wheel.angle += 0.01;
  wheel.draw();


}

animate()
