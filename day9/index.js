const {match} = require('assert');
const fs = require('fs');
const { exit, nextTick } = require('process');

var filename = process.argv[2];
console.log(`reading values from ${filename}`)
const numbers = fs.readFileSync(filename).toString().split(/\n/).map((number) => {
    return(Number(number))
})

const preamble = 25
let f_num = 0
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
        f_num = number
        return true
    }
    return false
 }
});

// Part two
var found = {}
numbers.forEach((t_num, i)=>{
    var acc = t_num
    var f_i = i+1
    var sub_arr = numbers.slice(i + 1, numbers.length - 1)
    sub_arr.some((i_num, ii)=>{
        acc = acc + i_num
        f_i++
        // console.log(acc)
        return acc >= f_num
    })
    // console.log(`${acc}, ${f_num}`)
    if(acc == f_num){
        found = {start: i, end:f_i, sum: acc, arr: numbers.slice(i, f_i)}
    }
})
const min = Math.min(...found.arr)
const max = Math.max(...found.arr)
console.log(`The answer to part two is: ${min+max}`)