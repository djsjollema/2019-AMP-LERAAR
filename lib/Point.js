class Point {
  constructor(position,radius,color,label,draggable){
    this.position = position;
    this.radius = radius;
    this.color = color;
    this.label = label || "";
    this.draggable = draggable || false;
    if(this.draggable){
      this.drag();
    }

  }

  draw(context){
    context.beginPath();
    context.strokeStyle = "blue";
    context.fillStyle = this.color;
    context.arc(this.position.dx,this.position.dy,this.radius,0,2*Math.PI);
    context.stroke();
    context.fill();
    context.closePath();
    context.fillStyle = "black";
    context.font = "12px Arial";
    context.fillText(this.label, this.position.dx-20, this.position.dy-this.radius-10);
  }

  drag(){
    let dragging = false;

    window.addEventListener('mousedown',(evt)=>{
      let mouse = new Vector2d(evt.clientX,evt.clientY);
      let difference = new Vector2d(0,0);
      difference.differenceVector(mouse,this.position);
      if(difference.magnitude <= this.radius){
        dragging = true;
      }
    });

    window.addEventListener('mouseup',(evt) => {
      dragging = false;
    });

    window.addEventListener('mousemove',(evt) =>{
      if(dragging){
        this.position.dx = evt.clientX;
        this.position.dy = evt.clientY;
      }
    })
  }
}
