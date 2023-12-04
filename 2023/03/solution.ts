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

			const symbolWithinReach =
				(!!previousChar && previousChar.match(SYMBOLS_REGEX)) ||
				(!!nextChar && nextChar.match(SYMBOLS_REGEX)) ||
				prev.match(SYMBOLS_REGEX) ||
				next.match(SYMBOLS_REGEX);

			if (symbolWithinReach && symbolWithinReach.length > 0) {
				sum += Number(number);
			}

			line = line.replace(number, number.replaceAll(/\d/g, "."));
		}
	}

	console.log(sum);

	console.timeEnd("partOne");
}

function partTwo() {
	const DIGITS_REGEX = /\d+/g;

	console.time("partTwo");

	let sum = 0;
	const lines = (TEST_INPUT || input).split("\n");

	for (const [lineIndex, line] of lines.entries()) {
		const gearMatch = line.match(/\*/g);

		if (!gearMatch) continue;

		const previousLine = lines[lineIndex - 1];
		const nextLine = lines[lineIndex + 1];

		for (const gear of gearMatch) {
			const startIndex = line.indexOf(gear);

			let prev = "";
			let next = "";

			const previousChar = line.charAt(startIndex - 1);
			const nextChar = line.charAt(startIndex + gear.length);

			if (previousLine) {
				const leftDiagonal = previousLine.charAt(startIndex - 1) ? startIndex - 1 : startIndex;
				const rightDiagonal = previousLine.charAt(startIndex + gear.length + 1)
					? startIndex + gear.length + 1
					: startIndex + gear.length;

				prev = previousLine.slice(leftDiagonal, rightDiagonal);
			}

			if (nextLine) {
				const leftDiagonal = nextLine.charAt(startIndex - 1) ? startIndex - 1 : startIndex;
				const rightDiagonal = nextLine.charAt(startIndex + gear.length + 1)
					? startIndex + gear.length + 1
					: startIndex + gear.length;

				next = nextLine.slice(leftDiagonal, rightDiagonal);
			}

			const symbolWithinReach =
				previousChar.match(DIGITS_REGEX) ||
				nextChar.match(DIGITS_REGEX) ||
				prev.match(DIGITS_REGEX) ||
				next.match(DIGITS_REGEX);

			if (symbolWithinReach && symbolWithinReach.length > 0) {
				console.log(
					previousChar.match(DIGITS_REGEX),
					nextChar.match(DIGITS_REGEX),
					prev.match(DIGITS_REGEX),
					next.match(DIGITS_REGEX),
					`\n${prev || ""}\n${previousChar || ""}${gear}${nextChar}\n${next || ""}`,
				);
			}
		}
	}

	console.timeEnd("partTwo");
}
