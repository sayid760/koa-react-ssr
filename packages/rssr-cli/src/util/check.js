const inquirer = require('inquirer')
const fs = require('fs')
const shell = require('shelljs')

/**
 * 应用初始化函数
 *
 * @export
 * @param {Optional} option 应用全局配置
 * @returns {Promise<void>}
 */
module.exports.checkRepeat = (name) => {
  return new Promise(async (resolve, reject) => {
    if (fs.existsSync(`./${name}`)) {
      const answers = await inquirer.prompt([{
        type: 'confirm',
        message: `当前文件夹下含有创建 ${name} 文件名，是否强制删除文件继续初始化?`,
        name: 'delete',
        default: 'Yes'
      }])
      if (answers.delete) {
        shell.rm('-rf', `./${name}`)
        console.log(`原文件已经成功删除...`)
        resolve()
      } else process.exit()
    }
    resolve()
  })
}
