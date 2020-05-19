const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let air = makeAirArray();

function animate(){
  //requestAnimationFrame(animate)
  context.clearRect(0,0,width,height);

  air.map(mol => {
    mol.update();
    mol.draw(context);
    //console.log(mol.nextPos);
    air.map(otherMol => {
      if(mol.index != otherMol.index){
        let distance = new Vector2d();
        let nextDistance = new Vector2d();
        nextDistance.differenceVector(otherMol.nextPos,mol.nextPos);
        distance.differenceVector(otherMol.pos,mol.pos);

          mol.rad.equals(distance)
          otherMol.rad.equals(distance);

          mol.rad.magnitude =1 ;
          otherMol.rad.magnitude =1;

          mol.tan.dx = -mol.rad.dy;
          mol.tan.dy = mol.rad.dx;
          mol.tan.magnitude = 1;

          otherMol.tan.dx = -otherMol.rad.dy;
          otherMol.tan.dy = otherMol.rad.dx;
          otherMol.tan.magnitude = 1;

          // mol.rad.draw(context,mol.pos,50,"white");
          // mol.tan.draw(context,mol.pos,50,"blue");

          if(nextDistance.magnitude < mol.radius + otherMol.radius ){

            mol.rad.magnitude = mol.rad.dot(mol.vel);
            mol.tan.magnitude = mol.tan.dot(mol.vel);
            otherMol.rad.magnitude = otherMol.rad.dot(otherMol.vel);
            otherMol.tan.magnitude = otherMol.tan.dot(otherMol.vel);

            let Msum = mol.mass + otherMol.mass
            let MAB =mol.mass - otherMol.mass
            let MBA = otherMol.mass - mol.mass

            //  P = MAB/Msum * A.rad
            // Q = 2*B.mass /Msum * B.rad
            // R = 2*A.mass / Msum * A.rad
            // S = MBA/Msum * B.rad

            P = new Vector2d(1,1);
            Q = new Vector2d(1,1);
            R = new Vector2d(1,1);
            S = new Vector2d(1,1);

            P.equals(mol.rad);
            Q.equals(otherMol.rad);
            R.equals(mol.rad);
            S.equals(otherMol.rad);

            let ps =MAB/Msum
            let qs = 2*otherMol.mass /Msum;
            let rs = 2*mol.mass / Msum
            let ss = MBA/Msum;


            P.scalMul(ps);
            Q.scalMul(qs);
            R.scalMul(rs);
            S.scalMul(ss);

            // A.rad = P + Q
            // B.rad = R + S

            mol.rad.sumVector(P,Q);
            otherMol.rad.sumVector(R,S);

            mol.vel.sumVector(mol.rad,mol.tan);
            otherMol.vel.sumVector(otherMol.rad,otherMol.tan);

        }
      }
    })
  })
}

setInterval(animate,10);

function makeAirArray(){
//   let array = [];
// let columnWidth = 100;
// let rowHeight = 100;
//
// let numOnARow = Math.floor(width/columnWidth);
// let numberOfAtoms = numOnARow * Math.floor(height/rowHeight);

  let array = [];

  let maxRND = 20


  let columnWidth = 100;
  let numberOnRow = Math.floor(width/columnWidth);
  let rowHeight = 100;

  let numberOfMols = numberOnRow * Math.floor(height/rowHeight);

  let vMax = -2;
  let vMin = 2;

  for(let i=0; i<numberOfMols; i++){
    let rnd = getRandomNumber(1,maxRND);
    let color = "rgba(" + 255 + "," + 255 +  "," + 255 + "," + 0.5 + ")";
    let x = columnWidth/2 + i % numberOnRow * columnWidth;
    let y = rowHeight/2 + Math.floor(i/numberOnRow) * rowHeight;
    let mol = new dPoint(new Vector2d(x,y),new Vector2d(getRandomNumber(vMax, vMin),getRandomNumber(vMax, vMin)),new Vector2d(0,0),rnd,color,);
    mol.mass = Math.sqrt(rnd);
    mol.index =i;
    mol.tan = new Vector2d(1,1);
    mol.rad = new Vector2d(1,1);
    mol.collision = false;
    array.push(mol);
  }

  return array;
}

function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
