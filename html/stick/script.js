const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let A = new Point(new Vector2d(500,100),10,"red","A",true);
let B = new Point(new Vector2d(650,150),10,"red","B",true);

let velA = new Vector2d(5,2);
let accA = new Vector2d(0,1);

let spring = new Spring(A,B);

function animate() {
  clampA();

  context.clearRect(0,0,width,height);
  requestAnimationFrame(animate);
  spring.draw(context);
  spring.update();
  velA.add(accA);
  A.position.add(velA);


  //console.log(spring.length)
}

animate();

function clampA(){
  if (A.position.dx > width-A.radius){
    velA.dx = - Math.abs(velA.dx);
    A.position.dx = width-A.radius;
  }
  if (A.position.dx < A.radius){
    velA.dx =  Math.abs(velA.dx);
    A.position.dx = A.radius
  }
  if (A.position.dy > height-A.radius){
    velA.dy = - Math.abs(velA.dy);
    A.position.dy = height-A.radius
  }
  if (A.position.dy < A.radius){
    velA.dy =  Math.abs(velA.dy);
    A.position.dy = A.radius
  }
}
