const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let ball, bumper, distance;

bumper = new Point(new Vector2d(width/2,height/2),200,"white","bumper");
ball = new dPoint(new Vector2d(200,200),new Vector2d(5,6),new Vector2d(0,0),20,"red","ball");

ball.rad = new Vector2d(1,1);
ball.tan = new Vector2d(1,1);


function animate(){
  requestAnimationFrame(animate);
  context.clearRect(0,0,width,height);
  // updates enzo
  ball.update();
  ball.rad.dx = bumper.position.dx - ball.pos.dx;
  ball.rad.dy = bumper.position.dy - ball.pos.dy;

  distance = ball.rad.magnitude;

  ball.rad.magnitude = 1;
  ball.tan.dx = -ball.rad.dy;
  ball.tan.dy = ball.rad.dx;
  ball.rad.magnitude = ball.rad.dot(ball.vel);
  ball.tan.magnitude = ball.tan.dot(ball.vel);

  if(distance < ball.radius + bumper.radius){
    // console.log('collision');
    ball.rad.magnitude = -ball.rad.magnitude;
    ball.vel.sumVector(ball.rad,ball.tan)
  }

  //drawing

  bumper.draw(context);
  ball.draw(context);

  ball.vel.draw(context,ball.pos,20,"red");
  ball.rad.draw(context,ball.pos,20,"blue");
  ball.tan.draw(context,ball.pos,20,"yellow");
}

animate();
