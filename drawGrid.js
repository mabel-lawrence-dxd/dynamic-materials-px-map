const canvas = document.getElementById("pixelMap");
let context = canvas.getContext("2d");

export default function drawGrid(){
    context.beginPath();
    context.moveTo(252,100);
    context.lineTo(292,100);
    context.lineTo(292,132);
    context.lineTo(252,132);
    context.fillStyle = "#00FF00"
    context.fill();
}