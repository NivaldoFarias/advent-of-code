import Bun from "bun";

const input = await Bun.file(`${import.meta.dir}/input.txt`).text();

partOne();
// partTwo();

function partOne() {
	const SYMBOLS_REGEX = /[^.\d]/g;

	console.time("partOne");

	let sum = 0;
	const lines = input.split("\n");

	for (const [index, line] of lines.entries()) {
		const numbersMatch = line.match(/\d+/g);

		if (!numbersMatch) continue;
		const previousLine = lines[index - 1];
		const nextLine = lines[index + 1];

		for (const number of numbersMatch) {
			const startIndex = line.indexOf(number);
			const previousChar = line.charAt(startIndex - 1);
			const nextChar = line.charAt(startIndex + number.length);

			if (!!previousChar && previousChar.match(SYMBOLS_REGEX)) {
				sum += Number(number);

				continue;
			}

			if (!!nextChar && nextChar.match(SYMBOLS_REGEX)) {
				sum += Number(number);

				continue;
			}

			if (previousLine) {
				const leftDiagonal = previousLine.charAt(startIndex - 1) ? startIndex - 1 : startIndex;
				const rightDiagonal = previousLine.charAt(startIndex + number.length + 1)
					? startIndex + number.length + 1
					: startIndex + number.length;

				const prev = previousLine.slice(leftDiagonal, rightDiagonal);

				if (prev.match(/[^.\d]/g)) {
					sum += Number(number);

					continue;
				}
			}

			if (nextLine) {
				const leftDiagonal = nextLine.charAt(startIndex - 1) ? startIndex - 1 : startIndex;
				const rightDiagonal = nextLine.charAt(startIndex + number.length + 1)
					? startIndex + number.length + 1
					: startIndex + number.length;

				const next = nextLine.slice(leftDiagonal, rightDiagonal);

				if (next.match(/[^.\d]/g)) {
					sum += Number(number);

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

	let totalSum = 0;

	console.log(totalSum);

	console.timeEnd("partTwo");
}
