const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let A = new Point(new Vector2d(500,300),20,"yellow","A",true)
let B = new Point(new Vector2d(650,350),20,"yellow","B",true)

let spring = new Spring(A,B);

function animate() {
  context.clearRect(0,0,width,height);
  requestAnimationFrame(animate);
  spring.draw(context);
  spring.update();
  //console.log(spring.length)
}

animate();
