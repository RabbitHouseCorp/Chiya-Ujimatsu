const chalk = require('chalk')

module.exports = class Logger {

    static log(log) {
        console.log(`${chalk.bgBlue('CHIYA UJIMATSU')} ${chalk.blue(['[LOG]'])} ${log}`)
    }

    static error(log) {
        console.log(`${chalk.bgBlue('CHIYA UJIMATSU')} ${chalk.red(['[ERROR]'])} ${log}`)
    }

    static warn(log) {
        console.log(`${chalk.bgBlue('CHIYA UJIMATSU')} ${chalk.yellow(['[WARN]'])} ${log}`)
    }
}