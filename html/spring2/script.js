const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let A = new Point(new Vector2d(100,100),25,"red","A",true);
let B = new Point(new Vector2d(250,150),25,"blue","B",true);

let spring = new Spring(A,B,0.9,0.8,new Vector2d(0,1));

function animate() {
  context.clearRect(0,0,width,height);
  requestAnimationFrame(animate);
  spring.update();
  spring.draw(context);
}

animate();
