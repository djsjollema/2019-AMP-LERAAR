const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let A,B,distance;

A = new dPoint(new Vector2d(200,200),new Vector2d(5,6),new Vector2d(0,0),200,"rgba(255,0,0,0.3)","A");
B = new dPoint(new Vector2d(800,400),new Vector2d(-5,4),new Vector2d(0,0),200,"rgba(0,0,255,0.3)","B");

A.rad = new Vector2d(1,1);
A.tan = new Vector2d(1,1);

B.rad = new Vector2d(1,1);
B.tan = new Vector2d(1,1);

function animate(){
  A.rad.differenceVector(B.pos,A.pos);
  B.rad.differenceVector(A.pos,B.pos);
  distance = A.rad.magnitude;

  A.rad.magnitude = 1;
  B.rad.magnitude = 1;

  A.tan.perpendicular(A.rad);
  B.tan.perpendicular(B.rad);

  A.rad.magnitude = A.vel.dot(A.rad);
  A.tan.magnitude = A.vel.dot(A.tan);

  B.rad.magnitude = B.vel.dot(B.rad);
  B.tan.magnitude = B.vel.dot(B.tan);

  if(distance< A.radius + B.radius){
    console.log('collision');
    let temp = new Vector2d(1,1);
    temp.dx = A.rad.dx;
    temp.dy = A.rad.dy;

    A.rad.dx = B.rad.dx;
    A.rad.dy = B.rad.dy;

    B.rad.dx = temp.dx;
    B.rad.dy = temp.dy;

    A.vel.sumVector(A.rad,A.tan);
    B.vel.sumVector(B.rad,B.tan);
  }

  requestAnimationFrame(animate)
  context.clearRect(0,0,width,height);
  A.update();
  B.update();
  A.draw(context);
  B.draw(context);

  A.vel.draw(context,A.pos,50,"white");
  B.vel.draw(context,B.pos,50,"white");

  A.rad.draw(context,A.pos,50,"red");
  B.rad.draw(context,B.pos,50,"blue");

  A.tan.draw(context,A.pos,50,"green");
  B.tan.draw(context,B.pos,50,"yellow");

}

animate();
