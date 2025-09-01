
let drawing = false; // Initailly we are not drawing

// Getting all DOM objects
let canvas   = document.getElementById("pad");
let ClearBtn = document.getElementById("clear-btn");
let SaveBtn  = document.getElementById("save-btn");

const ctx    = canvas.getContext("2d"); //Provide us drawing tools

// Adding the event listeners
SaveBtn.addEventListener("click", save_sign);
ClearBtn.addEventListener("click", clear_pad);
canvas.addEventListener("mousedown", ()=> drawing = true);
canvas.addEventListener("mouseup", stop_draw);
canvas.addEventListener("mousemove", draw);

function stop_draw(e){
    drawing = false;
    ctx.beginPath(); // Start from new point It will not join it with old one
};

function draw(e){
    if(!drawing) return;
    let CanvasCords = canvas.getBoundingClientRect();
    // Getting cordinates (X, Y)
    let X = e.clientX - CanvasCords.left; 
    let Y = e.clientY - CanvasCords.top;
    ctx.lineWidth = 2;
    ctx.lineCap   = "round";
    ctx.strokeStyle = "black";
    ctx.lineTo(X, Y); //draw a line
    ctx.stroke();
    ctx.beginPath(); // Start new path
    ctx.moveTo(X, Y); // Move pen to current position
    // lineTo, stroke, beginPath, moveTo are responsible for smooth line
}

function clear_pad(e){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};

function save_sign(e){
    let link      = document.createElement("a");
    link.download = "signture.png"; // It will be the filename
    link.href     = canvas.toDataURL("image/png");
    link.click();
};