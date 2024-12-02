/** @type {import("prettier").Config} */
export default {
	semi: true,
	tabWidth: 2,
	useTabs: true,
	printWidth: 100,
	endOfLine: "lf",
	singleQuote: false,
	proseWrap: "always",
	trailingComma: "all",
	bracketSpacing: true,
	arrowParens: "always",
	quoteProps: "consistent",
	singleAttributePerLine: true,
	overrides: [
		{
			files: [ "*.d.ts", "*.json" ],
			excludeFiles: [ "package.json", "package-lock.json" ],
			options: {
				tabWidth: 4,
				useTabs: false,
			},
		},
	],
};
