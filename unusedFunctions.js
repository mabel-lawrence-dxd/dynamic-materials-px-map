    function readPixelData() {
        const manipulatedImgData = context.getImageData(START_IMAGE_PREVIEW_X,START_IMAGE_PREVIEW_Y,80,128);
        let picturePx = [];
        for (let i = 0; i < manipulatedImgData.data.length; i+=4){
            let currentPx = manipulatedImgData.data.slice(i,i+3);
            picturePx.push(currentPx);
        }
        return picturePx;
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
    console.log(filtered);

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

    function draw4x4(x,y){
        // console.log('DRAW 4x4 at:', x,y)
        for(let col = x; col< x+4; col++){
            for(row = y; row < y + 4; row++){
                drawPixel(col,row,black);
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