import Bun from "bun";

const INPUT_TEST = await Bun.file(`${import.meta.dir}/input-test.txt`).text();

const input = await Bun.file(`${import.meta.dir}/input.txt`).text();

partOne();
partTwo();

function partOne() {
	const currentInput = INPUT_TEST || input;

	const initialSeedRegex = /^seeds:\s((?:\d+[^\S])+)$/gim;
	const xToYMapsRegex = /(?:^\n(?<from>\D+)-to-(?<to>\D+)\smap:$)+/gim;
	const rangesRegex = /^(?<fromRangeStart>\d+)\s(?<toRangeStart>\d+)\s(?<range>\d+)$/gim;

	console.time("partOne");

	const seedsMatch = initialSeedRegex.exec(currentInput);
	const xToYMapsMatch = currentInput.matchAll(xToYMapsRegex);
	const xToYMapsArray = [...xToYMapsMatch];

	if (!seedsMatch) throw new Error("oops");

	const seeds = seedsMatch[1].replace("\n", "").split(" ");

	console.log(seeds);

	const hashMap = new Map<`${string}-to-${string}`, Record<string, Set<number>[]>>();

	for (const [index, match] of xToYMapsArray.entries()) {
		if (!match.groups) throw new Error("oops");

		const { from, to } = match.groups;

		const next = xToYMapsArray.at(index + 1);

		const currentRangesSubstring = currentInput.slice(
			currentInput.indexOf(match[0]),
			next ? currentInput.indexOf(next[0]) : currentInput.length,
		);

		const rangesMatches = currentRangesSubstring.matchAll(rangesRegex);
		hashMap.set(`${from}-to-${to}`, {
			[from]: [],
			[to]: [],
		});

		const currentHashmap = hashMap.get(`${from}-to-${to}`);

		if (!currentHashmap) throw new Error("oops");

		for (const rangesMatch of rangesMatches) {
			if (!rangesMatch.groups) throw new Error("oops");

			const { fromRangeStart, toRangeStart, range } = rangesMatch.groups;

			console.log(fromRangeStart, toRangeStart, range);

			const fromRangeSet = new Set<number>();
			const toRangeSet = new Set<number>();

			for (let i = 0; i < Number(range); i++) {
				fromRangeSet.add(Number(fromRangeStart) + i);
			}

			for (let i = 0; i < Number(range); i++) {
				toRangeSet.add(Number(toRangeStart) + i);
			}

			currentHashmap[from].push(fromRangeSet);
			currentHashmap[to].push(toRangeSet);
		}
	}

	console.log(hashMap.entries());

	console.timeEnd("partOne");
}

function partTwo() {
	console.time("partTwo");

	console.timeEnd("partTwo");
}
