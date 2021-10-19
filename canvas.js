document.addEventListener('DOMContentLoaded',domLoaded,false);
const START_IMAGE_PREVIEW_X = 252;
const START_IMAGE_PREVIEW_Y = 200;
const START_REMAP_X = 352;
const START_REMAP_Y = 200;
function domLoaded(){
    const canvas = document.getElementById("pixelMap");
    let context = canvas.getContext("2d");
    let image = context.createImageData(1, 1); // pixel image
    let data = image.data;
    const black = {r: 0, g: 0, b: 0, a:255};

    let puppyPic = new Image();
    puppyPic.src = document.getElementById("puppy").src;

    drawMap();
    const picturePx = readPixelData();
    const filtered = filterPixels();
    reMapFiltered();

    /************************* HELPER FUNCTIONS *************************/
    
    function drawMap(){
        // drawGridWithSpacing();
        drawStrip();
        drawGrid();
        drawString();
        context.drawImage(puppyPic,START_IMAGE_PREVIEW_X,START_IMAGE_PREVIEW_Y,80,128)
        // drawMask()
        // read4x4(252,200)
        // newMask(START_IMAGE_PREVIEW_X,START_IMAGE_PREVIEW_Y);
        reverseMask(START_IMAGE_PREVIEW_X,START_IMAGE_PREVIEW_Y);
    }

    function readPixelData() {
        const manipulatedImgData = context.getImageData(START_IMAGE_PREVIEW_X,START_IMAGE_PREVIEW_Y,80,128);
        let picturePx = [];
        for (let i = 0; i < manipulatedImgData.data.length; i+=4){
            let currentPx = manipulatedImgData.data.slice(i,i+3);
            picturePx.push(currentPx);
        }
        return picturePx;
    }

    function read4x4(x,y){
        const imgData = context.getImageData(x,y,4,4); 
        let fourPxColors = [];
        for (let i = 0; i < imgData.data.length; i+=4){
            let currentPx = imgData.data.slice(i,i+3);
            fourPxColors.push(currentPx);
        }
        console.log(fourPxColors);
        return fourPxColors;
    }

    function newMask(startX,startY){
        console.log('REVERSE MASK')
        for(let row = 0; row < 128; row+=4){
            if(row%16!==0){
                for(let col = startX; col < startX+80; col+=4){
                    draw4x4(col,row+startY);
                }
            }
            else{
                for(let col = 4; col < 80; col+=8){
                    draw4x4(col+startX,row+startY);
                }
            }
        }
    }

    function reverseMask(startX,startY){
        let check = true;
        console.log('REVERSE MASK')
        for(let row = 0; row < 128; row+=4){
            if(row%16!==0){
            }
            else{
                for(let col = 0; col < 80; col+=8){
                    // draw4x4(col+startX,row+startY);
                    let colorSection = read4x4(col+startX, row+startY);
                        draw4x4RGB(((col + 100 + startX)/2)+100,((row+100+startY)/4)+300,colorSection);
                        draw4x4RGB(col + 100 + startX,row+100+startY,colorSection);
                }
            }
        }
    }

    function draw4x4RGB(x,y,colors){
        // console.log('DRAW 4x4 RGB: ', colors)
        let colorIdx = 0;
        for(let row=0; row<4;row++){
            for(let col = 0; col<4;col++){
                // console.log(col,row)
                // console.log('4x4 RGB individual: ',colors[colorIdx])
                drawPixelRGB(x+col,y+row,colors[colorIdx]);
                colorIdx++;
            }
        }
    }
    
    function filterPixels(){
        const filtered = [];
        let idx = 0;
        let startBlackVert = 79;
        let rowIdx = 0;
        while(idx<10240){
            if(idx === startBlackVert){
                idx+=240;
                startBlackVert = startBlackVert+240+80;
                rowIdx = 0;
            }else{
                if(rowIdx%2===0){
                    filtered.push(picturePx[idx]);
                }
                idx++
            }
            rowIdx++;
        }
        return filtered;
    }
    // console.log(filtered);

    function reMapFiltered(){
        let pxTrace = 0;
        for(let j = START_REMAP_Y; j<START_REMAP_Y+32; j++){
            for(let i = START_REMAP_X; i<START_REMAP_X+40; i++){
                drawPixelRGB(i,j,filtered[pxTrace]);
                pxTrace++;
            }
        }
    }
    
    //create mask for pixel grid in physical space
    function drawMask(){
        for (let i = START_IMAGE_PREVIEW_X; i < START_IMAGE_PREVIEW_X+80; i++){
            for(let j = START_IMAGE_PREVIEW_Y; j< START_IMAGE_PREVIEW_Y+128; j++){
                if(i%2===1){
                    drawPixel(i,j,black);
                }
                if(j%4!==0){
                    drawPixel(i,j,black);
                }
            }
        }
    }

    function drawPixel(x, y, color) {
        data[0] = color.r;
        data[1] = color.g;
        data[2] = color.b;
        data[3] = color.a;

        context.putImageData(image, x, y);
    }

    function draw4x4(x,y){
        // console.log('DRAW 4x4 at:', x,y)
        for(let col = x; col< x+4; col++){
            for(row = y; row < y + 4; row++){
                drawPixel(col,row,black);
            }
        }
    }

    function drawPixelRGB(x,y,color){
        data[0] = color[0]
        data[1] = color[1]
        data[2] = color[2]
        data[3] = 255;
        context.putImageData(image,x,y)
    }

    function drawStrip(){
        context.beginPath();
        context.moveTo(100,100);
        context.lineTo(102,100);
        context.lineTo(102,196);
        context.lineTo(100,196);
        context.fillStyle = "#FF0000"
        context.fill();
    }

    function drawGrid(){
        context.beginPath();
        context.moveTo(252,100);
        context.lineTo(292,100);
        context.lineTo(292,132);
        context.lineTo(252,132);
        context.fillStyle = "#00FF00"
        context.fill();
    }

    function drawGridWithSpacing(){
        context.beginPath();
        context.moveTo(252,500);
        context.lineTo(332,500);
        context.lineTo(332,628);
        context.lineTo(252,628);
        context.fillStyle = "#00BB00"
        context.fill();
    }

    function drawString(){
        context.beginPath();
        context.moveTo(292,100);
        context.lineTo(293,100);
        context.lineTo(293,108);
        context.lineTo(292,108);
        context.fillStyle = "#0000FF"
        context.fill();
    }
}