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
        distance.differenceVector(otherMolecule.pos,molecule.pos);
        distance.draw(context,molecule.pos,1,"rgba(255,255,255,0.1)")
      }

    });
  })
}

animate();

function fillMoleculeArray(){
  let array = [];
  let numberOfMolecules = 10;
  let collumnWidth = 100;
  let rowHeight = 100;
  let moleculesOnARow = 5;

  for(let i=0; i<numberOfMolecules; i++){
    let x = collumnWidth/2 + i%moleculesOnARow * collumnWidth;
    let y = rowHeight/2 + Math.floor(i/moleculesOnARow) * rowHeight;
    let molecule = new dPoint(new Vector2d(x,y),new Vector2d(getRandomNumber(-2,2),getRandomNumber(-2,2)),new Vector2d(0,0),20,"yellow","" + i);
    molecule.nextPos = new Vector2d(1,1);
    molecule.index = i;
    array.push(molecule);
  }

  return array;
}

function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
