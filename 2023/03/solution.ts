/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import Bun from "bun";
import chalk from "chalk";

const TEST_INPUT = await Bun.file(`${import.meta.dir}/input-test.txt`).text();

const input = await Bun.file(`${import.meta.dir}/input.txt`).text();

partOne();
partTwo();

function partOne() {
	const SYMBOLS_REGEX = /[^.\d]/g;

	console.time("partOne");

	let sum = 0;
	const lines = (TEST_INPUT || input).split("\n");

	for (let [lineIndex, line] of lines.entries()) {
		const numbersMatch = line.match(/\d+/g);

		if (!numbersMatch) continue;
		const previousLine = lines[lineIndex - 1];
		const nextLine = lines[lineIndex + 1];

		for (const number of numbersMatch) {
			const startIndex = line.indexOf(number);

			let prev = "";
			let next = "";
			const previousChar = line.charAt(startIndex - 1);
			const nextChar = line.charAt(startIndex + number.length);

			if (previousLine) {
				const leftDiagonal = previousLine.charAt(startIndex - 1) ? startIndex - 1 : startIndex;
				const rightDiagonal = previousLine.charAt(startIndex + number.length + 1)
					? startIndex + number.length + 1
					: startIndex + number.length;

				prev = previousLine.slice(leftDiagonal, rightDiagonal);
			}

			if (nextLine) {
				const leftDiagonal = nextLine.charAt(startIndex - 1) ? startIndex - 1 : startIndex;
				const rightDiagonal = nextLine.charAt(startIndex + number.length + 1)
					? startIndex + number.length + 1
					: startIndex + number.length;

				next = nextLine.slice(leftDiagonal, rightDiagonal);
			}

			if (
				(!!previousChar && previousChar.match(SYMBOLS_REGEX)) ||
				(!!nextChar && nextChar.match(SYMBOLS_REGEX)) ||
				prev.match(SYMBOLS_REGEX) ||
				next.match(SYMBOLS_REGEX)
			) {
				sum += Number(number);
			}

			line = line.replace(number, number.replaceAll(/\d/g, "."));
		}
	}

	console.log(sum);

	console.timeEnd("partOne");
}

function partTwo() {
	const SYMBOLS_REGEX = /[^.\d]/g;

	console.time("partTwo");

	let sum = 0;
	const lines = (TEST_INPUT || input).split("\n");

	for (let [lineIndex, line] of lines.entries()) {
		const numbersMatch = line.match(/\d+/g);

		if (!numbersMatch) continue;
		const previousLine = lines[lineIndex - 1];
		const nextLine = lines[lineIndex + 1];

		for (const number of numbersMatch) {
			const startIndex = line.indexOf(number);

			let prev = "";
			let next = "";
			const previousChar = line.charAt(startIndex - 1);
			const nextChar = line.charAt(startIndex + number.length);

			if (previousLine) {
				const leftDiagonal = previousLine.charAt(startIndex - 1) ? startIndex - 1 : startIndex;
				const rightDiagonal = previousLine.charAt(startIndex + number.length + 1)
					? startIndex + number.length + 1
					: startIndex + number.length;

				prev = previousLine.slice(leftDiagonal, rightDiagonal);
			}

			if (nextLine) {
				const leftDiagonal = nextLine.charAt(startIndex - 1) ? startIndex - 1 : startIndex;
				const rightDiagonal = nextLine.charAt(startIndex + number.length + 1)
					? startIndex + number.length + 1
					: startIndex + number.length;

				next = nextLine.slice(leftDiagonal, rightDiagonal);
			}

			if (
				(!!previousChar && previousChar.match(SYMBOLS_REGEX)) ||
				(!!nextChar && nextChar.match(SYMBOLS_REGEX)) ||
				prev.match(SYMBOLS_REGEX) ||
				next.match(SYMBOLS_REGEX)
			) {
				sum += Number(number);
			}

			line = line.replace(number, number.replaceAll(/\d/g, "."));
		}
	}

	console.timeEnd("partTwo");
}
