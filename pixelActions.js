const canvas = document.getElementById("pixelMap");
let context = canvas.getContext("2d");
let image = context.createImageData(1, 1); // pixel image
let data = image.data;

function drawPixelRGB(x,y,color){
    data[0] = color[0]
    data[1] = color[1]
    data[2] = color[2]
    data[3] = 255;
    context.putImageData(image,x,y)
}

function draw4x4RGB(x,y,colors){
    let colorIdx = 0;
    for(let row=0; row<4;row++){
        for(let col = 0; col<4;col++){
            drawPixelRGB(x+col,y+row,colors[colorIdx]);
            colorIdx++;
        }
    }
}

function read4x4(x,y){
    const imgData = context.getImageData(x,y,4,4); 
    let fourPxColors = [];
    for (let i = 0; i < imgData.data.length; i+=4){
        let currentPx = imgData.data.slice(i,i+3);
        fourPxColors.push(currentPx);
    }
    return fourPxColors;
}

export {draw4x4RGB, read4x4}