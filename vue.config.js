module.exports = {
    outputDir: 'dist/itportal-web',
    configureWebpack: {
        plugins: []
    },
    devServer: {
        proxy: 'http://127.0.0.1:7007'
    }
}
