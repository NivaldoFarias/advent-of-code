/** @type {import("eslint").Linter.Config} */
module.exports = {
	root: true,
	extends: [
		"prettier",
		"eslint:recommended",
		"plugin:@typescript-eslint/strict-type-checked",
		"plugin:@typescript-eslint/stylistic-type-checked",
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
		project: ["./tsconfig.json"],
	},
	env: {
		es2023: true,
		node: true,
	},
	rules: {
		// eslint
		"prefer-const": "error",
		"no-console": "off",

		// @typescript-eslint
		"@typescript-eslint/prefer-nullish-coalescing": "off",
		"@typescript-eslint/consistent-type-imports": [
			"error",
			{ prefer: "type-imports", fixStyle: "inline-type-imports" },
		],
	},
};
