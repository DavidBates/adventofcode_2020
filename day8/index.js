const {match} = require('assert');
const fs = require('fs');
const { exit } = require('process');


var filename = process.argv[2];
console.log(`reading values from ${filename}`)
const instructions = fs.readFileSync(filename).toString().split(/\n/).map((instruction) => {
    let inst = instruction.split(' ')
    let parts = inst[1].match(/([^0-9]{1})([0-9]*)/)
    return({do:inst[0], op:parts[1], val:parts[2]})

})
var acc = 0
var executed = []
const execute_instruction = (inst, inst_list)=>{
    instruction = inst_list[inst]
    executed.push({instruction, pos:inst})
    switch (instruction.do){
        case 'nop':
            return inst + 1
            break
        case 'acc':
            switch(instruction.op){
                case '+':
                    acc = acc + Number(instruction.val)
                    break
                case '-':
                    acc = acc - Number(instruction.val)
                    break
            }
            return inst + 1
            break
        case 'jmp':
            switch(instruction.op){
                case '+':
                    inst = inst + Number(instruction.val)
                    break
                case '-':
                    inst = inst - Number(instruction.val)
                    break
            }
            return inst
            break

    }
}

var ops_log = []
var instruction = 0
do{
    ops_log.push(instruction)
    instruction = execute_instruction(instruction, instructions)
}
while(!ops_log.includes(instruction))
console.log(`the answer to part one is: ${acc}`)
console.log(executed.slice(1).slice(-10))
// Part two

const tests = executed.filter(item => item.instruction.do === 'jmp' || item.instruction.do === 'nop')
console.log(tests)
tests.forEach((op)=>{
    ops_log = []
    acc = 0
    instruction = 0
    executed = []
    test_instructions = JSON.parse(JSON.stringify(instructions));
    console.log(test_instructions[op.pos])
        test_instructions[op.pos].do = test_instructions[op.pos].do === 'jmp' ? 'nop' : 'jmp'
    
    console.log(test_instructions[op.pos])
    do{ 
        ops_log.push(instruction)
        instruction = execute_instruction(instruction, test_instructions)
        console.log(test_instructions.length)
        if(instruction >= test_instructions.length){
            console.log(acc)
            console.log(`the answer for part two is ${acc}`)
            exit(0)
        }
        
    }while(!ops_log.includes(instruction))
    console.log(executed)
})