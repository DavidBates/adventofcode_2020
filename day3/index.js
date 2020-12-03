const fs = require('fs');

var filename = process.argv[2];
console.log(`reading values from ${filename}`)
const map = fs.readFileSync(filename).toString().split("\n").map((item) => {
    return item.split("").map((spot)=>{
        return(spot === "#"? 1 : 0)
    })
});

const slopes = [[1,1],[3,1],[5,1],[7,1],[1,2]]
const trees = slopes.map((slope)=>{
    var cur_x = 0
    var cur_y = 0
    var num_trees = 0
    var num_columns = map[0].length
    var num_rows = map.length
    for (;;) {
        cur_x += slope[0] ; 
        if(cur_x >= num_columns){
            cur_x = cur_x - num_columns
        }
        cur_y += slope[1];
        if(cur_y >= num_rows){
            console.log(`number of trees for (${slope[0]}, ${slope[1]}) is: ${num_trees}`)
            break;
        }
        spot = map[cur_y][cur_x]
        num_trees = num_trees + spot
        // For Debug
        // console.log(`x = ${cur_x}, y = ${cur_y}`)
        // console.log(spot)
        // console.log(`${map[cur_y]}:Val: ${map[cur_y][cur_x]}`)
    }
    return num_trees
})

console.log(`Multiplied slopes are: ${trees.reduce( (a, b) => a * b )}`)



