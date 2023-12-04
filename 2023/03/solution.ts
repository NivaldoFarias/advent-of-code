import Bun from "bun";

const input = await Bun.file(`${import.meta.dir}/input.txt`).text();

partOne();
partTwo();

function partOne() {
	const SYMBOLS_REGEX = /[^.\d]/g;

	console.time("partOne");

	let sum = 0;
	const lines = input.split("\n");

	for (let [row, line] of lines.entries()) {
		const numbersMatch = line.match(/\d+/g);

		if (!numbersMatch) continue;
		const previousLine = lines[row - 1];
		const nextLine = lines[row + 1];

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
	const GEAR_REGEX = /\*/g;

	console.time("partTwo");

	const lines = input.split("\n");

	const gearsMap = new Map<`${number},${number}`, number[]>();

	for (let [row, line] of lines.entries()) {
		const gearsMatch = line.match(GEAR_REGEX);

		if (gearsMatch) {
			for (const gear of gearsMatch) {
				const gearPosition = `${row},${line.indexOf(gear)}` as const;

				gearsMap.set(gearPosition, []);

				line = line.replace(gear, ".");
			}
		}
	}

	for (let [row, line] of lines.entries()) {
		const numbersMatch = line.match(/\d+/g);

		if (!numbersMatch) continue;

		const previousLine = lines[row - 1];
		const nextLine = lines[row + 1];

		for (const number of numbersMatch) {
			const startIndex = line.indexOf(number);

			let previousSubline = "";
			let nextSubline = "";
			const previousChar = line.charAt(startIndex - 1);
			const nextChar = line.charAt(startIndex + number.length);

			if (previousLine) {
				const leftDiagonal = previousLine.charAt(startIndex - 1) ? startIndex - 1 : startIndex;
				const rightDiagonal = previousLine.charAt(startIndex + number.length + 1)
					? startIndex + number.length + 1
					: startIndex + number.length;

				previousSubline = previousLine.slice(leftDiagonal, rightDiagonal);
			}

			if (nextLine) {
				const leftDiagonal = nextLine.charAt(startIndex - 1) ? startIndex - 1 : startIndex;
				const rightDiagonal = nextLine.charAt(startIndex + number.length + 1)
					? startIndex + number.length + 1
					: startIndex + number.length;

				nextSubline = nextLine.slice(leftDiagonal, rightDiagonal);
			}

			const symbolWithinReach =
				(!!previousChar && previousChar.match(GEAR_REGEX)) ||
				(!!nextChar && nextChar.match(GEAR_REGEX)) ||
				previousSubline.match(GEAR_REGEX) ||
				nextSubline.match(GEAR_REGEX);

			if (symbolWithinReach && symbolWithinReach.length > 0) {
				const gearPosition = {
					row: row,
					column: startIndex,
				};

				if (!!previousChar && previousChar.match(GEAR_REGEX)) {
					gearPosition.column = startIndex - 1;
				} else if (!!nextChar && nextChar.match(GEAR_REGEX)) {
					gearPosition.column = startIndex + number.length;
				} else if (previousSubline.match(GEAR_REGEX) && previousLine) {
					gearPosition.row = row - 1;
					gearPosition.column =
						(previousLine.charAt(startIndex - 1) ? startIndex - 1 : startIndex) +
						previousSubline.indexOf("*");
				} else if (nextSubline.match(GEAR_REGEX) && nextLine) {
					gearPosition.row = row + 1;
					gearPosition.column =
						(nextLine.charAt(startIndex - 1) ? startIndex - 1 : startIndex) +
						nextSubline.indexOf("*");
				}

				const gearNumbersArray = gearsMap.get(`${gearPosition.row},${gearPosition.column}`);

				if (gearNumbersArray) gearNumbersArray.push(Number(number));
			}

			line = line.replace(number, number.replaceAll(/\d/g, "."));
		}
	}

	console.log(
		[...gearsMap.values()].reduce((sum, numbers) => {
			if (numbers.length !== 2) return sum;
			else if (!numbers[0]) return sum;
			else if (!numbers[1]) return sum;

			return sum + numbers[0] * numbers[1];
		}, 0),
	);

	console.timeEnd("partTwo");
}
