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
    mol.update();
    mol.draw(context);
  })
}

animate();

function makeAirArray(){
  let array = [];
  let numberOfMols = 12;
  let numberOnRow = 3;
  let columnWidth = 150;
  let rowHeight = 150;

  for(let i=0; i<numberOfMols; i++){
    let rnd = getRandomNumber(1,5);
    let color = "rgb(" + (4-rnd)*50 + "," + (4-rnd)*50 + ", " + (4-rnd)*50 + ")";
    let x = columnWidth/2 + i % numberOnRow * columnWidth;
    let y = rowHeight/2 + Math.floor(i/numberOnRow) * rowHeight;
    let mol = new dPoint(new Vector2d(x,y),new Vector2d(getRandomNumber(-5, 5),getRandomNumber(-5, 5)),new Vector2d(0,0),10*rnd,color," "+i);
    dPoint.mass = rnd;
    array.push(mol);
  }

  return array;
}

function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
