const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

//start here programming
let earth, moon, distanceEarthMoon,distanceMoonEarth,r,distanceNext;

earth = new dPoint(new Vector2d(width/2,height/2),new Vector2d(0,1),new Vector2d(0,0),50,"blue","earth");
moon = new dPoint(new Vector2d(width/4,height/4),new Vector2d(0,-1),new Vector2d(0,0),20,"gray","moon");
distanceEarthMoon = new Vector2d(0,0)
distanceMoonEarth = new Vector2d(0,0);
distanceNext = new Vector2d(0,0);

function animate(){
  context.clearRect(0,0,width,height);
  //begin animation loop

  distanceEarthMoon.differenceVector(moon.pos,earth.pos);
  distanceMoonEarth.differenceVector(earth.pos,moon.pos);
  distanceNext.differenceVector(earth.nextPos,moon.nextPos);


  if (distanceNext.magnitude < earth.radius + moon.radius){
    moon.tan = new Vector2d(0,0);
    moon.rad = new Vector2d(0,0);
    earth.tan = new Vector2d(0,0);
    earth.rad = new Vector2d(0,0);
    moon.rad.equals(distanceEarthMoon)
    earth.rad.equals(distanceEarthMoon)
    moon.rad.magnitude = 1;
    earth.rad.magnitude = 1;
    moon.tan.dx = -moon.rad.dy;
    moon.tan.dy = moon.rad.dx;
    earth.tan.dx = -earth.rad.dy;
    earth.tan.dy = earth.rad.dx;

    earth.rad.magnitude = earth.rad.dot(earth.vel);
    moon.rad.magnitude = moon.rad.dot(moon.vel);
    let temp = new Vector2d(0,0);
    temp.equals(earth.rad);
    earth.rad.equals(moon.rad);
    moon.rad.equals(temp);

    earth.vel.sumVector(earth.tan,earth.rad);
    moon.vel.sumVector(moon.tan,moon.rad);

  }

  r = distanceEarthMoon.magnitude

  distanceEarthMoon.magnitude = 50/(r*r);
  distanceMoonEarth.magnitude = 50/(r*r);

  earth.acc.equals(distanceEarthMoon);
  moon.acc.equals(distanceMoonEarth)


  earth.update();
  moon.update();
  earth.draw(context);
  moon.draw(context)

  earth.acc.draw(context,earth.pos,1000,"rgba(255,255,255,0.4)")
  moon.acc.draw(context,moon.pos,1000,"rgba(255,255,0,0.4)")
}

setInterval(animate,10)
