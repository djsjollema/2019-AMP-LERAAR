const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

//let stick = new Stick();
//stick.draw(context)

let A = new dPoint(new Vector2d(100,100),new Vector2d(5,7),new Vector2d(0,1),10,"yellow","A");

function animate(){
  requestAnimationFrame(animate);
  context.clearRect(0,0,width,height);
  A.update()
  A.draw(context)
  //stick.update();
  //stick.draw(context);
}

animate();
