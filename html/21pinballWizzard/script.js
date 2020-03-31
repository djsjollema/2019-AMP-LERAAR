const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let bumperArray = fillBumperArray();
let ball = new dPoint(new Vector2d(100,100),new Vector2d(3,4),new Vector2d(0,0),10,"black"," ");
ball.rad = new Vector2d(1,1);
ball.tan = new Vector2d(1,1);

function animate(){
  requestAnimationFrame(animate);
  context.clearRect(0,0,width,height);

  ball.update();
  ball.draw(context);

  bumperArray.map((bump) => {
    let distVector = new Vector2d(1,1);
    distVector.differenceVector(bump.position,ball.pos);
    //distVector.draw(context,ball.pos,1,"white");
    bump.draw(context);

    if(distVector.magnitude < ball.radius + bump.radius){
      bump.color ="red";
      ball.rad.dx = distVector.dx;
      ball.rad.dy = distVector.dy;

      ball.tan.dx = -ball.rad.dy;
      ball.tan.dy = ball.rad.dx;

      ball.rad.draw(context,ball.pos,1,"white");
      ball.tan.draw(context,ball.pos,1,"white");
      
    } else {
      bump.color = "yellow";
    }


  })


}

animate();



function fillBumperArray(){
  let array = [];
  let startColumnWidth = 50;
  let columnWidth = 100;

  let startRowHeight = 50;
  let rowHeight = 100;

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
