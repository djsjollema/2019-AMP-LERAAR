class Stick {
  constructor() {
    this.A = new dPoint(new Vector2d(200,200),new Vector2d(0,0),new Vector2d(0,0),10,"yellow","A");
    this.B = new dPoint(new Vector2d(200+130,200+110),new Vector2d(1,0),new Vector2d(0,0),10,"blue","B");
    this.length = new Vector2d(0,0);
    this.length.differenceVector(this.A.pos,this.B.pos);
  }

  update(){
    this.B.update();
    this.A.update();
  }

  draw(context){

    context.beginPath();
    context.moveTo(this.A.pos.dx,this.A.pos.dy);
    context.lineTo(this.B.pos.dx,this.B.pos.dy);
    context.closePath();
    context.stroke();
    this.A.draw(context);
    this.B.draw(context);
  }
}
