module.exports = {
  devServer: {
    disableHostCheck: true,
    //proxy: 'http://pisaai.com',
  },
  publicPath: './',
  lintOnSave: false,
  pluginOptions: {
    prerenderSpa: {
      registry: undefined,
      renderRoutes: [
        // 需要预渲染的路由地址
        '/',
        '/about',
      ],
      useRenderEvent: true, // 在 mounted 时，传递渲染事件通知 prerender
      headless: true, // 无界面浏览器
      onlyProduction: true, // 仅在生产模式才进行spa处理
    },
  },

  transpileDependencies: ['vuetify'],
}
