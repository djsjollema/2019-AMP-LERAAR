const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let stick = new Stick();
stick.draw(context)

// let dPoints = []
//
// for(let i=0; i<100; i++){
//   let A = new dPoint(
//     new Vector2d( getRND(width), getRND(height)),
//     new Vector2d(5,7),
//     new Vector2d(0,1),
//     10,
//     "blue",
//     "" + i);
//     dPoints.push(A);
// }



function animate(){
  requestAnimationFrame(animate);
  context.clearRect(0,0,width,height);
  // for(let i = 0; i< dPoints.length; i++){
  //   dPoints[i].update()
  //   dPoints[i].draw(context)
  // }
  stick.update();
  stick.draw(context);
}

animate();

function getRND(max){
  return Math.floor(Math.random()*max);
}
