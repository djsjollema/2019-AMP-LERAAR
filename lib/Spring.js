class Spring {
  constructor(beginPoint,endPoint,damping,friction,gravity) {
    this.beginPoint = beginPoint;
    this.endPoint = endPoint;

    this.damping = damping;
    this.friction = friction;

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

    this.gravity = gravity;

    this.mouseDown = false;


  }

  update(){
    if(!this.endPoint.dragging){
      let eb = new Vector2d(0,0);
      eb.differenceVector(this.endPoint.position,this.beginPoint.position);
      eb.magnitude = this.length;
      this.eTarget.sumVector(this.beginPoint.position,eb);
    } else {
      this.eTarget.dx = this.endPoint.position.dx;
      this.eTarget.dy = this.endPoint.position.dy;
    }
    //this.eTarget.draw(context,0,0,1,"red");

    let be = new Vector2d(0,0);
    be.differenceVector(this.beginPoint.position,this.endPoint.position);
    be.magnitude = this.length;
    this.bTarget.sumVector(this.endPoint.position,be);
    //this.bTarget.draw(context,0,0,1,"yellow");

    this.accB.differenceVector(this.bTarget,this.beginPoint.position);

    this.accE.differenceVector(this.eTarget,this.endPoint.position);

if(!this.beginPoint.dragging){
  this.accB.magnitude *= this.damping;
  this.accB.add(this.gravity);
  this.velB.add(this.accB);
  this.velB.magnitude *= this.friction;
  this.beginPoint.position.add(this.velB);

}

if(!this.endPoint.dragging){
  this.accE.add(this.gravity);
  this.accE.magnitude *= this.damping;
  this.velE.add(this.accE);
  this.velE.magnitude *= this.friction;
  this.endPoint.position.add(this.velE);

}

    this.clamp(A,this.velB);
    this.clamp(B,this.velE);
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

  clamp(p,vel){
    if (p.position.dx > canvas.width-p.radius){
      vel.dx = - Math.abs(vel.dx);
      p.position.dx = canvas.width-p.point;
    }
    if (p.position.dx < p.radius){
      vel.dx =  Math.abs(vel.dx);
      p.position.dx = p.radius
    }
    if (p.position.dy > height-p.radius){
      vel.dy = - Math.abs(vel.dy);
      p.position.dy = canvas.height-p.radius
    }
    if (p.position.dy < p.radius){
      vel.dy =  Math.abs(vel.dy);
      p.position.dy = p.radius
    }
  }

}
