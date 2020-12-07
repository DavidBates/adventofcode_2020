const {match} = require('assert');
const fs = require('fs');


var filename = process.argv[2];
console.log(`reading values from ${filename}`)
groups = []
sp_groups = []
s_group = []
sp_s_groups = []
const answers = fs.readFileSync(filename).toString().split(/\n/).map((group) => {

    group.split(/\n/).map((sub_group) => {
        if (sub_group[0] === undefined) {
            sp_groups.push(sp_s_groups)
            sp_s_groups = []
            groups.push(s_group)
            s_group = []

        } else {

            sp_s_groups.push(group.split(''))
            sub_group.split('').map((s_char) => {
                if (!s_group.includes(s_char)) {
                    s_group.push(s_char)
                }
            })


        }
    })
})

console.log(`The number of groups for part 1 is: ${
    groups.reduce((acc, element) => acc + element.length, 0)
}`)
var score = 0
sp_groups.forEach(answer_group => {
    if (answer_group.length == 1) {
        score = score + answer_group[0].length
    } else { // console.log(answer_group)
        var counts = {};

        answer_group.toString().split(',').forEach(function (x) {
            counts[x] = (counts[x] || 0) + 1;
        })
        // console.log(counts)
        // console.log(answer_group.length)
        Object.keys(counts).forEach((key) => {
            if (counts[key] == answer_group.length) {
                score = score + 1
            }
        });
    }

});
console.log(`The number of answers for part two is ${score}`)
