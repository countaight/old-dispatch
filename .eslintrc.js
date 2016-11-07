module.exports = {
    "extends": ["eslint:recommended", "plugin:react/recommended"],
    "parseOptions": {
    	"ecmaFeatures": {
    		"jsx": true,
            "modules": true,
    	},
    },
    "parser": "babel-eslint",
    "installedESLint": true,
    "plugins": [
        "react"
    ]
};