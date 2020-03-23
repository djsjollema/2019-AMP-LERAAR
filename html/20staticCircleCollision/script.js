const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let ball, bumper;

bumper = new Point(new Vector2d(width/2,height/2),200,"yellow","bumper");
ball = new dPoint(new Vector2d(200,200),new Vector2d(5,6),new Vector2d(0,0),20,"red","ball")


function animate(){
  requestAnimationFrame(animate);
  context.clearRect(0,0,width,height);

  ball.update();

  bumper.draw(context);
  ball.draw(context);
}

animate();
