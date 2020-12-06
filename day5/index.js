const {match} = require('assert');
const fs = require('fs');

const parse_pass = (pass)=>{
    const rows = 127
    const cols = 8 

    var row_array = Array.from(Array(rows), (x, index) => 0 + index);
    var cols_array = Array.from(Array(cols), (x, index) => 0 + index);
    pass.split('').map((letter)=>{
  
        switch(letter){
            case 'B':
                row_array = row_array.splice(Math.ceil(row_array.length / 2), row_array.length)
                break;
            case 'F':
                row_array = row_array.splice(0, Math.ceil(row_array.length / 2))
                break;
            case 'L':
                cols_array = cols_array.splice(0, Math.ceil(cols_array.length / 2))
                break;
            case 'R':
                cols_array = cols_array.splice(Math.ceil(cols_array.length / 2), cols_array.length)
                break;
        }
    })
    return{pass:pass, row:row_array[0], col:cols_array[0], seatID:row_array[0]*8+cols_array[0]}
    // debugging
    // console.log(`${row_array[0]}, ${cols_array[0]}, ${row_array[0]*8+cols_array[0]}`)
}

var filename = process.argv[2];
console.log(`reading values from ${filename}`)
const bpasses = fs.readFileSync(filename).toString().split(/\n/).map((item)=>{
    return parse_pass(item)
})

bpasses.sort((a,b)=>(a.seatID > b.seatID)? -1 : 1)
console.log(`The highest boarding pass for part 1 is: ${bpasses[0].seatID}`)

//Part two
bpasses.forEach((pass, i, list)=>{
   
    if(list[i-1] && !(list[i-1].seatID === pass.seatID + 1)){
        const empty = pass.seatID + 1
         console.log(empty)
    }
})



