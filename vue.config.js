module.exports = {
  baseUrl:'./',
  assertsDir:'static',
  pwa:{
    iconPath:{
      favicon32:'./favicon.ico',
      favicon16:'./favicon.ico',
      appleTouchIcon:'./favicon.ico',
      maskIcon:'./favicon.ico',
      msTilelmage:'./favicon.ico',
    }
  },
  configureWebpack:config=>{
    // GZip压缩
    const CompressionPlugin = require('compression-webpack-plugin');
    config.plugins.push(
      new CompressionPlugin({
        algorithm:'gzip',
        test:/\.(js|css|woff|woff2|svg)$/,  // 要压缩的文件
        threshold:10240, // 压缩超过10k的数据
        deleteOriginalAssets:false, // 不删除压缩前的文件，如果浏览器不支持Gzip，则会加载源文件
        minRatio:0.8 // 压缩比大于0.8的文件将不会被压缩
      })
    );
  }
}

