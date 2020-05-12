const ora  = require('ora')
const { checkRepeat } = require('./util/check')
const { cacheMange } = require('./util/cache')

const spinner = ora('应用初始化中')

module.exports.init = async (option) => {
  // 判断当前appName是否已存在
  await checkRepeat(option)
  // 显示loading
  spinner.start()
  // 缓存比对
  await cacheMange(option)
  spinner.succeed()
  process.exit()
}

