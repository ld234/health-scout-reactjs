module.exports = {
	env: {
		es6: true,
		node: true,
		browser: true,
		mocha: true,
	},
	extends: ['eslint:recommended', 'prettier', 'plugin:react/recommended'],
	parserOptions: {
		ecmaVersion: 8,
		sourceType: 'module',
		ecmaFeatures: {
			modules: true,
			experimentalObjectRestSpread: true,
			jsx: true,
		},
	},
	plugins: ['prettier', 'react'],
	rules: {
		'prettier/prettier': [
			'error',
			{
				singleQuote: true,
				trailingComma: 'es5',
				useTabs: true,
			},
		],
		eqeqeq: ['error', 'always'],
		'no-console': 'off',
	},
	globals: {
		window: true,
		localStorage: true,
	},
};
