import eslint from "@eslint/js";
import globals from "globals";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import tseslint from "typescript-eslint";

export default tseslint.config(
	eslintPluginPrettier,
	{
		files: ["**/*.{js,ts}"],
		plugins: {
			"@typescript-eslint": tseslint.plugin,
		},
		languageOptions: {
			globals: globals.node,
			parser: tseslint.parser,
			parserOptions: {
				project: ["./tsconfig.json"],
			},
		},
		rules: {
			// eslint rules
			"prettier/prettier": "off",

			...eslint.configs.recommended.rules,

			// typescript-eslint rules
			"@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
			"@typescript-eslint/no-namespace": "off",
			"@typescript-eslint/dot-notation": "off",
			"@typescript-eslint/no-unsafe-argument": "off",
			"@typescript-eslint/no-extraneous-class": "off",
			"@typescript-eslint/no-unsafe-assignment": "off",
			"@typescript-eslint/no-unsafe-call": "off",
			"@typescript-eslint/no-unsafe-return": "off",
			"@typescript-eslint/no-unsafe-member-access": "off",
		},
	},
	{
		files: ["*.cjs"],
		languageOptions: {
			globals: globals.commonjs,
		},
	},
	{
		files: ["*.mjs"],
		languageOptions: {
			globals: globals.node,
		},
	},
);
