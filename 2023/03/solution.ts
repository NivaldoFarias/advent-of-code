import Bun from "bun";

const TEST_INPUT = ``;

const input = await Bun.file(`${import.meta.dir}/input.txt`).text();

partOne();
// partTwo();

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

			const previousChar = line.charAt(startIndex - 1);
			const nextChar = line.charAt(startIndex + number.length);

			if (!!previousChar && previousChar.match(SYMBOLS_REGEX)) {
				sum += Number(number);
				line = line.replace(number, number.replaceAll(/\d/g, "."));

				continue;
			}

			if (!!nextChar && nextChar.match(SYMBOLS_REGEX)) {
				sum += Number(number);
				line = line.replace(number, number.replaceAll(/\d/g, "."));

				continue;
			}

			if (previousLine) {
				const leftDiagonal = previousLine.charAt(startIndex - 1) ? startIndex - 1 : startIndex;
				const rightDiagonal = previousLine.charAt(startIndex + number.length + 1)
					? startIndex + number.length + 1
					: startIndex + number.length;

				const prev = previousLine.slice(leftDiagonal, rightDiagonal);

				if (prev.match(SYMBOLS_REGEX)) {
					sum += Number(number);
					line = line.replace(number, number.replaceAll(/\d/g, "."));

					continue;
				}
			}

			if (nextLine) {
				const leftDiagonal = nextLine.charAt(startIndex - 1) ? startIndex - 1 : startIndex;
				const rightDiagonal = nextLine.charAt(startIndex + number.length + 1)
					? startIndex + number.length + 1
					: startIndex + number.length;

				const next = nextLine.slice(leftDiagonal, rightDiagonal);

				if (next.match(SYMBOLS_REGEX)) {
					sum += Number(number);
					line = line.replace(number, number.replaceAll(/\d/g, "."));

					continue;
				}
			}
		}
	}

	console.log(sum);

	console.timeEnd("partOne");
}

function partTwo() {
	console.time("partTwo");

	console.timeEnd("partTwo");
}
