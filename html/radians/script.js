const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

const grid = new Grid();

canvas.width = width;
canvas.height = height;

  context.font = "bold 30px Courier new";

let mouse = {
  x:0,
  y:0
};

let wheel = {};
wheel.radius = 200;
wheel.segments = 8;
wheel.position = new Vector2d(400,400);
wheel.angle = 0;
wheel.velocity = new Vector2d(2,0);

wheel.draw = function() {
  context.save();
  context.translate(wheel.position.dx,wheel.position.dy);
  context.rotate(this.angle);

  if(this.angle>0 && this.angle<Math.PI*2){
    // context.beginPath();
    // context.lineWidth = "15";
    // context.strokeStyle = "blue"
    // context.fillStyle = "rgba(255,255,0,0.2)";
    // context.arc(0,0,this.radius,2*Math.PI+Math.PI/2,Math.PI/2-this.angle);
    // //context.closePath();
    // context.stroke();

  }

  context.strokeStyle = "black"
  context.beginPath();
  context.lineWidth = "5";
  context.arc(0,0,this.radius,0,Math.PI*2);
  //context.closePath();
  context.stroke();

  context.beginPath();
  context.lineWidth = "5";
  context.moveTo(0,0);
  let sAngle = 0;
  for(let i=0; i<wheel.segments;i++){
    context.lineTo(this.radius * Math.cos(sAngle),this.radius * Math.sin(sAngle));
    context.moveTo(0,0);
    sAngle += (Math.PI*2)/wheel.segments;
  }

  context.closePath();
  context.fill();
  context.stroke();

  context.beginPath();
  context.lineWidth = 15;
  context.strokeStyle = "red"
  context.moveTo(0,0);
  context.lineTo(this.radius * Math.cos(-wheel.angle+Math.PI/2),this.radius * Math.sin(-wheel.angle+Math.PI/2));
  context.moveTo(0,0);
  context.lineTo(this.radius * Math.cos(Math.PI/2),this.radius * Math.sin(Math.PI/2));
  context.closePath();
  context.arc(0,0,wheel.radius,-wheel.angle+Math.PI/2,Math.PI/2);

  context.stroke();
  context.lineWidth= 1;




  context.restore();

  if(this.angle>0 && this.angle<Math.PI*2){
    context.beginPath();
    context.lineWidth = "15";
    context.strokeStyle = "red"
    context.moveTo(0,wheel.position.dy+wheel.radius);
    context.lineTo(mouse.x,wheel.position.dy+wheel.radius);
    context.closePath();
    context.stroke();

    context.beginPath();
    context.lineWidth = "15";
    context.strokeStyle = "black"
    context.moveTo(0,wheel.position.dy+wheel.radius+200);
    context.lineTo(mouse.x,wheel.position.dy+wheel.radius+200);
    context.closePath();
    context.stroke();

  } else {
    if(this.angle>0){
      context.beginPath();
      context.lineWidth = "15";
      context.strokeStyle = "red"
      context.moveTo(0,wheel.position.dy+wheel.radius);
      context.lineTo(wheel.radius*Math.PI*2,wheel.position.dy+wheel.radius);
      context.closePath();
      context.stroke();

      context.beginPath();
      context.lineWidth = "15";
      context.strokeStyle = "black"
      context.moveTo(0,wheel.position.dy+wheel.radius +200);
      context.lineTo(wheel.radius*Math.PI*2,wheel.position.dy+wheel.radius+200);
      context.closePath();
      context.stroke();

    }

  }



  context.strokeStyle = "black"
  context.lineWidth = "1";

}

function animate() {
  context.clearRect(0,0,width,height);
  requestAnimationFrame(animate);
  grid.draw(context);
  wheel.angle = wheel.position.dx/wheel.radius;
  wheel.position.dx = mouse.x;

  wheel.draw();


  context.fillText("wheel.angle: " + Math.floor(100*wheel.angle)/100 + " rad", 10, 50);
  context.fillText(Math.floor(10*wheel.angle*180/Math.PI)/10 + "°" , wheel.position.dx-120, wheel.position.dy);

  context.fillText("wheel.radius: " + wheel.radius, 10, 90);
  if(wheel.angle>0 && wheel.angle<Math.PI*2){
    context.fillText("wheel.angle * wheel.radius: " + Math.floor(wheel.radius * wheel.angle), 10, 850);
  } else {
    if(wheel.angle <0){
      context.fillText("wheel.angle * wheel.radius: ", 10, 850);

    }
    if(wheel.angle>Math.PI*2){
        context.fillText("wheel.angle * wheel.radius: " + Math.floor(wheel.radius * Math.PI * 2), 10, 850);
    }
  }



}

animate()

window.addEventListener('mousemove',(evt)=>{
  mouse.x = evt.clientX - wheel.radius;
  mouse.y = evt.clientY;
})
