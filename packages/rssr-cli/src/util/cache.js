const shell = require('shelljs')
const { resolveApp , downloadWithPromise}  = require('./index')

/**
 * 缓存管理
 *
 * @export
 * @param {Optional} option 应用全局配置
 * @returns {Promise<void>}
 */
module.exports.cacheMange =  async (name)=>{
  let useCache
  try {
    useCache = require(resolveApp(`./cache/example/react-ssr-js/package.json`)).version.trim() || null
  } catch (error) {
    // console.log(error) 
  }
  
  // 如果没有缓存可用或者远程代码更新则拉取最新代码
  if (!useCache) {
    shell.rm('-rf', resolveApp('./cache'))
    await downloadWithPromise('github:sayid760/koa-react-ssr#master/example/react-ssr-js', resolveApp('./cache'))
  }
  const example = resolveApp(`./cache/example/react-ssr-js`)
  shell.cp('-rf', example, './')
  shell.mv(`./react-ssr-js`, `./${name}`)
}
