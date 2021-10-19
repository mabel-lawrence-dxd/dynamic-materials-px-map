import {draw4x4RGB, read4x4} from './pixelActions.js'

export default function reverseMask(startX,startY){
    for(let row = 0; row < 128; row+=4){
        if(row%16!==0){
        }
        else{
            for(let col = 0; col < 80; col+=8){
                let colorSection = read4x4(col+startX, row+startY);
                    draw4x4RGB(((col)/2)+252,((row)/4)+150,colorSection);
                    draw4x4RGB(col + 100 + startX,row+100+startY,colorSection);
            }
        }
    }
}