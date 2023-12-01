/** @type {import("prettier").Config} */
module.exports = {
	semi: true,
	tabWidth: 2,
	useTabs: true,
	printWidth: 100,
	endOfLine: "lf",
	singleQuote: false,
	trailingComma: "all",
	proseWrap: "preserve",
	arrowParens: "always",
	quoteProps: "consistent",
	bracketSpacing: true,
	plugins: ["prettier-plugin-jsdoc"],
	overrides: [
		{
			files: ["*.d.ts", "*.json"],
			excludeFiles: ["package.json", "package-lock.json"],
			options: {
				tabWidth: 4,
				useTabs: false,
			},
		},
	],
};
