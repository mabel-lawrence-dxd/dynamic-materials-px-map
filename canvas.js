import drawString from './drawString.js'
import drawGrid from './drawGrid.js'
import drawStrip from './drawStrip.js'
import reverseMask from './reverseMask.js'

document.addEventListener('DOMContentLoaded',domLoaded,false);
const START_IMAGE_PREVIEW_X = 252;
const START_IMAGE_PREVIEW_Y = 200;
function domLoaded(){
    const canvas = document.getElementById("pixelMap");
    let context = canvas.getContext("2d");

    let puppyPic = new Image();
    puppyPic.src = document.getElementById("puppy").src;

    drawStrip();
    drawGrid();
    drawString();
    context.drawImage(puppyPic,START_IMAGE_PREVIEW_X,START_IMAGE_PREVIEW_Y,80,128)
    reverseMask(START_IMAGE_PREVIEW_X,START_IMAGE_PREVIEW_Y);

}