const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    config.module.rule('moc')
      .test(/\.moc3$/)
      .use('url-loader')
        .loader('url-loader')
        .end();
  }
})
