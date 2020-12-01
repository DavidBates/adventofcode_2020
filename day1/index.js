const {Worker, isMainThread, workerData} = require('worker_threads');
const fs = require('fs');
const {exit} = require('process');

if (isMainThread) {
    var filename = process.argv[2];
    console.log(`reading values from ${filename}`)
    const expense_report = fs.readFileSync(filename).toString().split("\n").map((item) => {
        return Number(item)
    });

    expense_report.forEach((expense, i, report) => {
        const worker = new Worker(__filename, {
            workerData: {
                expense: expense,
                expense_report: report
            }
        });
        worker.on('exit', (code) => {
            if (code == 0) {
                exit(0)
            }
        });
    });
} else {
    workerData.expense_report.forEach((expense) => { 
        workerData.expense_report.forEach((expense_two) => {
        // console.log(`${workerData.expense} + ${expense} = ${workerData.expense + expense}`)
        if (workerData.expense + expense + expense_two == 2020) {
            console.log(`The answer you seek is ${
                workerData.expense * expense * expense_two
            }`)
            exit(0)
        } 
        });
    });
    exit(1)
}
