const prompt = require("prompt-sync")({sigint:true});

const speed = parseInt(prompt("Car Speed: "));
let points = 0;
let i = 71;

if (speed < 70){
    console.log("OK")
}
else{
    while(i >= 70){
        if (i === speed + 1){
            break;
        }
        else if(points === 12){
            console.log("Licence Suspended");
            break;
        }
        else{
            if (i % 5 === 0){
                points++;
                i++;
            }
            else {
                i++
            }
        }
    }
}
console.log(points);

