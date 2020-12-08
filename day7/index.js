const {match} = require('assert');
const fs = require('fs');
const util = require('util')
const neo4j = require('neo4j-request');
const { exit } = require('process');
const { setupMaster } = require('cluster');
const { count } = require('console');


neo4j.init(
    'neo4j://localhost',
    'neo4j', 'password'
  )

var filename = process.argv[2];
console.log(`reading values from ${filename}`)
var bags = []

const add_get_bag = (color)=>{
    var bag = bags.find(b => b.color === color)
    if(!bag){
        bag = {color: color, id: bags[bags.length - 1]? bags[bags.length - 1].id + 1 : 0}
        bags.push(bag)
    }
    return bag
}

const rules = fs.readFileSync(filename).toString().split(/\n/).map((rule) => {
    let parts = rule.split('contain')
    let container = add_get_bag(parts[0].match(/^\s?([\w]*\s[\w]*).*$/)[1])
    
    let contents = parts[1].split(',').map((bag)=>{
        if(!bag.includes('no other bags')){
            let cc = bag.match(/^\s?([0-9]*)\s([\w]*\s[\w]*).*$/)
            var match_bag = add_get_bag(cc[2])
            return({count:cc[1], bag:match_bag})
        }
        
    })
    return({container:container, contents:contents })
})

// Create Objects: 
let c_statements = []
bags.forEach((bag)=>{
    c_statements.push({
        statement: `CREATE (bag:Bag{color:$bColor, id:$bid})`,
        parameters: {bColor:bag.color, bid:bag.id}
    })
})

let statements = []
rules.forEach((rule)=>{
     rule.contents.forEach((contained)=>{
        if(contained){
            statements.push({
                statement: 'MATCH (cbag:Bag),(bbag:Bag) WHERE cbag.id = $coid AND bbag.id = $cid MERGE (cbag)-[r:CONTAINS{bcount:$count}]->(bbag) return r',
                parameters: {
                    coid: rule.container.id,
                    cid:contained.bag.id,
                    count:contained.count
                }
            })
        }
        
    })
})

var clear_db = async()=>{
    await neo4j.writeTransaction(`match(n)-[b]-() delete n,b`)
}

var run_create_commands = async(c_statements, statements)=>{
    const results = await neo4j.multipleStatements(c_statements);
    const r_results = await neo4j.multipleStatements(statements);
}

const run_query_commands = async()=>{
    const part_one = `
    MATCH ({color : 'shiny gold'})<-[*]-(connected)
    RETURN  count(distinct connected)
    `;
    const part_one_r = await neo4j.readTransaction(part_one);
    console.log(`The answer to part one is: ${part_one_r[0]['count(distinct connected)']}`)
}

const run_part_two_query_commands = async()=>{
    const part_two = `
    MATCH ({color : 'shiny gold'})-[r*]->()
    RETURN  distinct r
    `;
    const part_two_r = await neo4j.readTransaction(part_two);
    var total_bags = 0
    part_two_r.forEach((r)=>{
       var counts = r.r.map((rel)=>{
           return parseInt(rel.properties.bcount)
       })
        total_bags = total_bags + (counts.reduce((a,b)=>a*b))
        })
    console.log(`the answer to part two is ${total_bags}`)
}

var process_neo4j = async()=>{
    await clear_db()
    await run_create_commands(c_statements, statements)
    await run_query_commands()
    await run_part_two_query_commands()
    exit(0)
}

process_neo4j()

// console.log(util.inspect(statements, true, 6, true))
