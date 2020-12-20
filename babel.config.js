module.exports = {
  // presets: [
  //   '@vue/cli-plugin-babel/preset'
  // ]
  presets: [
    ['@vue/app', {
      polyfills: [
        'es.promise',
        'es.symbol'
      ]
    }]
  ]
}
