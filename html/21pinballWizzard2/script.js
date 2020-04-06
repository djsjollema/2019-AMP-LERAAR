const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let bumperArray = fillBumperArray();
let ball = new dPoint(new Vector2d(1,1),new Vector2d(0.2,0),new Vector2d(0,0.2),20,"red"," ");
ball.rad = new Vector2d(1,1);
ball.tan = new Vector2d(1,1);

function animate(){
  requestAnimationFrame(animate);
  context.clearRect(0,0,width,height);

  ball.update();
  ball.draw(context);

  bumperArray.map((bump) => {
    let distVector = new Vector2d(3,4);
    distVector.differenceVector(bump.position,ball.pos);
    bump.draw(context);

    if(distVector.magnitude < ball.radius + bump.radius){
      bump.color ="red";
      ball.rad.dx = distVector.dx;
      ball.rad.dy = distVector.dy;

      ball.tan.dx = -ball.rad.dy;
      ball.tan.dy = ball.rad.dx;
      ball.rad.magnitude = 1;
      ball.tan.magnitude = 1;

      ball.rad.magnitude = ball.rad.dot(ball.vel);
      ball.tan.magnitude = ball.tan.dot(ball.vel);

      ball.rad.magnitude = -ball.rad.magnitude;
      ball.vel.sumVector(ball.rad,ball.tan)

    } else {
      bump.color = "yellow";
    }
  })
}

animate();



function fillBumperArray(){
  let array = [];
  let startColumnWidth = 100;
  let columnWidth = 200;

  let startRowHeight = 100;
  let rowHeight = 200;

  let numberOnRow = Math.floor(width/columnWidth);
  let numberOfBumpers = Math.floor(height/rowHeight) * numberOnRow;

  for(let i=0; i<numberOfBumpers; i++){
    let x = startColumnWidth + (i % numberOnRow) * columnWidth;
    let y = startRowHeight + (Math.floor(i/numberOnRow))*rowHeight;
    let myBall = new Point(new Vector2d(x,y),30,"yellow","" + i);
    array.push(myBall)
  }
  return array;
}
