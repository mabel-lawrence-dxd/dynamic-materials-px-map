const canvas = document.getElementById("pixelMap");
let context = canvas.getContext("2d");

export default function drawString(){
    context.beginPath();
    context.moveTo(292,100);
    context.lineTo(293,100);
    context.lineTo(293,108);
    context.lineTo(292,108);
    context.fillStyle = "#0000FF"
    context.fill();
}

// export {drawString}