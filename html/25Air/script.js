const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let A,B,difference;

A = new dPoint(new Vector2d(200,200),new Vector2d(1,2),new Vector2d(0,0),50,"yellow","A");
B = new dPoint(new Vector2d(500,400),new Vector2d(-2,-1),new Vector2d(0,0),250,"blue","B");
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

  A.tan.magnitude = 1;
  B.tan.magnitude = 1;

  A.tan.magnitude = A.tan.dot(A.vel);
  B.tan.magnitude = B.tan.dot(B.vel);

  if(difference.magnitude<A.radius + B.radius){

  let Msum = A.mass + B.mass
  let MAB =A.mass - B.mass
  let MBA = B.mass - A.mass

  //  P = MAB/Msum * A.rad
  // Q = 2*B.mass /Msum * B.rad
  // R = 2*A.mass / Msum * A.rad
  // S = MBA/Msum * B.rad

  P = new Vector2d(1,1);
  Q = new Vector2d(1,1);
  R = new Vector2d(1,1);
  S = new Vector2d(1,1);

  P.equals(A.rad);
  Q.equals(B.rad);
  R.equals(A.rad);
  S.equals(B.rad);

  P.scalMul(MAB/Msum);
  Q.scalMul(2*B.mass /Msum);
  R.scalMul(2*A.mass / Msum);
  S.scalMul(MBA/Msum);

  // A.rad = P + Q
  // B.rad = R + S

  A.rad.sumVector(P,Q);
  B.rad.sumVector(R,S);

  A.vel.sumVector(A.rad,A.tan);
  B.vel.sumVector(B.rad,B.tan);



    //difference.draw(context,A.pos,1,"red");
  } else {
    //difference.draw(context,A.pos,1,"green");
  }
}

animate();
