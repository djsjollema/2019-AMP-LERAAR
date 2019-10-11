class Spring {
  constructor(beginPoint,endPoint) {
    this.beginPoint = beginPoint;
    this.endPoint = endPoint;

    this.startPositionBeginPoint = new Vector2d(this.beginPoint.position.dx,this.beginPoint.position.dy)
    this.startPositionEndPoint = new Vector2d(this.endPoint.position.dx,this.endPoint.position.dy)


    this.startVector = new Vector2d(0,0);
    this.startVector.differenceVector(this.startPositionEndPoint,this.startPositionBeginPoint);

    this.endpointVel = new Vector2d(0,0);
    this.endPointAcc = new Vector2d(0,0);
  }

  update(){
    let target = new Vector2d(0,0);
    target.differenceVector(this.endPoint.position,this.beginPoint.position);
    context.draw(target(this.endPoint.position.dx,this.endPoint.position.dy,1))

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
