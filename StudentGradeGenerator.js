const prompt = require("prompt-sync")({sigint:true});

let studentMarks = parseInt(prompt("Enter student marks: "));
let grade;
switch (true) {
    case studentMarks > 79:
        grade = "A";
        break;
    
    case studentMarks >=  60 && studentMarks <= 79:
        grade = "B";
        break;
        
    case studentMarks >= 50 && studentMarks <= 59:
        grade = "C";
        break;
    
    case studentMarks >= 40 && studentMarks <= 49:
        grade = "D";
        break;

    case studentMarks < 40:
        grade = "E";
        break;

    default:
        console.log("Enter valid marks");
        break;    
}

console.log(grade);