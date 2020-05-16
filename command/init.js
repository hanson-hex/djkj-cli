const exec = require("child_process").exec
const co = require("co")
const prompt = require("co-prompt")
const config = require("../templates")
const chalk = require("chalk")

module.exports = () => {
  co(function* () {
    // 处理用户输入
    let tplName = yield prompt("Template name:")
    let projectName = yield prompt("Project name:")
    let gitUrl
    let branch
    console.log("tplName:", tplName)
    console.log("config:", config.tpl)
    if (!config.tpl[tplName]) {
      console.log(chalk.red("\n Template doed not exit!"))
      process.exit()
    }
    gitUrl = config.tpl[tplName].url
    branch = config.tpl[tplName].branch

    let cmdStr = `git clone ${gitUrl} ${projectName} && cd ${projectName} && git checkout ${branch}`
    console.log(chalk.white("\n start generating..."))
    exec(cmdStr, (err) => {
      if (err) {
        console.log(err)
        process.exit()
      }
      console.log(chalk.green("\n generation completed!"))
      console.log(`\n cd ${projectName} && npm install \n`)
      process.exit()
    })
  })
}
