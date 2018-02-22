let layers_elements = document.getElementsByClassName('layers_element');
class Basic_figure{
    constructor(color_of_figure){
        this.start_x = 0;
        this.start_y = 0;
        this.color = color_of_figure;
        this.x = 0;
        this.y = 0;
        this.name = "";
    }
    drow(){
        b_context.fillStyle = this.color;
    }
}
class Rectangle extends Basic_figure{
    constructor(){
        super(Basic_figure.color);
        this.name = "Прямоугольник";
    }
    drow(){
        super.drow();
        b_context.fillRect(this.start_x, this.start_y, this.x, this.y);  
    }
}
class Triangle extends Basic_figure{
    constructor(){
        super(Basic_figure.color);
        this.name = "Треугольник";
    }
    drow(){
        super.drow();
        b_context.beginPath();
        b_context.moveTo(this.start_x,this.start_y);
        b_context.lineTo(this.start_x+this.x,this.start_y+this.y);
        b_context.lineTo(this.start_x-this.x,this.start_y+this.y);
        b_context.fill();
    }
}
class Ellips extends Basic_figure{
    constructor(){
        super(Basic_figure.color);
        this.name = "Эллипс";
    }
    drow(){
    super.drow();
    b_context.beginPath();
    b_context.ellipse(this.start_x, this.start_y, Math.abs(this.x),Math.abs(this.y), 90 * Math.PI/180, 0, 2 * Math.PI);
    b_context.fill();
    }
}
class Line extends Basic_figure{
    constructor(){
        super(Basic_figure.color);
        this.name = "Линия";
    }
    drow(){
    b_context.strokeStyle=this.color;
    b_context.beginPath();
    b_context.moveTo(this.start_x,this.start_y);
    b_context.lineWidth=5;
    b_context.lineTo(this.start_x+this.x,this.start_y+this.y);
    b_context.stroke();
    }
}
Basic_figure.color = "#000";
Basic_figure.figure_name = "Rectangle";
Basic_figure.active_number = -1;
let mass_of_figures = [];
let layers = document.getElementById("layers");
let tool_bar = document.getElementById("tools_bar")
let b_canvas = document.getElementById("myCanvas");
let palitra = document.getElementById("palitra");
let b_context = b_canvas.getContext("2d");



tool_bar.onclick = function(event){
    let id;
    let target = event.target;
    let colors_buttons = document.getElementsByClassName("tool_img")
    if (target.id != 'tools_bar') {
        for (let i = 0; i < colors_buttons.length; i++ ){
            colors_buttons[i].removeAttribute("style");
        }
   target.setAttribute("style", "box-shadow: 0 0 10px rgba(255, 251, 0, 0.5);")
    id = target.id;
    switch(id){
        case "tool_line": Basic_figure.figure_name = "Line"; break;
        case "tool_rect": Basic_figure.figure_name = "Rectangle"; break;
        case "tool_ellipse": Basic_figure.figure_name = "Ellips"; break;
        case "tool_triangl": Basic_figure.figure_name = "Triangle"; break;
    }
    }
}

