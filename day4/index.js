const fs = require('fs');

var filename = process.argv[2];
console.log(`reading values from ${filename}`)
const map = fs.readFileSync(filename).toString().split("\n").map((item) => {
    return item.split("").map((spot)=>{
        return(spot === "#"? 1 : 0)
    })
});





