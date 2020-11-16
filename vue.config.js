module.exports = {
    devServer: {
        open: true,
        port:8088,
        proxy: {
            '/api': {
                target: "http://127.0.0.1:8880",
                changeOrigin: true,
                // pathRewrite: {
                //     "^/api": ""
                // }
            },
        }
    }
}