import Bun from "bun";

const input = await Bun.file(`${import.meta.dir}/input.txt`).text();

partOne();
partTwo();

function partOne() {
	console.time("partOne");

	const lines = input.split("\n");

	const totalSum = lines.reduce((sum, line) => {
		const digits = line.match(/\d/gm);

		if (!digits || digits.length === 0) throw new Error(`oops!\n${line}`);

		const firstDigit = digits[0];
		const secondDigit = digits.at(-1) ?? firstDigit;

		const twoDigitNumber = `${firstDigit}${secondDigit}`;

		return sum + Number(twoDigitNumber);
	}, 0);

	console.log(totalSum);

	console.timeEnd("partOne");
}

function partTwo() {
	const REGEX = /\d|one|two|three|four|five|six|seven|eight|nine/;
	const DIGITS = new Map([
		["one", "1"],
		["two", "2"],
		["three", "3"],
		["four", "4"],
		["five", "5"],
		["six", "6"],
		["seven", "7"],
		["eight", "8"],
		["nine", "9"],
		["1", "1"],
		["2", "2"],
		["3", "3"],
		["4", "4"],
		["5", "5"],
		["6", "6"],
		["7", "7"],
		["8", "8"],
		["9", "9"],
	]);

	console.time("partTwo");

	const lines = input.split("\n");

	const totalSum = lines.reduce((sum, line) => {
		const matches = line.match(REGEX);

		if (!matches || matches.length === 0) throw new Error(`oops!\n${line}`);

		const last = {
			key: "",
			index: 0,
		};

		for (const key of DIGITS.keys()) {
			const index = line.lastIndexOf(key);

			if (index === -1) continue;
			else if (last.key === key) continue;
			else if (index < last.index) continue;

			last.key = key;
			last.index = index;
		}

		const firstDigit = DIGITS.get(matches[0]) ?? matches[0];
		const lastDigit = DIGITS.get(last.key !== "" ? last.key : firstDigit);
		const twoDigitNumber = `${firstDigit}${lastDigit}`;

		return sum + Number(twoDigitNumber);
	}, 0);

	console.log(totalSum);

	console.timeEnd("partTwo");
}
