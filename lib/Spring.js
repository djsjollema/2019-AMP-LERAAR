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

    this.velB = new Vector2d(0,0);
    this.velE = new Vector2d(0,0);
    this.accE = new Vector2d(0,0);
    this.accB = new Vector2d(0,0);

  }

  update(){
    let eb = new Vector2d(0,0);
    eb.differenceVector(this.endPoint.position,this.beginPoint.position);
    eb.magnitude = this.length;
    this.eTarget.sumVector(this.beginPoint.position,eb);
    //this.eTarget.draw(context,0,0,1,"red");

    let be = new Vector2d(0,0);
    be.differenceVector(this.beginPoint.position,this.endPoint.position);
    be.magnitude = this.length;
    this.bTarget.sumVector(this.endPoint.position,be);
    //this.bTarget.draw(context,0,0,1,"yellow");

    let accB = new Vector2d(0,0);
    let accE = new Vector2d(0,0);

    this.accB.differenceVector(this.bTarget,this.beginPoint.position);
    this.accE.differenceVector(this.eTarget,this.endPoint.position);

    // this.accB.draw(context,this.beginPoint.position.dx,this.beginPoint.position.dy,1,"yellow");
    // this.accE.draw(context,this.endPoint.position.dx,this.endPoint.position.dy,1,"red");


    //accB.differenceVector(bTar)
    //console.log(eb,be);
    this.accB.magnitude *= 0.6;
    this.accE.magnitude *= 0.6;

    // this.accB.draw(context,this.beginPoint.position.dx,this.beginPoint.position.dy,1);
    // this.accE.draw(context,this.endPoint.position.dx,this.endPoint.position.dy,1);

    this.velB.add(this.accB);
    this.velE.add(this.accE);

    this.velB.magnitude *= 0.4;
    this.velE.magnitude *= 0.4;

    this.beginPoint.position.add(this.velB);
    this.endPoint.position.add(this.velE);





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
