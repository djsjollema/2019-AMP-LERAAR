class Spring {
  constructor(beginPoint,endPoint) {
    this.beginPoint = beginPoint;
    this.endPoint = endPoint;

    let diffVector = new Vector2d(0,0);
    diffVector.differenceVector(this.endPoint.position,this.beginPoint.position);
    this.length = diffVector.magnitude;

    this.bTarget = new Vector2d(0,0);
    this.eTarget = new Vector2d(0,0);


    this.endpointVel = new Vector2d(0,0);
    this.endPointAcc = new Vector2d(0,0);
  }

  update(){
    let eb = new Vector2d(0,0);
    eb.differenceVector(this.endPoint.position,this.beginPoint.position);
    eb.magnitude = this.length;
    this.eTarget.sumVector(this.beginPoint.position,eb);
    this.eTarget.draw(context,0,0,1,"red");

    let be = new Vector2d(0,0);
    be.differenceVector(this.beginPoint.position,this.endPoint.position);
    be.magnitude = this.length;
    this.bTarget.sumVector(this.endPoint.position,be);
    this.bTarget.draw(context,0,0,1,"yellow");
    //console.log(eb,be);

  }

  draw(context){
    context.beginPath();
    context.moveTo(this.beginPoint.position.dx,this.beginPoint.position.dy);
    context.lineTo(this.endPoint.position.dx,this.endPoint.position.dy);
    context.closePath();
    context.stroke();

    this.beginPoint.draw(context);
    this.endPoint.draw(context);



  }
}
