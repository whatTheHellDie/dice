'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  baseUrl: '"http://120.78.192.182:9191"',  //不能去掉里面的""
  contractAddress:'"0x2F0A69203C2e4618426E9707b5719B24744a6276"',
  ethNetPrefix:'"ropsten."'
})