palitra.onclick = function(event){
    let id;
    let target = event.target;
    let colors_buttons = document.getElementsByClassName("colors_buttons")
    if (target.id != 'palitra') {
        for (let i = 0; i < colors_buttons.length; i++ ){
            colors_buttons[i].removeAttribute("style");
        }
   target.setAttribute("style", "box-shadow: 0 0 10px rgba(255, 251, 0, 0.5); border: 1px white solid;")
    id = target.id;
    switch(id){
        case "black_button": Basic_figure.color = "#000"; break;
        case "blue_button": Basic_figure.color = "#0076a3"; break;
        case "pink_button": Basic_figure.color = "#f06eaa"; break;
        case "yellow_button": Basic_figure.color = "#fff568"; break;
    }
    }
}
let move_on_mosedown = function(e){ 
    document.onmousemove = function(e){
    b_context.clearRect(0,0,b_canvas.clientWidth,b_canvas.clientHeight);
    mass_of_figures[Basic_figure.active_number].start_x = e.pageX - b_canvas.offsetLeft;
    mass_of_figures[Basic_figure.active_number].start_y = e.pageY - b_canvas.offsetTop;
    mass_of_figures[Basic_figure.active_number].x += e.pageX - b_canvas.offsetLeft-mass_of_figures[Basic_figure.active_number].start_x;
    mass_of_figures[Basic_figure.active_number].y += e.pageY - b_canvas.offsetTop-mass_of_figures[Basic_figure.active_number].start_y;
    for (let i = 0; i < mass_of_figures.length; i++) {
        if (mass_of_figures[i]!==undefined){
        mass_of_figures[i].drow();
        }
    }
  }
//   ddddddd
  b_canvas.onmouseup = function(){
    document.onmousemove = null;
    b_canvas.onmouseup = null;
    console.log(mass_of_figures);
}
}
let drow_on_mousedown = function(e){ 
    mass_of_figures.push(eval (`new ${Basic_figure.figure_name}()`));
    mass_of_figures[mass_of_figures.length-1].start_x = e.pageX - b_canvas.offsetLeft;
    mass_of_figures[mass_of_figures.length-1].start_y = e.pageY - b_canvas.offsetTop;

    let layer = document.createElement('div');
    layer.className = `layers_element`;
    layer.id = `layer${mass_of_figures.length-1}`;
    layer.innerHTML = `${mass_of_figures[mass_of_figures.length-1].name} № ${mass_of_figures.length}`;
    layers.appendChild(layer);

    document.onmousemove = function(e){
        b_context.clearRect(0,0,b_canvas.clientWidth,b_canvas.clientHeight);
        mass_of_figures[mass_of_figures.length-1].x = e.pageX - b_canvas.offsetLeft-mass_of_figures[mass_of_figures.length-1].start_x;
        mass_of_figures[mass_of_figures.length-1].y = e.pageY - b_canvas.offsetTop-mass_of_figures[mass_of_figures.length-1].start_y;
        for (let i = 0; i < mass_of_figures.length; i++) {
            if  (mass_of_figures[i]!==undefined){
            mass_of_figures[i].drow();}
        }
    }

    b_canvas.onmouseup = function(){
        document.onmousemove = null;
        b_canvas.onmouseup = null;
        console.log(mass_of_figures);
    }
    
}

b_canvas.onmousedown = function(e){
    if (Basic_figure.active_number!==-1){
        console.log(Basic_figure.active_number);
        move_on_mosedown(e);
    }
    else{
        console.log(Basic_figure.active_number);
        drow_on_mousedown(e);
    }
}

document.onkeydown = function(event){
    if (event.keyCode!==46){
        return;
    }
    else{
        if (Basic_figure.active_number===-1){
            return;
        }
        else{
            console.log(Basic_figure.active_number);
            let layer = document.getElementById(`layer${Basic_figure.active_number}`);
            layer.setAttribute("style", "display:none;");
            delete mass_of_figures[Basic_figure.active_number];
            Basic_figure.active_number=-1;
        }
    }
}
layers.onclick = function(e){
    let num;
    let target = event.target;
     num = parseInt(target.id.replace(/\D+/g,""));
     for (let i = 0; i < layers_elements.length; i++ ){
         if (layers_elements[i]!==undefined){
        layers_elements[i].removeAttribute("style");
         }
    }
    if (!isNaN(num)){
    Basic_figure.active_number = num;
    let layer = document.getElementById(`layer${num}`);
    if (layer.hasAttribute(name)){
        if (layer.getAttribute(style)!=="display:none;"){
            layer.setAttribute("style", "box-shadow: 0 0 10px rgba(255, 251, 0, 0.5);");
            }
    }
    else{
        layer.setAttribute("style", "box-shadow: 0 0 10px rgba(255, 251, 0, 0.5);");
    }
   
    }
    else{
        num = -1;
        Basic_figure.active_number = num;
    }
    console.log(num);
    
}

