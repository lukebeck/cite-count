module.exports = {
    module: {
        rules: [
            {
                test: /\.(js|jsc)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    }
};