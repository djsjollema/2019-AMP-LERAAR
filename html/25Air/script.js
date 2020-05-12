const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let air = makeAirArray();

function animate(){
  requestAnimationFrame(animate)
  context.clearRect(0,0,width,height);

  air.map(mol => {
    mol.draw(context);
  })
}

animate();

function makeAirArray(){
  let array = [];
  let numberOfMols = 12;
  let numberOnRow = 3;
  let columnWidth = 100;
  let rowHeight = 100;

  for(let i=0; i<numberOfMols; i++){
    let x = i % numberOnRow * columnWidth;
    let y = Math.floor(i/numberOnRow) * rowHeight;
    let mol = new dPoint(new Vector2d(x,y),new Vector2d(0,0),new Vector2d(0,0),10,"black"," "+i);
    array.push(mol);
  }

  return array;
}

function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
