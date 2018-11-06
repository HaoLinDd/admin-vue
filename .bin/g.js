const fs = require('fs')
const path = require('path')
const util = require('util')

const mkdir = util.promisify(fs.mkdir)
const writeFile = util.promisify(fs.writeFile)

async function main() {
  // 获取命令行参数
  const args = process.argv.slice(2)

  // 拿到用户指定的组件名
  const componentName = args[0]

  // 拼接出要创建的组件路径
  const componentDirPath = path.join(__dirname, `../src/components/${componentName}`)

  // 创建组件目录
  await mkdir(componentDirPath)

  // 分别在组件目录中创建 template.html、script.js、style.css
  await Promise.all([
    writeFile(path.join(componentDirPath, 'template.html'),
    `<div>
    <p>${componentName} component</p>
    </div>
    `),
    writeFile(path.join(componentDirPath, 'script.js'),
    `export default {
      created () {},
      data () {
        return {}
      },
      methods: {}
    }
    `),
    writeFile(path.join(componentDirPath, 'style.css'), ''),
    writeFile(path.join(componentDirPath, `${componentName}.vue`),
    `<template src="./template.html"></template>
    <script src="./script.js"></script>
    <style src="./style.css"></style>
    `)
  ])

  console.log(`Component ${componentName} create successfully!`)
}

main()
