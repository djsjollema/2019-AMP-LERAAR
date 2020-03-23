class Grid {
  constructor(dx,dy,xmod,ymod) {
    this.dx = 20 || dx;
    this.dy = 20 || dy;
    this.xmod = 100 || xmod;
    this.ymod = 100 || ymod;
  }

  draw(context){
    for(let y = 0; y<canvas.height; y+=this.dy){
      context.beginPath();
      if(y%this.ymod == 0){
        context.lineWidth  = 5;
      } else {
        context.lineWidth  = 1;
      }

      context.strokeStyle = "rgba(0,0,255,0.2)";
      context.moveTo(0,y);
      context.lineTo(canvas.width,y);
      context.closePath();
      context.stroke();
    }
    for(let x = 0; x<canvas.width; x+=this.dx){
      context.beginPath();
      if(x%this.xmod == 0){
        context.lineWidth  = 5;
      } else {
        context.lineWidth  = 1;
      }
      context.strokeStyle = "rgba(0,0,255,0.2)";
      context.moveTo(x,0);
      context.lineTo(x,canvas.height);
      context.closePath();
      context.stroke();
    }


  }
}
