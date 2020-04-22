const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let A,B,difference;

A = new dPoint(new Vector2d(200,200),new Vector2d(5,7),new Vector2d(0,0),50,"yellow","A");
B = new dPoint(new Vector2d(500,400),new Vector2d(-6,-4),new Vector2d(0,0),250,"blue","B");
difference = new Vector2d(1,1);

//add mass
A.mass = A.radius * A.radius;
B.mass = B.radius * B.radius;

//radial component
A.rad = new Vector2d(1,1);
B.rad = new Vector2d(1,1);

//tangiale component
A.tan = new Vector2d(1,1);
B.tan = new Vector2d(1,1);

function animate(){
  requestAnimationFrame(animate);
  context.clearRect(0,0,width,height);
  A.update();
  B.update();
  difference.differenceVector(B.pos,A.pos);

  B.draw(context);
  A.draw(context);
  A.vel.draw(context, A.pos , 40, "white");
  B.vel.draw(context, B.pos , 40, "white");

  A.rad.draw(context, A.pos , 40, "red")
  A.tan.draw(context, A.pos , 40, "red")

  B.rad.draw(context, B.pos , 40, "orange")
  B.tan.draw(context, B.pos , 40, "orange")

  A.rad.dx = difference.dx;
  A.rad.dy = difference.dy;

  B.rad.dx = difference.dx;
  B.rad.dy = difference.dy;

  A.rad.magnitude = 1;
  B.rad.magnitude = 1;

  A.rad.magnitude = A.rad.dot(A.vel);
  B.rad.magnitude = B.rad.dot(B.vel);

  A.tan.dx = -A.rad.dy
  A.tan.dy = A.rad.dx

  B.tan.dx = -B.rad.dy
  B.tan.dy = B.rad.dx

  if(difference.magnitude<A.radius + B.radius){
    //difference.draw(context,A.pos,1,"red");
  } else {
    //difference.draw(context,A.pos,1,"green");
  }
}

animate();
