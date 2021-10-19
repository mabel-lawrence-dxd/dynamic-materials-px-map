const canvas = document.getElementById("pixelMap");
let context = canvas.getContext("2d");

export default function drawBackground(){
    context.beginPath();
    context.moveTo(0,0);
    context.lineTo(1920,0);
    context.lineTo(1920,1080);
    context.lineTo(0,1080);
    context.fillStyle = "#FFFFFF"
    context.fill();
}