import Bun from "bun";

const input = await Bun.file(`${import.meta.dir}/input.txt`).text();

partOne({ red: 12, blue: 14, green: 13 });
partTwo();

function partOne(threshold: Threshold) {
	const colorRegex = /(?<nOf>\d+)\s(?<color>blue|red|green)/gi;
	const gameRegex = /^game\s(?<gameNumber>\d+)/gi;

	console.time("partOne");

	let sum = 0;
	const lines = input.split("\n");

	for (const line of lines) {
		let possible = true;
		const catchColors = line.match(colorRegex);
		const catchGame = line.match(gameRegex);

		if (!catchColors || !catchGame) throw new Error("oops");

		for (const [nOf, color] of catchColors.map((color) => color.split(" "))) {
			if (!nOf || !color) possible = false;
			if (Number(nOf) > threshold[color as keyof Threshold]) possible = false;
		}

		const gameDigit = catchGame[0].split(" ")[1];

		if (possible) sum += Number(gameDigit);
	}

	console.log(sum);

	console.timeEnd("partOne");
}

function partTwo() {
	const colorRegex = /(?<nOf>\d+)\s(?<color>blue|red|green)/gi;
	const gameRegex = /^game\s(?<gameNumber>\d+)/gi;

	console.time("partTwo");

	let totalSum = 0;
	const lines = input.split("\n");

	for (const line of lines) {
		const mininum = {
			blue: -1,
			red: -1,
			green: -1,
		};

		const catchColors = line.match(colorRegex);
		const catchGame = line.match(gameRegex);

		if (!catchColors || !catchGame) throw new Error("oops");

		for (const [nOf, color] of catchColors.map((color) => color.split(" "))) {
			if (!nOf || !color) continue;
			if (Number(nOf) < mininum[color as keyof typeof mininum]) continue;

			mininum[color as keyof typeof mininum] = Number(nOf);
		}

		totalSum += mininum.red * mininum.blue * mininum.green;
	}

	console.log(totalSum);

	console.timeEnd("partTwo");
}

interface Threshold {
	red: number;
	green: number;
	blue: number;
}
