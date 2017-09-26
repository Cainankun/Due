module.exports = {
    entry: "./src/main.js",
    output: {
        path: __dirname,
        filename: "due.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: "/node_modules/",
                use: [
					{
						loader:'babel-loader',
						options:{
							presets:["latest"]
						}
					}
				]
            }
        ]
    }
};
