class Stick {
  constructor() {
    this.A = new dPoint(new Vector2d(200,200),new Vector2d(0,0),new Vector2d(0,0),10,"yellow","A");
    this.B = new dPoint(new Vector2d(200+130,200+110),new Vector2d(1,0),new Vector2d(0,1),10,"blue","B");

    this.distance = new Vector2d(0,0);
    this.distance.differenceVector(this.A.pos,this.B.pos);

    this.length = this.distance.magnitude;
  }

  update(){
    this.distance.differenceVector(this.A.pos,this.B.pos);
    this.B.update();
    this.A.pos.sumVector(this.B.pos,this.distance);
    this.A.update();
    console.log(this.A.pos,this.length,this.distance);
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
