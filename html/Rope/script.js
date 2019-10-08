const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

//let stick = new Stick();
//stick.draw(context)

let points = [];

for(let i=0; i<20; i++){
  let A = new dPoint(new Vector2d(getRND(width),getRND(height)),new Vector2d(getRND(10),0),new Vector2d(0,1),10,"black","" + i);
  points.push(A)
};

function animate(){
  requestAnimationFrame(animate);
  context.clearRect(0,0,width,height);
  for(let i=0; i<points.length;i++){
    points[i].update();
    points[i].draw(context)
  }

  //stick.update();
  //stick.draw(context);
}

animate();

function getRND(max){
  return Math.floor(Math.random()*max)
}
