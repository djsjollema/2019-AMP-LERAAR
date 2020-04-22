const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let A,B,distance;

A = new dPoint(new Vector2d(200,200),new Vector2d(5,6),new Vector2d(0,0),30,"rgba(255,0,0,0.3)","A");
A.mass = A.radius * A.radius;
B = new dPoint(new Vector2d(800,400),new Vector2d(-5,4),new Vector2d(0,0),150,"rgba(0,0,255,0.3)","B");
B.mass = B.radius*B.radius;

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
    let sumAB = A.mass + B.mass;
    let difAB =  A.mass - B.mass;
    let difBA = B.mass - A.mass;

    let uA = new Vector2d(1,1);
    let uB = new Vector2d(1,1);

    let P = new Vector2d(1,1);
    let Q = new Vector2d(1,1);
    let R = new Vector2d(1,1);
    let S = new Vector2d(1,1);

    P.dx = A.rad.dx;
    P.dy = A.rad.dy;

    Q.dx = B.rad.dx;
    Q.dy = B.rad.dy;

    R.dx = A.rad.dx;
    R.dy = A.rad.dy;

    S.dx = B.rad.dx;
    S.dy = B.rad.dy;

    P.scalMul(difAB/sumAB);
    Q.scalMul(2*B.mass/sumAB);
    R.scalMul(2*A.mass/sumAB);
    S.scalMul(difBA/sumAB);

    A.rad.sumVector(P,Q);
    B.rad.sumVector(R,S);

    A.vel.sumVector(A.rad,A.tan);
    B.vel.sumVector(B.rad,B.tan);



    // console.log('collision');
    // let temp = new Vector2d(1,1);
    // temp.dx = A.rad.dx;
    // temp.dy = A.rad.dy;
    //
    // A.rad.dx = B.rad.dx;
    // A.rad.dy = B.rad.dy;
    //
    // B.rad.dx = temp.dx;
    // B.rad.dy = temp.dy;
    //
    // A.vel.sumVector(A.rad,A.tan);
    // B.vel.sumVector(B.rad,B.tan);
  }

  requestAnimationFrame(animate)
  context.clearRect(0,0,width,height);
  A.update();
  B.update();
  A.draw(context);
  B.draw(context);

  // A.vel.draw(context,A.pos,30,"white");
  // B.vel.draw(context,B.pos,30,"white");

  // A.rad.draw(context,A.pos,30,"red");
  // B.rad.draw(context,B.pos,30,"blue");
  //
  // A.tan.draw(context,A.pos,30,"green");
  // B.tan.draw(context,B.pos,30,"yellow");

}

animate();
