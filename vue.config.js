const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}

const px2rem = require('postcss-px2rem')
const postcss = px2rem({
  remUnit: 16  //基准大小 baseSize，需要和rem.js中相同
})
module.exports = {
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: false,
    productionSourceMap: false,
    devServer: {
        port: 8088,
        open: true,
        hot: true,
        overlay: {
            warnings: false,
            errors: true
        },
        proxy: {
            '/api': {
                target: process.env.VUE_APP_BASE_API,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/api'
                }
            }
        }
    },
    chainWebpack: config => {
      config.resolve.alias
        .set("@", resolve("src"))
        // .set("assets", resolve("src/assets"))
        // .set("components", resolve("src/components"))
        // .set("base", resolve("baseConfig"))
        // .set("public", resolve("public"));
    },
    css: {   // 移动端自适应:css 配置
        loaderOptions: {
          postcss: {
            plugins: [
              postcss
            ]
          }
        }
    }
}