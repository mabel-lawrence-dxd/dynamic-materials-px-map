import {draw4x4RGB, read4x4} from './pixelActions.js'

//every other 4x4 node is missing in the x direction
//every 2nd-3rd node is missing in the y direction
/*** e.g. where "X" is a 4x4 node and "-" is a space
 X - X - X - X -
 - - - - - - - -
 - - - - - - - -
 - - - - - - - -
 X - X - X - X -
***/

const numColNodes = 10;
const numRowNodes = 8;
const numPxPerNode = 4;
const colFreq = 1/2;
const rowFreq = 1/4;

export default function reverseMask(startX,startY){
    for(let row = 0; row < numRowNodes*numPxPerNode*(1/rowFreq); row+=numPxPerNode){
        if(row%(numPxPerNode*(1/rowFreq))!==0){
        }
        else{
            for(let col = 0; col < numColNodes*numPxPerNode*(1/colFreq); col+=numPxPerNode*(1/colFreq)){
                let colorSection = read4x4(col+startX, row+startY);
                    draw4x4RGB(((col)/2)+252,((row)/4)+150,colorSection);
                    draw4x4RGB(col + 100 + startX,row+100+startY,colorSection);
            }
        }
    }
}