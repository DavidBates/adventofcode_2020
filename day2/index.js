const fs = require('fs');
const { exit } = require('process');

var filename = process.argv[2];
console.log(`reading values from ${filename}`)
const passwords = fs.readFileSync(filename).toString().split("\n").map((item) => {
    const parts = item.match(/([0-9]*)-([0-9]*)\s{1}(.*):\s{1}(.*)/)
    if(parts.length == 5){
        return {'min': parts[1], 'max': parts[2], 'search_str':parts[3], 'password':parts[4]}
    }
    else{
        console.error(`Problem in parsing ${item}`)
        exit(1)
    }
});

var valid_passwords = 0
passwords.forEach((password) => {
    const search_str = password.search_str.replace('\.g', '\\\.')
    const regex = new RegExp( `^([^${search_str}]*${search_str}[^${search_str}]*){${password.min},${password.max}}$` )
    if(regex.test(password.password)){
        valid_passwords++
    }
    else{
        // For debugging
        // console.log(`password: ${password.password} : doesn't match: ^([^${search_str}]*${search_str}[^${search_str}]*){${password.min},${password.max}}$`)
    }
   
});
console.info(`There are ${valid_passwords} valid passwords for the first portion of day 2`)

// Second portion: 
valid_passwords = 0

passwords.forEach((password) => {
 first = password.password.substr(Number(password.min) - 1, password.search_str.length)
 second = password.password.substr(Number(password.max) - 1, password.search_str.length)
 pass1 = first === password.search_str
 pass2 = second === password.search_str
 if((pass1 || pass2) && !(pass1&&pass2)){
    valid_passwords++
 }

});
console.info(`There are ${valid_passwords} valid passwords for the second portion of day 2`)

