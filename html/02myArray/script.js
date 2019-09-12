const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let points = [];
let maxpoints = 20;
let counter = 0;

for(let i=0; i<20; i++){
  let color = "rgba(" + getRandom(255) + "," + getRandom(255) + "," + getRandom(255) + "," + 0.3 + ")"
  let A = new Point(new Vector2d(getRandom(width),getRandom(height)),10,color,"hallos");
  A.label = counter;
  counter++;
  points.push(A);

}

let mouse = new Vector2d();
let differenceVector = new Vector2d();

window.addEventListener('click',(e)=>{
  mouse.dx = e.clientX;
  mouse.dy = e.clientY;
  console.log(mouse);
})

function animate() {
  context.clearRect(0,0,width,height);
  requestAnimationFrame(animate);


  for(let i = 0; i<points.length; i++){
    points[i].radius+= 0.4;
    points[i].draw(context);
    if(points[i].radius > 100){
      points[i].radius= 0;
    }
  }
}

animate()


function getRandom(max){
  let ans = Math.floor(Math.random()*max);
  return ans;
}
