const fs = require('fs');
const { exit } = require('process');

var filename = process.argv[2];
console.log(`reading values from ${filename}`)
const passwords = fs.readFileSync(filename).toString().split("\n").map((item) => {
    const parts = item.match(/([0-9]*)-([0-9]*)\s{1}(.*):\s{1}(.*)/)
    if(parts.length == 5){
        // console.log(parts[3].replace('.', '\\.'))
        return {'min': parts[1], 'max': parts[2], 'search_str':parts[3], 'password':parts[4]}
    }
    else{
        console.error(`Problem in parsing ${item}`)
        exit(1)
    }
});

var valid_passwords = 0
passwords.forEach((password) => {
    // const regex = new RegExp( `(.*${password.search_char.replace('.', '\.')}.*){${password.min},${password.max}}` )
    const regex = new RegExp( `^([^a]*${password.search_str.replace('\.g', '\\\.')}[^a]*){${password.min},${password.max}}$` )
    
    if(regex.test(password.password)){
        valid_passwords++
    }
    else{
        console.log(`password: ${password.password} : doesn't match: ^([^a]*${password.search_str}[^a]*){${password.min},${password.max}}$`)
    }
   
});
console.log(valid_passwords)
// password: jbmjjjrcjj : doesn't match: ^([^a]j[^a]*){2,10}$
// ^([^a]*a[^a]*){3,5}$
// var regex = !new RegExp(/([0-9]{1})-([0-9]{1}).*?([[:alnum:]]{1}).*/)
// searchText.match(/([0-9]{1})-([0-9]{1}).*?([[:alnum:]]{1}).*/)
// searchText.match()