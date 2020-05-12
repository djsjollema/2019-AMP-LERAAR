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
    air.map(otherMol => {
      let distance = new Vector2d();
      distance.differenceVector(otherMol.pos,mol.pos);
      distance.add(mol.vel);
      distance.add(otherMol.vel);
      // distance.draw(context,mol.pos,1,"white")
      if(distance.magnitude < mol.radius + otherMol.radius){
        if(mol.index != otherMol.index){
          //collision between mol and other mol
          //mol.rad.equals(distance);
          //otherMol.rad.equals(distance);
          mol.rad.dx = distance.dx;
          mol.rad.dy = distance.dy;

          otherMol.rad.dx = distance.dx;
          otherMol.rad.dy = distance.dy;

          mol.rad.magnitude =1 ;
          otherMol.rad.magnitude =1;

          mol.tan.dx = -mol.rad.dy;
          mol.tan.dy = mol.rad.dx;

          otherMol.tan.dx = -otherMol.rad.dy;
          otherMol.tan.dy = otherMol.rad.dx;

          mol.rad.magnitude = mol.rad.dot(mol.vel);
          otherMol.rad.magnitude = otherMol.rad.dot(otherMol.vel);

          let Msum = mol.mass + otherMol.mass;
          let MAB = mol.mass - otherMol.mass;
          let MBA = otherMol.mass - mol.mass;

          let P = new Vector2d()
          let Q = new Vector2d()
          let R = new Vector2d()
          let S = new Vector2d()

          P.equals(mol.rad);
          Q.equals(otherMol.rad);
          R.equals(mol.rad);
          S.equals(otherMol.rad);

          P.scalMul(MAB/Msum )
          Q.scalMul(2*otherMol.mass /Msum)
          R.scalMul(2*mol.mass / Msum)
          S.scalMul(MBA/Msum)



          mol.rad.sumVector(P,Q);
          otherMol.rad.sumVector(R,S);

          mol.vel.sumVector(mol.rad,mol.tan);
          otherMol.vel.sumVector(otherMol.rad,otherMol.tan);

        }
      }
    })
  })
}

animate();

function makeAirArray(){
  let array = [];
  let numberOfMols = 12;
  let numberOnRow = 3;
  let columnWidth = 150;
  let rowHeight = 150;
  let vMax = -2;
  let vMin = 2;

  for(let i=0; i<numberOfMols; i++){
    let rnd = getRandomNumber(1,5);
    let color = "rgb(" + (4-rnd)*50 + "," + (4-rnd)*50 + ", " + (4-rnd)*50 + ")";
    let x = columnWidth/2 + i % numberOnRow * columnWidth;
    let y = rowHeight/2 + Math.floor(i/numberOnRow) * rowHeight;
    let mol = new dPoint(new Vector2d(x,y),new Vector2d(getRandomNumber(vMax, vMin),getRandomNumber(vMax, vMin)),new Vector2d(0,0),10*rnd,color,"" + i);
    mol.mass = rnd;
    mol.index =i;
    mol.tan = new Vector2d(1,1);
    mol.rad = new Vector2d(1,1);
    array.push(mol);
  }

  return array;
}

function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
