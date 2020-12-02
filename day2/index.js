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
        console.error(`password: ${password.password} : doesn't match: ^([^${search_str}]*${search_str}[^${search_str}]*){${password.min},${password.max}}$`)
    }
   
});
console.log(valid_passwords)
