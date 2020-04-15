const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let molecules = fillMoleculeArray();


function animate(){
  requestAnimationFrame(animate)
  context.clearRect(0,0,width,height);
  molecules.map((molecule)=>{
    molecule.update();
    molecule.draw(context);
    molecules.map((otherMolecule)=>{
      if(molecule.index != otherMolecule.index){
        let distance = new Vector2d(1,1);
        molecule.nextPos.sumVector(molecule.pos,molecule.vel)
        distance.differenceVector(otherMolecule.pos,molecule.nextPos);

        if(distance.magnitude < molecule.radius + otherMolecule.radius){
          molecule.rad.dx = distance.dx;
          molecule.rad.dy = distance.dy;
          otherMolecule.rad.dx = distance.dx;
          otherMolecule.rad.dy = distance.dy;

          molecule.rad.magnitude = 1;
          otherMolecule.rad.magnitude = 1;

          molecule.tan.dx = -molecule.rad.dy;
          molecule.tan.dy = molecule.rad.dx;

          otherMolecule.tan.dx = -otherMolecule.rad.dy;
          otherMolecule.tan.dy = otherMolecule.rad.dx;

          let temp = new Vector2d(1,1);
          temp.dx = molecule.rad.dx;
          temp.dy = molecule.rad.dy;

          molecule.rad.dx = otherMolecule.rad.dx;
          molecule.rad.dy = otherMolecule.rad.dx;

          otherMolecule.rad.dx = temp.dx;
          otherMolecule.rad.dy = temp.dy;

          molecule.vel.sumVector(molecule.rad,molecule.tan);
          otherMolecule.vel.sumVector(otherMolecule.rad,otherMolecule.tan);

        }
      }

    });
  })
}

animate();

function fillMoleculeArray(){
  let array = [];
  let numberOfMolecules = 100;
  let collumnWidth = 100;
  let rowHeight = 100;
  let moleculesOnARow = 15;

  for(let i=0; i<numberOfMolecules; i++){
    let x = collumnWidth/2 + i%moleculesOnARow * collumnWidth;
    let y = rowHeight/2 + Math.floor(i/moleculesOnARow) * rowHeight;
    let molecule = new dPoint(new Vector2d(x,y),new Vector2d(getRandomNumber(-2,2),getRandomNumber(-2,2)),new Vector2d(0,0),20,"yellow","" + i);
    molecule.nextPos = new Vector2d(1,1);
    molecule.index = i;
    molecule.rad = new Vector2d(1,1);
    molecule.tan = new Vector2d(1,1);
    array.push(molecule);
  }

  return array;
}

function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
