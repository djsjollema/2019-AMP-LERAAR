const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let bumperArray = buildBumperArray();
let ball = new dPoint(new Vector2d(140,140),new Vector2d(3,2),new Vector2d(0,0),5,"red","");
ball.rad = new Vector2d(1,1);
ball.tan = new Vector2d(1,1);

function animate(){
  context.fillStyle = "rgba(255,255,255,0.05)";
  context.fillRect(0,0,width,height)
    //context.clearRect(0,0,width,height);

    ball.update();
    ball.draw(context);

    bumperArray.map((bump,i) =>{
      let distance = new Vector2d(1,1);
      distance.differenceVector(bump.position,ball.pos);

      bump.draw(context);
      // ball.vel.draw(context,ball.pos,50,"blue")

      //distance.draw(context,bump.position,1,"white");
      if(distance.magnitude < ball.radius + bump.radius){
        bump.color = "red";
        ball.rad.equals(distance);
        ball.rad.magnitude = 1;
        ball.tan.dx = -ball.rad.dy;
        ball.tan.dy = ball.rad.dx;

        ball.rad.magnitude = ball.rad.dot(ball.vel);
        ball.tan.magnitude = ball.tan.dot(ball.vel);
        ball.rad.magnitude = - ball.rad.magnitude;
        ball.vel.sumVector(ball.rad,ball.tan)

        // ball.rad.draw(context,ball.pos,50,"white");
        // ball.tan.draw(context,ball.pos,50,"white");

      } else {
        bump.color = "yellow";
      }

    });



}

setInterval(animate,10);

function buildBumperArray(){
  let bumpers = [];
  let colomnWidth = 120;
  let rowHeight = 120;
  let colomnStartWidth = 80;
  let rowStartHeight = 80;

  let numberOnARow = Math.floor(width/(colomnWidth));
  let numberOfBumpers = numberOnARow * Math.floor(height/rowHeight);

  for(let i=0; i<numberOfBumpers; i++){
    let x = colomnStartWidth + (i%numberOnARow) * colomnWidth;
    let y = rowStartHeight + Math.floor(i/numberOnARow) * rowHeight;
    let bumper = new Point(new Vector2d(x,y),30,"yellow","i="+ i,false);
    bumpers.push(bumper);
  }
  return bumpers;
}
