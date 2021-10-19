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

    //pixel map for the 2x96 light tube
    drawStrip();
    //pixel map for the 40x32 grid
    drawGrid();
    //pixel map for the 1x8 pixels on a string
    drawString();
    //preview of image to remap for grid
    context.drawImage(puppyPic,START_IMAGE_PREVIEW_X,START_IMAGE_PREVIEW_Y,80,128)
    //remapped pixels (in 4x4) nodes accounting for physical space
    reverseMask(START_IMAGE_PREVIEW_X,START_IMAGE_PREVIEW_Y);

}