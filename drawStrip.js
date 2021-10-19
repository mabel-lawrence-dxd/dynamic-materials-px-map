const canvas = document.getElementById("pixelMap");
let context = canvas.getContext("2d");

export default function drawStrip(){
    context.beginPath();
    context.moveTo(100,100);
    context.lineTo(102,100);
    context.lineTo(102,196);
    context.lineTo(100,196);
    context.fillStyle = "#FF0000"
    context.fill();
}