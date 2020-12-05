const {match} = require('assert');
const fs = require('fs');

var filename = process.argv[2];
console.log(`reading values from ${filename}`)
const passports = fs.readFileSync(filename).toString().split(/\n\n/).map((item) => {
    var passport = {}
    item.split(/\n/).map((lines) => {
        lines.split(" ").map((fields) => {
            parts = fields.split(":")
            passport[parts[0]] = parts[1]
        })
    })
    return passport
});

// Part 1
var valid_passports = 0
const required_fields = [
    'byr',
    'iyr',
    'eyr',
    'hgt',
    'hcl',
    'ecl',
    'pid'
]
passports.forEach((passport) => {

    const passed = required_fields.every((rf) => {
        return passport.hasOwnProperty(rf)
    })
    if (passed) {
        valid_passports++
    }
})
console.log(`There are ${valid_passports} for the first part`)

// Part 2

valid_passports = 0
// I would normally do some kind of validation class that each type could extend but this seems resonable. 
const required_field_obj = {
    'byr': {
        'regex': new RegExp(/^([0-9]{4})$/),
        'range': [1920, 2002]
    },
    'iyr': {
        'regex': new RegExp(/^([0-9]{4})$/),
        'range': [2010, 2020]
    },
    'eyr': {
        'regex': new RegExp(/^([0-9]{4})$/),
        'range': [2020, 2030]
    },
    'hgt': {
        'regex': new RegExp(/^([0-9]*)(cm|in)$/),
        'range': {
            'cm': [
                150, 193
            ],
            'in': [59, 76]
        }
    },
    'hcl': {
        'regex': new RegExp(/^#[0-9a-f]{6}$/)
    },
    'ecl': {
        'regex': new RegExp(/^(amb|blu|brn|gry|grn|hzl|oth)$/)
    },
    'pid': {
        'regex': RegExp(/^[0-9]{9}$/)
    }
}
passports.forEach((passport) => {
    is_valid = []
    Object.keys(required_field_obj).forEach((rf) => {
        if (passport.hasOwnProperty(rf)) {
            if (required_field_obj[rf].hasOwnProperty("regex")) {
                if (required_field_obj[rf].regex.test(passport[rf])) {
                    matches = passport[rf].match(required_field_obj[rf].regex)
                    if (required_field_obj[rf].hasOwnProperty("range")) {
                        // Detecting if the validation is a measurement or not. 
                        if (required_field_obj[rf].range.hasOwnProperty("cm")) {
                            var range = required_field_obj[rf].range[matches[2]]
                            if (!(Number(matches[1]) >= range[0] && Number(matches[1]) <= range[1])) {
                                is_valid.push(false)
                            }
                        } else {
                            var range = required_field_obj[rf].range

                            if (!(Number(matches[1]) >= range[0] && Number(matches[1]) <= range[1])) {
                                is_valid.push(false)
                            }
                        }
                    }
                } else {
                    is_valid.push(false)
                }
            }
        } else 
            is_valid.push(false)
        
    })
    // Debugging
    // console.log('---------')
    // console.log(passport)
    // console.log(is_valid)
    // console.log('---------')
    if (is_valid.every(value => value)) {
        valid_passports++
    }
})
console.log(`There are ${valid_passports} for the second part`)
