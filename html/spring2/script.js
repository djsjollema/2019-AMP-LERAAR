const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let A = new Point(new Vector2d(500,100),25,"red","A",true);
let B = new Point(new Vector2d(650,150),25,"red","B",true);

let spring = new Spring(A,B,0.8,0.9,new Vector2d(0,1));

function animate() {
  context.clearRect(0,0,width,height);
  requestAnimationFrame(animate);
  spring.draw(context);
  spring.update();
  //console.log(spring.length)
}

animate();
