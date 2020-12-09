const {match} = require('assert');
const fs = require('fs');
const { exit, nextTick } = require('process');

var filename = process.argv[2];
console.log(`reading values from ${filename}`)
const numbers = fs.readFileSync(filename).toString().split(/\n/).map((number) => {
    return(Number(number))
})

const preamble = 25

numbers.some((number, i) => {
 if(i > preamble){
     var c_num = numbers.slice(i - (preamble + 1), i)
     c_num = c_num.filter((t_num)=>{
        return c_num.some((i_num)=>{
            return t_num + i_num == number
         })
    }) 
    // debugging
    // console.log(c_num)
    if(!c_num.length > 0){
        console.log(`The answer to part one is ${number}`)
        return true
    }
    return false
 }
});
