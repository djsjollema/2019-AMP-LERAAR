const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let atoms = createAtoms();

function animate(){
  context.clearRect(0,0,width,height)
  requestAnimationFrame(animate)
  atoms.map((atom,i)=>{
    atom.draw(context)
    atom.vel.draw(context,atom.pos,40,"rgba(255,255,255,0.4)")
    atoms.map(atm => {

      if(atom != atm){
        let distance;
        atom.nextPosition.sumVector(atom.pos,atom.vel)
        atom.rad.differenceVector(atm.pos,atom.nextPosition);
        atm.rad.differenceVector(atom.nextPosition,atm.pos);
        distance = atom.rad.magnitude;


        if(distance < 2*atom.radius){
          atom.rad.magnitude = 1;
          atm.rad.magnitude = 1;

          atom.tan.perpendicular(atom.rad);
          atm.tan.perpendicular(atm.rad);

          atom.rad.magnitude = atom.rad.dot(atom.vel);
          atom.tan.magnitude = atom.tan.dot(atom.vel);

          atm.rad.magnitude = atm.rad.dot(atm.vel);
          atm.tan.magnitude = atm.tan.dot(atm.vel);

          let temp = {};
          temp.dx =atom.rad.dx;
          temp.dy = atom.rad.dy;

          atom.rad.dx = atm.rad.dx
          atom.rad.dy = atm.rad.dy;

          atm.rad.dx = temp.dx;
          atm.rad.dy = temp.dy;

          atom.vel.sumVector(atom.rad,atom.tan);
          atm.vel.sumVector(atm.rad,atm.tan);




          // atom.rad.draw(context,atom.pos,50,"white")
          // atom.tan.draw(context,atom.pos,50,"white")
        }
      }
    })
    atom.update();

  })
}

animate();


function createAtoms(){
  let array = [];
  let columnWidth = 100;
  let rowHeight = 100;

  let numOnARow = 2;
  let numberOfAtoms = 4;

  for(let i = 0; i<numberOfAtoms; i++){
    let x = columnWidth/2 + i%numOnARow * columnWidth;
    let y = rowHeight/2 + Math.floor(i/numOnARow) * rowHeight;
    let atom = new dPoint(new Vector2d(x,y),new Vector2d(getRandomInt(-5,5),getRandomInt(-5, 5)),new Vector2d(0,0),40,"yellow","" + i);
    atom.rad = new Vector2d(1,1);
    atom.tan = new Vector2d(1,1);
    atom.nextPosition = new Vector2d(1,1);
    array.push(atom);
  }
  return array;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
