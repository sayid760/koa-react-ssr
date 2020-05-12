const path = require('path')
const { promisify } = require('util')
const download = promisify(require('download-git-repo'))

const processError = (err) => {
  if (err) {
    console.log('err', err)
    process.exit()
  }
}

const resolveApp = (source) => {
  // 以根目录为基准
  return path.resolve(__dirname, `../../${source}`)
}

const downloadWithPromise = promisify(require('download-git-repo'))

module.exports = {
  processError,
  resolveApp,
  downloadWithPromise
}
