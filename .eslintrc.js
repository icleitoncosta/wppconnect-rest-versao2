// eslint-disable-next-line no-undef, header/header
module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'header'],
	extends: [
	  'eslint:recommended',
	  'plugin:@typescript-eslint/eslint-recommended',
	  'plugin:@typescript-eslint/recommended',
	  'plugin:prettier/recommended',
	],
	rules: {
	  // @todo more restrictive
	  '@typescript-eslint/ban-ts-comment': 'off',
	  '@typescript-eslint/ban-types': 'off',
	  '@typescript-eslint/explicit-module-boundary-types': 'off',
	  '@typescript-eslint/no-empty-function': 'off',
	  '@typescript-eslint/no-explicit-any': 'off',
	  '@typescript-eslint/no-inferrable-types': 'off',
	  '@typescript-eslint/no-namespace': 'off',
	  '@typescript-eslint/no-unused-vars': 'off',
	  '@typescript-eslint/no-var-requires': 'off',
	  '@typescript-eslint/prefer-namespace-keyword': 'off',
	  'no-async-promise-executor': 'off',
	  'no-constant-condition': 'off',
	  'no-empty': ['error', { allowEmptyCatch: true }],
	  'no-useless-catch': 'off',
	  'no-useless-escape': 'off',
	  'prefer-const': 'off',
	},
	overrides: [
	  {
		files: ['src/lib/**/*.js'],
		parser: '@babel/eslint-parser',
		plugins: ['@babel'],
		parserOptions: {
		  ecmaVersion: 6,
		  sourceType: 'module',
		},
		env: {
		  amd: true,
		  commonjs: true,
		  es6: true,
		  browser: true,
		  node: false,
		},
		globals: {
		  axios: true,
		  Debug: true,
		  Store: true,
		  WAPI: true,
		  WPP: true,
		  webpackJsonp: true,
		  WWebJS: true,
		},
		rules: {
		  // @todo more restrictive
		  '@typescript-eslint/no-array-constructor': 'off',
		  'no-prototype-builtins': 'off',
		  'no-redeclare': 'off',
		},
	  },
	  {
		files: ['src/lib/**/webpack.*.js', 'src/lib/**/gulpfile.js'],
		env: {
		  browser: false,
		  node: true,
		},
	  },
	],
  };