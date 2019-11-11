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
    this.dragging = false;

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
    //mouse
    window.addEventListener('mousedown',(evt)=>{
      let mouse = new Vector2d(evt.clientX,evt.clientY);
      let difference = new Vector2d(0,0);
      difference.differenceVector(mouse,this.position);
      if(difference.magnitude <= this.radius){
        this.dragging = true;
        //this.dragging = true;
      }
    });

    window.addEventListener('mouseup',(evt) => {
      //dragging = false;
      this.dragging = false;
    });

    window.addEventListener('mousemove',(evt) =>{
      let mouse = new Vector2d(evt.clientX,evt.clientY);
      let difference = new Vector2d(0,0);
      difference.differenceVector(mouse,this.position);

      if(difference.magnitude<this.radius){
          canvas.style.cursor = 'pointer';
          evt.stopImmediatePropagation();
        } else {
          canvas.style.cursor = "default";
      }

      if(this.dragging){
        this.position.dx = evt.clientX;
        this.position.dy = evt.clientY;
      }
    })

    //touch

    document.getElementById('canvas').addEventListener('touchstart',(evt)=>{
      let mouse = new Vector2d(evt.touches[0].clientX,evt.touches[0].clientY);
      let difference = new Vector2d(0,0);
      difference.differenceVector(mouse,this.position);
      if(difference.magnitude <= this.radius){
        this.dragging = true;
        //this.dragging = true;
      }
    });

    document.getElementById('canvas').addEventListener('touchend',(evt) => {
      //dragging = false;
      this.dragging = false;
    });

    document.getElementById('canvas').addEventListener('touchmove',(evt) =>{
      let mouse = new Vector2d(evt.touches[0].clientX,evt.touches[0].clientY);
      let difference = new Vector2d(0,0);
      difference.differenceVector(mouse,this.position);

      if(difference.magnitude<this.radius){
          canvas.style.cursor = 'pointer';
          evt.stopImmediatePropagation();
        } else {
          canvas.style.cursor = "default";
      }

      if(this.dragging){
        this.position.dx = evt.touches[0].clientX;
        this.position.dy = evt.touches[0].clientY;
      }
    })

  }
}
